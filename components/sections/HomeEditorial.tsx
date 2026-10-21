"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePinProgress, useReducedMotion, useScrollFrame } from "./HomeInteractive";

/**
 * Editorial, full-screen home sections (black and white, image-led):
 * - Relay: the growth chain as one huge word at a time, each handing over to the next.
 * - WhySplit: a photograph per reason beside the reason set large, with an index.
 * - InsightGallery: tall photo cards gliding sideways as you scroll down.
 * All text stays in the DOM; reduced motion shows everything without pinning.
 */

const n2 = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Relay drum geometry: each face is 1.75em tall, 32° apart on the cylinder. */
const DRUM_STEP = 32;
const DRUM_R = 0.875 / Math.tan(((DRUM_STEP / 2) * Math.PI) / 180);

const MQ = "(min-width: 768px)";
const subscribeMQ = (cb: () => void) => {
  const m = window.matchMedia(MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
function useWide() {
  return useSyncExternalStore(subscribeMQ, () => window.matchMedia(MQ).matches, () => true);
}

/** Scroll the page so a pinned track shows step i of n. */
function scrollToStep(track: HTMLElement | null, i: number, n: number) {
  if (!track) return;
  const r = track.getBoundingClientRect();
  const run = r.height - window.innerHeight;
  const y = window.scrollY + r.top + run * ((i + 0.5) / n);
  const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/* ------------------------------------------------------------------ Relay */

export function Relay({
  label,
  title,
  chain,
  last,
  foot,
}: {
  label: string;
  title: ReactNode;
  chain: readonly { from: string; to: string }[];
  last: { lead: string; rest: string };
  foot?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const steps = [...chain.map((c) => ({ lead: c.from, verb: "affects", rest: c.to })), { lead: last.lead, verb: "", rest: last.rest }];
  const n = steps.length;
  const active = Math.min(n - 1, Math.floor(p * n * 0.999));
  const labels = steps.map((x) => x.lead);
  // Continuous position on the drum: each step holds still for most of its
  // stretch of scroll, then the drum rolls to the next in the last third.
  const seg = p * n;
  const base = Math.min(n - 1, Math.floor(seg));
  const fp = Math.min(n - 1, base + clamp((seg - base - 0.62) / 0.38));

  if (reduced) {
    return (
      <div className="bg-black py-20 text-white sm:py-28">
        <div className="container-x">
          <p className="text-sm text-white/55">{label}</p>
          <h2 className="font-display mt-3 max-w-xl text-[1.6rem] font-medium leading-[1.15] tracking-[-0.02em] sm:text-[1.9rem]">{title}</h2>
          <ol className="mt-12 space-y-3">
            {steps.map((x) => (
              <li key={x.lead} className="font-display text-[clamp(1.6rem,4vw,3rem)] font-medium tracking-[-0.035em]">
                {x.lead} <span className="text-white/45">{x.verb} {x.rest}</span>
              </li>
            ))}
          </ol>
          {foot ? <div className="mt-10 max-w-md text-white/60">{foot}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${100 + n * 55}lvh` }} className="bg-black text-white">
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden">
        <div className="container-x flex flex-1 flex-col pb-8 pt-24 sm:pb-10 sm:pt-28">
          {/* Heading, small and quiet, so the word is the event. */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="max-w-md">
              <p className="text-sm text-white/55">{label}</p>
              <h2 className="font-display mt-3 text-[1.25rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[1.6rem]">{title}</h2>
            </div>
            <p aria-hidden className="font-display text-sm tabular-nums text-white/55">
              {n2(active)} <span className="text-white/30">/ {String(n).padStart(2, "0")}</span>
            </p>
          </div>

          {/* The relay on a 3D drum: every link sits on the face of a cylinder;
              scrolling turns it, so the word being read tilts up and away while
              the next one rolls up from below into place. */}
          <div className="relative flex flex-1 items-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_16%,black_84%,transparent)] [perspective:1500px] [perspective-origin:30%_50%]">
            <div
              className="relative h-[1.75em] w-full text-[clamp(3.25rem,12vw,10.5rem)] [transform-style:preserve-3d]"
              style={{ transform: `translateZ(-${DRUM_R}em) rotateX(${fp * DRUM_STEP}deg)` }}
            >
              {steps.map((x, i) => {
                const d = Math.abs(i - fp);
                return (
                  <div
                    key={x.lead}
                    aria-hidden={i !== active}
                    className="absolute inset-0 flex flex-col justify-center [backface-visibility:hidden]"
                    style={{
                      transform: `rotateX(${-i * DRUM_STEP}deg) translateZ(${DRUM_R}em)`,
                      // Only the word being read is solid; its neighbours exist only mid-roll.
                      opacity: clamp(1 - d * 1.15),
                      visibility: d >= 0.9 ? "hidden" : "visible",
                    }}
                  >
                    <p className="font-display font-medium leading-[0.86] tracking-[-0.06em]">{x.lead}</p>
                    <p className="mt-[0.12em] flex flex-wrap items-baseline gap-x-[0.18em] font-display text-[max(0.34em,1.4rem)] font-medium leading-[1] tracking-[-0.04em]">
                      {x.verb ? (
                        <span className="font-sans text-[max(0.4em,0.7rem)] font-normal uppercase tracking-[0.3em] text-white/55">{x.verb}</span>
                      ) : null}
                      <span className="relay-outline">{x.rest}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* The chain: every link, joined by a line that fills as it is read. */}
          <div className="relative">
            <div aria-hidden className="absolute left-0 right-0 top-[0.4rem] h-px bg-white/15" />
            <div
              aria-hidden
              className="absolute left-0 top-[0.4rem] h-px origin-left bg-white transition-transform duration-500 ease-out"
              style={{ width: "100%", transform: `scaleX(${n > 1 ? active / (n - 1) : 1})` }}
            />
            <ol className="relative flex justify-between">
              {labels.map((t, i) => (
                <li key={t} className="flex flex-col items-center gap-3 first:items-start last:items-end">
                  <span
                    className={
                      "size-[0.8rem] rounded-full border transition-colors duration-500 " +
                      (i <= active ? "border-white bg-white" : "border-white/35 bg-black")
                    }
                  />
                  <span
                    className={
                      "text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-500 sm:text-xs " +
                      (i === active ? "text-white" : "hidden text-white/40 md:inline")
                    }
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {foot ? (
            <div
              className="mt-8 max-w-md text-sm text-white/60 transition-opacity duration-700 sm:text-base"
              style={{ opacity: active === n - 1 ? 1 : 0.35 }}
            >
              {foot}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- WhySplit */

export function WhySplit({
  label,
  title,
  items,
}: {
  label: string;
  title: ReactNode;
  items: readonly { name: string; body: string; image: string }[];
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;
  const active = Math.min(n - 1, Math.floor(p * n * 0.999));
  // Each reason holds for most of its stretch, then turns over in the last third.
  const seg = p * n;
  const turn = (i: number) => clamp((seg - i - 0.62) / 0.38);
  const fp = Math.min(n - 1, Math.floor(seg) + turn(Math.floor(seg)));

  if (reduced) {
    return (
      <div className="container-x py-20 sm:py-28">
        <p className="text-sm text-muted">{label}</p>
        <h2 className="font-display mt-3 max-w-xl text-[1.6rem] font-medium leading-[1.15] tracking-[-0.02em] sm:text-[1.9rem]">{title}</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2">
          {items.map((x, i) => (
            <li key={x.name}>
              <span className="text-sm tabular-nums text-muted">{n2(i)}</span>
              <h3 className="font-display mt-2 text-[1.75rem] font-medium leading-[1.1] tracking-[-0.03em]">{x.name.replace(/\.$/, "")}</h3>
              <p className="mt-3 text-muted">{x.body}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `${100 + n * 60}lvh` }}>
      <div className="sticky top-0 grid h-[100lvh] grid-rows-[38%_1fr] md:grid-cols-2 md:grid-rows-1">
        {/* The photograph for the reason being read, with its numeral. */}
        {/* Photographs stacked like pages: as a reason is finished, its photograph
            turns away on its left edge (3D), revealing the next one beneath. */}
        <div className="relative overflow-hidden bg-black [perspective:1800px]">
          {items.map((x, i) => {
            const t = turn(i);
            const gone = i < n - 1 && t >= 1;
            return (
              <div
                key={x.image + i}
                aria-hidden
                className="absolute inset-0 origin-left [backface-visibility:hidden] [transform-style:preserve-3d]"
                style={{
                  zIndex: n - i,
                  transform: i < n - 1 ? `rotateY(${-t * 105}deg)` : undefined,
                  visibility: gone ? "hidden" : "visible",
                }}
              >
                <Image
                  src={x.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale"
                  style={{ opacity: 0.85, scale: String(1.06 - Math.min(1, Math.max(0, seg - i + 0.4)) * 0.06) }}
                />
                {/* The page darkens as it turns away from the light. */}
                <span className="absolute inset-0 bg-black" style={{ opacity: t * 0.75 }} />
              </div>
            );
          })}
          <div aria-hidden className="absolute inset-0 z-30 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <p
            aria-hidden
            key={active}
            className="why-count absolute bottom-4 left-5 z-30 font-display text-[clamp(4.5rem,13vw,13rem)] leading-[0.8] tracking-[-0.06em] text-white sm:bottom-8 sm:left-10"
          >
            {n2(active)}
          </p>
        </div>

        {/* The reason, set large, and the index of all of them. */}
        <div className="flex flex-col justify-between px-5 pb-6 pt-6 sm:px-10 sm:pb-10 md:pt-28 lg:px-16">
          <div>
            <p className="text-sm text-muted">{label}</p>
            <h2 className="font-display mt-2 max-w-md text-[1.15rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[1.5rem]">{title}</h2>
          </div>
          {/* Reasons stacked in one cell, flipping over on their horizontal axis
              like a split-flap board as the scroll moves past each one. */}
          <div className="my-6 grid [perspective:1200px]">
            {items.map((x, i) => {
              const d = i - fp;
              return (
                <div
                  key={x.name}
                  aria-hidden={i !== active}
                  className="col-start-1 row-start-1 origin-[50%_50%_-2rem] [backface-visibility:hidden]"
                  style={{
                    transform: `rotateX(${Math.max(-90, Math.min(90, -d * 90))}deg)`,
                    // Each reason clears before the next arrives, so they never overlap.
                    opacity: clamp(1 - Math.abs(d) * 2),
                    visibility: Math.abs(d) >= 1 ? "hidden" : "visible",
                  }}
                >
                  <h3 className="font-display text-[clamp(1.9rem,4.2vw,4rem)] font-medium leading-[1] tracking-[-0.045em]">
                    {x.name.replace(/\.$/, "")}
                  </h3>
                  <p className="mt-4 max-w-lg text-muted sm:mt-6 sm:text-lg">{x.body}</p>
                </div>
              );
            })}
          </div>
          {/* The index fills as it is read: a band sweeps across the reason in step
              with the scroll, flipping forward in 3D as it arrives; the text inverts
              under it. Reasons already read keep a filled rule. */}
          {/* Own backdrop (isolate + paper), so the text's "difference" blend always has a ground to invert against. */}
          <ol className="hidden border-t border-current/15 bg-paper [isolation:isolate] [perspective:900px] md:block">
            {items.map((x, i) => {
              const f = clamp(p * n - i);
              const on = i === active;
              return (
                <li key={x.name} className="relative">
                  <button
                    type="button"
                    onClick={() => scrollToStep(ref.current, i, n)}
                    className="relative flex w-full items-center gap-4 overflow-hidden border-b border-current/15 px-3 py-2.5 text-left text-sm"
                    aria-current={on ? "step" : undefined}
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-top bg-ink transition-transform duration-500 ease-out"
                      style={{
                        clipPath: `inset(0 ${(1 - (on ? f : 0)) * 100}% 0 0)`,
                        transform: on ? "rotateX(0deg)" : "rotateX(-90deg)",
                      }}
                    />
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-ink"
                      style={{ transform: `scaleX(${i < active ? 1 : 0})`, transition: "transform 600ms ease-out" }}
                    />
                    {/* White text with "difference": dark on the page, white on the band. */}
                    <span className="relative w-6 tabular-nums text-white mix-blend-difference">{n2(i)}</span>
                    <span
                      className="relative flex-1 text-white mix-blend-difference transition-opacity duration-500"
                      style={{ opacity: on || i < active ? 1 : 0.5 }}
                    >
                      {x.name.replace(/\.$/, "")}
                    </span>
                    <span aria-hidden className="relative tabular-nums text-xs text-white mix-blend-difference" style={{ opacity: on ? 1 : 0 }}>
                      {Math.round(f * 100)}%
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div aria-hidden className="flex gap-1.5 md:hidden">
            {items.map((_, i) => (
              <span key={i} className="h-[3px] flex-1 bg-current/15">
                <span className="block h-full origin-left bg-current" style={{ transform: `scaleX(${clamp(p * n - i)})` }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- InsightGallery */

export function InsightGallery({
  head,
  items,
}: {
  head: ReactNode;
  items: readonly { name: string; body: string; href: string; image: string }[];
}) {
  const reduced = useReducedMotion();
  const wide = useWide();
  const pin = wide && !reduced;
  const [ref, p] = usePinProgress(pin);
  const row = useRef<HTMLOListElement>(null);
  const [dist, setDist] = useState(0);
  useScrollFrame(() => {
    const el = row.current;
    if (el) setDist(Math.max(0, el.scrollWidth - el.clientWidth));
  }, pin);

  const cards = (
    <ol
      ref={row}
      className={
        "flex gap-4 sm:gap-5 " +
        (pin ? "" : "snap-x snap-mandatory overflow-x-auto pb-4 [scrollbar-width:none]")
      }
      style={pin ? { transform: `translateX(${-p * dist}px)` } : undefined}
    >
      {items.map((it, i) => (
        <li
          key={it.href}
          className={
            "shrink-0 snap-start " +
            (i === 0 ? "w-[86vw] md:w-[min(46vw,44rem)]" : "w-[78vw] md:w-[min(28vw,24rem)]")
          }
        >
          <Link
            href={it.href}
            className="group relative flex h-[min(62lvh,34rem)] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-black p-6 text-white sm:p-8"
          >
            <Image
              src={it.image}
              alt=""
              fill
              sizes="(min-width: 768px) 30vw, 80vw"
              className="object-cover opacity-70 grayscale transition-[scale,opacity] duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-85"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <span className="relative flex items-center justify-between text-sm text-white/70">
              <span>Insights</span>
              <span className="tabular-nums">
                {n2(i)} / {String(items.length).padStart(2, "0")}
              </span>
            </span>
            <span className="relative">
              <span
                className={
                  "block font-display font-medium leading-[1] tracking-[-0.04em] " +
                  (i === 0 ? "text-[clamp(2.25rem,4.4vw,4.25rem)]" : "text-[clamp(1.6rem,2.2vw,2.1rem)]")
                }
              >
                {it.name}
              </span>
              <span className="mt-3 flex items-end justify-between gap-6">
                <span className="max-w-sm text-[0.95rem] text-white/70">{it.body}</span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/40 transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );

  if (!pin) {
    return (
      <div className="py-20 sm:py-28">
        <div className="container-x">{head}</div>
        <div className="mt-10 pl-[max(1.25rem,calc((100vw-80rem)/2))] sm:mt-14">{cards}</div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `calc(100lvh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col justify-center gap-10 overflow-hidden">
        <div className="container-x flex items-end justify-between gap-8">
          {head}
          {/* How far along the gallery is. */}
          <div aria-hidden className="mb-2 hidden h-px w-40 bg-current/15 lg:block">
            <div className="h-px origin-left bg-current" style={{ transform: `scaleX(${clamp(p)})` }} />
          </div>
        </div>
        <div className="container-x">{cards}</div>
      </div>
    </div>
  );
}
