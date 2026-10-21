"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePinProgress, useReducedMotion, useScrollFrame } from "@/components/sections/HomeInteractive";

/**
 * Personal Brand Architecture — animated layouts used only on this page
 * (see the animation registry: none of these appears anywhere else).
 *
 * - OutlineFill: a statement drawn in outline that fills solid from the bottom as it scrolls.
 * - SpotlightText: a dim statement lit by a light that follows the pointer.
 * - ScanRows: a light line holds at the middle of the screen; the row passing it opens.
 * - PeelStack: pinned stack of panels; each peels up and away to reveal the next.
 * - Checklist: each item gets a drawn check mark as it comes into view.
 * - Ring3D: cards on a 3D ring that turns with the scroll.
 * - CadenceGrid: a 12-month strip; each reporting cadence lights its months.
 *
 * All text stays in the DOM; reduced motion shows the final state without pinning.
 */

const n2 = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));

function Head({ label, title, text, dark }: { label?: string; title?: ReactNode; text?: ReactNode; dark?: boolean }) {
  if (!label && !title) return null;
  return (
    <div className="max-w-2xl">
      {label ? <p className={"text-sm " + (dark ? "text-white/55" : "text-muted")}>{label}</p> : null}
      {title ? <h2 className="font-display mt-3 text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">{title}</h2> : null}
      {text ? <div className={"mt-5 max-w-xl " + (dark ? "text-white/65" : "text-muted")}>{text}</div> : null}
    </div>
  );
}

/** Progress (0 → 1) of an element moving through the viewport: from its top at the bottom edge to its bottom at the top edge. */
function useViewProgress(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(enabled ? 0 : 1);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setP(clamp((window.innerHeight - r.top) / (window.innerHeight + r.height)));
  }, enabled);
  return [ref, enabled ? p : 1] as const;
}

/* ------------------------------------------------------------ OutlineFill */

