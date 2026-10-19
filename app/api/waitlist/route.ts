import { clientKey, deliver, json, looksLikeSpam, rateLimited, rateLimitedResponse, readJson } from "@/lib/forms/server";
import { normaliseWaitlist, validateWaitlist } from "@/lib/forms/validation";

/** Growth Architecture™ waitlist — registers interest only; no engagement or booking is created. */
export async function POST(req: Request) {
  const parsed = await readJson(req);
  if ("error" in parsed) return parsed.error;
  const { body } = parsed;

  if (looksLikeSpam(body)) return json({ ok: true });

  if (rateLimited(`waitlist:${clientKey(req)}`))
    return rateLimitedResponse();

  const input = normaliseWaitlist(body);
  const errors = validateWaitlist(input);
  if (Object.keys(errors).length) return json({ ok: false, code: "validation", errors: errors as Record<string, string> }, 422);

  const result = await deliver({
    kind: "waitlist",
    subject: `Growth Architecture™ waitlist — ${input.company} — ${input.name}`,
    replyTo: input.email,
    fields: {
      List: "Growth Architecture™ waitlist",
      Name: input.name,
      Email: input.email,
      Organization: input.company,
      Designation: input.designation,
      "What is your organization's next level?": input.note,
    },
  });

  if (result === "not_configured")
    return json(
      { ok: false, code: "not_configured", message: "The waitlist is not connected yet, so your details were not saved." },
      503,
    );
  if (result === "failed")
    return json({ ok: false, code: "delivery_failed", message: "We couldn't save your registration. Please try again shortly." }, 502);
  return json({ ok: true });
}
