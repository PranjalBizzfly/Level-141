"use client";

import { useId, useRef, useState } from "react";
import { vibe } from "@/lib/content";
import { cx } from "@/components/ui/primitives";

/**
 * Interactive VIBE™ framework: four dimensions as an accessible tab set.
 * Laid out as a specification sheet — an equal four-column tab strip above a
 * single framed panel divided into headline, question, detail and outcomes
 * zones. Arrow keys move between dimensions; every panel is server-rendered
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
      {/* Tab strip: four open columns on one hairline, the active one underlined. */}
      <div
        role="tablist"
        aria-label="VIBE™ dimensions"
        aria-orientation="horizontal"
        className="grid grid-cols-4 border-b border-paper/15"
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
                "group relative flex min-h-11 flex-col items-center gap-2 px-2 pb-5 pt-5 text-center transition-colors duration-500 sm:items-start sm:px-4 sm:pb-7 sm:text-left lg:px-6 lg:pb-9 lg:pt-6",
              )}
            >
              <span
                aria-hidden
                className={cx(
                  "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gold transition-transform duration-700 ease-[var(--ease-architect)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span aria-hidden className="eyebrow hidden tabular-nums text-paper-muted sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden
                className={cx(
                  "serif-accent text-4xl leading-none transition-colors duration-500 sm:mt-4 sm:text-5xl",
                  selected ? "text-gold" : "text-paper/40 group-hover:text-paper/70",
                )}
              >
                {d.letter}
              </span>
              <span className="flex flex-col sm:mt-4">
                <span
                  className={cx(
                    "text-[0.75rem] font-medium uppercase tracking-[0.12em] sm:text-base sm:normal-case sm:tracking-[-0.01em] lg:text-lg",
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

      {/* Panel: story and scope on the left; the strategic question in an open
          column on the right, divided by a single hairline. */}
      <div className="mt-12 sm:mt-14 lg:mt-16">
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
              <h3 className="mt-6 text-2xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
                {d.headline}
              </h3>
              <p className="measure mt-6 text-base leading-[1.85] text-paper/75 sm:text-lg">{d.body}</p>

              <p className="eyebrow mt-12 text-paper-muted">Architecture focus</p>
              <ul className="mt-6 border-t border-paper/12">
                {d.focus.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-4 border-b border-paper/12 py-4 text-base leading-snug text-paper/85"
                  >
                    <span aria-hidden className="h-px w-3 shrink-0 bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="relative overflow-hidden border-t border-paper/15 pt-10 lg:col-span-5 lg:self-start lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="eyebrow relative text-paper-muted">Strategic question</p>
              <p className="serif-accent relative mt-5 text-2xl leading-snug text-gold-soft sm:text-[1.75rem]">“{d.question}”</p>
              <p className="relative mt-6 leading-relaxed text-paper/70">{d.detail}</p>
              <div className="relative mt-8 border-t border-paper/12 pt-6">
                <p className="eyebrow text-gold">Illustrative outcomes</p>
                <p className="mt-3 text-lg leading-snug tracking-[-0.01em] text-paper">{d.outcomes}</p>
              </div>
            </aside>
          </div>
        ))}
      </div>
    </div>
  );
}
