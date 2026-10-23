"use client";

import { altFor } from "@/lib/image-alts";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/components/sections/HomeInteractive";
import { useAutoSteps } from "@/components/sections/useAutoSteps";

/**
 * Editorial, photograph-led section patterns: stages as a staircase
 * (VibeStairs), an audience index with a photograph (AudienceIndex), a
 * photographic before/after slider (PhotoCompare), a black-and-white collage
 * (IsNotCollage) and an edge-to-edge mosaic (MetricsMosaic). Photographs keep real black and white
 * in both themes (true-tone); all text stays in the DOM, and reduced motion
 * shows everything at rest.
 */

function Head({ label, title }: { label?: string; title?: ReactNode }) {
  return (
    <div className="max-w-4xl">
      {label ? <p className="text-[0.95rem] font-medium text-white/70">{label}</p> : null}
      {title ? <h2 className="font-display mt-6 text-[clamp(1.75rem,2.72vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h2> : null}
    </div>
  );
}

/* -------------------------------------------------------------- VibeStairs */

/**
 * Stages as a staircase: each card stands a step higher than the one before,
 * climbing to the right — the next level, literally. The current stage is
 * lit (inverted, its photograph brightened) and the light climbs the steps by
 * itself; clicking a step holds it there. Phones: the steps stack.
 */
export function VibeStairs({
  label,
  title,
  items,
  foot,
}: {
  label?: string;
  title?: ReactNode;
  items: readonly { n: string; name: string; body: string; image: string }[];
  foot?: ReactNode;
}) {
  const { ref, ...auto } = useAutoSteps(items.length, { rewind: true, holdMs: 3800 });
  return (
    <div ref={ref} className="bg-black py-20 text-white sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <Head label={label} title={title} />
          {foot ? <div className="shrink-0">{foot}</div> : null}
        </div>
        <ol className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {items.map((x, i) => {
            const on = i === auto.active;
            return (
              <li key={x.name} className="stair-step" style={{ "--rise": i } as CSSProperties}>
                <button
                  type="button"
                  aria-current={on || undefined}
                  onClick={() => (on ? auto.resume() : auto.goTo(i))}
                  className={
                    "true-tone flex w-full flex-col overflow-hidden rounded-[1.25rem] text-left transition-[background-color,color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                    (on
                      ? "-translate-y-2 bg-white text-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.35)] ring-1 ring-black/10"
                      : "bg-[#141414] text-white ring-1 ring-white/10 hover:bg-[#1c1c1c]")
                  }
                >
                  <span className="photo-tone relative block aspect-[4/3] overflow-hidden bg-black">
                    <Image
                      src={x.image}
                      alt={altFor(x.image)}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      style={{ opacity: on ? 1 : 0.45, transform: on ? "scale(1.04)" : "scale(1)" }}
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className={"text-sm tabular-nums " + (on ? "text-black/55" : "text-white/50")}>{x.n}</span>
                    <span className="serif-accent mt-3 block text-[1.55rem] !leading-[1.08] tracking-[-0.01em]">{x.name}</span>
                    <span className={"mt-3 block text-[0.92rem] leading-relaxed " + (on ? "text-black/70" : "text-white/60")}>{x.body}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- AudienceIndex */

/**
 * Who it is for, as an editorial index: every audience listed large down the
 * left, the current one at full strength and the rest receded, with a large
 * photograph beside the list that changes with it. Plays by itself; pointing
 * at an audience shows it, clicking one holds it there.
 */
export function AudienceIndex({ items, images }: { items: readonly string[]; images: readonly string[] }) {
  const { ref, ...auto } = useAutoSteps(items.length, { rewind: true, holdMs: 3000 });
  const img = (i: number) => images[i % images.length];
  return (
    <div ref={ref} className="mt-16 grid gap-10 sm:mt-24 lg:grid-cols-12 lg:gap-16">
      <ol className="border-t border-current/15 lg:col-span-7" onPointerLeave={(e) => e.pointerType === "mouse" && auto.resume()}>
        {items.map((t, i) => {
          const on = i === auto.active;
          return (
            <li key={t} className="border-b border-current/15">
              <button
                type="button"
                aria-current={on || undefined}
                onClick={() => auto.goTo(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && !on && auto.goTo(i)}
                className="group flex w-full items-baseline gap-6 py-4 text-left sm:py-5"
              >
                <span className="w-8 shrink-0 text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className="serif-accent text-[clamp(1.6rem,2.8vw,2.7rem)] !leading-[1.08] tracking-[-0.015em] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: on ? 1 : 0.28, transform: on ? "translateX(0.4rem)" : "none" }}
                >
                  {t}
                </span>
                <span aria-hidden className="ml-auto self-center text-lg transition-[opacity,transform] duration-500" style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateX(-0.5rem)" }}>
                  →
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="photo-tone relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-black lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        {items.map((t, i) => (
          <Image
            key={t}
            src={img(i)}
            alt={i === auto.active ? altFor(img(i)) : ""}
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover grayscale transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ opacity: i === auto.active ? 1 : 0, transform: i === auto.active ? "scale(1)" : "scale(1.06)" }}
          />
        ))}
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        <span aria-hidden className="absolute bottom-6 left-6 right-6 h-px bg-white/25">
          <span key={auto.active} className="quote-bar block h-full origin-left bg-white" data-state={auto.paused ? "hold" : "run"} style={{ animationDuration: `${auto.holdMs}ms` }} />
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ PhotoCompare */

/**
 * Before and after as two photographs under one drag handle: the before muted
 * and soft, the after crisp. Each side carries its label as a pill and its
 * text on a frosted panel; on first sight the handle sways once to show it
 * moves.
 */
export function PhotoCompare({
  before,
  after,
  beforeImage,
  afterImage,
}: {
  before: ReactNode;
  after: ReactNode;
  beforeImage: string;
  afterImage: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [x, setX] = useState(50);
  const move = (clientX: number) => {
    touched.current = true;
    const r = ref.current?.getBoundingClientRect();
    if (r) setX(Math.min(94, Math.max(6, ((clientX - r.left) / r.width) * 100)));
  };

  // A single sway on first sight: 50 → 40 → 60 → 50, unless someone got there first.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          if (touched.current) return;
          const k = Math.min(1, (t - t0) / 2200);
          setX(50 - 10 * Math.sin(k * Math.PI * 2) * (1 - k * 0.3) * (k < 1 ? 1 : 0));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  const pill = "absolute top-5 rounded-full px-5 py-2.5 text-sm font-medium backdrop-blur-md sm:top-7";
  const panel = "absolute bottom-20 hidden max-w-[min(25rem,40%)] rounded-2xl p-6 text-[0.98rem] leading-relaxed backdrop-blur-xl sm:block lg:p-7";
  return (
    <div className="bg-black py-20 text-white sm:py-28">
      <div className="container-x">
        <div
          ref={ref}
          className="true-tone photo-tone relative h-[clamp(26rem,74svh,46rem)] touch-pan-y select-none overflow-hidden rounded-[1.75rem] bg-[#222] shadow-[0_60px_120px_-50px_rgb(0_0_0/0.8)] ring-1 ring-white/10"
          onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
          onPointerDown={(e) => move(e.clientX)}
        >
          <div className="absolute inset-0">
            <Image src={beforeImage} alt={altFor(beforeImage)} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover brightness-[0.85] contrast-[0.75] grayscale" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
            <span className={pill + " left-5 bg-black/55 text-white ring-1 ring-white/15 sm:left-7"}>Before</span>
            <p className={panel + " left-7 bg-white/70 text-black"}>{before}</p>
          </div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
            <Image src={afterImage} alt={altFor(afterImage)} fill sizes="(min-width: 1024px) 80vw, 100vw" className="object-cover contrast-[1.12] grayscale" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <span className={pill + " right-5 bg-white/85 text-black sm:right-7"}>After</span>
            <p className={panel + " right-7 bg-black/55 text-right text-white ring-1 ring-white/10"}>{after}</p>
          </div>
          <span aria-hidden className="absolute inset-y-0 w-[2px] -translate-x-1/2 bg-white shadow-[0_0_24px_rgb(0_0_0/0.4)]" style={{ left: `${x}%` }} />
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-[0_12px_40px_rgb(0_0_0/0.35)] ring-8 ring-white/25"
            style={{ left: `${x}%` }}
          >
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
          <span aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 inline-flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/60 px-5 py-2.5 text-sm text-white ring-1 ring-white/15 backdrop-blur-md">
            <span className="size-2 rounded-full bg-white" />
            Drag to compare.
          </span>
          <input
            type="range"
            min={6}
            max={94}
            value={Math.round(x)}
            onChange={(e) => {
              touched.current = true;
              setX(+e.target.value);
            }}
            aria-label="Compare before and after"
            className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        {/* Phones: the two texts under the photographs. */}
        <div className="mt-8 grid gap-6 sm:hidden">
          <div>
            <p className="text-sm font-medium text-white/60">Before</p>
            <p className="mt-2 leading-relaxed text-white/80">{before}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-white/60">After</p>
            <p className="mt-2 leading-relaxed">{after}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- IsNotCollage */

/**
 * A black-and-white editorial collage: the headline set huge and running over
 * a tall photograph (where it inverts), two smaller photographs placed off the
 * grid, and the claims as a quiet struck-through register in small capitals.
 */
export function IsNotCollage({
  label,
  title,
  items,
  images,
}: {
  label?: string;
  title: string;
  items: readonly string[];
  /** Tall centre photograph, small left one, and the one cropped by the right edge. */
  images: readonly [string, string, string];
}) {
  const [tall, small, edge] = images;
  return (
    <div className="relative overflow-hidden bg-paper py-20 text-ink sm:py-28 lg:py-32">
      <div className="container-x relative">
        {/* Phones: heading, photograph, register in that order (flex order); wide screens: the grid, painted in source order. */}
        <div className="relative flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-6">
          {/* The tall photograph: centre right, from the top. */}
          <div className="photo-tone relative mt-10 aspect-[4/5] overflow-hidden bg-black lg:col-span-4 lg:col-start-6 lg:row-start-1 lg:mt-24 lg:aspect-[4/5.4]">
            <Image src={tall} alt={altFor(tall)} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover grayscale" />
          </div>
          {/* The headline over it; letters that cross the photograph invert. */}
          {/* No stacking context of its own here, so the blend reaches the photograph. */}
          <div className="order-first lg:order-none lg:col-span-9 lg:col-start-1 lg:row-start-1">
            {label ? <p className="text-[0.95rem] font-medium text-muted">{label}</p> : null}
            <h2 className="mt-6 text-[clamp(3.4rem,9vw,9.5rem)] leading-[0.9] tracking-[-0.03em] text-[#fff] mix-blend-difference">
              <span className="serif-accent">{title}</span>
            </h2>
          </div>
          {/* The register, in small capitals, struck through as it arrives. */}
          <ol className="relative z-10 mt-12 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-[clamp(14rem,22vw,20rem)] lg:self-start">
            {items.map((t, i) => (
              <li key={t} className="flex gap-4 border-t border-current/15 py-3.5 last:border-b">
                <span aria-hidden className="w-6 shrink-0 pt-0.5 text-xs tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.92rem] font-medium uppercase leading-snug tracking-[0.06em]">
                  <span className="strike-text">{t}</span>
                </span>
              </li>
            ))}
          </ol>
          {/* Off-grid photographs (wide screens only). */}
          <div className="photo-tone relative hidden aspect-[4/2.8] overflow-hidden bg-black lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:mt-12 lg:block">
            <Image src={small} alt={altFor(small)} fill sizes="22vw" className="object-cover grayscale" />
          </div>
          <div className="photo-tone relative hidden aspect-[3/4] overflow-hidden bg-black lg:col-span-3 lg:col-start-11 lg:row-start-1 lg:mt-[clamp(16rem,24vw,22rem)] lg:block">
            <Image src={edge} alt={altFor(edge)} fill sizes="22vw" className="object-cover grayscale" />
          </div>
        </div>
        <div aria-hidden className="mt-14 hidden items-center gap-4 text-sm lg:flex">
          <span className="h-px w-12 bg-current" />
          <span className="font-medium">{label}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- MetricsMosaic */

/**
 * An editorial mosaic, edge to edge: a three-by-three grid alternating full
 * photographs with white cells — the heading, the measures as numbered lists
 * with their questions, and the closing line as a quotation.
 */
export function MetricsMosaic({
  label,
  title,
  text,
  items,
  images,
}: {
  label?: string;
  title: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; q: string }[];
  /** Five photographs: the four corners and the centre. */
  images: readonly [string, string, string, string, string];
}) {
  const split = Math.ceil(items.length / 2) - 1; // 7 → 3 on the left, 4 on the right
  const list = (from: number, to: number) => (
    <ol className="w-full max-w-md">
      {items.slice(from, to).map((m, k) => (
        <li key={m.name} className="grid grid-cols-[2.75rem_1fr] border-b border-current/15 py-4 first:pt-0 last:border-b-0 last:pb-0">
          <span className="font-display text-[1.6rem] leading-none tracking-[-0.04em] tabular-nums">{String(from + k + 1).padStart(2, "0")}</span>
          <span>
            <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.14em]">{m.name}</span>
            <span className="mt-1.5 block text-[0.92rem] leading-relaxed text-muted">{m.q}</span>
          </span>
        </li>
      ))}
    </ol>
  );
  const photo = (src: string, cls = "") => (
    <div className={"photo-tone relative min-h-[18rem] overflow-hidden bg-black " + cls}>
      <Image src={src} alt={altFor(src)} fill sizes="(min-width: 1024px) 34vw, 100vw" className="object-cover grayscale transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]" />
    </div>
  );
  const cell = "flex min-h-[18rem] items-center bg-paper px-8 py-12 text-ink sm:px-12 lg:px-[clamp(2.5rem,4vw,5rem)]";
  return (
    <div className="grid bg-paper lg:grid-cols-3 lg:grid-rows-[minmax(20rem,auto)_minmax(22rem,auto)_minmax(20rem,auto)]">
      {photo(images[0], "hidden lg:block")}
      <div className={cell}>
        <div className="max-w-md">
          {label ? <p className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</p> : null}
          <h2 className="font-display mt-6 text-[clamp(1.75rem,2.4vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.03em]">{title}</h2>
        </div>
      </div>
      {photo(images[1], "hidden lg:block")}
      <div className={cell}>{list(0, split)}</div>
      {photo(images[2])}
      <div className={cell}>{list(split, items.length)}</div>
      {photo(images[3], "hidden lg:block")}
      <div className={cell + " justify-center text-center"}>
        {text ? (
          <figure className="max-w-sm">
            <span aria-hidden className="font-display text-5xl leading-none">“</span>
            <blockquote className="mt-4 text-[0.95rem] font-medium uppercase leading-relaxed tracking-[0.12em]">{text}</blockquote>
            <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-current/40" />
          </figure>
        ) : null}
      </div>
      {photo(images[4], "hidden lg:block")}
    </div>
  );
}
