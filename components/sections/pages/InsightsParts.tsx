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
    <section ref={ref} className="relative flex min-h-[50svh] flex-col justify-end overflow-hidden bg-black text-white sm:min-h-[62svh]">
      <div className="container-x relative pb-12 pt-36 sm:pb-14 sm:pt-40">
        <p className="text-[0.95rem] font-medium text-white/70">{eyebrow}</p>
        <h1 className="font-display mt-5 text-[clamp(3rem,8.5vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.045em]">
          {lines.map((line, i) => {
            const dir = i % 2 === 0 ? -1 : 1;
            const outlined = i % 2 === 1;
            return (
              <span
                key={i}
                className={`block will-change-transform ${outlined ? "sm:pl-[0.6em]" : ""}`}
                style={{
                  translate: `${dir * shift * 8}% 0`,
                  opacity: reduced ? 1 : 1 - shift * 0.45,
                  transition: reduced ? undefined : settle,
                  ...(outlined ? { WebkitTextStroke: "1.5px var(--color-white)", WebkitTextFillColor: "transparent" } : null),
                }}
              >
                {line}
              </span>
            );
          })}
        </h1>
        <div className="mt-8 max-w-xl border-t border-white/20 pt-6 text-[1.0625rem] text-white/85 sm:text-lg [&_p]:leading-relaxed">{intro}</div>
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
      <div className="max-w-3xl">
        <p className="text-[0.95rem] font-medium text-muted">{label}</p>
        <h2 className="font-display mt-4 text-[clamp(1.9rem,3.4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h2>
      </div>
      <div role="tablist" aria-label={label} onKeyDown={onKey} className="mt-10 flex flex-wrap gap-3">
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
            className={`min-h-12 rounded-full border px-6 py-2.5 text-[0.95rem] transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/20 ${
              active === i ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink/80 hover:border-ink hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div id="ins-panel" role="tabpanel" aria-labelledby={`ins-tab-${active}`} tabIndex={0} className="mt-8 focus-visible:outline-none">
        <ul className="grid gap-4 md:grid-cols-2">
          {visible.map((q) => {
            const key = `${q.kicker}:${q.name}`;
            return (
              <li
                key={key}
                ref={(el) => {
                  if (el) itemRefs.current.set(key, el);
                  else itemRefs.current.delete(key);
                }}
                className="flex flex-col gap-6 rounded-[1.25rem] border border-current/15 p-6 sm:p-8"
              >
                <span className="text-sm font-medium text-muted">{q.kicker}</span>
                <span className="font-display text-xl leading-snug tracking-[-0.02em] sm:text-2xl">{q.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
 * CategoryIndex — the categories as a large, static typographic index. Each
 * row keeps its #slug anchor (with scroll margin) for /insights#slug links.
 * Nothing hides or dims while reading; hover only nudges the name.
 */
export function CategoryIndex({ items }: { items: readonly { id: string; name: ReactNode; body: ReactNode }[] }) {
  return (
    <section aria-labelledby="ins-cat-title" className="bg-paper text-ink">
      <div className="container-x py-20 sm:py-28">
        <h2 id="ins-cat-title" className="sr-only">
          Insight categories
        </h2>
        <ul className="border-t border-ink/15">
          {items.map((it) => (
            <li
              key={it.id}
              id={it.id}
              className="group grid scroll-mt-28 gap-4 border-b border-ink/15 py-10 sm:py-12 md:grid-cols-12 md:items-baseline md:gap-8"
            >
              <h3 className="font-display text-[clamp(2.1rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.045em] transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-2 md:col-span-7">
                {it.name}
              </h3>
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-ink/85 sm:text-lg md:col-span-5">{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
