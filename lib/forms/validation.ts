/** Shared validation for the contact form and the Growth Architecture waitlist (client + server). */

export const interestOptions = [
  { value: "personal-brand-architecture", label: "Personal Brand Architecture™" },
  { value: "growth-architecture", label: "Growth Architecture™" },
  { value: "partnerships", label: "Partnerships" },
  { value: "other", label: "Other" },
] as const;

export type Interest = (typeof interestOptions)[number]["value"];

export type ContactInput = {
  interest: string;
  name: string;
  company: string;
  designation: string;
  email: string;
  phone: string;
  level: string;
};

export type WaitlistInput = {
  name: string;
  email: string;
  company: string;
  designation: string;
  note: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,24}$/;

export const limits = { short: 120, email: 254, long: 2000 } as const;

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function checkLength(errors: Record<string, string>, key: string, value: string, max: number) {
  if (value.length > max && !errors[key]) errors[key] = `Please keep this under ${max} characters.`;
}

export function normaliseContact(raw: Record<string, unknown>): ContactInput {
  return {
    interest: clean(raw.interest),
    name: clean(raw.name),
    company: clean(raw.company),
    designation: clean(raw.designation),
    email: clean(raw.email).toLowerCase(),
    phone: clean(raw.phone),
    level: clean(raw.level),
  };
}

export function validateContact(v: ContactInput): FieldErrors<ContactInput> {
  const e: Record<string, string> = {};
  if (!interestOptions.some((o) => o.value === v.interest)) e.interest = "Please choose what you are interested in.";
  else if (v.interest === "growth-architecture")
    e.interest = "Growth Architecture™ is not yet open for engagements — please join the waitlist instead.";
  if (!v.name) e.name = "Please enter your name.";
  if (!v.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email)) e.email = "Please enter a valid email address, e.g. name@company.com.";
  if (v.phone && !PHONE_RE.test(v.phone)) e.phone = "Please enter a valid phone number, including country code.";
  if (!v.level) e.level = "Tell us a little about the level you're trying to reach.";
  else if (v.level.length < 10) e.level = "Please add a little more detail (at least 10 characters).";
  for (const k of ["name", "company", "designation", "phone"] as const) checkLength(e, k, v[k], limits.short);
  checkLength(e, "email", v.email, limits.email);
  checkLength(e, "level", v.level, limits.long);
  return e as FieldErrors<ContactInput>;
}

export function normaliseWaitlist(raw: Record<string, unknown>): WaitlistInput {
  return {
    name: clean(raw.name),
    email: clean(raw.email).toLowerCase(),
    company: clean(raw.company),
    designation: clean(raw.designation),
    note: clean(raw.note),
  };
}

export function validateWaitlist(v: WaitlistInput): FieldErrors<WaitlistInput> {
  const e: Record<string, string> = {};
  if (!v.name) e.name = "Please enter your name.";
  if (!v.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email)) e.email = "Please enter a valid email address, e.g. name@company.com.";
  if (!v.company) e.company = "Please enter your organization's name.";
  for (const k of ["name", "company", "designation"] as const) checkLength(e, k, v[k], limits.short);
  checkLength(e, "email", v.email, limits.email);
  checkLength(e, "note", v.note, limits.long);
  return e as FieldErrors<WaitlistInput>;
}

/** Spam heuristics shared by both forms: a honeypot field and a minimum fill time. */
export const HONEYPOT_FIELD = "website";
export const MIN_FILL_MS = 2500;

export type SubmitResponse =
  | { ok: true }
  | { ok: false; code: "validation"; errors: Record<string, string> }
  | { ok: false; code: "not_configured" | "delivery_failed" | "rate_limited" | "bad_request"; message: string };
