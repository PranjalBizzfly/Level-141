/** Shared validation for the contact form and the Growth Architecture waitlist (client + server). */

import { DEFAULT_COUNTRY, findCountry, nationalDigits } from "./countries";

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
  phoneCountry: string;
  phone: string;
  level: string;
};

export type WaitlistInput = {
  name: string;
  email: string;
  company: string;
  designation: string;
  phoneCountry: string;
  phone: string;
  note: string;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/**
 * Practical email check: a valid local part, a domain made of labels that
 * don't start or end with a hyphen, and an alphabetic top-level domain.
 */
const EMAIL_RE =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/i;
/** Letters (any script), spaces, apostrophes, hyphens and full stops. */
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;
/** Must contain at least one letter or digit, e.g. company or job title. */
const HAS_WORD_RE = /[\p{L}\p{N}]/u;

export const limits = { name: 80, short: 120, email: 254, long: 2000, minName: 2, minLevel: 20 } as const;

const clean = (v: unknown) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ") : "");
const cleanMultiline = (v: unknown) => (typeof v === "string" ? v.trim() : "");

function checkLength(errors: Record<string, string>, key: string, value: string, max: number) {
  if (value.length > max && !errors[key]) errors[key] = `Please keep this under ${max} characters.`;
}

function checkName(e: Record<string, string>, v: string) {
  if (!v) e.name = "Please enter your name.";
  else if (v.length < limits.minName) e.name = "Please enter your full name.";
  else if (!NAME_RE.test(v)) e.name = "Names can contain letters, spaces, apostrophes, hyphens and full stops only.";
}

function checkEmail(e: Record<string, string>, v: string) {
  if (!v) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v) || v.includes(".."))
    e.email = "Please enter a valid email address, e.g. name@company.com.";
}

/** Phone is optional; when given it must suit the chosen country's numbering plan. */
function checkPhone(e: Record<string, string>, v: { phone: string; phoneCountry: string }) {
  const country = findCountry(v.phoneCountry);
  if (!country) e.phoneCountry = "Please choose a country code.";
  if (!v.phone) return;
  const digits = nationalDigits(v.phone, country);
  if (!/^\d+$/.test(digits)) e.phone = "Please use digits only. The country code is selected separately.";
  else if (country && (digits.length < country.min || digits.length > country.max))
    e.phone =
      country.min === country.max
        ? `${country.name} numbers have ${country.min} digits after +${country.dial}.`
        : `${country.name} numbers have ${country.min}–${country.max} digits after +${country.dial}.`;
}

function checkOptionalText(e: Record<string, string>, key: string, v: string, label: string) {
  if (v && (v.length < 2 || !HAS_WORD_RE.test(v))) e[key] = `Please enter a valid ${label}, or leave this blank.`;
}

export function normaliseContact(raw: Record<string, unknown>): ContactInput {
  return {
    interest: clean(raw.interest),
    name: clean(raw.name),
    company: clean(raw.company),
    designation: clean(raw.designation),
    email: clean(raw.email).toLowerCase(),
    phoneCountry: clean(raw.phoneCountry).toUpperCase() || DEFAULT_COUNTRY,
    phone: clean(raw.phone),
    level: cleanMultiline(raw.level),
  };
}

export function validateContact(v: ContactInput): FieldErrors<ContactInput> {
  const e: Record<string, string> = {};
  if (!interestOptions.some((o) => o.value === v.interest)) e.interest = "Please choose what you are interested in.";
  else if (v.interest === "growth-architecture")
    e.interest = "For Growth Architecture™, please use Join the Waitlist.";
  checkName(e, v.name);
  checkOptionalText(e, "company", v.company, "company name");
  checkOptionalText(e, "designation", v.designation, "designation");
  checkEmail(e, v.email);

  checkPhone(e, v);

  if (!v.level) e.level = "Tell us a little about the level you're trying to reach.";
  else if (v.level.length < limits.minLevel)
    e.level = `Please add a little more detail (at least ${limits.minLevel} characters).`;

  checkLength(e, "name", v.name, limits.name);
  for (const k of ["company", "designation"] as const) checkLength(e, k, v[k], limits.short);
  checkLength(e, "email", v.email, limits.email);
  checkLength(e, "level", v.level, limits.long);
  return e as FieldErrors<ContactInput>;
}

/** "+971 50 123 4567"-style display for delivery, from a validated input. */
export function formatPhone(v: { phone: string; phoneCountry: string }): string {
  if (!v.phone) return "";
  const country = findCountry(v.phoneCountry);
  return country ? `+${country.dial} ${nationalDigits(v.phone, country)}` : v.phone;
}

export function normaliseWaitlist(raw: Record<string, unknown>): WaitlistInput {
  return {
    name: clean(raw.name),
    email: clean(raw.email).toLowerCase(),
    company: clean(raw.company),
    designation: clean(raw.designation),
    phoneCountry: clean(raw.phoneCountry).toUpperCase() || DEFAULT_COUNTRY,
    phone: clean(raw.phone),
    note: cleanMultiline(raw.note),
  };
}

export function validateWaitlist(v: WaitlistInput): FieldErrors<WaitlistInput> {
  const e: Record<string, string> = {};
  checkName(e, v.name);
  checkEmail(e, v.email);
  if (!v.company) e.company = "Please enter your organization's name.";
  else if (v.company.length < 2 || !HAS_WORD_RE.test(v.company)) e.company = "Please enter a valid organization name.";
  checkOptionalText(e, "designation", v.designation, "designation");
  checkPhone(e, v);
  checkLength(e, "name", v.name, limits.name);
  for (const k of ["company", "designation"] as const) checkLength(e, k, v[k], limits.short);
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
  | { ok: false; code:
        | "not_configured"
        | "delivery_failed"
        | "rate_limited"
        | "bad_request"
        | "unsupported_media_type"
        | "payload_too_large"; message: string };
