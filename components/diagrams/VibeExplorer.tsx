"use client";

import { useId, useRef, useState } from "react";
import { vibe } from "@/lib/content";
import { cx } from "@/components/ui/primitives";

/**
 * Interactive VIBE™ framework: four dimensions as an accessible tab set.
 * Arrow keys move between dimensions; every panel is server-rendered so the
 * content is present even before hydration.
 */
export function VibeExplorer() {
  const [active, setActive] = useState(0);
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
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div
        role="tablist"
        aria-label="VIBE™ dimensions"
        aria-orientation="vertical"
        className="grid grid-cols-4 gap-2 lg:col-span-5 lg:grid-cols-1 lg:gap-0 lg:border-t lg:border-paper/15"
      >
        {vibe.map((d, i) => {
          const selected = i === active;
          return (
            <button
              key={d.letter}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cx(
                "group relative flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 text-left transition-colors duration-500 lg:flex-row lg:items-center lg:gap-6 lg:rounded-none lg:border-0 lg:border-b lg:border-paper/15 lg:px-0 lg:py-7",
                selected ? "border-gold/60 bg-paper/[0.04] lg:bg-transparent" : "border-paper/10 hover:border-paper/30",
              )}
            >
              <span
                aria-hidden
                className={cx(
                  "serif-accent text-5xl leading-none transition-colors duration-500 sm:text-6xl lg:w-20 lg:text-8xl",
                  selected ? "text-gold" : "text-paper/30 group-hover:text-paper/60",
                )}
              >
                {d.letter}
              </span>
              <span className="flex flex-col items-center lg:items-start">
                <span
                  className={cx(
                    "text-[0.7rem] font-medium uppercase tracking-[0.14em] sm:text-xs lg:text-xl lg:normal-case lg:tracking-[-0.01em]",
                    selected ? "text-paper" : "text-paper/60",
                  )}
                >
                  <span className="lg:hidden">{d.name.split(" ")[0]}</span>
                  <span className="hidden lg:inline">{d.name}</span>
                </span>
                {d.tag !== d.name ? <span className="mt-1 hidden text-sm text-paper/45 lg:block">{d.tag}</span> : null}
              </span>
              <span
                aria-hidden
                className={cx(
                  "absolute bottom-[-1px] left-0 hidden h-px bg-gold transition-[width] duration-700 ease-[var(--ease-architect)] lg:block",
                  selected ? "w-full" : "w-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-7">
        {vibe.map((d, i) => (
          <div
            key={d.letter}
            role="tabpanel"
            id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
            className="animate-rise outline-none"
          >
            <p className="eyebrow text-gold">
              {d.letter} — {d.full}
            </p>
            <h3 className="mt-5 text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">{d.headline}</h3>
            <p className="mt-6 text-lg leading-relaxed text-paper/75">{d.body}</p>

            <div className="mt-10 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-paper/50">The strategic question</p>
                <p className="serif-accent mt-3 text-2xl text-gold-soft">“{d.question}”</p>
                <p className="mt-5 text-sm leading-relaxed text-paper/60">{d.detail}</p>
              </div>
              <div>
                <p className="eyebrow text-paper/50">What we architect</p>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-paper/80">
                  {d.focus.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-8 rounded-2xl border border-paper/10 bg-paper/[0.03] px-6 py-5 text-sm leading-relaxed text-paper/70">
              <span className="eyebrow mr-3 text-gold">Outcomes</span>
              {d.outcomes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
