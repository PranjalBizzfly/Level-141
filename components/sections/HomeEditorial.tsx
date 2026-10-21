"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { usePinProgress, useReducedMotion, useScrollFrame } from "./HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * Editorial, full-screen home sections (black and white, image-led):
 * - Relay: the growth chain as an isometric tower of floors on a Leadership foundation.
 * - WhySplit: a 3D cube, one face per reason, beside the full index of reasons.
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
      <div className="bg-black py-20 text-white sm:py-20">
        <div className="container-x">
          <p className="text-sm text-white/55">{label}</p>
          <h2 className="font-display mt-3 max-w-xl text-[1.6rem] font-medium leading-[1.15] tracking-[-0.02em] sm:text-[1.9rem]">{title}</h2>
          <ol className="mt-12 space-y-3">
            {steps.map((x) => (
              <li key={x.lead} className="font-display text-[clamp(1.6rem,4vw,3rem)] font-medium tracking-[-0.035em]">
                {x.lead} <span className="text-white/60">{x.verb} {x.rest}</span>
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
              <h2 className="font-display mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h2>
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
                      "text-sm uppercase tracking-[0.18em] transition-colors duration-500 sm:text-sm " +
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
              className="mt-8 max-w-lg text-base text-white/75 transition-opacity duration-700 sm:text-lg"
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

/** Cube turns that bring each face to the front (six reasons, six faces). */
const CUBE_FACES = ["rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)"];
const CUBE_TURNS = ["rotateX(0deg) rotateY(0deg)", "rotateX(0deg) rotateY(-90deg)", "rotateX(0deg) rotateY(-180deg)", "rotateX(0deg) rotateY(90deg)", "rotateX(-90deg) rotateY(0deg)", "rotateX(90deg) rotateY(0deg)"];

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
  return (
    <div className="container-x py-20 sm:py-28">
      <div className="max-w-xl">
        <p className="text-sm text-muted">{label}</p>
        <h2 className="font-display mt-3 text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.03em]">{title}</h2>
      </div>

      <div className="mt-12 grid items-start gap-12 sm:mt-16 md:grid-cols-12 md:gap-14">
        <div className="md:sticky md:top-[max(6rem,calc(50lvh-17rem))] md:col-span-5">
          <div className="cube-scene" aria-hidden>
            <div className="cube" style={{ transform: `rotateX(-16deg) rotateY(24deg) ${CUBE_TURNS[Math.min(active, CUBE_TURNS.length - 1)]}` }}>
              {faces.map((x, i) => (
                <div key={x.image + i} className="cube-face photo-tone" style={{ transform: `${CUBE_FACES[i]} translateZ(calc(var(--cube) / 2))` }}>
                  <Image src={x.image} alt="" fill sizes="(min-width: 768px) 22rem, 70vw" className="object-cover grayscale" />
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

        <ol className="border-t border-line md:col-span-7">
          {items.map((x, i) => {
            const on = i === active;
            return (
              <li
                key={x.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="relative grid cursor-default grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-6 sm:grid-cols-[3.5rem_1fr]"
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
                      onFocus={() => setActive(i)}
                      aria-pressed={on}
                      className="text-left outline-none focus-visible:underline focus-visible:underline-offset-4"
                    >
                      {x.name.replace(/\.$/, "")}
                    </button>
                  </h3>
                  <p className="mt-3 max-w-xl text-muted">{x.body}</p>
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
            className="photo-tone group relative flex h-[min(62lvh,34rem)] flex-col justify-between overflow-hidden rounded-[1.25rem] bg-black p-6 text-white sm:p-8"
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
      <div className="py-20 sm:py-20">
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
