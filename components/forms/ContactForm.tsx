"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, Info } from "lucide-react";
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
      <SuccessPanel title="Thank you — your message has been sent.">
        <p>
          We&apos;ve received your note about {interestOptions.find((o) => o.value === values.interest)?.label}. The
          Level141 team will review it and reply to <strong className="text-ink">{values.email}</strong>.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocus={markStarted} className="relative space-y-8 sm:space-y-10" aria-describedby="form-required-note">
      <p id="form-required-note" className="text-sm text-muted">
        Fields marked <span className="text-gold-ink">*</span> are required.
      </p>

      <fieldset aria-describedby={allErrors.interest ? "interest-error" : undefined}>
        <legend className="text-sm font-medium text-ink">
          I am interested in<span aria-hidden className="ml-1 text-gold-ink">*</span>
        </legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {interestOptions.map((o) => {
            const checked = values.interest === o.value;
            return (
              <label
                key={o.value}
                htmlFor={`interest-${o.value}`}
                className={cx(
                  "relative flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border bg-surface px-4 py-4 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/35",
                  checked ? "border-gold-ink bg-ink/5" : "border-line-strong hover:border-ink/40",
                )}
              >
                <input
                  type="radio"
                  id={`interest-${o.value}`}
                  name="interest"
                  value={o.value}
                  checked={checked}
                  onChange={set("interest")}
                  className="size-4 accent-gold-ink"
                />
                <span className="text-[0.95rem]">{o.label}</span>
                {o.value === "growth-architecture" ? (
                  <span className="ml-auto rounded-full bg-paper-2 px-2.5 py-1 text-[0.75rem] uppercase tracking-[0.08em] text-muted">
                    Waitlist
                  </span>
                ) : null}
              </label>
            );
          })}
        </div>
        {gaSelected ? (
          <div className="mt-4 flex gap-3 rounded-xl border border-gold-ink/25 bg-ink/5 p-4 text-sm leading-relaxed text-ink">
            <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-ink" />
            <p>
              Growth Architecture™ is not yet open for engagements. You can register your organization&apos;s interest
              and we&apos;ll be in touch when it becomes available.{" "}
              <Link href={routes.waitlist} className="font-medium underline underline-offset-4">
                Join the Growth Architecture waitlist →
              </Link>
            </p>
          </div>
        ) : allErrors.interest ? (
          <p id="interest-error" className="mt-2 flex items-start gap-2 text-sm text-error">
            <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
            {allErrors.interest}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
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
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-ink px-8 text-base font-medium text-paper transition-colors hover:bg-ink-3 sm:w-auto"
          >
            Go to the waitlist
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <SubmitButton submitting={status.state === "submitting"}>
            Start the Conversation
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </SubmitButton>
        )}
        <p className="max-w-xs text-xs leading-relaxed text-muted">
          Your details are used only to respond to this enquiry.
        </p>
      </div>
    </form>
  );
}
