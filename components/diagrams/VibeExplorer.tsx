"use client";

import { useId, useRef, useState } from "react";
import { vibe } from "@/lib/content";
import { cx } from "@/components/ui/primitives";

/**
 * Interactive VIBE™ framework: four dimensions as an accessible tab set.
 * Laid out as four hairline columns, the selected dimension's letter lifted a
 * level, above a single open panel: story and scope left, the strategic
 * question right. Arrow keys move between dimensions; every panel is server-rendered
 * so the content is present even before hydration.
 */
export function VibeExplorer() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [focusOpen, setFocusOpen] = useState(false);
  const select = (i: number) => {
    setDirection(i >= active ? "forward" : "back");
    setActive(i);
  };
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % vibe.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + vibe.length) % vibe.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = vibe.length - 1;
    else return;
    e.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      {/* The four pillars as framed cards: number, name, tag, serif letter and arrow. */}
      <div
        role="tablist"
        aria-label="VIBE™ dimensions"
        aria-orientation="horizontal"
        className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8"
      >
        {vibe.map((d, i) => {
          const selected = i === active;
          return (
            <button
              key={d.letter}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cx(
                "group relative flex min-h-[13rem] flex-col items-start overflow-hidden rounded-lg border p-6 text-left transition-colors duration-500 sm:min-h-[17rem] sm:p-9",
                selected ? "border-paper/45 bg-paper/[0.04]" : "border-paper/15 hover:border-paper/35",
              )}
            >
              <span
                aria-hidden
                className={cx(
                  "absolute inset-x-0 top-0 h-0.5 origin-left bg-gold transition-transform duration-700 ease-[var(--ease-architect)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span aria-hidden className="eyebrow tabular-nums tracking-[0.2em] text-paper-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className={cx(
                  "vibe-letter serif-accent order-last mt-auto flex w-full items-end justify-between text-5xl leading-[0.85] sm:text-6xl",
                  selected ? "text-paper/80" : "text-paper/70",
                )}
              >
                {d.letter}
                <span className="font-sans text-xl text-paper/70 transition-transform duration-500 group-hover:translate-x-1">→</span>
              </span>
              <span className="mt-3 flex flex-col">
                <span
                  className={cx(
                    "text-lg sm:text-xl lg:text-2xl",
                    selected ? "text-paper" : "text-paper-muted",
                  )}
                >
                  {d.name}
                </span>
                {d.tag !== d.name ? (
                  <span className="mt-2 hidden text-sm leading-snug text-paper-muted sm:block">{d.tag}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel: editorial composition — story and scope on the left, a single
          feature card for the strategic question on the right. No table rules. */}
      <div className="mt-20 sm:mt-28">
        {vibe.map((d, i) => (
          <div
            key={d.letter}
            role="tabpanel"
            id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
            className={cx(
              "grid gap-16 lg:grid-cols-12 lg:gap-x-8",
              direction === "forward" ? "animate-slide-from-right" : "animate-slide-from-left",
            )}
          >
            <div className="lg:col-span-6">
              <p className="eyebrow tracking-[0.3em] text-paper/80">
                {d.letter} — {d.full}
              </p>
              <h3 className="mt-6 text-3xl leading-tight tracking-[-0.025em] sm:text-[2.2rem] sm:leading-[1.1]">
                {d.headline}
              </h3>
              <p className="measure mt-8 text-lg leading-relaxed text-paper/75">{d.body}</p>

              <p className="eyebrow mt-12 border-t border-paper/15 pt-8 tracking-[0.3em] text-paper-muted max-sm:hidden">Architecture focus</p>
              {/* Phones: the focus list folds behind its own label, so the pillar reads in one screen. */}
              <button
                type="button"
                aria-expanded={focusOpen}
                aria-controls={`${uid}-focus`}
                onClick={() => setFocusOpen((v) => !v)}
                className="eyebrow mt-10 flex w-full items-center justify-between border-t border-paper/15 pt-6 tracking-[0.3em] text-paper-muted sm:hidden"
              >
                Architecture focus
                <span aria-hidden className={cx("text-base transition-transform duration-300", focusOpen && "rotate-45")}>+</span>
              </button>
              <ul id={`${uid}-focus`} className={cx("mt-8 grid gap-x-12 gap-y-2 sm:grid-cols-2", !focusOpen && "max-sm:hidden")}>
                {d.focus.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-4 border-b border-paper/12 py-5 text-[0.9375rem] leading-snug text-paper/85"
                  >
                    <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full border border-paper/40"><span className="size-3 rounded-full border border-paper/70" /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-8 lg:col-span-5 lg:col-start-8 lg:self-start">
            <div className="relative overflow-hidden rounded-lg border border-paper/20 p-8 sm:p-12">
              <span
                aria-hidden
                className="serif-accent pointer-events-none absolute right-8 top-4 select-none text-[6rem] leading-none !text-paper/[0.18] sm:text-[8rem]"
              >
                {d.letter}
              </span>
              <p className="eyebrow relative tracking-[0.3em] text-paper-muted">Strategic question</p>
              <p className="serif-accent relative mt-6 text-2xl leading-snug text-gold-soft sm:text-3xl">“{d.question}”</p>
              <p className="relative mt-8 leading-relaxed text-paper/70">{d.detail}</p>
            </div>
            <div className="rounded-lg border border-paper/20 p-8 sm:p-12">
              <p className="eyebrow tracking-[0.3em] text-paper-muted">Illustrative outcomes</p>
              <div className="mt-6 flex items-start gap-5">
                <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full border border-paper/60"><span className="size-4 rounded-full border border-paper/80" /></span>
                <p className="text-lg leading-snug tracking-[-0.01em] text-paper">{d.outcomes}</p>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
