"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { usePinProgress, useReducedMotion, useScrollFrame } from "@/components/sections/HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * How we architect growth — this page's own layouts (see .extract/ANIMATION-REGISTRY.md).
 * Each is used once on the site. Reduced motion: nothing pins, everything shows its final state.
 */

const n2 = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** Scroll the page so a pinned track shows step i of n. */
function scrollToStep(track: HTMLElement | null, i: number, n: number) {
  if (!track) return;
  const r = track.getBoundingClientRect();
  const run = r.height - window.innerHeight;
  const y = window.scrollY + r.top + run * (n > 1 ? i / (n - 1) : 0) * 0.98;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
  if (lenis) lenis.scrollTo(y);
  else window.scrollTo({ top: y, behavior: "smooth" });
}

function Head({ label, title, text, dark }: { label?: string; title?: ReactNode; text?: ReactNode; dark?: boolean }) {
  return (
    <div className="@container w-full">
      <div className="@4xl:grid @4xl:grid-cols-12 @4xl:items-end @4xl:gap-x-16">
        <div className="max-w-4xl @4xl:col-span-6">
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

/* ------------------------------------------------------------- PortalHero */

/** The photograph sits in a circle that grows to fill the screen as you scroll. */
export function PortalHero({
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
  const [ref, p] = usePinProgress(!reduced);
  const e = reduced ? 1 : 1 - Math.pow(1 - p, 2);
  // Radius as a share of the stage diagonal: a porthole first, the whole screen last.
  const radius = 16 + e * 60;

  return (
    <section className="photo-tone bg-black text-white">
      <div ref={ref} className={reduced ? "" : "h-[190lvh]"}>
        <div className={(reduced ? "min-h-[100svh]" : "sticky top-0 h-[100lvh]") + " relative flex flex-col justify-end overflow-hidden"}>
          <div
            className="absolute inset-0"
            style={{ clipPath: reduced ? undefined : `circle(${radius}% at 72% 42%)` }}
          >
            <Image
              src={image}
              alt={altFor(image)}
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale"
              style={{ scale: `${1.15 - 0.15 * e}` }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
          </div>
          {/* A hairline ring marks the porthole while it is still small. */}
          {!reduced ? (
            <div
              aria-hidden
              className="pointer-events-none absolute left-[72%] top-[42%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25"
              style={{ width: `${radius * 2 * 1.02}vmax`, opacity: 1 - e }}
            />
          ) : null}
          <div className="container-x relative grid gap-14 pb-12 pt-40 sm:pb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <p className="animate-fade text-sm uppercase tracking-[0.22em] text-white/60">{eyebrow}</p>
              <h1
                data-split="load"
                className="font-display mt-8 text-[clamp(1.95rem,3.72vw,3.72rem)] font-medium leading-[0.95] tracking-[-0.045em] [&_.serif-accent]:text-white/55"
              >
                {title}
              </h1>
            </div>
            <div className="animate-rise [animation-delay:450ms] lg:col-span-4 lg:pb-3">
              {intro ? <div className="text-white/75 [&_p]:leading-relaxed">{intro}</div> : null}
              {children ? <div className="mt-10">{children}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ QuestionFan */

/** Question cards held together like a hand of cards, fanning open as you scroll. */
export function QuestionFan({
  label,
  title,
  text,
  items,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; image: string }[];
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;

  if (reduced) {
    return (
      <div className="bg-paper py-20 text-ink sm:py-24 lg:py-24">
        <div className="container-x">
          <Head label={label} title={title} text={text} />
          <ol className="mt-12 grid gap-8 lg:gap-x-16 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((x) => (
              <li key={x.name}>
                <QCard item={x} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  // Fan opens over the first 70% of the track, then holds.
  const f = clamp(p / 0.7);
  const e = 1 - Math.pow(1 - f, 3);
  return (
    <div ref={ref} className="bg-paper text-ink" style={{ height: "260lvh" }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden">
        <div className="container-x pt-16 sm:pt-28">
          <Head label={label} title={title} />
        </div>
        <ol className="relative flex-1">
          {items.map((x, i) => {
            const mid = (n - 1) / 2;
            const angle = (i - mid) * 13 * e;
            const lift = Math.abs(i - mid) * 10 * e;
            return (
              <li
                key={x.name}
                className="absolute bottom-[12%] left-1/2 w-[min(46vw,15rem)]"
                style={{
                  transform: `translateX(-50%) translateY(${lift}px) rotate(${angle}deg)`,
                  transformOrigin: "50% 190%",
                  zIndex: i,
                }}
              >
                <QCard item={x} />
              </li>
            );
          })}
        </ol>
        {text ? (
          <div className="container-x pb-10 text-[1.0625rem] text-ink/80 sm:text-lg" style={{ opacity: clamp((p - 0.6) / 0.3) }}>
            {text}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function QCard({ item }: { item: { name: string; image: string } }) {
  return (
    <article className="flex aspect-[3/4.4] flex-col overflow-hidden rounded-[1.25rem] border border-current/15 bg-paper shadow-[0_24px_60px_-30px_rgb(0_0_0/0.45)]">
      <div className="photo-tone relative h-[52%] bg-black">
        <Image src={item.image} alt={altFor(item.image)} fill sizes="15rem" className="object-cover opacity-85 grayscale" />      </div>
      <h3 className="font-display flex flex-1 items-end p-4 text-[clamp(1rem,1.6vw,1.35rem)] font-medium leading-[1.12] tracking-[-0.02em]">
        {item.name}
      </h3>
    </article>
  );
}

/* ------------------------------------------------------------------ Orbit */

type Stage = { name: string; line: string; body: string; question: string };

/** Stages round a circle that turns with scroll; the stage at the top speaks from the centre. */
export function Orbit({ label, title, stages, foot }: { label?: string; title?: ReactNode; stages: readonly Stage[]; foot?: ReactNode }) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = stages.length;
  const step = 360 / n;

  if (reduced) {
    return (
      <div className="bg-black py-20 text-white sm:py-24 lg:py-24">
        <div className="container-x">
          <Head label={label} title={title} dark />
          <ol className="mt-12 grid gap-14 border-t border-white/15 pt-10 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((s, i) => (
              <li key={s.name}>
                <span className="text-sm tabular-nums text-white/60">{n2(i)}</span>
                <h3 className="font-display mt-2 text-[1.6rem] font-medium tracking-[-0.03em]">{s.name}</h3>
                <p className="mt-4 text-white">{s.line}</p>
                <p className="mt-2 text-[1.0625rem] text-white/85 sm:text-lg">{s.body}</p>
                <p className="mt-2 text-white/85">{s.question}</p>
              </li>
            ))}
          </ol>
          {foot ? <p className="mt-12 text-white/85">{foot}</p> : null}
        </div>
      </div>
    );
  }

  const pos = p * (n - 1);
  const active = Math.round(pos);
  const s = stages[active];
  const turn = -pos * step;

  return (
    <div ref={ref} className="bg-black text-white" style={{ height: `${100 + n * 55}lvh` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden pb-8 pt-16 sm:pt-28">
        <div className="container-x">
          <Head label={label} title={title} dark />
        </div>
        <div className="container-x grid flex-1 items-center gap-4 lg:gap-x-10 lg:grid-cols-12">
          <div className="relative mx-auto aspect-square w-[min(68vw,40vh)] lg:col-span-6 lg:w-[min(36vw,58vh)]">
            <div aria-hidden className="absolute inset-0 rounded-full border border-white/20" />
            <div aria-hidden className="absolute inset-[18%] rounded-full border border-dashed border-white/10" />
            <span aria-hidden className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 -translate-y-full bg-white" />
            {stages.map((x, i) => {
              const a = ((i * step + turn - 90) * Math.PI) / 180;
              const on = i === active;
              return (
                <button
                  key={x.name}
                  type="button"
                  onClick={() => scrollToStep(ref.current, i, n)}
                  aria-current={on ? "step" : undefined}
                  className="absolute flex min-h-10 -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 text-[0.95rem] font-medium sm:text-base"
                  style={{
                    left: `${50 + 50 * Math.cos(a)}%`,
                    top: `${50 + 50 * Math.sin(a)}%`,
                    background: on ? "var(--color-white)" : "var(--color-black)",
                    color: on ? "var(--color-black)" : "color-mix(in oklab, var(--color-white) 92%, transparent)",
                    borderColor: on ? "var(--color-white)" : "color-mix(in oklab, var(--color-white) 40%, transparent)",
                  }}
                >
                  <span className="tabular-nums opacity-80">{n2(i)}</span>
                  {x.name}
                </button>
              );
            })}
            <div className="absolute inset-[22%] flex flex-col items-center justify-center text-center">
              <p className="text-sm tabular-nums text-white/80">
                {n2(active)} / {String(n).padStart(2, "0")}
              </p>
              <p key={active} className="font-display mt-2 text-[clamp(1rem,2vw,1.6rem)] leading-tight tracking-[-0.02em] text-white">
                {s.question}
              </p>
            </div>
          </div>
          <div className="min-h-[9.5rem] lg:col-span-6" aria-live="polite">
            <h3 className="font-display text-[clamp(1.6rem,2.88vw,2.72rem)] font-medium leading-[1.02] tracking-[-0.04em]">{s.name}</h3>
            <p className="mt-4 text-[1.0625rem] text-white sm:text-lg">{s.line}</p>
            <p className="mt-2 max-w-xl text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg">{s.body}</p>
            {foot && active === n - 1 ? <p className="mt-6 border-t border-white/15 pt-4 text-base text-white/85">{foot}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- ExpandRows */

/** Full-width rows; hovering or focusing one opens it taller to show its description. */
export function ExpandRows({
  label,
  title,
  text,
  items,
}: {
  label?: string;
  title?: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; body: string; href: string }[];
}) {
  return (
    <div className="bg-paper py-20 text-ink sm:py-24 lg:py-24">
      <div className="container-x">
        <Head label={label} title={title} text={text} />
        <ul className="mt-12 border-t border-current/15">
          {items.map((x) => (
            <li key={x.href}>
              <a
                href={x.href}
                className="group relative block overflow-hidden border-b border-current/15 py-8 outline-none transition-[padding] duration-500 ease-out hover:py-10 focus-visible:py-10 motion-reduce:transition-none sm:py-10"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-ink/[0.04] transition-transform duration-500 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                />
                <span className="relative flex items-baseline gap-4 sm:gap-8">
                  <span className="font-display flex-1 text-[clamp(1.7rem,3.72vw,3.41rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                    {x.name}
                  </span>
                  <span aria-hidden className="text-xl text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:text-ink">
                    →
                  </span>
                </span>
                <span className="relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:grid-rows-[1fr] motion-reduce:transition-none [@media(hover:none)]:grid-rows-[1fr]">
                  <span className="overflow-hidden">
                    <span className="block pt-4 text-muted sm:text-lg">{x.body}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- ScaleStatement */

/** A statement that arrives huge and settles down to its resting size as it scrolls into place. */
export function ScaleStatement({ text, accent, sub }: { text: string; accent: string; sub?: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(1);
  useScrollFrame(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    setP(clamp((vh - el.getBoundingClientRect().top) / (vh * 0.85)));
  }, !reduced);
  const e = reduced ? 1 : 1 - Math.pow(1 - p, 3);

  return (
    <div className="overflow-hidden bg-black py-20 text-white sm:py-24 lg:py-24">
      <div className="container-x">
        <div ref={ref}>
          <p
            className="font-display origin-top-left text-[clamp(1.7rem,3.35vw,3.1rem)] font-medium leading-[1] tracking-[-0.045em]"
            style={{ scale: `${1 + 0.35 * (1 - e)}`, opacity: 0.6 + 0.4 * e }}
          >
            {text} <span className="serif-accent">{accent}</span>
          </p>
        </div>
        {sub ? (
          <div
            className="mt-12 grid max-w-3xl gap-4 text-[1.0625rem] leading-relaxed text-white/85 sm:text-lg lg:ml-auto"
            style={{ opacity: 0.75 + 0.25 * clamp((e - 0.6) / 0.4) }}
          >
            {sub}
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- VerticalTabs */

/** Tab list on the left, panel on the right; a new panel is clipped in from the side. */
export function VerticalTabs({
  label,
  title,
  items,
}: {
  label?: string;
  title?: ReactNode;
  items: readonly { name: string; body: string; image?: string }[];
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduced || !panel.current) return;
    panel.current.animate(
      [
        { clipPath: "inset(0 0 0 100%)", transform: "translateX(24px)" },
        { clipPath: "inset(0 0 0 0)", transform: "translateX(0)" },
      ],
      { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    );
  }, [active, reduced]);

  const select = (i: number) => {
    const j = (i + items.length) % items.length;
    setActive(j);
    tabs.current[j]?.focus();
  };
  const onKey = (ev: KeyboardEvent) => {
    if (ev.key === "ArrowDown" || ev.key === "ArrowRight") select(active + 1);
    else if (ev.key === "ArrowUp" || ev.key === "ArrowLeft") select(active - 1);
    else if (ev.key === "Home") select(0);
    else if (ev.key === "End") select(items.length - 1);
    else return;
    ev.preventDefault();
  };
  const it = items[active];

  return (
    <div className="py-24 sm:py-32 lg:py-40">
      <div className="container-x">
        <Head label={label} title={title} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div role="tablist" aria-orientation="vertical" aria-label={label} onKeyDown={onKey} className="border-t border-line-strong lg:col-span-5">
            {items.map((x, i) => {
              const on = i === active;
              return (
                <button
                  key={x.name}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`why-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls="why-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={
                    "relative flex min-h-14 w-full items-center gap-4 border-b border-line-strong py-6 pl-4 text-left transition-colors duration-300 " +
                    (on ? "text-ink" : "text-ink/75 hover:text-ink")
                  }
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] origin-top bg-ink transition-transform duration-500"
                    style={{ transform: `scaleY(${on ? 1 : 0})` }}
                  />
                  <span className="font-display text-[1.2rem] font-medium tracking-[-0.02em] sm:text-[1.4rem]">{x.name}</span>
                </button>
              );
            })}
          </div>
          <div
            ref={panel}
            id="why-panel"
            role="tabpanel"
            aria-labelledby={`why-tab-${active}`}
            tabIndex={0}
            className={
              "relative flex min-h-[18rem] flex-col justify-end overflow-hidden rounded-[1.25rem] p-9 sm:p-14 lg:col-span-7 lg:min-h-[26rem] " +
              (it.image ? "photo-tone bg-black text-white" : "bg-ink text-paper")
            }
          >
            {/* The reason's photograph fills the panel; a veil keeps the words legible. */}
            {it.image ? (
              <>
                <Image key={it.image} src={it.image} alt={altFor(it.image)} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[50%_30%] grayscale" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
              </>
            ) : null}
            <div className="relative">
              <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.08rem)] font-medium leading-[1.05] tracking-[-0.03em]">{it.name}</h3>
              <p className={"mt-6 max-w-2xl text-[1.0625rem] leading-relaxed sm:text-lg " + (it.image ? "text-white/85" : "text-paper/90")}>{it.body}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Static layouts */

/** What may be necessary — a quiet register on hairlines. */
export function NecessaryList({ items }: { items: readonly string[] }) {
  return (
    <ol className="mt-12 grid border-t border-current/15 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((m) => (
        <li key={m} className="flex items-baseline gap-5 border-b border-current/15 py-8 sm:pr-8">
          <p className="font-display text-[clamp(1.4rem,2.16vw,1.8rem)] font-medium leading-[1.1] tracking-[-0.03em]">
            {m} <span className="font-sans text-base font-normal tracking-normal opacity-70">may be necessary</span>
          </p>
        </li>
      ))}
    </ol>
  );
}

/** The six BRANDS™ levers as a still, architectural grid. */
export function BrandsGrid({ items }: { items: readonly { letter: string; name: string; list: string[] }[] }) {
  return (
    <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.25rem] border border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-3">
      {items.map((l) => (
        <li key={l.letter} className="flex flex-col bg-paper p-8 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <span
              aria-hidden
              className="font-display text-[clamp(3.4rem,4.34vw,3.72rem)] font-medium leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]"
            >
              {l.letter}
            </span>
            <h3 className="font-display max-w-[12ch] text-right text-[1.3rem] font-medium leading-[1.1] tracking-[-0.02em]">{l.name}</h3>
          </div>
          <ul className="mt-10 border-t border-line pt-4 text-[0.95rem] text-ink/80">
            {l.list.map((x) => (
              <li key={x} className="flex gap-3 py-1">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-current" />
                {x}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
