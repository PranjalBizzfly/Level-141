import { clientKey, deliver, json, looksLikeSpam, rateLimited, readJson } from "@/lib/forms/server";
import { formatPhone, normaliseMessage, validateMessage } from "@/lib/forms/validation";

/** Contact Us page: name, email, phone, city and a message, passed to Level 141 (email and/or webhook). */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return json({ ok: false, code: "bad_request", message: "Invalid request." }, 400);
  if (looksLikeSpam(body)) return json({ ok: true });
  if (rateLimited(`message:${clientKey(req)}`))
    return json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again later." }, 429);

  const input = normaliseMessage(body);
  const errors = validateMessage(input);
  if (Object.keys(errors).length) return json({ ok: false, code: "validation", errors: errors as Record<string, string> }, 422);

  const result = await deliver({
    kind: "contact",
    subject: `Contact Us: ${input.name}`,
    replyTo: input.email,
    fields: { Form: "Contact Us", Name: input.name, Email: input.email, Phone: formatPhone(input), City: input.city, Message: input.message },
  });
  if (result === "not_configured")
    return json({ ok: false, code: "not_configured", message: "Online messages are not connected yet, so your message was not sent." }, 503);
  if (result === "failed") return json({ ok: false, code: "delivery_failed", message: "We couldn't send your message. Please try again shortly." }, 502);
  return json({ ok: true });
}
