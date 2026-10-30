"use client";

import { AlertCircle, ChevronDown, Loader2 } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/ui/primitives";
import { countries, DEFAULT_COUNTRY, findCountry } from "@/lib/forms/countries";
import { HONEYPOT_FIELD, type FieldErrors, type SubmitResponse } from "@/lib/forms/validation";

/* ----------------------------------------------------------- Submission */

export type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

/**
 * Posts JSON to an API route and maps the typed response to UI state.
 * Success is only reported when the server confirms delivery.
 */
export function useFormSubmit(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const startedAt = useRef<number>(0);

  const markStarted = useCallback(() => {
    if (!startedAt.current) startedAt.current = Date.now();
  }, []);

  // Blocks a second submission while one is in flight (e.g. a fast double
  // click before the disabled button has re-rendered).
  const inFlight = useRef(false);

  const submit = useCallback(
    async (payload: Record<string, string>) => {
      if (inFlight.current) return false;
      inFlight.current = true;
      setStatus({ state: "submitting" });
      setServerErrors({});
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, startedAt: startedAt.current }),
        });
        const data = (await res.json().catch(() => null)) as SubmitResponse | null;
        if (data?.ok) {
          setStatus({ state: "success" });
          return true;
        }
        if (data && data.code === "validation") {
          setServerErrors(data.errors);
          setStatus({ state: "error", message: "Please review the highlighted fields." });
        } else {
          setStatus({
            state: "error",
            message: data && "message" in data ? data.message : "Something went wrong. Please try again.",
          });
        }
      } catch {
        setStatus({ state: "error", message: "We couldn't reach the server. Check your connection and try again." });
      }
      // Failed attempts can be retried; a success keeps the lock (the form is replaced).
      inFlight.current = false;
      return false;
    },
    [endpoint],
  );

  return { status, submit, serverErrors, markStarted };
}

/* --------------------------------------------------------------- Fields */

const inputBase =
  "block w-full border-0 border-b bg-transparent px-0 py-3.5 text-base text-ink placeholder:text-muted/60 transition-[border-color,box-shadow] duration-500 focus:border-b-2 focus:outline-none";

export function inputClasses(error?: string) {
  return cx(
    inputBase,
    error
      ? "border-error focus:border-error focus:ring-error/15"
      : "border-line-strong hover:border-ink/40 focus:border-gold-ink focus:ring-gold/40",
  );
}

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline gap-2 text-sm font-medium text-ink">
        <span>
          {label}
          {required ? (
            <span aria-hidden className="ml-1 text-gold-ink">
              *
            </span>
          ) : null}
        </span>
        {!required ? <span className="text-xs font-normal text-muted">Optional</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-sm text-error">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Shows each field's error only once the visitor has left that field (or
 * tried to submit), then keeps it live while they correct it.
 */
export function useVisibleErrors<T>(live: FieldErrors<T>, server: Record<string, string>) {
  const [seen, setSeen] = useState<Set<string>>(() => new Set());
  const [submitted, setSubmitted] = useState(false);
  const blur = useCallback((key: keyof T & string) => () => setSeen((s) => (s.has(key) ? s : new Set(s).add(key))), []);
  const visible = {} as FieldErrors<T>;
  for (const key of Object.keys(live) as Array<keyof T & string>) {
    if (submitted || seen.has(key)) visible[key] = live[key];
  }
  return { errors: { ...server, ...visible } as FieldErrors<T>, blur, markSubmitted: () => setSubmitted(true) };
}

/** Live character count under a long-text field, warning near the limit. */
export function CharCount({ id, value, max }: { id: string; value: string; max: number }) {
  const n = value.length;
  return (
    <p id={`${id}-count`} aria-live="polite" className={cx("mt-1.5 text-right text-xs tabular-nums", n > max ? "text-error" : n > max * 0.9 ? "text-ink" : "text-muted")}>
      {n.toLocaleString()} / {max.toLocaleString()}
    </p>
  );
}