export function OutlineFill({ text, accent, sub }: { text: string; accent?: string; sub?: ReactNode }) {
  const reduced = useReducedMotion();
  const [ref, p] = useViewProgress(!reduced);
  // Fill runs while the statement crosses the middle of the screen.
  const f = reduced ? 100 : clamp((p - 0.18) / 0.42) * 100;
  const fill = (base: string): CSSProperties => ({
    backgroundImage: `linear-gradient(to top, ${base} ${f}%, transparent ${f}%)`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextStroke: "1px color-mix(in oklab, var(--color-white) 55%, transparent)",
  });
  return (
    <div ref={ref} className="bg-black py-24 text-white sm:py-24">
      <div className="container-x">
        <p className="font-display max-w-5xl text-[clamp(2.1rem,5.4vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.045em]">
          <span style={fill("var(--color-white)")}>{text}</span>
          {accent ? (
            <>
              {" "}
              <span style={fill("color-mix(in oklab, var(--color-white) 50%, transparent)")}>{accent}</span>
            </>
          ) : null}
        </p>
        {sub ? <div className="mt-10 max-w-2xl text-white/65 [&_p+p]:mt-4">{sub}</div> : null}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- SpotlightText */

export function SpotlightText({ text, accent, sub }: { text: string; accent?: string; sub?: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);
  const body = (
    <>
      {text} {accent ? <span className="opacity-60">{accent}</span> : null}
    </>
  );
  const cls = "font-display max-w-5xl text-[clamp(2rem,4.8vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.04em]";
  return (
    <div className="bg-black py-24 text-white sm:py-24">
      <div className="container-x">
        <div
          ref={ref}
          className="relative"
          onPointerMove={(e) => {
            if (reduced || e.pointerType !== "mouse" || !ref.current) return;
            const r = ref.current.getBoundingClientRect();
            setPt({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          onPointerLeave={() => setPt(null)}
        >
          {/* Readable base; the bright copy above is lit only where the pointer is (fully lit when not pointing). */}
          <p className={cls + (pt ? " text-white/25" : " text-white")}>{body}</p>
          {pt ? (
            <p
              aria-hidden
              className={cls + " pointer-events-none absolute inset-0 text-white"}
              style={{
                WebkitMaskImage: `radial-gradient(circle 16rem at ${pt.x}px ${pt.y}px, #000 35%, transparent 100%)`,
                maskImage: `radial-gradient(circle 16rem at ${pt.x}px ${pt.y}px, #000 35%, transparent 100%)`,
              }}
            >
              {body}
            </p>
          ) : null}
        </div>
        {sub ? <div className="mt-10 text-sm uppercase tracking-[0.22em] text-white/55">{sub}</div> : null}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- ScanRows */

export function ScanRows({
  label,
  title,
  text,
  items,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; body: string; meta?: string }[];
}) {
  const reduced = useReducedMotion();
  const list = useRef<HTMLOListElement>(null);
  const [open, setOpen] = useState(-1);
  useScrollFrame(() => {
    const el = list.current;
    if (!el) return;
    const mid = window.innerHeight / 2;
    let best = -1;
    Array.from(el.children).forEach((li, i) => {
      const r = li.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) best = i;
    });
    setOpen(best);
  }, !reduced);
  return (
    <div className="bg-paper py-20 text-ink sm:py-20">
      <div className="container-x">
        <Head label={label} title={title} text={text} />
        <div className="relative mt-12 sm:mt-16">
          {/* The scan line, held at the middle of the screen while the list passes. */}
          {!reduced ? (
            <div aria-hidden className="pointer-events-none sticky top-1/2 z-10 h-0">
              <div className="h-px w-full bg-ink" />
              <span className="absolute -top-1 left-0 size-2 rounded-full bg-ink" />
            </div>
          ) : null}
          <ol ref={list} className="border-t border-current/15">
            {items.map((it, i) => {
              const on = reduced || open === i;
              return (
                <li key={it.name} className="border-b border-current/15">
                  <div className="grid gap-x-6 py-6 sm:grid-cols-12 sm:py-8">
                    <span className="text-sm tabular-nums text-muted sm:col-span-1">{n2(i)}</span>
                    <h3
                      className="font-display text-[clamp(1.6rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.035em] transition-opacity duration-500 sm:col-span-6"
                      style={{ opacity: on ? 1 : 0.32 }}
                    >
                      {it.name}
                    </h3>
                    <div className="grid transition-[grid-template-rows,opacity] duration-500 ease-out sm:col-span-5" style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}>
                      <div className="overflow-hidden">
                        <p className="pt-3 text-muted sm:pt-1 sm:text-lg">{it.body}</p>
                        {it.meta ? <p className="mt-3 border-t border-current/15 pt-3 font-medium">{it.meta}</p> : null}
                      </div>
                    </div>
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

/* -------------------------------------------------------------- PeelStack */

export function PeelStack({
  label,
  title,
  items,
  foot,
}: {
  label?: string;
  title?: ReactNode;
  items: readonly { n?: string; name: string; body: string }[];
  foot?: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;

  if (reduced) {
    return (
      <div className="bg-black py-20 text-white sm:py-20">
        <div className="container-x">
          <Head label={label} title={title} dark />
          <ol className="mt-12 grid gap-10 sm:grid-cols-2">
            {items.map((x, i) => (
              <li key={x.name}>
                <span className="text-sm tabular-nums text-white/55">{x.n ?? n2(i)}</span>
                <h3 className="font-display mt-2 text-[1.9rem] font-medium tracking-[-0.03em]">{x.name}</h3>
                <p className="mt-3 text-white/65">{x.body}</p>
              </li>
            ))}
          </ol>
          {foot ? <div className="mt-10">{foot}</div> : null}
        </div>
      </div>
    );
  }

  // The last panel stays; every other one peels away in turn.
  const seg = 1 / Math.max(1, n - 1);
  return (
    <div ref={ref} className="bg-black text-white" style={{ height: `${100 + (n - 1) * 70}lvh` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden pb-8 pt-24 sm:pt-28">
        <div className="container-x flex items-end justify-between gap-6">
          <Head label={label} title={title} dark />
          {foot ? <div className="hidden shrink-0 sm:block">{foot}</div> : null}
        </div>
        <div className="container-x relative mt-8 flex-1 [perspective:1800px]">
          {items.map((x, i) => {
            const k = i === n - 1 ? 0 : clamp((p - i * seg) / seg);
            const e = k * k;
            const depth = Math.max(0, i - p / seg); // panels further down the stack sit a little lower and smaller
            return (
              <article
                key={x.name}
                aria-hidden={k >= 1 || undefined}
                className="absolute inset-x-0 top-0 mx-auto flex h-full max-w-6xl origin-top flex-col justify-between rounded-[1.75rem] border border-white/15 bg-black p-7 sm:p-12"
                style={{
                  zIndex: n - i,
                  transform: `translateY(${Math.min(depth, 3) * 14}px) scale(${1 - Math.min(depth, 3) * 0.03}) rotateX(${e * 100}deg)`,
                  opacity: 1 - clamp((k - 0.75) / 0.25),
                }}
              >
                <span className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.8] tracking-[-0.06em] text-white/90">{x.n ?? n2(i)}</span>
                <div className="max-w-2xl">
                  <h3 className="font-display text-[clamp(2rem,4.6vw,4rem)] font-medium leading-[1] tracking-[-0.04em]">{x.name}</h3>
                  <p className="mt-5 text-white/65 sm:text-lg">{x.body}</p>
                </div>
              </article>
            );
          })}
        </div>
        {foot ? <div className="container-x mt-6 sm:hidden">{foot}</div> : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Checklist */

export function Checklist({ label, title, items }: { label?: string; title?: ReactNode; items: readonly string[] }) {
  const reduced = useReducedMotion();
  const list = useRef<HTMLOListElement>(null);
  const [seen, setSeen] = useState<number>(reduced ? items.length : 0);
  useEffect(() => {
    if (reduced) return;
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            const i = Number((en.target as HTMLElement).dataset.i);
            setSeen((s) => Math.max(s, i + 1));
          }
        }
      },
      { rootMargin: "0px 0px -35% 0px" },
    );
    Array.from(el.children).forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [reduced]);
  const done = reduced ? items.length : seen;
  return (
    <div className="bg-paper py-20 text-ink sm:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Head label={label} title={title} />
            <p aria-hidden className="font-display mt-8 text-[clamp(3.5rem,8vw,7rem)] leading-[0.85] tracking-[-0.06em]">
              {String(done).padStart(2, "0")}
              <span className="text-[0.35em] text-muted">/{String(items.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
        <ol ref={list} className="lg:col-span-7 lg:col-start-6">
          {items.map((t, i) => {
            const on = i < done;
            return (
              <li key={t} data-i={i} className="flex gap-5 border-b border-current/15 py-7 first:border-t sm:gap-7 sm:py-9">
                <svg aria-hidden viewBox="0 0 40 40" className="mt-1 size-9 shrink-0 sm:size-11">
                  <circle cx="20" cy="20" r="19" fill={on ? "currentColor" : "none"} stroke="currentColor" strokeOpacity={on ? 1 : 0.25} className="transition-[fill,stroke-opacity] duration-500" />
                  <path
                    d="M12 20.5l5.5 5.5L28.5 14"
                    fill="none"
                    stroke="var(--color-paper)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="26"
                    strokeDashoffset={on ? 0 : 26}
                    style={{ transition: "stroke-dashoffset 600ms cubic-bezier(0.2,0.8,0.2,1) 150ms" }}
                  />
                </svg>
                <p className="font-display text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-[1.2] tracking-[-0.025em] transition-opacity duration-500" style={{ opacity: on ? 1 : 0.4 }}>
                  {t}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Ring3D */

export function Ring3D({
  label,
  title,
  text,
  items,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; body: string }[];
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;
  const step = 360 / n;
  const turn = p * step * (n - 1);
  const front = Math.round(turn / step) % n;

  if (reduced) {
    return (
      <div className="bg-black py-20 text-white sm:py-20">
        <div className="container-x">
          <Head label={label} title={title} text={text} dark />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((x, i) => (
              <li key={x.name} className="rounded-[1.25rem] border border-white/15 p-6">
                <span className="text-sm tabular-nums text-white/60">{n2(i)}</span>
                <h3 className="font-display mt-6 text-[1.4rem] font-medium tracking-[-0.03em]">{x.name}</h3>
                <p className="mt-3 text-white/65">{x.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="bg-black text-white" style={{ height: `${100 + n * 35}lvh` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden pt-24 sm:pt-28">
        <div className="container-x">
          <Head label={label} title={title} text={text} dark />
        </div>
        {/* The ring: --w is a card's width, the radius fits n cards edge to edge. */}
        <div
          className="relative flex flex-1 items-center justify-center [--w:min(64vw,17rem)] [perspective:1600px]"
          style={{ "--r": `calc(var(--w) / 2 / ${Math.tan(Math.PI / n).toFixed(4)} + 1.5rem)` } as CSSProperties}
        >
          <ol className="relative h-[min(46lvh,20rem)] w-[var(--w)] [transform-style:preserve-3d]" style={{ transform: `translateZ(calc(var(--r) * -1)) rotateY(${-turn}deg)` }}>
            {items.map((x, i) => (
              <li
                key={x.name}
                className="absolute inset-0 flex flex-col justify-between rounded-[1.25rem] border p-5 transition-[background-color,border-color,color] duration-500 [backface-visibility:hidden] sm:p-6"
                style={{
                  transform: `rotateY(${i * step}deg) translateZ(var(--r))`,
                  background: i === front ? "var(--color-white)" : "var(--color-black)",
                  color: i === front ? "var(--color-black)" : "var(--color-white)",
                  borderColor: i === front ? "var(--color-white)" : "color-mix(in oklab, var(--color-white) 15%, transparent)",
                }}
              >
                <span className="text-sm tabular-nums opacity-55">
                  {n2(i)} / {String(n).padStart(2, "0")}
                </span>
                <span>
                  <span className="block font-display text-[1.35rem] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[1.5rem]">{x.name}</span>
                  <span className="mt-3 block text-[0.92rem] opacity-70">{x.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ CadenceGrid */

export function CadenceGrid({
  label,
  title,
  items,
}: {
  label?: string;
  title?: ReactNode;
  items: readonly (readonly [string, string])[];
}) {
  const reduced = useReducedMotion();
  const [ref, p] = useViewProgress(!reduced);
  const [hover, setHover] = useState<number | null>(null);
  // Months each cadence lights, in the order given: monthly 12, quarterly 4, half-yearly 2, annually 1.
  const every = [1, 3, 6, 12];
  const scrolled = Math.min(items.length - 1, Math.floor(clamp((p - 0.25) / 0.45) * items.length));
  const active = hover ?? (reduced ? -1 : scrolled);
  return (
    <div ref={ref} className="bg-paper py-20 text-ink sm:py-20">
      <div className="container-x">
        <Head label={label} title={title} />
        <ol className="mt-12 border-t border-current/15 sm:mt-16" onPointerLeave={() => setHover(null)}>
          {items.map(([k, v], i) => {
            const on = active === i || active === -1;
            const gap = every[i] ?? 12;
            return (
              <li key={k} className="border-b border-current/15">
                <button
                  type="button"
                  onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="grid w-full gap-4 py-6 text-left sm:grid-cols-12 sm:items-center sm:py-8"
                >
                  <span className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-medium tracking-[-0.035em] transition-opacity duration-500 sm:col-span-3" style={{ opacity: on ? 1 : 0.35 }}>
                    {k}
                  </span>
                  <span className="text-muted sm:col-span-4">{v}</span>
                  {/* Twelve months; this cadence's review months fill in. */}
                  <span aria-hidden className="grid grid-cols-12 gap-1 sm:col-span-5">
                    {Array.from({ length: 12 }, (_, m) => {
                      const lit = on && (m + 1) % gap === 0;
                      return (
                        <span
                          key={m}
                          className="h-8 rounded-[4px] border border-current/15 transition-[background-color,transform] duration-500"
                          style={{
                            background: lit ? "var(--color-ink)" : "transparent",
                            transform: lit ? "scaleY(1)" : "scaleY(0.6)",
                            transitionDelay: lit ? `${m * 35}ms` : "0ms",
                          }}
                        />
                      );
                    })}
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
