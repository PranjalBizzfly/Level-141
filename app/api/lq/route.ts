import { clientKey, deliver, deliveryConfigured, json, looksLikeSpam, rateLimited, readJson, sendEmailTo } from "@/lib/forms/server";
import { normaliseLqContact, validateLqContact } from "@/lib/forms/validation";
import { buildLqReport, parseLqAnswers } from "@/lib/lq-report";

/**
 * LQ™ Assessment submission. The score is calculated here, never shown on the website:
 * the report is emailed to the visitor (Resend), and a copy goes to Level 141 (email and/or webhook).
 */
export async function POST(req: Request) {
  const body = await readJson(req);
  if (!body) return json({ ok: false, code: "bad_request", message: "Invalid request." }, 400);

  if (looksLikeSpam(body)) return json({ ok: true });

  if (rateLimited(`lq:${clientKey(req)}`))
    return json({ ok: false, code: "rate_limited", message: "Too many submissions. Please try again later." }, 429);

  const contact = normaliseLqContact(body);
  const errors = validateLqContact(contact);
  if (Object.keys(errors).length) return json({ ok: false, code: "validation", errors: errors as Record<string, string> }, 422);

  const answers = parseLqAnswers(body);
  if (!answers)
    return json({ ok: false, code: "bad_request", message: "Some answers are missing. Please go back and answer every question." }, 400);

  if (!deliveryConfigured().any)
    return json(
      { ok: false, code: "not_configured", message: "Report delivery is not connected yet, so your report was not sent." },
      503,
    );

  const report = buildLqReport(contact.name, answers);
  const [visitor, team] = await Promise.all([
    sendEmailTo({ to: contact.email, subject: report.subject, text: report.text, html: report.html }),
    deliver({
      kind: "lq",
      subject: `LQ™ Assessment: ${contact.name}, ${report.summary["LQ Score"]}`,
      replyTo: contact.email,
      fields: { Name: contact.name, Email: contact.email, ...report.summary, Report: report.text },
    }),
  ]);

  // Success when the visitor has the report, or Level 141 has it and will send it on.
  if (!visitor && team !== "ok")
    return json({ ok: false, code: "delivery_failed", message: "We couldn't send your report. Please try again shortly." }, 502);
  return json({ ok: true });
}
