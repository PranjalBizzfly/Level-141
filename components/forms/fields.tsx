"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useCallback, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/ui/primitives";
import { HONEYPOT_FIELD, type SubmitResponse } from "@/lib/forms/validation";

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

  const submit = useCallback(
    async (payload: Record<string, string>) => {
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
      return false;
    },
    [endpoint],
  );

  return { status, submit, serverErrors, markStarted };
}

/* --------------------------------------------------------------- Fields */

const inputBase =
  "block w-full rounded-xl border bg-white px-4 py-3.5 text-base text-ink placeholder:text-muted/60 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4";

export function inputClasses(error?: string) {
  return cx(
    inputBase,
    error
      ? "border-error focus:border-error focus:ring-error/15"
      : "border-ink/15 hover:border-ink/30 focus:border-ink focus:ring-gold/35",
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
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
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
        <p className="flex items-start gap-3 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
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
      className="animate-rise rounded-3xl border border-success/25 bg-white p-8 outline-none sm:p-10"
    >
      <CheckCircle2 aria-hidden className="size-8 text-success" />
      <h3 className="mt-5 text-2xl tracking-[-0.02em]">{title}</h3>
      <div className="mt-3 leading-relaxed text-muted">{children}</div>
    </div>
  );
}
