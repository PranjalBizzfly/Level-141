"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { normaliseWaitlist, validateWaitlist, type FieldErrors, type WaitlistInput } from "@/lib/forms/validation";
import { cx } from "@/components/ui/primitives";
import {
  Field,
  Honeypot,
  StatusMessage,
  SubmitButton,
  SuccessPanel,
  fieldA11y,
  inputClasses,
  useFormSubmit,
} from "./fields";

const empty: WaitlistInput = { name: "", email: "", company: "", designation: "", note: "" };

/** Growth Architecture™ waitlist. Registers interest only — it does not book or start an engagement. */
export function WaitlistForm() {
  const [values, setValues] = useState<WaitlistInput>(empty);
  const [errors, setErrors] = useState<FieldErrors<WaitlistInput>>({});
  const [touched, setTouched] = useState(false);
  const { status, submit, serverErrors, markStarted } = useFormSubmit("/api/waitlist");
  const allErrors = { ...serverErrors, ...errors } as FieldErrors<WaitlistInput>;

  const set = (key: keyof WaitlistInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    markStarted();
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched) setErrors(validateWaitlist(normaliseWaitlist(next)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validateWaitlist(normaliseWaitlist(values));
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`wl-${first}`)?.focus();
      return;
    }
    await submit({ ...values });
  };

  if (status.state === "success") {
    return (
      <SuccessPanel title="You're on the Growth Architecture™ waitlist.">
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
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="wl-name" label="Name" required error={allErrors.name}>
          <input
            {...fieldA11y("wl-name", allErrors.name)}
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
            className={inputClasses(allErrors.name)}
          />
        </Field>
        <Field id="wl-email" label="Work email" required error={allErrors.email}>
          <input
            {...fieldA11y("wl-email", allErrors.email)}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set("email")}
            className={inputClasses(allErrors.email)}
          />
        </Field>
        <Field id="wl-company" label="Organization" required error={allErrors.company}>
          <input
            {...fieldA11y("wl-company", allErrors.company)}
            type="text"
            autoComplete="organization"
            required
            value={values.company}
            onChange={set("company")}
            className={inputClasses(allErrors.company)}
          />
        </Field>
        <Field id="wl-designation" label="Designation" error={allErrors.designation}>
          <input
            {...fieldA11y("wl-designation", allErrors.designation)}
            type="text"
            autoComplete="organization-title"
            value={values.designation}
            onChange={set("designation")}
            className={inputClasses(allErrors.designation)}
          />
        </Field>
        <Field id="wl-note" label="What is your organization's next level?" error={allErrors.note} className="sm:col-span-2">
          <textarea
            {...fieldA11y("wl-note", allErrors.note)}
            rows={4}
            value={values.note}
            onChange={set("note")}
            className={cx(inputClasses(allErrors.note), "resize-y")}
          />
        </Field>
      </div>
      <Honeypot />
      <StatusMessage status={status} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton submitting={status.state === "submitting"}>
          Join the Waitlist
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </SubmitButton>
        <p className="max-w-xs text-xs leading-relaxed text-muted">
          Registering interest is not a booking or an engagement. We&apos;ll only use your details to contact you about
          availability.
        </p>
      </div>
    </form>
  );
}
