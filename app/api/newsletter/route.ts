import { clientKey, deliver, json, looksLikeSpam, rateLimited, readJson } from "@/lib/forms/server";
import { normaliseLqContact } from "@/lib/forms/validation";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,24}$/i;

/** "Stay Ahead" footer signup: passes the email to Level 141 (email and/or webhook). */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return json({ ok: false, code: "bad_request", message: "Invalid request." }, 400);
  if (looksLikeSpam(body)) return json({ ok: true });
  if (rateLimited(`newsletter:${clientKey(req)}`))
    return json({ ok: false, code: "rate_limited", message: "Too many attempts. Please try again later." }, 429);

  const { email } = normaliseLqContact(body);
  if (!EMAIL_RE.test(email) || email.length > 254)
    return json({ ok: false, code: "validation", errors: { email: "Please enter a valid email address." } }, 422);

  const result = await deliver({ kind: "newsletter", subject: `Stay Ahead signup: ${email}`, replyTo: email, fields: { List: "Stay Ahead", Email: email } });
  if (result === "not_configured")
    return json({ ok: false, code: "not_configured", message: "Signup is not connected yet, so your email was not saved." }, 503);
  if (result === "failed") return json({ ok: false, code: "delivery_failed", message: "We couldn't save your email. Please try again." }, 502);
  return json({ ok: true });
}
