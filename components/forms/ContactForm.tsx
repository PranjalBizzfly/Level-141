"use client";

import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { useState } from "react";
import { routes } from "@/lib/site";
import { DEFAULT_COUNTRY } from "@/lib/forms/countries";
import {
  interestOptions,
  limits,
  normaliseContact,
  validateContact,
  type ContactInput,
} from "@/lib/forms/validation";
import {
  CharCount,
  Field,
  Honeypot,
  PhoneInput,
  StatusMessage,
  SubmitButton,
  SuccessPanel,
  fieldA11y,
  inputClasses,
  useFormSubmit,
  useVisibleErrors,
} from "./fields";
import { cx } from "@/components/ui/primitives";

const empty: ContactInput = {
  interest: "",
  name: "",
  company: "",
  designation: "",
  email: "",
  phoneCountry: DEFAULT_COUNTRY,
  phone: "",
  level: "",
};

export function ContactForm({ initialInterest }: { initialInterest?: string }) {
  const [values, setValues] = useState<ContactInput>({
    ...empty,
    interest: interestOptions.some((o) => o.value === initialInterest) ? initialInterest! : "",
  });
  const { status, submit, serverErrors, markStarted } = useFormSubmit("/api/contact");
  const live = validateContact(normaliseContact(values));
  const { errors: allErrors, blur, markSubmitted } = useVisibleErrors<ContactInput>(live, serverErrors);
  const gaSelected = values.interest === "growth-architecture";
  // A required answer counts once it is filled in and passes validation.
  const required = ["interest", "name", "email", "level"] as const;
  const done = required.filter((k) => values[k].trim() !== "" && !(k in live)).length;

  const update = (key: keyof ContactInput, value: string) => {
    markStarted();
    setValues((v) => ({ ...v, [key]: value }));
  };
  const set = (key: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    update(key, e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    markSubmitted();
    const firstKey = Object.keys(live)[0];
    if (firstKey) {
      const target =
        firstKey === "interest"
          ? `interest-${values.interest || interestOptions[0].value}`
          : firstKey === "phoneCountry"
            ? "phone-country"
            : firstKey;
      document.getElementById(target)?.focus();
      return;
    }
    await submit({ ...values });
  };

  if (status.state === "success") {
    return (
      <SuccessPanel title="Thank you. Your message has been sent">
        <p>
          We&apos;ve received your note about {interestOptions.find((o) => o.value === values.interest)?.label}. The
          Level141 team will review it and reply to <strong className="text-ink">{values.email}</strong>.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocus={markStarted} className="relative space-y-10 sm:space-y-12" aria-describedby="form-required-note">
      {/* Live progress through the required answers. */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p id="form-required-note" className="text-sm text-muted">
            Fields marked <span className="text-gold-ink">*</span> are required.
          </p>
          <p className="text-sm tabular-nums text-muted" aria-live="polite">
            <span className="text-ink">{done}</span> of {required.length} complete
          </p>
        </div>
        <div aria-hidden className="mt-3 h-[3px] overflow-hidden rounded-full bg-line">
          <div
            className="h-full origin-left rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `scaleX(${done / required.length})` }}
          />
        </div>
      </div>

      <fieldset aria-describedby={allErrors.interest ? "interest-error" : undefined}>
        <legend className="text-[0.95rem] font-medium text-ink">
          I am interested in<span aria-hidden className="ml-1 text-gold-ink">*</span>
        </legend>
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 lg:gap-x-8 sm:grid-cols-2">
          {interestOptions.map((o) => {
            const checked = values.interest === o.value;
            return (
              <label
                key={o.value}
                htmlFor={`interest-${o.value}`}
                className={cx(
                  "group relative flex min-h-[3.75rem] cursor-pointer items-center gap-3 rounded-xl border px-5 py-3.5 transition-[background-color,border-color,color,transform] duration-300 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-ink/15 motion-safe:active:scale-[0.99]",
                  checked ? "border-ink bg-ink text-paper" : "border-line-strong bg-surface hover:-translate-y-0.5 hover:border-ink/50",
                )}
              >
                <input
                  type="radio"
                  id={`interest-${o.value}`}
                  name="interest"
                  value={o.value}
                  checked={checked}
                  onChange={set("interest")}
                  className="sr-only"
                />
                {/* The choice mark: an empty ring that fills with a tick when chosen. */}
                <span
                  aria-hidden
                  className={cx(
                    "grid size-5 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                    checked ? "border-paper bg-paper text-ink" : "border-current/40 group-hover:border-current",
                  )}
                >
                  <Check className={cx("size-3 transition-[opacity,transform] duration-300", checked ? "scale-100 opacity-100" : "scale-50 opacity-0")} strokeWidth={3} />
                </span>
                <span className="text-[0.95rem] font-medium">{o.label}</span>
              </label>
            );
          })}
        </div>
        {gaSelected ? (
          <div className="mt-6 flex gap-3 rounded-xl border border-gold-ink/25 bg-ink/5 p-4 text-sm leading-relaxed text-ink">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
            <p>
              <Link href={routes.waitlist} className="font-medium underline underline-offset-4">
                Join the Waitlist →
              </Link>
            </p>
          </div>
        ) : allErrors.interest ? (
          <p id="interest-error" className="mt-2 text-sm text-error">
            {allErrors.interest}
          </p>
        ) : null}
      </fieldset>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-7 sm:grid-cols-2 sm:gap-y-8">
        <Field id="name" label="Name" required error={allErrors.name}>
          <input
            {...fieldA11y("name", allErrors.name)}
            type="text"
            autoComplete="name"
            required
            maxLength={limits.name}
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            className={inputClasses(allErrors.name)}
          />
        </Field>
        <Field id="company" label="Company" error={allErrors.company}>
          <input
            {...fieldA11y("company", allErrors.company)}
            type="text"
            autoComplete="organization"
            maxLength={limits.short}
            value={values.company}
            onChange={set("company")}
            onBlur={blur("company")}
            className={inputClasses(allErrors.company)}
          />
        </Field>
        <Field id="designation" label="Designation" error={allErrors.designation}>
          <input
            {...fieldA11y("designation", allErrors.designation)}
            type="text"
            autoComplete="organization-title"
            maxLength={limits.short}
            value={values.designation}
            onChange={set("designation")}
            onBlur={blur("designation")}
            className={inputClasses(allErrors.designation)}
          />
        </Field>
        <Field id="email" label="Email" required error={allErrors.email}>
          <input
            {...fieldA11y("email", allErrors.email)}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={limits.email}
            value={values.email}
            onChange={set("email")}
            onBlur={blur("email")}
            className={inputClasses(allErrors.email)}
          />
        </Field>
        <Field
          id="phone"
          label="Phone"
          hint="Choose your country code, then enter your number."
          error={allErrors.phone ?? allErrors.phoneCountry}
          className="sm:col-span-2"
        >
          <PhoneInput
            id="phone"
            country={values.phoneCountry}
            value={values.phone}
            error={allErrors.phone ?? allErrors.phoneCountry}
            hint="Choose your country code, then enter your number."
            onCountryChange={(iso) => update("phoneCountry", iso)}
            onChange={set("phone")}
            onBlur={blur("phone")}
          />
        </Field>
        <Field id="level" label="What level are you trying to reach?" required error={allErrors.level} className="sm:col-span-2">
          <textarea
            {...fieldA11y("level", allErrors.level)}
            aria-describedby={[allErrors.level ? "level-error" : null, "level-count"].filter(Boolean).join(" ")}
            rows={5}
            required
            maxLength={limits.long}
            value={values.level}
            onChange={set("level")}
            onBlur={blur("level")}
            className={cx(inputClasses(allErrors.level), "resize-y")}
          />
          <CharCount id="level" value={values.level} max={limits.long} />
        </Field>
      </div>

      <Honeypot />
      <StatusMessage status={status} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {gaSelected ? (
          <Link
            href={routes.waitlist}
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-ink px-8 text-base font-medium text-paper transition-colors hover:bg-ink-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/25 focus-visible:ring-offset-2 sm:w-auto"
          >
            Join the Waitlist
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <SubmitButton submitting={status.state === "submitting"}>
            Start the Conversation
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </SubmitButton>
        )}
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Your details are used only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
