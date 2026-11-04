"use client";

import { AlertCircle, Check, ChevronDown, Loader2, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cx } from "@/components/ui/primitives";
import { countries, DEFAULT_COUNTRY, findCountry, type Country } from "@/lib/forms/countries";
import { HONEYPOT_FIELD, instantErrors, type FieldErrors, type SubmitResponse } from "@/lib/forms/validation";

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
    if (submitted || seen.has(key) || instantErrors.has(live[key]!)) visible[key] = live[key];
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
    <div className={cx("flex border-0 border-b bg-transparent transition-[border-color,box-shadow] duration-500 focus-within:border-b-2", ring)}>
      <CountryPicker id={`${id}-country`} selected={selected} onChange={onCountryChange} onBlur={onBlur} />
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

/* ------------------------------------------------------- Country picker */

const normalise = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/**
 * Country code picker: a button showing the chosen code that opens the full list
 * (every country with a calling code) with a search box on top. Search matches the
 * country name, its two-letter code or the calling code ("india", "IN", "91", "+971").
 * Keyboard: arrows move, Enter chooses, Escape closes; focus returns to the button.
 */
function CountryPicker({
  id,
  selected,
  onChange,
  onBlur,
}: {
  id: string;
  selected: Country;
  onChange: (iso: string) => void;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const matches = useMemo(() => {
    const q = normalise(query.trim());
    if (!q) return countries;
    const digits = q.replace(/^\+|^00/, "");
    const numeric = /^\d+$/.test(digits);
    // Best match first: exact code, exact dial, name starting with the query, then the rest.
    const rank = (c: Country) => {
      const name = normalise(c.name);
      if (c.iso.toLowerCase() === q) return 0;
      if (numeric && c.dial === digits) return 1;
      if (name.startsWith(q)) return 2;
      if (numeric && c.dial.startsWith(digits)) return 3;
      if (name.split(/[\s(-]+/).some((w) => w.startsWith(q))) return 4;
      if (name.includes(q)) return 5;
      return -1;
    };
    return countries
      .map((c) => [c, rank(c)] as const)
      .filter(([, r]) => r >= 0)
      .sort((x, y) => x[1] - y[1])
      .map(([c]) => c);
  }, [query]);

  const close = (refocus = true) => {
    setOpen(false);
    setQuery("");
    if (refocus) buttonRef.current?.focus();
  };
  const choose = (c: Country) => {
    onChange(c.iso);
    close();
  };

  // On opening: focus the search box and start on the chosen country.
  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const i = countries.findIndex((c) => c.iso === selected.iso);
    setActive(Math.max(0, i));
    requestAnimationFrame(() => listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "center" }));
  }, [open, selected.iso]);

  // Close on a click or tap outside, except on the theme switch: the list stays open while the theme changes.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element;
      if (target.closest?.("[data-keeps-popovers]")) return;
      if (!rootRef.current?.contains(target)) close(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Keep the highlighted row in view while using the arrow keys.
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(matches.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (matches[active]) choose(matches[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  const listId = `${id}-list`;
  return (
    <div ref={rootRef} className="relative flex shrink-0 border-r border-line">
      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-label={`Country code: ${selected.name} +${selected.dial}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((v) => !v)}
        onBlur={(e) => {
          if (!rootRef.current?.contains(e.relatedTarget as Node)) onBlur?.();
        }}
        className="flex min-h-12 items-center gap-1.5 pr-3 text-base text-ink focus:outline-none focus-visible:underline"
      >
        <span aria-hidden className="text-sm font-medium tracking-[0.04em] text-muted">
          {selected.iso}
        </span>
        <span aria-hidden className="tabular-nums">
          +{selected.dial}
        </span>
        <ChevronDown aria-hidden className={cx("size-4 text-muted transition-transform duration-300", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-[1.25rem] border border-line-strong bg-paper text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-2 border-b border-line px-4">
            <Search aria-hidden className="size-4 shrink-0 text-muted" />
            <input
              ref={searchRef}
              type="search"
              role="combobox"
              aria-label="Search country or code"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={matches[active] ? `${id}-opt-${matches[active].iso}` : undefined}
              autoComplete="off"
              spellCheck={false}
              placeholder="Search country or code"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKey}
              className="min-h-12 w-full bg-transparent text-[0.95rem] text-ink placeholder:text-muted/70 focus:outline-none"
            />
          </div>
          <ul ref={listRef} id={listId} role="listbox" aria-label="Countries" className="max-h-72 overflow-y-auto overscroll-contain py-1">
            {matches.length ? (
              matches.map((c, i) => {
                const chosen = c.iso === selected.iso;
                return (
                  <li
                    key={c.iso}
                    id={`${id}-opt-${c.iso}`}
                    data-index={i}
                    role="option"
                    aria-selected={chosen}
                    onPointerMove={() => setActive(i)}
                    onClick={() => choose(c)}
                    className={cx(
                      "flex min-h-11 cursor-pointer items-center gap-3 px-4 text-[0.95rem]",
                      i === active ? "bg-ink/[0.06]" : "",
                    )}
                  >
                    <span className="w-7 shrink-0 text-xs font-medium tracking-[0.04em] text-muted">{c.iso}</span>
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className="shrink-0 tabular-nums text-muted">+{c.dial}</span>
                    <Check aria-hidden className={cx("size-4 shrink-0", chosen ? "opacity-100" : "opacity-0")} />
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-4 text-sm text-muted">No country matches “{query}”.</li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
