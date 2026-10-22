import "server-only";
import { NextResponse } from "next/server";
import { HONEYPOT_FIELD, MIN_FILL_MS, type SubmitResponse } from "./validation";

/**
 * Form delivery. Two integrations are supported; configure either or both:
 *   1. Resend email   — RESEND_API_KEY, FORM_FROM_EMAIL, FORM_TO_EMAIL
 *   2. Webhook (JSON) — FORM_WEBHOOK_URL (+ optional FORM_WEBHOOK_SECRET)
 * With neither configured, submissions are rejected with `not_configured`
 * so the visitor is never told their message was received when it was not.
 */

export type Submission = {
  kind: "contact" | "waitlist";
  subject: string;
  replyTo: string;
  fields: Record<string, string>;
};

export function deliveryConfigured() {
  const email = Boolean(process.env.RESEND_API_KEY && process.env.FORM_FROM_EMAIL && process.env.FORM_TO_EMAIL);
  const webhook = Boolean(process.env.FORM_WEBHOOK_URL);
  return { email, webhook, any: email || webhook };
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(sub: Submission) {
  const rows = Object.entries(sub.fields)
    .map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#5c5c5c;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v || "—").replace(/\n/g, "<br>")}</td></tr>`)
    .join("");
  const text = Object.entries(sub.fields)
    .map(([k, v]) => `${k}: ${v || "—"}`)
    .join("\n");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.FORM_FROM_EMAIL,
      to: process.env.FORM_TO_EMAIL!.split(",").map((s) => s.trim()),
      reply_to: sub.replyTo,
      subject: sub.subject,
      text,
      html: `<table style="font-family:system-ui,sans-serif;font-size:14px">${rows}</table>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

async function sendWebhook(sub: Submission) {
  const res = await fetch(process.env.FORM_WEBHOOK_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.FORM_WEBHOOK_SECRET ? { "X-Level141-Secret": process.env.FORM_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify({ type: sub.kind, submittedAt: new Date().toISOString(), ...sub.fields }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/** Delivers to every configured channel; succeeds only if at least one channel accepted it. */
export async function deliver(sub: Submission): Promise<"ok" | "not_configured" | "failed"> {
  const cfg = deliveryConfigured();
  if (!cfg.any) return "not_configured";
  const jobs: Promise<void>[] = [];
  if (cfg.email) jobs.push(sendEmail(sub));
  if (cfg.webhook) jobs.push(sendWebhook(sub));
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => r.status === "rejected" && console.error(`[forms] ${sub.kind} delivery error:`, r.reason));
  return results.some((r) => r.status === "fulfilled") ? "ok" : "failed";
}

/* ------------------------------------------------------------- Rate limit */

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/** Best-effort in-memory limiter (per server instance). Use an edge/WAF limiter in production at scale. */
export function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export function clientKey(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** True when the request looks automated: honeypot filled or form submitted implausibly fast. */
export function looksLikeSpam(body: Record<string, unknown>) {
  const honeypot = typeof body[HONEYPOT_FIELD] === "string" && (body[HONEYPOT_FIELD] as string).length > 0;
  const started = Number(body.startedAt);
  const tooFast = Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS;
  return honeypot || tooFast;
}

export function json(body: SubmitResponse, status = 200, headers?: HeadersInit) {
  return NextResponse.json(body, { status, headers });
}

/** 429 with a Retry-After hint matching the limiter window. */
export function rateLimitedResponse() {
  return json(
    { ok: false, code: "rate_limited", message: "Too many submissions. Please try again later." },
    429,
    { "Retry-After": String(Math.ceil(WINDOW_MS / 1000)) },
  );
}

/** Form payloads are tiny; anything bigger is refused before parsing. */
export const MAX_BODY_BYTES = 16 * 1024;

/**
 * Reads a JSON object body. On failure returns the HTTP response to send:
 * 415 for a non-JSON media type, 413 for an oversized payload, 400 for
 * malformed JSON or a non-object body.
 */
export async function readJson(
  req: Request,
): Promise<{ body: Record<string, unknown> } | { error: ReturnType<typeof json> }> {
  if (!req.headers.get("content-type")?.toLowerCase().includes("application/json"))
    return {
      error: json({ ok: false, code: "unsupported_media_type", message: "Send the request as application/json." }, 415),
    };

  const tooLarge = () =>
    json({ ok: false, code: "payload_too_large", message: "The request is too large." }, 413);
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return { error: tooLarge() };

  let text: string;
  try {
    text = await req.text();
  } catch {
    return { error: json({ ok: false, code: "bad_request", message: "Invalid request." }, 400) };
  }
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return { error: tooLarge() };

  try {
    const body: unknown = JSON.parse(text);
    if (body && typeof body === "object" && !Array.isArray(body)) return { body: body as Record<string, unknown> };
  } catch {
    /* fall through */
  }
  return { error: json({ ok: false, code: "bad_request", message: "Invalid request." }, 400) };
}
