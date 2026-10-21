"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { usePinProgress, useReducedMotion } from "../HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * How we architect growth — two scenes (each used once site-wide, see
 * .extract/ANIMATION-REGISTRY.md):
 * - QuestionDeal: the questions start as one fanned deck and are dealt, one by
 *   one, into a flat row as the section scrolls in — every card ends flat and
 *   fully readable.
 * - BrandsSpell: B R A N D S set as one huge outlined word; scrolling fills
 *   the letters in turn while each lever's detail slides in beneath.
 * Colours use black/white (they follow the theme on the page). Reduced
 * motion: everything is shown in its final state.
 */

const n2 = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/* ------------------------------------------------------------ QuestionDeal */

export function QuestionDeal({
  label,
  title,
  text,
  items,
}: {
  label: string;
  title: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; image: string }[];
}) {
  const n = items.length;
  return (
    <section className="overflow-hidden bg-black py-24 text-white sm:py-32">
      <div className="container-x">
        <div className="max-w-xl">
          <p className="text-sm text-white/60">{label}</p>
          <h2 className="font-display mt-3 text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h2>
        </div>
        <ol className="deal mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {items.map((q, i) => (
            <li
              key={q.name}
              className="photo-tone deal-card flex flex-col overflow-hidden rounded-[1.25rem] border border-white/15 bg-black text-white"
              style={{ "--i": i, "--off": i - (n - 1) / 2 } as CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={q.image} alt={altFor(q.image)} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
                <span className="absolute left-4 top-4 rounded-full bg-black/70 px-2.5 py-1 text-xs tabular-nums text-white">
                  {n2(i)} / {String(n).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display flex min-h-[8.5rem] items-end p-5 text-[1.6rem] font-medium leading-[1.1] tracking-[-0.03em] sm:p-6 lg:min-h-[9.5rem] lg:text-[1.45rem] xl:text-[1.7rem]">
                {q.name}
              </h3>
            </li>
          ))}
        </ol>
        {text ? <p className="mt-10 text-white/70">{text}</p> : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- BrandsSpell */

export function BrandsSpell({
  head,
  items,
}: {
  head: ReactNode;
  items: readonly { letter: string; name: string; line: string; role: string; list: readonly string[] }[];
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;
  const active = Math.min(n - 1, Math.floor(p * n * 0.999));

  if (reduced) {
    return (
      <section className="bg-black py-20 text-white sm:py-20">
        <div className="container-x">
          {head}
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <li key={it.letter}>
                <p aria-hidden className="font-display text-[4rem] font-medium leading-none">{it.letter}</p>
                <h3 className="font-display mt-3 text-2xl font-medium">{it.name}</h3>
                <p className="mt-2 text-[1.0625rem] text-white/85">{it.role}</p>
                <p className="mt-3 text-[0.95rem] text-white/80">{it.list.join(" · ")}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const y = window.scrollY + r.top + (r.height - window.innerHeight) * ((i + 0.5) / n);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="bg-black text-white" style={{ height: `${100 + n * 55}lvh` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden">
        <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-24 sm:pt-28">
          {head}

          {/* The word: each letter fills and lifts as its lever is read. */}
          <div className="relative">
            <div role="tablist" aria-label="BRANDS™ levers" className="flex items-end justify-between">
              {items.map((it, i) => {
                const fill = clamp(p * n - i);
                const on = i === active;
                return (
                  <button
                    key={it.letter}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-label={it.name}
                    onClick={() => jump(i)}
                    className="spell-letter font-display text-[clamp(4.5rem,15.5vw,15rem)] font-medium leading-[0.8] tracking-[-0.05em]"
                    style={
                      {
                        "--fill": `${fill * 100}%`,
                        translate: on ? "0 -0.08em" : "0 0",
                      } as CSSProperties
                    }
                  >
                    {it.letter}
                  </button>
                );
              })}
            </div>
            <div aria-hidden className="mt-5 h-px bg-white/20">
              <div className="h-px origin-left bg-white" style={{ transform: `scaleX(${clamp(p)})` }} />
            </div>
          </div>

          {/* The lever being read. */}
          <div role="tabpanel" className="grid min-h-[11rem]">
            {items.map((it, i) => (
              <div
                key={it.letter}
                aria-hidden={i !== active}
                className="spell-panel col-start-1 row-start-1 grid gap-6 lg:grid-cols-12"
                data-on={i === active ? "" : undefined}
              >
                <div className="lg:col-span-5">
                  <h3 className="font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1] tracking-[-0.035em]">{it.name}</h3>
                  <p className="mt-3 text-lg text-white/80">{it.line}</p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="text-[1.0625rem] text-white/85 sm:text-lg">{it.role}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {it.list.map((c) => (
                      <li key={c} className="rounded-full border border-white/25 px-3 py-1 text-sm">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