/**
 * Phone number with a country-code picker. The native <select> sits invisibly
 * over a compact "AE +971" display so it stays fully accessible and uses the
 * platform picker on mobile, while the visible control stays narrow.
 */
export function PhoneInput({
  id,
  country,
  value,
  error,
  hint,
  onCountryChange,
  onChange,
  onBlur,
}: {
  id: string;
  country: string;
  value: string;
  error?: string;
  hint?: string;
  onCountryChange: (iso: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}) {
  const selected = findCountry(country) ?? findCountry(DEFAULT_COUNTRY)!;
  const ring = error
    ? "border-error focus-within:border-error focus-within:ring-error/15"
    : "border-line-strong hover:border-ink/40 focus-within:border-gold-ink focus-within:ring-gold/40";
  return (
    <div className={cx("flex overflow-hidden border-0 border-b bg-transparent transition-[border-color,box-shadow] duration-500 focus-within:border-b-2", ring)}>
      <div className="relative flex shrink-0 items-center gap-1.5 border-r border-line pl-4 pr-3 text-base">
        <span aria-hidden className="text-sm font-medium tracking-[0.04em] text-muted">{selected.iso}</span>
        <span aria-hidden className="tabular-nums">+{selected.dial}</span>
        <ChevronDown aria-hidden className="size-4 text-muted" />
        <select
          id={`${id}-country`}
          name={`${id}Country`}
          aria-label="Country code"
          autoComplete="tel-country-code"
          value={selected.iso}
          onChange={(e) => onCountryChange(e.target.value)}
          onBlur={onBlur}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {countries.map((c) => (
            <option key={c.iso} value={c.iso}>
              {c.name} (+{c.dial})
            </option>
          ))}
        </select>
      </div>
      <input
        {...fieldA11y(id, error, hint)}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={"0".repeat(selected.max).replace(/(\d{2})(\d{3})(\d+)/, "$1 $2 $3")}
        maxLength={24}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-base text-ink placeholder:text-muted/50 focus:outline-none"
      />
    </div>
  );
}

/** Accessible attributes for an input tied to its Field. */
export function fieldA11y(id: string, error?: string, hint?: string) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ");
  return {
    id,
    name: id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  } as const;
}

/** Off-screen honeypot. Humans never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function SubmitButton({ submitting, children }: { submitting: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={submitting}
      aria-disabled={submitting}
      className="group inline-flex min-h-14 w-full shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full bg-ink px-8 text-base font-medium text-paper transition-colors duration-300 hover:bg-ink-3 disabled:cursor-progress disabled:opacity-70 sm:w-auto"
    >
      {submitting ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
      {submitting ? "Sending…" : children}
    </button>
  );
}

export function StatusMessage({ status }: { status: FormStatus }) {
  return (
    <div aria-live="polite" role="status" className="min-h-0">
      {status.state === "error" ? (
        <p className="flex items-start gap-3 rounded-xl border border-error/30 bg-error/5 p-4 text-sm text-error">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {status.message}
        </p>
      ) : null}
    </div>
  );
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={(el) => {
        ref.current = el;
        el?.focus();
      }}
      tabIndex={-1}
      role="status"
      className="animate-rise rounded-[2rem] border border-success/25 bg-surface p-6 outline-none sm:p-10"
    >
      <svg aria-hidden viewBox="0 0 32 32" className="size-10 text-success" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="16" cy="16" r="14" pathLength={1} className="motion-safe:animate-[draw-stroke_0.7s_var(--ease-architect)_both] [stroke-dasharray:1]" />
        <path d="M10 16.5l4 4 8-9" pathLength={1} className="motion-safe:animate-[draw-stroke_0.5s_var(--ease-architect)_0.45s_both] [stroke-dasharray:1]" />
      </svg>
      <h3 className="mt-5 text-2xl tracking-[-0.02em]">{title}</h3>
      <div className="mt-3 leading-relaxed text-muted">{children}</div>
    </div>
  );
}
