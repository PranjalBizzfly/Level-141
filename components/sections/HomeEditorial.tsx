"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePinProgress, useReducedMotion, useScrollFrame } from "./HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * Editorial, full-screen home sections (black and white, image-led):
 * - Relay: the growth chain as tall photo cards gliding sideways, rising into line.
 * - WhySplit: a 3D cube, one face per reason, beside the full index of reasons.
 * - InsightGallery: tall photo cards gliding sideways as you scroll down.
 * All text stays in the DOM; reduced motion shows everything without pinning.
 */

const n2 = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));


const MQ = "(min-width: 768px)";
const subscribeMQ = (cb: () => void) => {
  const m = window.matchMedia(MQ);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
function useWide() {
  return useSyncExternalStore(subscribeMQ, () => window.matchMedia(MQ).matches, () => true);
}

/* ------------------------------------------------------------------ Relay */

/** One photograph per link of the chain, in order (black and white). */
const RELAY_IMAGES = [
  "/images/client-ceo-portrait.webp",
  "/images/client-keynote-auditorium.webp",
  "/images/client-walk-through-crowd.webp",
  "/images/client-mentorship-conversation.webp",
  "/images/home-team-table.webp",
  "/images/client-executive-library.webp",
  "/images/client-visionaries-horizon.webp",
];

/**
 * The growth chain as a gallery of tall photo cards gliding sideways as the
 * page scrolls (the reference's case-study row): each card arrives from the
 * right set lower and rises into line as it moves across, so the row reads
 * as a stepped climb. Phones and reduced motion get a swipeable row instead.
 */
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
  const wide = useWide();
  const pin = wide && !reduced;
  const [ref, p] = usePinProgress(pin);
  const row = useRef<HTMLOListElement>(null);
  const [geo, setGeo] = useState({ dist: 0, step: 0, view: 1 });
  useScrollFrame(() => {
    const el = row.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    setGeo({ dist: Math.max(0, el.scrollWidth - el.clientWidth), step: first.offsetWidth + gap, view: el.clientWidth || 1 });
  }, pin);

  const steps = [
    ...chain.map((c) => ({ lead: c.from, verb: "affects", rest: c.to })),
    { lead: last.lead, verb: "", rest: last.rest },
  ];
  const n = steps.length;
  const shift = p * geo.dist;

  const cards = (
    <ol
      ref={row}
      className={"flex items-end gap-4 sm:gap-5 " + (pin ? "" : "snap-x snap-mandatory overflow-x-auto pb-4 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-white/60")}
      style={pin ? { transform: `translateX(${-shift}px)` } : undefined}
      // As a swipeable row (phones), keyboard users can focus it and scroll it with the arrow keys.
      tabIndex={pin ? undefined : 0}
      aria-label={pin ? undefined : `${label}: swipe or use the arrow keys to see every link`}
    >
      {steps.map((x, i) => {
        // How far right of the row's left edge this card sits, 0 → 1 across the view.
        const along = clamp((i * geo.step - shift) / geo.view);
        // As in the reference row, every card stands on one baseline; a card
        // still arriving from the right is revealed shorter (cut from the top)
        // and grows to full height as it moves into place.
        const cut = pin ? Math.pow(along, 1.4) * 24 : 0;
        return (
          <li key={x.lead} className="w-[82vw] shrink-0 snap-start md:w-[min(28vw,25rem)]">
            <div
              className="photo-tone relative flex h-[min(64lvh,36rem)] flex-col justify-end overflow-hidden rounded-[1rem] bg-black p-6 text-white sm:p-7"
              style={pin ? { clipPath: `inset(${cut}% 0 0 0 round 1rem)` } : undefined}
            >
              <Image
                src={RELAY_IMAGES[i % RELAY_IMAGES.length]}
                alt={altFor(RELAY_IMAGES[i % RELAY_IMAGES.length])}
                fill
                sizes="(min-width: 768px) 30vw, 84vw"
                className="object-cover opacity-85 grayscale"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <span aria-hidden className="relative mb-3 text-sm tabular-nums text-white/70">
                {n2(i)} <span className="text-white/40">/ {String(n).padStart(2, "0")}</span>
              </span>
              <span className="relative">
                <span className="block font-display text-[clamp(1.75rem,2.3vw,2.4rem)] font-medium leading-[1] tracking-[-0.04em]">{x.lead}</span>
                <span className="mt-3 flex flex-wrap items-baseline gap-x-2 text-base">
                  {x.verb ? <span className="text-[0.7rem] uppercase tracking-[0.3em] text-white/60">{x.verb}</span> : null}
                  <span className="text-white/85">{x.rest}</span>
                </span>
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );

  const headBlock = (
    <div className="max-w-xl">
      <p className="text-sm text-white/55">{label}</p>
      <h2 className="font-display mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h2>
    </div>
  );

  if (!pin) {
    return (
      <div className="bg-black py-20 text-white sm:py-24">
        <div className="container-x">{headBlock}</div>
        <div className="mt-12 pl-[max(1.25rem,calc((100vw-80rem)/2))]">{cards}</div>
        {foot ? <div className="container-x mt-10 max-w-lg text-base text-white/75 sm:text-lg">{foot}</div> : null}
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-black text-white" style={{ height: `calc(100lvh + ${geo.dist}px)` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col justify-center gap-12 overflow-hidden">
        {/* Heading on the left; the closing line and the progress rule on the right. */}
        <div className="container-x grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">{headBlock}</div>
          <div className="lg:col-span-4 lg:col-start-9">
            {foot ? <div className="text-[0.95rem] leading-relaxed text-white/65">{foot}</div> : null}
            {/* How far along the chain is. */}
            <div aria-hidden className="mt-6 h-px bg-white/15">
              <div className="h-px origin-left bg-white" style={{ transform: `scaleX(${clamp(p)})` }} />
            </div>
          </div>
        </div>
        {/* Cards fade at the screen edges rather than being cut hard. */}
        <div className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="container-x">{cards}</div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- WhySplit */

/** Cube turns that bring each face to the front (six reasons, six faces). */
const CUBE_FACES = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];
/** The turn that brings each face to the front: side faces turn on Y, top and bottom on X. */
const CUBE_TARGETS = [
  { side: true, x: 0, y: 0 },
  { side: true, x: 0, y: -90 },
  { side: true, x: 0, y: -180 },
  { side: true, x: 0, y: 90 },
  { side: false, x: -90, y: 0 },
  { side: false, x: 90, y: 0 },
] as const;

/**
 * Why Level141 as a 3D cube beside the full index: each reason is one face
 * of the cube, photographed and numbered. Pointing at, tapping or tabbing to
 * a reason turns the cube to its face. Every reason is set in full in the
 * list, so nothing has to be scrolled through.
 */
export function WhySplit({
  label,
  title,
  items,
}: {
  label: string;
  title: ReactNode;
  items: readonly { name: string; body: string; image: string }[];
}) {
  const [active, setActive] = useState(0);
  const faces = items.slice(0, CUBE_FACES.length);
  // The cube keeps turning from where it is, always the short way round, so it
  // never spins 270° or tumbles when moving between faces.
  const [turn, setTurn] = useState({ x: 0, y: 0 });
  const go = useCallback((i: number) => {
    setActive(i);
    const target = CUBE_TARGETS[Math.min(i, CUBE_TARGETS.length - 1)];
    // Equivalent angle closest to where the cube is now (never more than 180° away).
    const nearest = (from: number, to: number) => to + 360 * Math.round((from - to) / 360);
    setTurn((t) =>
      target.side ? { x: nearest(t.x, 0), y: nearest(t.y, target.y) } : { x: nearest(t.x, target.x), y: nearest(t.y, 0) },
    );
  }, []);
  // Scrolling also turns the cube: the reason crossing the middle of the
  // screen becomes the active one (hover and focus still work on top of this).
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    // The active reason is the last one whose top has passed 70% of the screen,
    // so even the final reason (which can't reach the centre) gets its turn.
    let last = -1;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.7;
      let i = -1;
      rows.current.forEach((el, k) => {
        if (el && el.getBoundingClientRect().top < line) i = k;
      });
      if (i >= 0 && i !== last) {
        last = i;
        go(i);
      }
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", on);
    };
  }, [go]);
  return (
    <div className="container-x py-20 sm:py-24 lg:py-24">
      <div className="max-w-2xl">
        <p className="text-sm text-muted">{label}</p>
        <h2 className="font-display mt-4 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h2>
      </div>

      <div className="mt-12 grid items-start gap-20 sm:mt-16 md:grid-cols-12 md:gap-x-6 md:gap-y-24">
        <div className="md:sticky md:top-[max(6rem,calc(50lvh-17rem))] md:col-span-5">
          <div className="cube-scene" aria-hidden>
            <div className="cube" style={{ transform: `rotateX(-16deg) rotateY(24deg) rotateX(${turn.x}deg) rotateY(${turn.y}deg)` }}>
              {faces.map((x, i) => (
                <div key={x.image + i} className="cube-face photo-tone" style={{ transform: `${CUBE_FACES[i]} translateZ(calc(var(--cube) / 2))` }}>
                  <Image src={x.image} alt={altFor(x.image)} fill sizes="(min-width: 768px) 22rem, 70vw" className="object-cover grayscale" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  {/* Only the face turned to the front carries its numeral, so no
                      label is ever read sideways or upside down. */}
                  <span
                    className="font-display absolute bottom-4 left-5 text-[calc(var(--cube)*0.32)] leading-[0.8] tracking-[-0.06em] text-white transition-opacity duration-500"
                    style={{ opacity: i === active ? 1 : 0 }}
                  >
                    {n2(i)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ol className="border-t border-line md:col-span-7 md:ml-12 lg:ml-24 xl:ml-32">
          {items.map((x, i) => {
            const on = i === active;
            return (
              <li
                key={x.name}
                data-i={i}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                onMouseEnter={() => go(i)}
                onClick={() => go(i)}
                className="relative grid cursor-default grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-12 sm:py-14 sm:grid-cols-[3.5rem_1fr]"
              >
                <span
                  aria-hidden
                  className="absolute -top-px left-0 h-px w-full origin-left bg-ink transition-transform duration-500 ease-out motion-reduce:transition-none"
                  style={{ transform: `scaleX(${on ? 1 : 0})` }}
                />
                <span className={"pt-1 text-sm tabular-nums transition-colors duration-300 " + (on ? "text-ink" : "text-muted")}>{n2(i)}</span>
                <div>
                  <h3 className="font-display text-[clamp(1.35rem,2.2vw,2rem)] font-medium leading-[1.1] tracking-[-0.03em]">
                    <button
                      type="button"
                      onFocus={() => go(i)}
                      aria-pressed={on}
                      className="text-left outline-none focus-visible:underline focus-visible:underline-offset-4"
                    >
                      {x.name.replace(/\.$/, "")}
                    </button>
                  </h3>
                  <p className="mt-4 max-w-2xl text-muted">{x.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
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
            className="photo-tone group relative flex h-[min(62lvh,34rem)] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-black p-8 text-white sm:p-10"
          >
            <Image
              src={it.image}
              alt={altFor(it.image)}
              fill
              sizes={i === 0 ? "(min-width: 768px) 46vw, 86vw" : "(min-width: 768px) 30vw, 80vw"}
              className="object-cover opacity-70 grayscale transition-[scale,opacity] duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-85"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />
            <span className="relative text-sm text-white/80">The Next Level</span>
            <span className="relative">
              <span
                className={
                  "block font-display font-medium leading-[1] tracking-[-0.04em] " +
                  (i === 0 ? "text-[clamp(2.25rem,4.4vw,4.25rem)]" : "text-[clamp(1.6rem,2.2vw,2.1rem)]")
                }
              >
                {it.name}
              </span>
              <span className="mt-4 flex items-end justify-between gap-8">
                <span className="max-w-md text-[0.95rem] text-white/70">{it.body}</span>
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
      <div className="py-20 sm:py-24 lg:py-24">
        <div className="container-x">{head}</div>
        <div className="mt-12 pl-[max(1.25rem,calc((100vw-80rem)/2))] sm:mt-14">{cards}</div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `calc(100lvh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col justify-center gap-14 overflow-hidden">
        <div className="container-x flex items-end justify-between gap-12">
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
