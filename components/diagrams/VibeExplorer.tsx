"use client";

import { useId, useRef, useState } from "react";
import { vibe } from "@/lib/content";
import { cx } from "@/components/ui/primitives";

/**
 * Interactive VIBE™ framework: four dimensions as an accessible tab set.
 * A quiet index beside one large strategic question. Arrow keys move between dimensions; every panel is server-rendered
 * so the content is present even before hydration.
 */
export function VibeExplorer() {
  const [active, setActive] = useState(0);
  const select = (i: number) => {
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
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      {/* Quiet index: letters in a row on phones, a vertical list from desktop. */}
      <div role="tablist" aria-label="VIBE™ dimensions" className="grid grid-cols-4 lg:col-span-4 lg:grid-cols-1 lg:self-start">
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
                "flex min-h-11 flex-col items-center gap-2 py-4 text-center transition-opacity duration-500 lg:flex-row lg:items-baseline lg:gap-8 lg:py-6 lg:text-left",
                selected ? "opacity-100" : "opacity-60 hover:opacity-100",
              )}
            >
              <span aria-hidden className="text-4xl font-light leading-none lg:w-12">
                {d.letter}
              </span>
              <span className="text-[0.75rem] uppercase tracking-[0.12em] lg:text-lg lg:normal-case lg:tracking-[-0.01em]">
                <span className="lg:hidden">{d.name.split(" ")[0]}</span>
                <span className="hidden lg:inline">{d.name}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* One idea at a time: the question leads, the detail waits behind one control. */}
      <div className="lg:col-span-7 lg:col-start-6">
        {vibe.map((d, i) => (
          <div
            key={d.letter}
            role="tabpanel"
            id={`${uid}-panel-${i}`}
            aria-labelledby={`${uid}-tab-${i}`}
            hidden={i !== active}
            tabIndex={0}
            className="animate-fade outline-none"
          >
            <p className="eyebrow text-paper-muted">{d.full}</p>
            <h3 className="display mt-6 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)]">“{d.question}”</h3>
            <p className="mt-8 text-lg leading-[1.85] text-paper">{d.headline}</p>
            <p className="mt-4 text-base leading-[1.85] text-paper/75 sm:text-lg">{d.body}</p>
            <details className="group mt-10 border-t border-paper/15">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
                Architecture focus and outcomes
                <span aria-hidden className="text-xl font-light transition-transform duration-500 group-open:rotate-45">+</span>
              </summary>
              <div className="pb-8 pt-4">
                <p className="leading-[1.85] text-paper/75">{d.detail}</p>
                <p className="eyebrow mt-8 text-paper-muted">Architecture focus</p>
                <ul className="mt-4 space-y-2 leading-[1.85] text-paper/85">
                  {d.focus.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <p className="eyebrow mt-8 text-paper-muted">Illustrative outcomes</p>
                <p className="mt-3 text-lg leading-snug text-paper">{d.outcomes}</p>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
