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
      {/* Tab strip: four equal columns, the active one marked by a solid top rule. */}
      <div
        role="tablist"
        aria-label="VIBE™ dimensions"
        aria-orientation="horizontal"
        className="grid grid-cols-4"
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
                "group relative flex min-h-11 flex-col items-center gap-2 overflow-hidden border-l border-paper/25 px-2 pb-4 pt-5 text-center transition-opacity duration-500 sm:min-h-[15rem] sm:items-start sm:px-4 sm:pb-2 sm:text-left lg:min-h-[18rem] lg:px-5",
                selected ? "" : "hover:[&_.vibe-letter]:text-paper/70",
              )}
            >
              <span
                aria-hidden
                className={cx(
                  "absolute inset-x-0 top-0 h-0.5 origin-left bg-gold transition-transform duration-700 ease-[var(--ease-architect)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span aria-hidden className="eyebrow hidden tabular-nums text-paper-muted sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className={cx(
                  "vibe-letter font-display order-last text-4xl leading-[0.85] tracking-[-0.04em] transition-transform duration-700 ease-[var(--ease-architect)] sm:mt-auto sm:text-7xl lg:text-[6.5rem]",
                  selected ? "text-paper sm:-translate-y-3" : "translate-y-0 text-paper/55",
                )}
              >
                {d.letter}
              </span>
              <span className="flex flex-col sm:mt-2">
                <span
                  className={cx(
                    "text-sm font-medium uppercase tracking-[0.12em] sm:text-base sm:normal-case sm:tracking-[-0.01em] lg:text-lg",
                    selected ? "text-paper" : "text-paper-muted",
                  )}
                >
                  <span className="sm:hidden">{d.name.split(" ")[0]}</span>
                  <span className="hidden sm:inline">{d.name}</span>
                </span>
                {d.tag !== d.name ? (
                  <span className="mt-1 hidden text-sm leading-snug text-paper-muted lg:block">{d.tag}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel: editorial composition — story and scope on the left, a single
          feature card for the strategic question on the right. No table rules. */}
      <div className="mt-14 sm:mt-16 lg:mt-24">
        {vibe.map((d, i) => (
          <div
            key={d.letter}
            role="tabpanel"
            id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
            className={cx(
              "grid gap-10 outline-none lg:grid-cols-12 lg:gap-16",
              direction === "forward" ? "animate-slide-from-right" : "animate-slide-from-left",
            )}
          >
            <div className="lg:col-span-7">
              <p className="eyebrow text-gold">
                {d.letter} — {d.full}
              </p>
              <h3 className="mt-5 text-3xl leading-tight tracking-[-0.025em] sm:text-[2.75rem] sm:leading-[1.1]">
                {d.headline}
              </h3>
              <p className="measure mt-6 text-lg leading-relaxed text-paper/75">{d.body}</p>

              <p className="eyebrow mt-12 text-paper-muted">Architecture focus</p>
              <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
                {d.focus.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 border-t border-paper/15 py-3 text-[0.9375rem] leading-snug text-paper/85"
                  >
                    <span aria-hidden className="h-px w-3 shrink-0 bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden border-t border-paper/25 pt-8 lg:col-span-5 lg:self-start">
              <span
                aria-hidden
                className="font-display pointer-events-none absolute -right-2 -top-6 select-none text-[12rem] font-medium leading-none text-paper/[0.05] sm:text-[15rem]"
              >
                {d.letter}
              </span>
              <p className="eyebrow relative text-paper-muted">Strategic question</p>
              <p className="serif-accent relative mt-5 text-3xl leading-snug text-gold-soft sm:text-4xl">“{d.question}”</p>
              <p className="relative mt-6 leading-relaxed text-paper/70">{d.detail}</p>
              <div className="relative mt-8 border-t border-paper/12 pt-6">
                <p className="eyebrow text-gold">Illustrative outcomes</p>
                <p className="mt-3 text-lg leading-snug tracking-[-0.01em] text-paper">{d.outcomes}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
