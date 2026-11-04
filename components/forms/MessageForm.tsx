"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { cx } from "@/components/ui/primitives";
import { DEFAULT_COUNTRY } from "@/lib/forms/countries";
import { limits, normaliseMessage, validateMessage, type MessageInput } from "@/lib/forms/validation";
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

const empty: MessageInput = { name: "", email: "", phoneCountry: DEFAULT_COUNTRY, phone: "", city: "", message: "" };

/** The Contact Us form: name, email, optional phone and city, and a message. */
export function MessageForm() {
  const [values, setValues] = useState<MessageInput>(empty);
  const { status, submit, serverErrors, markStarted } = useFormSubmit("/api/message");
  const live = validateMessage(normaliseMessage(values));
  const { errors, blur, markSubmitted } = useVisibleErrors<MessageInput>(live, serverErrors);

  const update = (key: keyof MessageInput, value: string) => {
    markStarted();
    setValues((v) => ({ ...v, [key]: value }));
  };
  const set = (key: keyof MessageInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    update(key, e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    markSubmitted();
    const first = Object.keys(live)[0];
    if (first) {
      document.getElementById(first === "phoneCountry" ? "msg-phone-country" : `msg-${first}`)?.focus();
      return;
    }
    await submit({ ...values });
  };

  if (status.state === "success")
    return (
      <SuccessPanel title="Thank you. Your message has been sent.">
        <p>
          We&apos;ll reply to <strong className="text-ink">{values.email}</strong>.
        </p>
      </SuccessPanel>
    );

  return (
    <form noValidate onSubmit={onSubmit} onFocus={markStarted} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="msg-name" label="Name" required error={errors.name}>
          <input
            {...fieldA11y("msg-name", errors.name)}
            type="text"
            autoComplete="name"
            required
            maxLength={limits.name}
            value={values.name}
            onChange={set("name")}
            onBlur={blur("name")}
            className={inputClasses(errors.name)}
          />
        </Field>
        <Field id="msg-email" label="Email" required error={errors.email}>
          <input
            {...fieldA11y("msg-email", errors.email)}
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
            className={inputClasses(errors.email)}
          />
        </Field>
        <Field
          id="msg-phone"
          label="Phone"
          error={errors.phone ?? errors.phoneCountry}
        >
          <PhoneInput
            id="msg-phone"
            country={values.phoneCountry}
            value={values.phone}
            error={errors.phone ?? errors.phoneCountry}
            onCountryChange={(iso) => update("phoneCountry", iso)}
            onChange={set("phone")}
            onBlur={blur("phone")}
          />
        </Field>
        <Field id="msg-city" label="City" error={errors.city}>
          <input
            {...fieldA11y("msg-city", errors.city)}
            type="text"
            autoComplete="address-level2"
            maxLength={limits.name}
            value={values.city}
            onChange={set("city")}
            onBlur={blur("city")}
            className={inputClasses(errors.city)}
          />
        </Field>
      </div>
      <Field id="msg-message" label="Message" required error={errors.message}>
        <textarea
          {...fieldA11y("msg-message", errors.message)}
          aria-describedby={[errors.message ? "msg-message-error" : null, "msg-message-count"].filter(Boolean).join(" ")}
          rows={5}
          required
          maxLength={limits.long}
          value={values.message}
          onChange={set("message")}
          onBlur={blur("message")}
          className={cx(inputClasses(errors.message), "resize-y")}
        />
        <CharCount id="msg-message" value={values.message} max={limits.long} />
      </Field>
      <Honeypot />
      <StatusMessage status={status} />
      <SubmitButton submitting={status.state === "submitting"}>
        Send Message
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </SubmitButton>
    </form>
  );
}
