"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePinProgress, useReducedMotion, useScrollFrame } from "@/components/sections/HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * About page layouts (each used once site-wide, see .extract/ANIMATION-REGISTRY.md).
 * - CounterHero: "141" counts up on load while the photo is revealed behind it.
 * - SplitStatement: two halves slide in from left and right and lock together on scroll.
 * - Triptych: accordion columns; hover / focus widens one and reveals its text.
 * - SplitPanels: two photo panels; hover / focus grows one to ~70%.
 * - ParallaxStrips: a photo cut into vertical strips that align at centre.
 * - PrinciplesGrid: static editorial grid.
 * Reduced motion: final state, nothing pins.
 */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
function Head({ label, title, text, dark }: { label?: string; title?: ReactNode; text?: ReactNode; dark?: boolean }) {
  return (
    <div className="@container w-full">
      <div className="@4xl:grid @4xl:grid-cols-12 @4xl:items-end @4xl:gap-x-16">
        <div className="max-w-4xl @4xl:col-span-6">
          {label ? <p className={"text-[0.95rem] font-medium " + (dark ? "text-white/70" : "text-muted")}>{label}</p> : null}
          {title ? (
            <h2 className="font-display mt-6 text-[clamp(1.9rem,3.4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h2>
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

/* ------------------------------------------------------------ CounterHero */

export function CounterHero({
  image,
  eyebrow,
  title,
  intro,
  children,
}: {
  image: string;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = clamp((t - t0) / 1800);
      setN(Math.round(141 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  const value = reduced ? 141 : n;
  const p = value / 141;

  return (
    <section className="photo-tone relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 -z-10"
        style={{ clipPath: `inset(${(1 - p) * 50}% ${(1 - p) * 50}% round 0)`, opacity: 0.35 + 0.65 * p }}
      >
        <Image src={image} alt={altFor(image)} fill priority sizes="100vw" className="object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/55" />
      </div>
      <p
        aria-hidden
        className="font-display pointer-events-none absolute inset-x-0 top-[12svh] select-none text-center text-[clamp(7rem,34vw,30rem)] font-medium leading-none tracking-[-0.07em] tabular-nums text-white [text-shadow:0_8px_60px_rgb(0_0_0/0.55)]"
      >
        {value}
      </p>
      <div className="mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8 sm:pb-20">
        <p className="text-sm text-white/60">{eyebrow}</p>
        <h1 className="font-display mt-6 text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[0.98] tracking-[-0.045em]">{title}</h1>
        <div className="mt-8 grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-2xl text-lg text-white/75">{intro}</div>
          {children}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- SplitStatement */

export function SplitStatement({
  left,
  right,
  sub,
  aside,
}: {
  left: string;
  right: string;
  sub?: ReactNode;
  /** The section's conclusion, set large in the left column beside the supporting text. */
  aside?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [ref, prog] = usePinProgress(!reduced);
  const p = reduced ? 1 : clamp(prog / 0.6);
  // Short travel so both halves stay inside the viewport mid-animation.
  const off = (1 - p) * 8;
  const body = (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
      <h2 className="font-display text-[clamp(2rem,6vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.045em]">
        <span className="block" style={{ transform: `translateX(${-off}vw)`, opacity: 0.55 + 0.45 * p }}>
          {left}
        </span>
        <span
          className="serif-accent block text-right"
          style={{ transform: `translateX(${off}vw)`, opacity: 0.55 + 0.45 * p }}
        >
          {right}
        </span>
      </h2>
      <div
        className="mt-12 h-px origin-center bg-white/30"
        style={{ transform: `scaleX(${p})` }}
        aria-hidden
      />
      {sub || aside ? (
        <div
          className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-16"
          style={{ opacity: reduced ? 1 : 0.55 + 0.45 * clamp((prog - 0.45) / 0.25) }}
        >
          {aside ? (
            <div className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em] lg:col-span-5">
              {aside}
            </div>
          ) : null}
          {sub ? (
            <div className="max-w-2xl space-y-6 text-base text-white/85 sm:text-lg lg:col-span-6 lg:col-start-7">{sub}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
  if (reduced) return <div className="overflow-hidden bg-black py-20 text-white sm:py-24 lg:py-24">{body}</div>;
  return (
    <div ref={ref} className="relative h-[220lvh] bg-black text-white">
      <div className="sticky top-0 flex h-[100lvh] items-center overflow-hidden">{body}</div>
    </div>
  );
}

/* --------------------------------------------------------------- Triptych */

export function Triptych({
  label,
  title,
  items,
}: {
  label: string;
  title: ReactNode;
  items: { lead: string; rest?: string; image?: string }[];
}) {
  const [open, setOpen] = useState(items.length - 1);
  return (
    <div className="bg-paper py-20 text-ink sm:py-24 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Head label={label} title={title} />
        <div className="mt-12 flex flex-col gap-2 lg:h-[26rem] lg:flex-row">
          {items.map((it, i) => {
            const on = open === i;
            return (
              <button
                key={it.lead}
                type="button"
                aria-expanded={on}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className={
                  "group relative flex min-w-0 flex-col justify-end overflow-hidden rounded-[1.25rem] border p-8 text-left outline-none transition-[flex-grow,background-color,color] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 motion-reduce:transition-none sm:p-10 " +
                  (it.image
                    ? "photo-tone min-h-[16rem] border-white/15 bg-black text-white lg:min-h-0 " + (on ? "lg:grow-[3]" : "lg:grow")
                    : on
                      ? "border-ink bg-ink text-paper lg:grow-[3]"
                      : "border-current/15 bg-paper lg:grow")
                }
                style={{ flexBasis: 0 }}
              >
                {/* The panel's photograph: brighter on the open panel, quieter on the others. */}
                {it.image ? (
                  <>
                    <Image
                      src={it.image}
                      alt={altFor(it.image)}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover object-[50%_30%] grayscale transition-[opacity,scale] duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                      style={{ opacity: on ? 0.85 : 0.5 }}
                    />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
                  </>
                ) : null}
                <span className="relative block">
                  <span className="font-display block text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                    {it.lead}
                  </span>
                  {it.rest ? (
                    <span
                      className={
                        "block max-w-lg overflow-hidden text-lg transition-[max-height,opacity] duration-700 motion-reduce:transition-none " +
                        (on ? "mt-6 max-h-40 opacity-100 " + (it.image ? "text-white/85" : "text-paper/85") : "max-h-0 opacity-0")
                      }
                    >
                      {it.rest}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ SplitPanels */

export function SplitPanels({
  label,
  title,
  text,
  items,
}: {
  label: string;
  title: ReactNode;
  text: string;
  items: { name: string; body: string; href: string; image: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="bg-black py-20 text-white sm:py-24 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Head label={label} title={title} text={<p>{text}</p>} dark />
      </div>
      <div className="mt-12 flex flex-col gap-px md:h-[80svh] md:flex-row" onMouseLeave={() => setOpen(null)}>
        {items.map((it, i) => {
          const grow = open === null ? 1 : open === i ? 7 : 3;
          const shown = open === i;
          return (
            <Link
              key={it.href}
              href={it.href}
              onMouseEnter={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              onBlur={() => setOpen(null)}
              className="photo-tone group relative flex text-white min-h-[70svh] min-w-0 flex-col justify-end overflow-hidden outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white motion-reduce:transition-none md:min-h-0"
              style={{ flexGrow: grow, flexBasis: 0 }}
            >
              <Image
                src={it.image}
                alt={altFor(it.image)}
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-cover grayscale transition-transform duration-1000 group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              <div className="relative p-8 sm:p-14">
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.8rem)] font-medium leading-[1.04] tracking-[-0.035em]">
                  {it.name}
                </h3>
                <div
                  className={
                    "grid transition-[grid-template-rows,opacity] duration-700 motion-reduce:transition-none max-md:grid-rows-[1fr] max-md:opacity-100 " +
                    (shown ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")
                  }
                >
                  <div className="overflow-hidden">
                    <p className="mt-6 max-w-lg text-base text-white/85 sm:text-lg">{it.body}</p>
                    <ArrowUpRight className="mt-8 size-6" aria-hidden />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------------------------------------- ParallaxStrips */

const STRIP_SPEED = [-1, 0.6, -0.4, 1, -0.7, 0.3];

export function ParallaxStrips({ image, alt, caption }: { image: string; alt: string; caption?: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [d, setD] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // -1 (below) → 0 (centred) → 1 (above)
    const c = (r.top + r.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + r.height / 2);
    setD(Math.max(-1, Math.min(1, c)));
  }, !reduced);
  const k = reduced ? 0 : d;
  const n = STRIP_SPEED.length;
  return (
    <figure className="bg-paper py-20 text-ink sm:py-24 lg:py-24">
      <div ref={ref} role="img" aria-label={alt} className="relative h-[75svh] w-full overflow-hidden">
        {STRIP_SPEED.map((s, i) => (
          <div
            key={i}
            aria-hidden
            className="absolute inset-y-0 overflow-hidden"
            style={{
              left: `${(i * 100) / n}%`,
              width: `${100 / n + 0.2}%`,
              transform: `translateY(${k * s * 18}%)`,
            }}
          >
            <div className="absolute inset-y-0" style={{ left: `${-i * 100}%`, width: `${n * 100}%` }}>
              <Image src={image} alt={altFor(image)} fill sizes="100vw" className="object-cover grayscale" />
            </div>
          </div>
        ))}
      </div>
      {caption ? (
        <figcaption className="mx-auto mt-8 max-w-7xl px-5 text-[0.95rem] text-muted sm:px-8">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* --------------------------------------------------------- PrinciplesGrid */

export function PrinciplesGrid({
  label,
  title,
  items,
}: {
  label: string;
  title: ReactNode;
  items: { name: string; body: string }[];
}) {
  return (
    <div className="bg-paper py-20 text-ink sm:py-24 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Head label={label} title={title} />
          </div>
          <ul className="border-t border-ink/15">
            {items.map((it) => (
              <li
                key={it.name}
                className="grid gap-3 border-b border-ink/15 py-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8 sm:py-12"
              >
                <h3 className="font-display text-[clamp(1.4rem,2.3vw,2rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                  {it.name}
                </h3>
                <p className="text-muted sm:text-lg">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
