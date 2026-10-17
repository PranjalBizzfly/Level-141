import { clientKey, deliver, json, looksLikeSpam, rateLimited, readJson } from "@/lib/forms/server";
import { interestOptions, normaliseContact, validateContact } from "@/lib/forms/validation";

export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return json({ ok: false, code: "bad_request", message: "Invalid request." }, 400);

  // Silently accept obvious bots without delivering anything.
  if (looksLikeSpam(body)) return json({ ok: true });

  if (rateLimited(`contact:${clientKey(req)}`))
    return json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again later." }, 429);

  const input = normaliseContact(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length) return json({ ok: false, code: "validation", errors: errors as Record<string, string> }, 422);

  const interest = interestOptions.find((o) => o.value === input.interest)?.label ?? input.interest;
  const result = await deliver({
    kind: "contact",
    subject: `New enquiry — ${interest} — ${input.name}`,
    replyTo: input.email,
    fields: {
      "Interested in": interest,
      Name: input.name,
      Company: input.company,
      Designation: input.designation,
      Email: input.email,
      Phone: input.phone,
      "What level are you trying to reach?": input.level,
    },
  });

  if (result === "not_configured")
    return json(
      { ok: false, code: "not_configured", message: "Online enquiries are not connected yet, so your message was not sent." },
      503,
    );
  if (result === "failed")
    return json({ ok: false, code: "delivery_failed", message: "We couldn't send your message. Please try again shortly." }, 502);
  return json({ ok: true });
}
