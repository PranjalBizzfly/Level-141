"use client";

import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/components/ui/primitives";
import { countries, DEFAULT_COUNTRY, findCountry } from "@/lib/forms/countries";

/**
 * Searchable country-code picker (ARIA combobox + listbox). Type a country
 * name, ISO code or dial code ("uae", "IN", "+44"); arrow keys move,
 * Enter selects, Escape closes.
 */
export function CountryPicker({
  id,
  value,
  onChange,
  onBlur,
}: {
  id: string;
  value: string;
  onChange: (iso: string) => void;
  onBlur?: () => void;
}) {
  const selected = findCountry(value) ?? findCountry(DEFAULT_COUNTRY)!;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = `${id}-country-list`;

  const q = query.trim().toLowerCase().replace(/^\+/, "");
  const results = q
    ? countries.filter((c) => c.name.toLowerCase().includes(q) || c.iso.toLowerCase() === q || c.dial.startsWith(q))
    : countries;

  const openList = () => {
    setActive(Math.max(0, countries.findIndex((c) => c.iso === selected.iso)));
    setOpen(true);
  };
  const close = (focusButton = true) => {
    setOpen(false);
    setQuery("");
    if (focusButton) button.current?.focus();
  };
  const choose = (iso: string) => {
    onChange(iso);
    close();
  };

  // Focus the search box when opened; close on outside click.
  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    const onDoc = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open, onBlur]);

  // Keep the highlighted option in view.
  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) choose(results[active].iso);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "Tab") {
      close(false);
    }
  };

  return (
    <div ref={wrap} className="relative flex shrink-0">
      <button
        ref={button}
        type="button"
        id={`${id}-country`}
        aria-label={`Country code: ${selected.name} +${selected.dial}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => (open ? close() : openList())}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            openList();
          }
        }}
        className="flex min-h-12 items-center gap-1.5 rounded-l-xl border-r border-line pl-4 pr-3 text-base focus:outline-none"
      >
        <span className="text-sm font-medium tracking-[0.04em] text-muted">{selected.iso}</span>
        <span className="tabular-nums">+{selected.dial}</span>
        <ChevronDown aria-hidden className={cx("size-4 text-muted transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(20rem,calc(100vw-3rem))] overflow-hidden rounded-xl border border-line-strong bg-surface shadow-[0_20px_40px_-16px_rgb(0_0_0/0.35)]">
          <div className="flex items-center gap-2 border-b border-line px-3">
            <Search aria-hidden className="size-4 shrink-0 text-muted" />
            <input
              ref={search}
              type="text"
              role="combobox"
              aria-label="Search countries"
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={results[active] ? `${id}-opt-${results[active].iso}` : undefined}
              placeholder="Search country or code"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onKey}
              className="min-h-11 w-full bg-transparent py-2.5 text-base text-ink placeholder:text-muted/60 focus:outline-none"
            />
          </div>
          <ul ref={list} id={listId} role="listbox" aria-label="Countries" className="max-h-64 overflow-y-auto py-1">
            {results.length ? (
              results.map((c, i) => (
                <li
                  key={c.iso}
                  id={`${id}-opt-${c.iso}`}
                  data-index={i}
                  role="option"
                  aria-selected={c.iso === selected.iso}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(c.iso)}
                  className={cx(
                    "flex min-h-11 cursor-pointer items-center gap-3 px-3 text-[0.95rem]",
                    i === active ? "bg-ink/[0.06] text-ink" : "text-ink/85",
                  )}
                >
                  <span className="w-7 text-xs font-medium tracking-[0.04em] text-muted">{c.iso}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="tabular-nums text-muted">+{c.dial}</span>
                  {c.iso === selected.iso ? <Check aria-hidden className="size-4 text-ink" /> : null}
                </li>
              ))
            ) : (
              <li role="option" aria-selected={false} aria-disabled className="px-3 py-3 text-sm text-muted">
                No matching country
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
