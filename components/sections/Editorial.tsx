"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import { usePinProgress, useReducedMotion, useScrollFrame } from "./HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * Premium section designs for the inner pages (black and white, editorial,
 * image-led). Each takes the page's own wording; nothing here adds text.
 *
 * - CinemaHero: full-screen photo hero, headline large at the lower left.
 * - QuoteStage: pinned quotes, each answered beneath.
 * - Ledger: names set large on the left, their explanation on the right; rows invert.
 * - FlipTiles: tiles that turn over in 3D to show their detail.
 * - CompareSlider: before / after with a divider you can drag.
 * - FullBleed: a full-width photograph that settles as it passes.
 *
 * Each is used once on the site (see the animation registry). All text stays
 * in the DOM. Reduced motion: nothing pins; everything is shown.
 */

const clamp = (v: number) => Math.min(1, Math.max(0, v));

function Head({ label, title, text, dark }: { label?: string; title?: ReactNode; text?: ReactNode; dark?: boolean }) {
  if (!label && !title) return null;
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

/* ------------------------------------------------------------- CinemaHero */

export function CinemaHero({
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
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  useScrollFrame(() => {
    const el = ref.current;
    if (el) setP(clamp(-el.getBoundingClientRect().top / el.offsetHeight));
  }, !reduced);
  return (
    <section ref={ref} className="photo-tone relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-black text-white">
      <Image
        src={image}
        alt={altFor(image)}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[22%_center] grayscale lg:object-center"
        style={{ scale: `${1.05 - 0.05 * (1 - p)}`, translate: `0 ${p * 8}%` }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
      <div className="container-x relative grid gap-14 pb-12 pt-40 sm:pb-16 lg:grid-cols-12 lg:items-end lg:gap-12" style={{ opacity: 1 - p * 1.2 }}>
        <div className="lg:col-span-8">
          <p className="animate-fade text-sm uppercase tracking-[0.22em] text-white/60">{eyebrow}</p>
          <h1
            data-split="load"
            className="font-display mt-8 text-[clamp(2.4rem,6.2vw,6.25rem)] font-medium leading-[0.95] tracking-[-0.045em] [&_.serif-accent]:text-white/55"
          >
            {title}
          </h1>
        </div>
        <div className="animate-rise [animation-delay:450ms] lg:col-span-4 lg:pb-3">
          {intro ? <div className="text-white/75 [&_p]:leading-relaxed">{intro}</div> : null}
          {children ? <div className="mt-10 [&>div]:!items-start">{children}</div> : null}
        </div>
      </div>
      <div aria-hidden className="relative flex justify-center pb-8 text-sm uppercase tracking-[0.3em] text-white/60">
        <span className="flex flex-col items-center gap-2">
          Scroll
          <span className="relative h-8 w-px overflow-hidden bg-white/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[l141-cue_1.8s_ease-in-out_infinite] bg-white" />
          </span>
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- QuoteStage */

export function QuoteStage({
  label,
  title,
  text,
  items,
  action,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { quote: string; answer: ReactNode; note?: ReactNode }[];
  action?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;
  const active = Math.min(n - 1, Math.floor(p * n * 0.999));
  const it = items[active];

  if (reduced) {
    return (
      <div className="bg-black py-20 text-white sm:py-24 lg:py-24">
        <div className="container-x">
          <Head label={label} title={title} text={text} dark />
          <ol className="mt-12 space-y-12">
            {items.map((x) => (
              <li key={x.quote}>
                <p className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-medium leading-[1.1]">“{x.quote}”</p>
                <div className="mt-6 text-lg">{x.answer}</div>
                {x.note ? <div className="mt-2 text-white/75">{x.note}</div> : null}
              </li>
            ))}
          </ol>
          {action ? <div className="mt-12">{action}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-black text-white" style={{ height: `${100 + n * 70}lvh` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden">
        <div className="container-x flex flex-1 flex-col justify-center pb-10 pt-16 sm:pt-28">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <Head label={label} title={title} text={text} dark />
            {action ? <div className="shrink-0">{action}</div> : null}
          </div>
          <div className="relative mt-12 flex flex-col sm:mt-14">
            <span aria-hidden className="pointer-events-none absolute -left-2 top-1/2 -translate-y-[70%] font-display text-[clamp(10rem,30vw,26rem)] leading-none text-white/[0.06]">
              “
            </span>
            <div key={active} className="relay-in relative max-w-5xl">
              <p className="font-display text-[clamp(1.7rem,4.4vw,4.2rem)] font-medium leading-[1.05] tracking-[-0.035em]">“{it.quote}”</p>
              <div className="mt-10 grid gap-8 lg:gap-x-16 border-t border-white/15 pt-8 sm:grid-cols-2 sm:gap-10">
                <div className="text-lg sm:text-xl">{it.answer}</div>
                {it.note ? <div className="text-base leading-relaxed text-white/80 sm:text-lg">{it.note}</div> : null}
              </div>
            </div>
          </div>
          <div aria-hidden className="mt-12 flex items-center gap-4 sm:mt-14">
            <span className="flex flex-1 gap-1.5">
              {items.map((_, i) => (
                <span key={i} className="h-[2px] flex-1 bg-white/15">
                  <span className="block h-full origin-left bg-white" style={{ transform: `scaleX(${clamp(p * n - i)})` }} />
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Ledger */

export function Ledger({
  label,
  title,
  text,
  items,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { name: ReactNode; body?: ReactNode; meta?: ReactNode }[];
}) {
  return (
    <div className="container-x py-20 sm:py-24 lg:py-24">
      <Head label={label} title={title} text={text} />
      <ol className="mt-12 border-t border-current/15 sm:mt-16">
        {items.map((it, i) => (
          <li key={i} className="group relative border-b border-current/15">
            {/* A black band rises through the row on hover; the text inverts above it. */}
            <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-y-100" />
            <div className="relative grid gap-3 lg:gap-x-8 px-1 py-7 transition-colors duration-500 group-hover:text-paper sm:px-4 sm:py-9 lg:grid-cols-12 lg:items-baseline lg:gap-12">
              <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.035em] lg:col-span-6">{it.name}</h3>
              <div className="opacity-75 lg:col-span-5 lg:col-start-8 sm:text-lg">
                {it.body}
                {it.meta ? <div className="mt-4 text-sm opacity-80">{it.meta}</div> : null}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------- FlipTiles */

export function FlipTiles({
  label,
  title,
  text,
  items,
  cols = 3,
  dark,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { name: ReactNode; back: ReactNode; foot?: ReactNode; image?: string }[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
}) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={(dark ? "bg-black text-white " : "") + "py-20 sm:py-24 lg:py-24"}>
      <div className="container-x">
        <Head label={label} title={title} text={text} dark={dark} />
        <ul className={"mt-12 grid gap-3 sm:mt-16 " + grid}>
          {items.map((it, i) => (
            <FlipTile key={i} item={it} />
          ))}
        </ul>
        <p className={"mt-8 text-sm " + (dark ? "text-white/70" : "text-muted")}>Hover or tap a tile to turn it over.</p>
      </div>
    </div>
  );
}

function FlipTile({ item }: { item: { name: ReactNode; back: ReactNode; foot?: ReactNode; image?: string } }) {
  const [on, setOn] = useState(false);
  const face = "absolute inset-0 flex flex-col justify-between rounded-[1.25rem] p-8 [backface-visibility:hidden] sm:p-10";
  return (
    <li className="[perspective:1400px]">
      <button
        type="button"
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        onPointerEnter={(e) => e.pointerType === "mouse" && setOn(true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOn(false)}
        className="relative block h-[clamp(15rem,30vh,19rem)] w-full text-left transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform-style:preserve-3d]"
        style={{ transform: on ? "rotateY(180deg)" : "none" }}
      >
        {/* Front: a complete card — the measure set large, a hairline and the turn cue beneath it. */}
        <span className={face + " true-tone photo-tone overflow-hidden border border-white/20 bg-black text-white"}>
          {item.image ? (
            <>
              <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover opacity-60 grayscale" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/30 to-black/80" />
            </>
          ) : null}
          <span className="relative font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-medium leading-[1.04] tracking-[-0.035em]">{item.name}</span>
          <span aria-hidden className="relative flex items-center justify-between border-t border-current/15 pt-4 text-lg opacity-80">
            <span className="h-px w-10 bg-current" />
            <span>↻</span>
          </span>
        </span>
        <span className={face + " justify-end [transform:rotateY(180deg)] true-tone border border-black/15 bg-white text-black"}>
          <span>
            <span className="block text-[1.02rem] leading-relaxed">{item.back}</span>
            {item.foot ? <span className="mt-6 block border-t border-current/25 pt-3 text-sm opacity-80">{item.foot}</span> : null}
          </span>
        </span>
      </button>
    </li>
  );
}

/* ---------------------------------------------------------- CompareSlider */

export function CompareSlider({ before, after, dark }: { before: ReactNode; after: ReactNode; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(50);
  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setX(Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div className={dark ? "bg-black text-white" : undefined}>
    <div className="container-x py-20 sm:py-24 lg:py-24">
      <div
        ref={ref}
        className="relative h-[clamp(26rem,70svh,38rem)] touch-pan-y select-none overflow-hidden rounded-[1.25rem] border border-current/15"
        onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
        onPointerDown={(e) => move(e.clientX)}
      >
        <div className="absolute inset-0 flex flex-col justify-between bg-paper p-9 text-ink sm:p-16">
          <p className="font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-none tracking-[-0.05em] opacity-60">Before</p>
          <p className="max-w-lg text-lg opacity-80">{before}</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-end justify-between bg-ink p-9 text-right text-paper sm:p-16" style={{ clipPath: `inset(0 0 0 ${x}%)` }}>
          <p className="font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-none tracking-[-0.05em]">After</p>
          <p className="max-w-lg text-lg">{after}</p>
        </div>
        <div aria-hidden className="absolute inset-y-0 w-px bg-current mix-blend-difference" style={{ left: `${x}%` }} />
        <input
          type="range"
          min={8}
          max={92}
          value={Math.round(x)}
          onChange={(e) => setX(+e.target.value)}
          aria-label="Compare before and after"
          className="absolute inset-x-0 bottom-0 z-10 h-10 w-full cursor-ew-resize opacity-0"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-lg"
          style={{ left: `${x}%` }}
        >
          ⇆
        </span>
      </div>
      <p className={"mt-6 text-sm " + (dark ? "text-white/70" : "text-muted")}>Drag to compare.</p>
    </div>
    </div>
  );
}

/* --------------------------------------------------------------- FullBleed */

export function FullBleed({ image, alt, caption }: { image: string; alt: string; caption?: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0.5);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP(clamp((window.innerHeight - r.top) / (window.innerHeight + r.height)));
  }, !reduced);
  return (
    <figure ref={ref} className="photo-tone relative h-[clamp(22rem,85svh,56rem)] overflow-hidden bg-black">
      <Image src={image} alt={alt} fill sizes="100vw" className="object-cover grayscale" style={{ scale: `${1.06 - 0.06 * p}` }} />
      {caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container-x pb-10 pt-16 text-sm text-white/75">{caption}</div>
        </figcaption>
      ) : null}
    </figure>
  );
}

