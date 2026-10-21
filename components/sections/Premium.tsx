"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { altFor } from "@/lib/image-alts";

/**
 * Premium patterns from the reference audit (black and white, each used once
 * site-wide — see .extract/ANIMATION-REGISTRY.md):
 * - StoriesList: full-bleed photographs cross-fade behind a list as each item is read.
 * - Mosaic: tiles scattered at different depths assemble into one grid on scroll.
 * - RuleQuote: a large statement beside a single vertical rule that draws down.
 * - DetailsPanel: a dark rounded panel of facts in columns, sticky beside long content.
 * - FloatingDepth: photographs floating at different depths, drifting at different speeds.
 * All text stays in the DOM; reduced motion shows the final state.
 */

/* ------------------------------------------------------------ StoriesList */

export function StoriesList({
  items,
}: {
  items: readonly { id: string; name: ReactNode; body: ReactNode; image: string }[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // The item crossing the middle of the screen chooses the photograph.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="photo-tone relative isolate overflow-clip bg-black text-white">
      {/* Photographs, pinned behind the list, cross-fading as the list is read. */}
      <div aria-hidden className="pointer-events-none sticky top-0 -mb-[100lvh] h-[100lvh] w-full">
        {items.map((it, i) => (
          <Image
            key={it.id}
            src={it.image}
            alt={altFor(it.image)}
            fill
            sizes="100vw"
            className="stories-bg object-cover"
            style={{ opacity: i === active ? 0.42 : 0, scale: i === active ? "1" : "1.1" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      </div>
      <div className="container-x relative py-[30lvh]">
        <h2 className="sr-only">Insight categories</h2>
        <ol>
          {items.map((it, i) => (
            <li
              key={it.id}
              id={it.id}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="grid min-h-[60lvh] scroll-mt-28 content-center gap-5 md:grid-cols-12"
            >
              <span aria-hidden className="text-sm tabular-nums text-white/55 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:col-span-8">
                <h3
                  className="font-display text-[clamp(2.25rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.045em] transition-opacity duration-700"
                  style={{ opacity: i === active ? 1 : 0.3 }}
                >
                  {it.name}
                </h3>
                <p className="mt-5 max-w-lg text-lg text-white/75 transition-opacity duration-700" style={{ opacity: i === active ? 1 : 0.3 }}>
                  {it.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Mosaic */

/** Start offsets per tile (x%, y%, z px, deg), so the pieces come from different depths. */
const SCATTER = [
  [-30, -40, -260, -14],
  [20, -60, -120, 10],
  [45, -25, -320, -8],
  [-45, 35, -200, 12],
  [10, 55, -280, -16],
  [40, 40, -160, 9],
] as const;

export function Mosaic({ items, kicker }: { items: readonly string[]; kicker: string }) {
  return (
    <ol className="mosaic mt-14 grid gap-3 [perspective:1400px] sm:mt-20 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => {
        const [x, y, z, r] = SCATTER[i % SCATTER.length];
        return (
          <li
            key={t}
            className={
              "mosaic-tile flex min-h-[13rem] flex-col justify-between rounded-[1.25rem] p-7 sm:p-8 " +
              (i % 3 === 1 ? "bg-black text-white dark:bg-white dark:text-black" : "border border-current/15")
            }
            style={{ "--mx": `${x}%`, "--my": `${y}%`, "--mz": `${z}px`, "--mr": `${r}deg` } as CSSProperties}
          >
            <span className="flex justify-between text-sm opacity-60">
              <span>{kicker}</span>
              <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            </span>
            <span className="mt-10 font-display text-[1.5rem] font-medium leading-[1.12] tracking-[-0.03em] sm:text-[1.7rem]">{t}</span>
          </li>
        );
      })}
    </ol>
  );
}

/* -------------------------------------------------------------- RuleQuote */

export function RuleQuote({ children, cite }: { children: ReactNode; cite?: ReactNode }) {
  return (
    <figure className="rule-quote relative mt-16 max-w-4xl pl-8 sm:pl-12">
      <span aria-hidden className="rule-quote__line absolute left-0 top-0 h-full w-[3px] bg-current" />
      <blockquote className="font-display text-[clamp(1.9rem,3.8vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.035em]">
        {children}
      </blockquote>
      {cite ? <figcaption className="mt-6 text-sm text-muted">{cite}</figcaption> : null}
    </figure>
  );
}

/* ----------------------------------------------------------- DetailsPanel */

export function DetailsPanel({ rows }: { rows: readonly { label: string; value: ReactNode }[] }) {
  return (
    <dl className="mt-10 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/15 text-white [background:rgb(255_255_255/0.14)]">
      {rows.map((r) => (
        <div key={r.label} className="grid gap-2 bg-black p-6 sm:grid-cols-[8rem_1fr] sm:p-7 dark:bg-black">
          <dt className="text-sm text-white/55">{r.label}</dt>
          <dd className="text-[0.95rem] leading-relaxed">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------------------------------------------------------- FloatingDepth */

/** Photographs floating at three depths: nearer ones drift faster; the far one is soft. */
const FLOATS = [
  { src: "/images/contact-corridor-warm.webp", cls: "right-[-8%] top-[58%] w-[44%]", depth: 0.35, blur: 0 },
  { src: "/images/about-atrium-levels-muted.webp", cls: "left-[4%] top-[76%] w-[28%]", depth: 0.7, blur: 0 },
  { src: "/images/home-person-notebook.webp", cls: "left-[38%] top-[90%] w-[22%]", depth: 1, blur: 2 },
] as const;

export function FloatingDepth() {
  return (
    <div aria-hidden className="floating-depth pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {FLOATS.map((f) => (
        <div
          key={f.src}
          className={"float-photo absolute aspect-[4/5] overflow-hidden rounded-[1.25rem] " + f.cls}
          style={{ "--depth": f.depth, filter: f.blur ? `blur(${f.blur}px) grayscale(1)` : undefined, opacity: 0.5 - f.depth * 0.15 } as CSSProperties}
        >
          <Image src={f.src} alt={altFor(f.src)} fill sizes="30vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
