// HTTP status-code regression tests for the form API routes.
// Run against a running server:  BASE_URL=http://localhost:3000 npm run test:api
import { test } from "node:test";
import assert from "node:assert/strict";

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const endpoints = ["/api/contact", "/api/waitlist"];

const post = (path, body, { type = "application/json", ip } = {}) =>
  fetch(BASE + path, {
    method: "POST",
    headers: { "Content-Type": type, ...(ip ? { "X-Forwarded-For": ip } : {}) },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const valid = {
  "/api/contact": {
    interest: "personal-brand-architecture",
    name: "Test Person",
    email: "test@example.com",
    level: "Reposition as a recognised industry authority",
  },
  "/api/waitlist": { name: "Test Person", email: "test@example.com", company: "Acme Holdings" },
};

// A unique client IP per test keeps the rate limiter from interfering.
let n = 0;
const ip = () => `10.0.${Math.floor(++n / 250)}.${n % 250}`;

for (const path of endpoints) {
  test(`${path}: GET → 405 Method Not Allowed`, async () => {
    const res = await fetch(BASE + path);
    assert.equal(res.status, 405);
  });

  test(`${path}: non-JSON media type → 415`, async () => {
    const res = await post(path, "name=x", { type: "application/x-www-form-urlencoded", ip: ip() });
    assert.equal(res.status, 415);
    assert.equal((await res.json()).code, "unsupported_media_type");
  });

  test(`${path}: malformed JSON → 400`, async () => {
    const res = await post(path, "{not json", { ip: ip() });
    assert.equal(res.status, 400);
    assert.equal((await res.json()).code, "bad_request");
  });

  test(`${path}: JSON array body → 400`, async () => {
    const res = await post(path, "[]", { ip: ip() });
    assert.equal(res.status, 400);
  });

  test(`${path}: oversized payload → 413`, async () => {
    const res = await post(path, { name: "x".repeat(20_000) }, { ip: ip() });
    assert.equal(res.status, 413);
    assert.equal((await res.json()).code, "payload_too_large");
  });

  test(`${path}: invalid fields → 422 with field errors`, async () => {
    const res = await post(path, {}, { ip: ip() });
    assert.equal(res.status, 422);
    const data = await res.json();
    assert.equal(data.code, "validation");
    assert.ok(data.errors && Object.keys(data.errors).length > 0);
  });

  test(`${path}: valid submission, delivery not configured → 503 (never a false 200)`, async (t) => {
    const res = await post(path, valid[path], { ip: ip() });
    if (res.status === 200) return t.skip("delivery is configured on this server");
    assert.equal(res.status, 503);
    assert.equal((await res.json()).code, "not_configured");
  });

  test(`${path}: rate limit → 429 with Retry-After`, async () => {
    const client = ip();
    let res;
    for (let i = 0; i < 6; i++) res = await post(path, {}, { ip: client });
    assert.equal(res.status, 429);
    assert.match(res.headers.get("retry-after") ?? "", /^\d+$/);
  });

  test(`${path}: honeypot bot → 200 without delivery`, async () => {
    const res = await post(path, { ...valid[path], website: "spam" }, { ip: ip() });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { ok: true });
  });

  test(`${path}: errors never expose internals`, async () => {
    const res = await post(path, "{not json", { ip: ip() });
    const text = await res.text();
    assert.doesNotMatch(text, /stack|Error:|at \w+ \(|RESEND|WEBHOOK/i);
  });
}

test("unknown page → 404", async () => {
  const res = await fetch(BASE + "/this-page-does-not-exist");
  assert.equal(res.status, 404);
});

test("unknown insight article → 404", async () => {
  const res = await fetch(BASE + "/insights/not-a-real-article");
  assert.equal(res.status, 404);
});

test("real pages → 200", async () => {
  for (const p of ["/", "/personal-brand-architecture", "/growth-architecture", "/how-we-architect-growth", "/insights", "/about", "/start-your-next-level", "/sitemap.xml", "/robots.txt"]) {
    const res = await fetch(BASE + p);
    assert.equal(res.status, 200, p);
  }
});
