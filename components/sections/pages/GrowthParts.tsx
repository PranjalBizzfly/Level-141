"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { useReducedMotion, useScrollFrame } from "@/components/sections/HomeInteractive";

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
    <div className="max-w-2xl">
      {label ? <p className={"text-sm " + (dark ? "text-white/55" : "text-muted")}>{label}</p> : null}
      {title ? (
        <h2 className="font-display mt-3 text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">{title}</h2>
      ) : null}
      {text ? <div className={"mt-5 max-w-xl " + (dark ? "text-white/65" : "text-muted")}>{text}</div> : null}
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
    <section className="photo-tone relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover grayscale" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/25" />
      {/* the two panels part from the centre */}
      <div aria-hidden className={"absolute inset-y-0 left-0 z-10 w-1/2 bg-black " + ease} style={{ transform: shown ? "translateX(-101%)" : "none" }} />
      <div aria-hidden className={"absolute inset-y-0 right-0 z-10 w-1/2 bg-black " + ease} style={{ transform: shown ? "translateX(101%)" : "none" }} />
      <div className="container-x relative z-20 grid gap-10 pb-14 pt-40 sm:pb-20 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-8">
          <p
            className="text-sm uppercase tracking-[0.22em] text-white/60 transition-opacity duration-700 [transition-delay:700ms]"
            style={{ opacity: shown ? 1 : 0 }}
          >
            {eyebrow}
          </p>
          <div className="overflow-hidden pb-2">
            <h1
              className="font-display mt-6 text-[clamp(2.3rem,6.2vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.045em] transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(.2,.7,.1,1)] [transition-delay:850ms] [&_.serif-accent]:text-white/55"
              style={{ transform: shown ? "none" : "translateY(60%)", opacity: shown ? 1 : 0 }}
            >
              {title}
            </h1>
          </div>
        </div>
        <div
          className="transition-[transform,opacity] duration-1000 [transition-delay:1200ms] lg:col-span-4 lg:pb-3"
          style={{ transform: shown ? "none" : "translateY(24px)", opacity: shown ? 1 : 0 }}
        >
          {intro ? <div className="text-white/75 [&_p]:leading-relaxed">{intro}</div> : null}
          {children ? <div className="mt-8">{children}</div> : null}
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
    <div ref={ref} className="bg-black py-24 text-white sm:py-24">
      <div className="container-x">
        <p className="font-display max-w-5xl text-[clamp(2rem,4.8vw,4.6rem)] font-medium leading-[1.06] tracking-[-0.04em]">
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
          <div className="mt-10 max-w-2xl text-white/65 transition-opacity duration-700 [&_p+p]:mt-4" style={{ opacity: p > 0.9 ? 1 : 0.15 }}>
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
    <div className="container-x py-20 sm:py-20">
      <Head label={label} title={title} />
      <ul
        ref={grid}
        onPointerMove={move}
        onPointerLeave={() => grid.current?.style.setProperty("--on", "0")}
        className="group/spot mt-12 grid gap-3 [--on:0] sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((it, i) => (
          <li
            key={it.name}
            data-spot
            tabIndex={0}
            className="relative rounded-2xl bg-line/60 p-px outline-none [--x:50%] [--y:50%] focus-visible:ring-2 focus-visible:ring-ink"
            style={{
              backgroundImage:
                "radial-gradient(260px circle at var(--x) var(--y), rgb(10 10 10 / calc(var(--on) * 0.9)), transparent 70%)",
            }}
          >
            <div
              className="relative h-full overflow-hidden rounded-[15px] bg-paper p-7 sm:p-8"
              style={{
                backgroundImage:
                  "radial-gradient(320px circle at var(--x) var(--y), rgb(10 10 10 / calc(var(--on) * 0.05)), transparent 70%)",
              }}
            >
              <span className="text-xs tabular-nums text-muted">{n2(i)}</span>
              <h3 className="font-display mt-10 text-[1.6rem] font-medium leading-tight tracking-[-0.02em]">{it.name}</h3>
              <p className="mt-3 text-muted">{it.body}</p>
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
    <div className="bg-black py-20 text-white sm:py-20">
      <div className="container-x">
        <Head label={label} title={title} text={text} dark />
        <div ref={ref} className="mt-14 sm:mt-20">
          <svg aria-hidden viewBox="0 0 1000 160" preserveAspectRatio="none" className="hidden h-28 w-full md:block">
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
          <ol className="grid gap-px md:grid-cols-7 md:gap-3">
            {items.map((s, i) => {
              const on = p >= (i + 0.5) / n;
              // pillar height follows the arc: tallest in the middle
              const t = (i + 0.5) / n;
              const h = 4 * t * (1 - t);
              return (
                <li
                  key={s.name}
                  className="flex gap-5 border-l border-white/15 py-5 pl-5 transition-[opacity,transform] duration-700 md:flex-col md:gap-0 md:border-l-0 md:py-0 md:pl-0"
                  style={{ opacity: on ? 1 : 0.2, transform: on ? "none" : "translateY(16px)" }}
                >
                  <span
                    aria-hidden
                    className="hidden w-px origin-top bg-white transition-transform duration-700 md:block md:self-center"
                    style={{ height: `${2 + h * 3}rem`, transform: `scaleY(${on ? 1 : 0})` }}
                  />
                  <span className="text-xs tabular-nums text-white/60 md:mt-4">{n2(i)}</span>
                  <div className="md:mt-2">
                    <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{s.name}</h3>
                    <p className="mt-2 text-sm text-white/65">{s.body}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white/60">{s.meta}</p>
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
          <li key={t} className="font-display py-4 text-[clamp(1.4rem,3vw,2.2rem)] font-medium tracking-[-0.03em]">{t}</li>
        ))}
      </ul>
    );
  }
  return (
    <div
      className="mt-12 border-y border-ink py-6 sm:py-8"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <ul className="sr-only" aria-label={label}>
        {items.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <div aria-hidden className="flex items-start gap-4 sm:gap-8">
        <span className="pt-2 text-xs tabular-nums text-muted">
          {n2(i)} / {n2(items.length - 1)}
        </span>
        <div className="relative h-[2.3em] min-w-0 flex-1 overflow-hidden font-display text-[clamp(1.35rem,4.2vw,3.6rem)] font-medium leading-[1.1] tracking-[-0.035em]">
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
      <div className="mt-6 flex gap-1.5" role="group" aria-label={label}>
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
    <div className="bg-black py-20 text-white sm:py-20">
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
          className="mt-8 grid overflow-hidden rounded-3xl border border-white/15 sm:grid-cols-5"
        >
          <div key={cur.name} className="animate-rise p-7 sm:col-span-3 sm:p-12">
            <span className="text-xs tabular-nums text-white/60">{n2(open)}</span>
            <h3 className="font-display mt-6 text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.02] tracking-[-0.035em]">{cur.name}</h3>
            <p className="mt-5 max-w-md text-white/70">{cur.body}</p>
          </div>
          <div className="photo-tone relative min-h-52 sm:col-span-2">
            <Image key={cur.image} src={cur.image} alt="" fill sizes="(min-width: 640px) 40vw, 100vw" className="animate-fade object-cover grayscale" />
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
    <div className="bg-black py-20 text-white sm:py-20">
      <div className="container-x">
        <Head label={label} title={title} dark />
        <ol ref={ref} className="mt-14 flex flex-col-reverse sm:mt-20">
          {steps.map((s, i) => {
            const local = clamp(p * n - i);
            return (
              <li key={s} className="relative" style={{ marginLeft: `${(i / (n - 1)) * 45}%` }}>
                {/* riser + tread, drawn as the page scrolls */}
                <span aria-hidden className="absolute bottom-0 left-0 h-full w-px origin-bottom bg-white" style={{ transform: `scaleY(${clamp(local * 2)})` }} />
                <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left bg-white" style={{ transform: `scaleX(${clamp(local * 2 - 1)})` }} />
                <p
                  className="font-display py-3 pl-4 text-[clamp(1.05rem,2.2vw,1.7rem)] font-medium tracking-[-0.02em] transition-[opacity,transform] duration-500 sm:py-4"
                  style={{ opacity: local > 0.6 ? 1 : 0.15, transform: local > 0.6 ? "none" : "translateY(-12px)" }}
                >
                  <span className="mr-3 text-xs tabular-nums text-white/60">{n2(i)}</span>
                  {s}
                </p>
              </li>
            );
          })}
        </ol>
        {foot ? <p className="mt-14 max-w-2xl text-white/65">{foot}</p> : null}
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
    <div className="container-x py-20 sm:py-20">
      <div
        className={
          "rounded-3xl p-7 transition-colors duration-700 sm:p-14 " + (isAfter ? "bg-black text-white" : "bg-paper text-ink ring-1 ring-line")
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
                  "min-h-10 rounded-full px-5 text-sm transition-colors duration-500 outline-none focus-visible:ring-2 focus-visible:ring-current " +
                  (on ? (isAfter ? "bg-white text-black" : "bg-black text-white") : "opacity-60 hover:opacity-100")
                }
              >
                {l}
              </button>
            );
          })}
        </div>
        <div className="mt-10 grid">
          <p aria-hidden={isAfter} className={"font-display text-[clamp(1.3rem,2.8vw,2.3rem)] font-medium leading-[1.2] tracking-[-0.025em] " + layer(!isAfter)}>
            {before}
          </p>
          <p aria-hidden={!isAfter} className={"font-display text-[clamp(1.3rem,2.8vw,2.3rem)] font-medium leading-[1.2] tracking-[-0.025em] " + layer(isAfter)}>
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
        <li key={s.letter} className="border-b border-current/20 py-8 sm:px-6 sm:[&:nth-child(odd)]:pl-0 lg:border-b-0 lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0">
          <span className="text-xs tabular-nums opacity-60">{n2(i)}</span>
          <p aria-hidden className="font-display mt-4 text-[clamp(5rem,11vw,9.5rem)] font-medium leading-[0.8] tracking-[-0.06em]">{s.letter}</p>
          <h3 className="font-display mt-6 text-2xl font-medium tracking-[-0.02em]">{s.name}</h3>
          <p className="mt-3 text-sm opacity-75">{s.question}</p>
        </li>
      ))}
    </ol>
  );
}
