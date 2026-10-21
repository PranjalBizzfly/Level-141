"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useReducedMotion, useScrollFrame } from "@/components/sections/HomeInteractive";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * TypeHero — no photograph. Each title line slides in from an alternating side
 * as the page scrolls; solid and outlined lines alternate. Reduced motion: lines
 * sit at rest.
 */
export function TypeHero({ eyebrow, lines, intro }: { eyebrow: string; lines: ReactNode[]; intro: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (el) setP(clamp(-el.getBoundingClientRect().top / (el.offsetHeight * 0.6)));
  }, !reduced);
  // On load the lines slide in from opposite sides and rest fully readable;
  // scrolling away draws them apart again.
  const [arrived, setArrived] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setArrived(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const shift = reduced ? 0 : Math.max(arrived ? 0 : 1, p * 0.8);
  const settle = p === 0 ? "translate 1.2s cubic-bezier(.2,.8,.2,1), opacity 1.2s ease-out" : "none";
  return (
    <section ref={ref} className="relative flex min-h-[68svh] sm:min-h-[100svh] flex-col justify-end overflow-hidden bg-black text-white">
      <div className="container-x relative pb-12 pt-40 sm:pb-16">
        <p className="text-sm uppercase tracking-[0.22em] text-white/60">{eyebrow}</p>
        <h1 className="font-display mt-6 text-[clamp(3rem,11vw,10rem)] font-medium leading-[0.92] tracking-[-0.045em]">
          {lines.map((line, i) => {
            const dir = i % 2 === 0 ? -1 : 1;
            const outlined = i % 2 === 1;
            return (
              <span
                key={i}
                className={`block will-change-transform ${outlined ? "text-right" : ""}`}
                style={{
                  translate: `${dir * shift * 30}% 0`,
                  opacity: reduced ? 1 : 1 - shift * 0.9,
                  transition: reduced ? undefined : settle,
                  ...(outlined ? { WebkitTextStroke: "1.5px var(--color-white)", WebkitTextFillColor: "transparent" } : null),
                }}
              >
                {line}
              </span>
            );
          })}
        </h1>
        <div className="mt-10 max-w-md border-t border-white/20 pt-6 text-white/75 [&_p]:leading-relaxed sm:ml-auto">{intro}</div>
      </div>
    </section>
  );
}

type Question = { name: string; kicker: string };

/**
 * FilterTabs — tabs filter the discovery questions; remaining items glide to
 * their new positions (FLIP) and newcomers fade up. Reduced motion: instant.
 */
export function FilterTabs({ label, title, tabs, items }: { label: string; title: ReactNode; tabs: string[]; items: Question[] }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const itemRefs = useRef(new Map<string, HTMLLIElement>());
  const prev = useRef(new Map<string, DOMRect>());
  const visible = active === 0 ? items : items.filter((q) => q.kicker === tabs[active]);

  const snapshot = () => {
    const m = new Map<string, DOMRect>();
    itemRefs.current.forEach((el, k) => m.set(k, el.getBoundingClientRect()));
    prev.current = m;
  };

  useLayoutEffect(() => {
    if (reduced) return;
    itemRefs.current.forEach((el, k) => {
      const before = prev.current.get(k);
      const now = el.getBoundingClientRect();
      if (before) {
        const dx = before.left - now.left;
        const dy = before.top - now.top;
        if (dx || dy) el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }], { duration: 520, easing: "cubic-bezier(.2,.7,.2,1)" });
      } else {
        el.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }], { duration: 480, easing: "ease-out" });
      }
    });
  }, [active, reduced]);

  const select = (i: number) => {
    snapshot();
    setActive(i);
    tabRefs.current[i]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const n = tabs.length;
    let i = -1;
    if (e.key === "ArrowRight") i = (active + 1) % n;
    else if (e.key === "ArrowLeft") i = (active - 1 + n) % n;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = n - 1;
    if (i < 0) return;
    e.preventDefault();
    select(i);
  };

  return (
    <div className="container-x py-20 sm:py-20">
      <p className="text-sm uppercase tracking-[0.22em] text-ink/55">{label}</p>
      <h2 className="font-display mt-4 text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.04em]">{title}</h2>
      <div role="tablist" aria-label={label} onKeyDown={onKey} className="mt-10 flex flex-wrap gap-2 border-b border-ink/15 pb-4">
        {tabs.map((t, i) => (
          <button
            key={t}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`ins-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={active === i}
            aria-controls="ins-panel"
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
              active === i ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div id="ins-panel" role="tabpanel" aria-labelledby={`ins-tab-${active}`} tabIndex={0} className="mt-8 focus-visible:outline-none">
        <ul className="grid gap-px overflow-hidden border border-ink/15 bg-ink/15 md:grid-cols-2">
          {visible.map((q) => {
            const n = items.indexOf(q);
            const key = `${q.kicker}:${q.name}`;
            return (
              <li
                key={key}
                ref={(el) => {
                  if (el) itemRefs.current.set(key, el);
                  else itemRefs.current.delete(key);
                }}
                className="flex flex-col gap-6 bg-paper p-6 sm:p-8"
              >
                <span className="flex items-baseline justify-between gap-4 text-xs uppercase tracking-[0.18em] text-ink/60">
                  <span>{q.kicker}</span>
                  <span aria-hidden className="tabular-nums">{String(n + 1).padStart(2, "0")}</span>
                </span>
                <span className="font-display text-xl leading-snug tracking-[-0.02em] sm:text-2xl">{q.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
