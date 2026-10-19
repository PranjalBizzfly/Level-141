"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { limits, normaliseWaitlist, validateWaitlist, type WaitlistInput } from "@/lib/forms/validation";
import { cx } from "@/components/ui/primitives";
import { DEFAULT_COUNTRY } from "@/lib/forms/countries";
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

const empty: WaitlistInput = {
  name: "",
  email: "",
  company: "",
  designation: "",
  phoneCountry: DEFAULT_COUNTRY,
  phone: "",
  note: "",
};

/** Growth Architecture™ waitlist. Registers interest only — it does not book or start an engagement. */
export function WaitlistForm() {
  const [values, setValues] = useState<WaitlistInput>(empty);
  const { status, submit, serverErrors, markStarted } = useFormSubmit("/api/waitlist");
  const live = validateWaitlist(normaliseWaitlist(values));
  const { errors: allErrors, blur, markSubmitted } = useVisibleErrors<WaitlistInput>(live, serverErrors);

  const set = (key: keyof WaitlistInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    markStarted();
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    markSubmitted();
    const first = Object.keys(live)[0];
    if (first) {
      const target = first === "phoneCountry" ? "wl-phone-country" : `wl-${first}`;
      document.getElementById(target)?.focus();
      return;
    }
    await submit({ ...values });
  };

  if (status.state === "success") {
    return (
      <SuccessPanel title="You're on the Growth Architecture™ waitlist">
        <p>
          We&apos;ve registered interest for <strong className="text-ink">{values.company}</strong>. We&apos;ll contact{" "}
          <strong className="text-ink">{values.email}</strong> when Growth Architecture™ opens. Registering interest does
          not commit you to anything.
        </p>
      </SuccessPanel>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} onFocus={markStarted} className="relative space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2">
        <Field id="wl-name" label="Name" required error={allErrors.name}>
          <input
            {...fieldA11y("wl-name", allErrors.name)}
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
        <Field id="wl-email" label="Work email" required error={allErrors.email}>
          <input
            {...fieldA11y("wl-email", allErrors.email)}
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
        <Field id="wl-company" label="Organization" required error={allErrors.company}>
          <input
            {...fieldA11y("wl-company", allErrors.company)}
            type="text"
            autoComplete="organization"
            required
            maxLength={limits.short}
            value={values.company}
            onChange={set("company")}
            onBlur={blur("company")}
            className={inputClasses(allErrors.company)}
          />
        </Field>
        <Field id="wl-designation" label="Designation" error={allErrors.designation}>
          <input
            {...fieldA11y("wl-designation", allErrors.designation)}
            type="text"
            autoComplete="organization-title"
            maxLength={limits.short}
            value={values.designation}
            onChange={set("designation")}
            onBlur={blur("designation")}
            className={inputClasses(allErrors.designation)}
          />
        </Field>
        <Field
          id="wl-phone"
          label="Phone"
          hint="Choose your country code, then enter your number."
          error={allErrors.phone ?? allErrors.phoneCountry}
          className="sm:col-span-2"
        >
          <PhoneInput
            id="wl-phone"
            country={values.phoneCountry}
            value={values.phone}
            error={allErrors.phone ?? allErrors.phoneCountry}
            hint="Choose your country code, then enter your number."
            onCountryChange={(iso) => {
              markStarted();
              setValues((v) => ({ ...v, phoneCountry: iso }));
            }}
            onChange={set("phone")}
            onBlur={blur("phone")}
          />
        </Field>
        <Field id="wl-note" label="What is your organization's next level?" error={allErrors.note} className="sm:col-span-2">
          <textarea
            {...fieldA11y("wl-note", allErrors.note)}
            aria-describedby={[allErrors.note ? "wl-note-error" : null, "wl-note-count"].filter(Boolean).join(" ")}
            rows={4}
            maxLength={limits.long}
            value={values.note}
            onChange={set("note")}
            onBlur={blur("note")}
            className={cx(inputClasses(allErrors.note), "resize-y")}
          />
          <CharCount id="wl-note" value={values.note} max={limits.long} />
        </Field>
      </div>
      <Honeypot />
      <StatusMessage status={status} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton submitting={status.state === "submitting"}>
          Join the Waitlist
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </SubmitButton>
        <p className="max-w-xs text-sm leading-relaxed text-muted">
          Registering interest is not a booking or an engagement. We&apos;ll only use your details to contact you about
          availability.
        </p>
      </div>
    </form>
  );
}
