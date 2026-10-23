"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion, useScrollFrame } from "@/components/sections/HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * Growth Architecture page sections. Each animation here is used once on the
 * whole site (see .extract/ANIMATION-REGISTRY.md). All wording comes from the
 * page / lib/content.ts. Reduced motion: no pinning, every item in its final state.
 */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const n2 = (i: number) => String(i + 1).padStart(2, "0");

/** 0 → 1 as the element travels from entering the viewport bottom to `span` of the screen height above. */
function useEnterProgress<T extends HTMLElement>(reduced: boolean, start = 0.9, span = 0.6) {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    setP(clamp((vh * start - el.getBoundingClientRect().top) / (vh * span)));
  }, !reduced);
  return [ref, reduced ? 1 : p] as const;
}

function Head({ label, title, text, dark }: { label?: string; title?: ReactNode; text?: ReactNode; dark?: boolean }) {
  return (
    <div className="@container w-full">
      <div className="@4xl:grid @4xl:grid-cols-12 @4xl:items-end @4xl:gap-x-16">
        {/* With no supporting text beside it, the title takes the full width instead of leaving the right half empty. */}
        <div className={text ? "max-w-4xl @4xl:col-span-6" : "max-w-6xl @4xl:col-span-11"}>
          {label ? <p className={"text-[0.95rem] font-medium " + (dark ? "text-white/70" : "text-muted")}>{label}</p> : null}
          {title ? (
            <h2 className="font-display mt-6 text-[clamp(1.75rem,2.72vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h2>
          ) : null}
        </div>
        {text ? (
          <div className={"mt-8 max-w-2xl text-base leading-relaxed sm:text-lg @4xl:col-span-6 @4xl:col-start-7 @4xl:mt-0 " + (dark ? "text-white/80" : "text-muted")}>
            {text}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ CurtainHero */

export function CurtainHero({
  image,
  eyebrow,
  title,
  intro,
  children,
}: {
  image: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
    return () => cancelAnimationFrame(id);
  }, []);
  const shown = reduced || open;
  const ease = "transition-transform duration-[1400ms] ease-[cubic-bezier(.77,0,.18,1)]";
  return (
    // One composed first screen: the photograph full-bleed, darkened from the left, and the
    // label, headline, rule, intro and action stacked on the left.
    <section className="on-dark photo-tone relative flex min-h-[100svh] items-center overflow-hidden bg-black text-white">
      <Image src={image} alt={altFor(image)} fill priority sizes="100vw" className="object-cover object-[70%_center] grayscale" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />
      {/* the two panels part from the centre */}
      <div aria-hidden className={"absolute inset-y-0 left-0 z-10 w-1/2 bg-black " + ease} style={{ transform: shown ? "translateX(-101%)" : "none" }} />
      <div aria-hidden className={"absolute inset-y-0 right-0 z-10 w-1/2 bg-black " + ease} style={{ transform: shown ? "translateX(101%)" : "none" }} />
      <div className="container-x relative z-20 w-full pb-20 pt-36 sm:pt-40">
        <div className="max-w-2xl">
          <p
            className="text-[0.8rem] uppercase tracking-[0.32em] text-white/65 transition-opacity duration-700 [transition-delay:700ms]"
            style={{ opacity: shown ? 1 : 0, letterSpacing: "0.32em" }}
          >
            {eyebrow}
          </p>
          <div className="overflow-hidden pb-2">
            <h1
              className="font-display mt-8 text-[clamp(2.6rem,4.6vw,4.6rem)] font-normal leading-[1.08] tracking-[-0.025em] transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(.2,.7,.1,1)] [transition-delay:850ms]"
              style={{ transform: shown ? "none" : "translateY(60%)", opacity: shown ? 1 : 0 }}
            >
              {title}
            </h1>
          </div>
          <div
            className="transition-[transform,opacity] duration-1000 [transition-delay:1200ms]"
            style={{ transform: shown ? "none" : "translateY(24px)", opacity: shown ? 1 : 0 }}
          >
            <span aria-hidden className="mt-10 block h-px w-12 bg-white/45" />
            {intro ? <div className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg">{intro}</div> : null}
            {children ? <div className="mt-10">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- LineStatement */

export function LineStatement({ lines, accent, sub }: { lines: readonly string[]; accent?: string; sub?: ReactNode }) {
  const reduced = useReducedMotion();
  const [ref, p] = useEnterProgress<HTMLDivElement>(reduced, 0.95, 0.55);
  const all = [...lines.map((t) => ({ t, a: false })), ...(accent ? [{ t: accent, a: true }] : [])];
  return (
    <div ref={ref} className="bg-black py-20 text-white sm:py-24 lg:py-24">
      <div className="container-x">
        <p className="font-display max-w-5xl text-[clamp(1.7rem,2.98vw,2.85rem)] font-medium leading-[1.06] tracking-[-0.04em]">
          {all.map((x, i) => {
            const local = clamp(p * all.length - i);
            return (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <span
                  className={"block will-change-transform " + (x.a ? "text-white/55" : "")}
                  style={{ transform: `translateY(${(1 - local) * 105}%)` }}
                >
                  {x.t}
                </span>
              </span>
            );
          })}
        </p>
        {sub ? (
          <div className="mt-12 max-w-3xl text-base text-white/80 transition-opacity sm:text-lg duration-700 [&_p+p]:mt-4" style={{ opacity: p > 0.9 ? 1 : 0.75 }}>
            {sub}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- SpotlightGrid */

export function SpotlightGrid({
  label,
  title,
  items,
}: {
  label?: string;
  title?: ReactNode;
  items: readonly { name: string; body: string }[];
}) {
  const grid = useRef<HTMLUListElement>(null);
  const move = (e: PointerEvent) => {
    const el = grid.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-spot]").forEach((c) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--x", `${e.clientX - r.left}px`);
      c.style.setProperty("--y", `${e.clientY - r.top}px`);
    });
    el.style.setProperty("--on", "1");
  };
  return (
    <div className="container-x py-24 sm:py-32 lg:py-40">
      <Head label={label} title={title} />
      <ul
        ref={grid}
        onPointerMove={move}
        onPointerLeave={() => grid.current?.style.setProperty("--on", "0")}
        className="group/spot mt-12 grid gap-3 lg:gap-x-8 [--on:0] sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((it) => (
          <li
            key={it.name}
            data-spot
            tabIndex={0}
            className="relative rounded-[1.25rem] bg-line/60 p-px outline-none [--x:50%] [--y:50%] focus-visible:ring-2 focus-visible:ring-ink"
            style={{
              backgroundImage:
                "radial-gradient(260px circle at var(--x) var(--y), rgb(0 0 0 / calc(var(--on) * 0.9)), transparent 70%)",
            }}
          >
            <div
              className="relative h-full overflow-hidden rounded-[calc(1.25rem-1px)] bg-paper p-9 sm:p-10"
              style={{
                backgroundImage:
                  "radial-gradient(320px circle at var(--x) var(--y), rgb(0 0 0 / calc(var(--on) * 0.05)), transparent 70%)",
              }}
            >
              <h3 className="font-display text-[1.6rem] font-medium leading-tight tracking-[-0.02em]">{it.name}</h3>
              <p className="mt-4 text-muted">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------------------------------------------- Bridge */

export function Bridge({
  label,
  title,
  text,
  items,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; body: string; meta: string }[];
}) {
  const reduced = useReducedMotion();
  const [ref, p] = useEnterProgress<HTMLDivElement>(reduced, 0.85, 0.9);
  const n = items.length;
  return (
    <div className="bg-black py-20 text-white sm:py-24 lg:py-24">
      <div className="container-x">
        <Head label={label} title={title} text={text} dark />
        <div ref={ref} className="mt-16 sm:mt-24">
          <svg aria-hidden viewBox="0 0 1000 160" preserveAspectRatio="none" className="hidden h-28 w-full lg:block">
            <path d="M0 150 Q500 -40 1000 150" fill="none" stroke="currentColor" strokeOpacity={0.15} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <path
              d="M0 150 Q500 -40 1000 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={1 - p}
            />
          </svg>
          <ol className="grid gap-px lg:grid-cols-7 lg:gap-3">
            {items.map((s, i) => {
              const on = p >= (i + 0.5) / n;
              // pillar height follows the arc: tallest in the middle
              const t = (i + 0.5) / n;
              const h = 4 * t * (1 - t);
              return (
                <li
                  key={s.name}
                  className="flex gap-5 border-l border-white/15 py-7 pl-5 transition-[opacity,transform] duration-700 lg:flex-col lg:gap-0 lg:border-l-0 lg:py-0 lg:pl-0"
                  style={{ opacity: on ? 1 : 0.85, transform: on ? "none" : "translateY(8px)" }}
                >
                  <span aria-hidden className="relative hidden w-px bg-white/25 lg:block lg:self-center" style={{ height: `${2 + h * 3}rem` }}>
                    <span
                      className="absolute inset-0 origin-top bg-white transition-transform duration-700"
                      style={{ transform: `scaleY(${on ? 1 : 0})` }}
                    />
                  </span>
                  <span className="text-base tabular-nums text-white/85 lg:mt-4">{n2(i)}</span>
                  <div className="lg:mt-2">
                    {/* Seven columns: between lg and ~1440px the name scales down so the longest fits its column. */}
                    <h3 className="font-display text-[1.4rem] font-medium leading-tight tracking-[-0.02em] lg:text-[clamp(1.05rem,1.55vw,1.4rem)]">{s.name}</h3>
                    <p className="mt-2 text-base text-white/90">{s.body}</p>
                    <p className="mt-4 text-sm uppercase tracking-[0.12em] text-white/85">{s.meta}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Ticker */

export function Ticker({ items, label }: { items: readonly string[]; label: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), 2200);
    return () => window.clearInterval(id);
  }, [reduced, paused, items.length]);

  if (reduced) {
    return (
      <ul aria-label={label} className="mt-12 divide-y divide-line border-y border-line">
        {items.map((t) => (
          <li key={t} className="font-display py-7 text-[clamp(1.7rem,3.1vw,2.48rem)] font-medium tracking-[-0.03em]">{t}</li>
        ))}
      </ul>
    );
  }
  return (
    <div
      className="mt-12 border-y border-ink py-12 sm:py-14"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul className="sr-only" aria-label={label}>
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <div aria-hidden className="flex items-start">
        <div className="relative h-[3.2em] min-w-0 flex-1 overflow-hidden font-display text-[clamp(1.78rem,3.1vw,2.94rem)] font-medium leading-[1.05] sm:h-[2.2em] tracking-[-0.035em]">
          {items.map((t, k) => {
            const d = k - i;
            return (
              <span
                key={t}
                className="absolute inset-x-0 top-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.7,0,.2,1)]"
                style={{ transform: `translateY(${d === 0 ? 0 : d < 0 ? -110 : 110}%)`, opacity: d === 0 ? 1 : 0 }}
              >
                {t}
              </span>
            );
          })}
        </div>
      </div>
      <div className="mt-10 flex gap-1.5" role="group" aria-label={label}>
        {items.map((t, k) => (
          <button
            key={t}
            type="button"
            aria-label={t}
            aria-current={k === i}
            onClick={() => setI(k)}
            className="flex h-6 flex-1 items-center outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            <span className={"block h-px w-full transition-colors " + (k === i ? "bg-ink" : "bg-line")} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ PillDetails */

export function PillDetails({
  label,
  title,
  items,
}: {
  label?: string;
  title?: ReactNode;
  items: readonly { name: string; body: string; image: string }[];
}) {
  const [open, setOpen] = useState(0);
  const cur = items[open];
  return (
    <div className="bg-black py-20 text-white sm:py-24 lg:py-24">
      <div className="container-x">
        <Head label={label} title={title} dark />
        <ul className="mt-12 flex flex-wrap gap-2 sm:mt-16">
          {items.map((it, i) => (
            <li key={it.name} className="max-w-full">
              <button
                type="button"
                aria-expanded={i === open}
                aria-controls="ga-pill-panel"
                onClick={() => setOpen(i)}
                className={
                  "min-h-11 max-w-full rounded-full border px-5 text-left text-sm transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black " +
                  (i === open ? "border-white bg-white text-black" : "border-white/25 text-white/80 hover:border-white")
                }
              >
                {it.name}
              </button>
            </li>
          ))}
        </ul>
        <div
          id="ga-pill-panel"
          role="region"
          aria-live="polite"
          aria-label={cur.name}
          className="mt-10 grid overflow-hidden rounded-3xl border border-white/15 sm:grid-cols-5"
        >
          <div key={cur.name} className="animate-rise p-9 sm:col-span-3 sm:p-16">
            <span className="text-xs tabular-nums text-white/60">{n2(open)}</span>
            <h3 className="font-display mt-8 text-[clamp(1.66rem,2.88vw,2.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">{cur.name}</h3>
            <p className="mt-6 max-w-lg text-white/70">{cur.body}</p>
          </div>
          <div className="photo-tone relative min-h-52 sm:col-span-2">
            <Image key={cur.image} src={cur.image} alt={altFor(cur.image)} fill sizes="(min-width: 640px) 40vw, 100vw" className="animate-fade object-cover grayscale" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Staircase */

export function Staircase({
  label,
  title,
  steps,
  foot,
}: {
  label?: string;
  title?: ReactNode;
  steps: readonly string[];
  foot?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [ref, p] = useEnterProgress<HTMLOListElement>(reduced, 0.85, 1.1);
  const n = steps.length;
  return (
    <div className="bg-black py-20 text-white sm:py-24 lg:py-24">
      <div className="container-x">
        <Head label={label} title={title} dark />
        <ol ref={ref} className="mt-12 flex flex-col-reverse sm:mt-16">
          {steps.map((s, i) => {
            const local = clamp(p * n - i);
            return (
              <li key={s} className="relative ml-[calc(var(--s)*18%)] sm:ml-[calc(var(--s)*45%)]" style={{ ["--s" as string]: i / (n - 1) }}>
                {/* riser + tread, drawn as the page scrolls */}
                <span aria-hidden className="absolute bottom-0 left-0 h-full w-px bg-white/25" />
                <span aria-hidden className="absolute left-0 top-0 h-px w-full bg-white/25" />
                <span aria-hidden className="absolute bottom-0 left-0 h-full w-px origin-bottom bg-white" style={{ transform: `scaleY(${clamp(local * 2)})` }} />
                <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left bg-white" style={{ transform: `scaleX(${clamp(local * 2 - 1)})` }} />
                <p
                  className="font-display py-3 pl-4 text-[clamp(1.35rem,2.34vw,1.94rem)] leading-tight font-medium tracking-[-0.02em] transition-[opacity,transform] duration-500 sm:py-4"
                  style={{ opacity: local > 0.6 ? 1 : 0.6, transform: local > 0.6 ? "none" : "translateY(-6px)" }}
                >
                  <span className="mr-3 text-base tabular-nums text-white/75">{n2(i)}</span>
                  {s}
                </p>
              </li>
            );
          })}
        </ol>
        {foot ? <p className="mt-12 max-w-3xl text-base text-white/80 sm:text-lg">{foot}</p> : null}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- ToggleCompare */

export function ToggleCompare({ before, after }: { before: ReactNode; after: ReactNode }) {
  const [isAfter, setAfter] = useState(false);
  const layer = (show: boolean) =>
    "col-start-1 row-start-1 transition-[opacity,filter] duration-700 " + (show ? "opacity-100 blur-0" : "pointer-events-none opacity-0 blur-md");
  return (
    <div className="container-x py-24 sm:py-32 lg:py-40">
      <div
        className={
          "true-tone rounded-[1.25rem] p-9 transition-colors duration-700 sm:p-14 " + (isAfter ? "bg-black text-white" : "bg-paper text-ink ring-1 ring-line")
        }
      >
        <div role="group" aria-label="Before / After" className={"inline-flex rounded-full border p-1 " + (isAfter ? "border-white/25" : "border-line")}>
          {(["Before", "After"] as const).map((l) => {
            const on = (l === "After") === isAfter;
            return (
              <button
                key={l}
                type="button"
                aria-pressed={on}
                onClick={() => setAfter(l === "After")}
                className={
                  "min-h-12 rounded-full px-6 text-[0.95rem] transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-current " +
                  (on ? (isAfter ? "bg-white text-black" : "bg-black text-white") : "opacity-60 hover:opacity-100")
                }
              >
                {l}
              </button>
            );
          })}
        </div>
        <div className="mt-12 grid">
          <p aria-hidden={isAfter} className={"font-display text-[clamp(1.3rem,2.52vw,2.07rem)] font-medium leading-[1.2] tracking-[-0.025em] " + layer(!isAfter)}>
            {before}
          </p>
          <p aria-hidden={!isAfter} className={"font-display text-[clamp(1.3rem,2.52vw,2.07rem)] font-medium leading-[1.2] tracking-[-0.025em] " + layer(isAfter)}>
            {after}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- PanImage */

export function PanImage({ image, alt }: { image: string; alt: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0.5);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    setP(clamp((vh - r.top) / (vh + r.height)));
  }, !reduced);
  const x = reduced ? -12.5 : -25 * p;
  return (
    <div ref={ref} className="photo-tone relative h-[60svh] min-h-80 overflow-hidden bg-black sm:h-[80svh]">
      <div className="absolute inset-y-0 left-0 w-[133%] will-change-transform" style={{ transform: `translateX(${x}%)` }}>
        <Image src={image} alt={alt} fill sizes="133vw" className="object-cover grayscale" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- PeakStatic */

// Colours follow the section (light grey in the light theme, black in the dark).
export function PeakStatic({ stages }: { stages: readonly { letter: string; name: string; question: string }[] }) {
  return (
    <ol className="grid border-t border-current/20 sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((s, i) => (
        <li
          key={s.letter}
          className="border-b border-current/20 py-12 sm:px-8 sm:py-14 sm:max-lg:[&:nth-child(odd)]:pl-0 lg:border-b-0 lg:border-l lg:px-10 lg:py-16 lg:first:border-l-0 lg:first:pl-0"
        >
          <span className="text-sm tabular-nums opacity-60">{n2(i)}</span>
          <p aria-hidden className="font-display mt-8 text-[clamp(4.25rem,7.7vw,6.65rem)] font-medium leading-[0.8] tracking-[-0.06em]">{s.letter}</p>
          <h3 className="font-display mt-10 text-2xl font-medium tracking-[-0.02em]">{s.name}</h3>
          <p className="mt-4 max-w-[19rem] text-base leading-relaxed opacity-80 sm:text-lg">{s.question}</p>
        </li>
      ))}
    </ol>
  );
}
