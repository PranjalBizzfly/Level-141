"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePinProgress, useReducedMotion } from "../HomeInteractive";
import { altFor } from "@/lib/image-alts";

/**
 * How we architect growth — two scenes (each used once site-wide, see
 * .extract/ANIMATION-REGISTRY.md):
 * - QuestionFocus: a pinned photograph beside the questions set large; each
 *   question rises out of a mask, the one being read is lit, and its photograph
 *   unveils over the last.
 * - BrandsSpell: B R A N D S set as one huge word; scrolling fills the
 *   letters in turn while each lever's detail arrives line by line.
 * - OrbStatement: a statement revealed by a soft glow growing from the centre.
 * Colours use black/white (they follow the theme on the page). Reduced
 * motion: everything is shown in its final state.
 */

const n2 = (i: number) => String(i + 1).padStart(2, "0");
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/* ------------------------------------------------------------ OrbStatement */

/**
 * A single statement revealed by light: the section pins on an almost empty
 * screen; as it scrolls, a soft glow grows from the centre until it fills the
 * frame while the statement brightens from dim to full, and the supporting
 * lines arrive last. Monochrome (white glow on black; black on white in the
 * light theme). Reduced motion: shown fully lit.
 */
export function OrbStatement({ text, accent, sub }: { text: string; accent?: string; sub?: ReactNode }) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const ease = (v: number) => 1 - (1 - v) * (1 - v) * (1 - v);
  const grow = reduced ? 1 : ease(clamp(p / 0.6));
  const lit = reduced ? 1 : ease(clamp((p - 0.18) / 0.4));
  const tail = reduced ? 1 : ease(clamp((p - 0.55) / 0.3));

  const body = (
    <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
      <p
        className="font-display text-[clamp(1.87rem,3.47vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.045em]"
        style={{ opacity: 0.14 + lit * 0.86, filter: lit < 1 ? `blur(${(1 - lit) * 6}px)` : undefined }}
      >
        {text} {accent ? <span className="text-white/60">{accent}</span> : null}
      </p>
      {sub ? (
        <div className="mt-12 max-w-3xl text-white/75 [&_p+p]:mt-4" style={{ opacity: tail, translate: `0 ${(1 - tail) * 1.5}rem` }}>
          {sub}
        </div>
      ) : null}
    </div>
  );

  if (reduced) return <section className="relative bg-black py-20 text-white sm:py-24 lg:py-24">{body}</section>;

  return (
    <section ref={ref} className="relative bg-black text-white" style={{ height: "220lvh" }}>
      <div className="sticky top-0 flex h-[100lvh] items-center justify-center overflow-hidden">
        {/* The light: grows from a point to fill the frame. */}
        <div
          aria-hidden
          className="orb pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[170vmax] rounded-full"
          style={{ transform: `translate(-50%, -50%) scale(${0.04 + grow * 0.96})`, opacity: 0.35 + grow * 0.65 }}
        />
        {body}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- QuestionFocus */

/**
 * Editorial focus (luxury reference, programs page): one rounded photograph
 * pinned on the left; the questions set large on the right. Each question
 * rises out of a mask as it arrives, the one being read is lit and the rest
 * step back, and its photograph unveils over the last with a slow clip.
 */
export function QuestionFocus({
  label,
  title,
  text,
  items,
}: {
  label: string;
  title: ReactNode;
  text?: ReactNode;
  items: readonly { name: string; image: string; answer?: string }[];
}) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set());
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const n = items.length;

  useEffect(() => {
    // The question crossing the middle band of the screen is the one being read.
    const focus = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    // A question rises into view once, when it first enters.
    const enter = new IntersectionObserver(
      (es) => {
        for (const e of es)
          if (e.isIntersecting) setSeen((s) => (s.has(Number((e.target as HTMLElement).dataset.i)) ? s : new Set(s).add(Number((e.target as HTMLElement).dataset.i))));
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    refs.current.forEach((el) => {
      if (!el) return;
      focus.observe(el);
      enter.observe(el);
    });
    return () => {
      focus.disconnect();
      enter.disconnect();
    };
  }, []);

  return (
    <section className="qf bg-black py-20 text-white sm:py-24 lg:py-24">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="text-sm text-white/60">{label}</p>
          <h2 className="font-display mt-4 text-[clamp(1.66rem,2.72vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h2>
        </div>
        <div className="mt-12 grid gap-14 sm:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Pinned frame: photographs stack in order — each unveils over the last,
              and scrolling back draws it away again to show the one beneath. */}
          <div aria-hidden className="hidden lg:col-span-5 lg:block">
            <div className="photo-tone sticky top-28 aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-black">
              {items.map((q, i) => (
                <div key={q.image + i} className="qf-img absolute inset-0" data-on={i <= active ? "" : undefined} style={{ zIndex: i + 1 }}>
                  <Image src={q.image} alt={altFor(q.image)} fill sizes="40vw" className="object-cover" />
                </div>
              ))}
              <span className="absolute bottom-5 left-5 z-10 rounded-full bg-black/70 px-3 py-1 text-xs tabular-nums text-white">
                {n2(active)} / {String(n).padStart(2, "0")}
              </span>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {items.map((q, i) => (
              <li
                key={q.name}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="qf-line flex flex-col justify-center border-t border-white/15 py-10 lg:min-h-[42vh] lg:py-12"
                data-on={i === active ? "" : undefined}
                data-seen={seen.has(i) ? "" : undefined}
              >
                <div className="photo-tone relative mb-6 aspect-[16/9] overflow-hidden rounded-[1.25rem] lg:hidden">
                  <Image src={q.image} alt={altFor(q.image)} fill sizes="100vw" className="object-cover" />
                </div>
                <span className="text-sm tabular-nums text-white/60">{n2(i)}</span>
                <h3 className="mt-4 overflow-hidden font-display text-[clamp(1.7rem,2.73vw,2.48rem)] font-medium leading-[1.02] tracking-[-0.04em]">
                  <span className="qf-rise block">{q.name}</span>
                </h3>
                {/* How Level141 answers the question. */}
                {q.answer ? <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">{q.answer}</p> : null}
              </li>
            ))}
          </ol>
        </div>
        {text ? <p className="mt-12 text-white/70">{text}</p> : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- BrandsSpell */

export function BrandsSpell({
  head,
  items,
}: {
  head: ReactNode;
  items: readonly { letter: string; name: string; line: string; role: string; list: readonly string[] }[];
}) {
  const reduced = useReducedMotion();
  const [ref, p] = usePinProgress(!reduced);
  const n = items.length;
  const active = Math.min(n - 1, Math.floor(p * n * 0.999));

  if (reduced) {
    return (
      <section className="bg-black py-20 text-white sm:py-24 lg:py-24">
        <div className="container-x">
          {head}
          <ol className="mt-12 grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <li key={it.letter}>
                <p aria-hidden className="font-display text-[2.48rem] font-medium leading-none">{it.letter}</p>
                <h3 className="font-display mt-4 text-2xl font-medium">{it.name}</h3>
                <p className="mt-2 text-[1.0625rem] text-white/85">{it.role}</p>
                <p className="mt-4 text-[0.95rem] text-white/80">{it.list.join(" · ")}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const y = window.scrollY + r.top + (r.height - window.innerHeight) * ((i + 0.5) / n);
    const lenis = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section ref={ref} className="bg-black text-white" style={{ height: `${100 + n * 40}lvh` }}>
      <div className="sticky top-0 flex h-[100lvh] flex-col overflow-hidden">
        <div className="container-x flex flex-1 flex-col justify-between pb-10 pt-16 sm:pt-28">
          {head}

          {/* The word: each letter fills and lifts as its lever is read. */}
          <div className="relative">
            <div role="tablist" aria-label="BRANDS™ levers" className="flex items-end justify-between">
              {items.map((it, i) => {
                const fill = clamp(p * n - i);
                const on = i === active;
                return (
                  <button
                    key={it.letter}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-label={it.name}
                    onClick={() => jump(i)}
                    className="spell-letter font-display text-[clamp(3.82rem,10.85vw,10.5rem)] font-medium leading-[0.8] tracking-[-0.05em]"
                    style={
                      {
                        "--fill": `${fill * 100}%`,
                        translate: on ? "0 -0.08em" : "0 0",
                      } as CSSProperties
                    }
                  >
                    {it.letter}
                  </button>
                );
              })}
            </div>
            <div aria-hidden className="mt-6 h-px bg-white/20">
              <div className="h-px origin-left bg-white" style={{ transform: `scaleX(${clamp(p)})` }} />
            </div>
          </div>

          {/* The lever being read. */}
          <div role="tabpanel" className="grid min-h-[11rem]">
            {items.map((it, i) => (
              <div
                key={it.letter}
                aria-hidden={i !== active}
                className="spell-panel col-start-1 row-start-1 grid gap-8 lg:gap-x-16 lg:grid-cols-12"
                data-on={i === active ? "" : undefined}
              >
                <div className="lg:col-span-5">
                  <h3 className="overflow-hidden font-display text-[clamp(1.75rem,2.72vw,2.4rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                    <span className="spell-rise block" style={{ "--d": 0 } as CSSProperties}>{it.name}</span>
                  </h3>
                  <p className="mt-4 overflow-hidden text-lg text-white/80">
                    <span className="spell-rise block" style={{ "--d": 1 } as CSSProperties}>{it.line}</span>
                  </p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="overflow-hidden text-[1.0625rem] text-white/85 sm:text-lg">
                    <span className="spell-rise block" style={{ "--d": 2 } as CSSProperties}>{it.role}</span>
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {it.list.map((c, j) => (
                      <li key={c} className="spell-rise rounded-full border border-white/25 px-3 py-1 text-sm" style={{ "--d": 3 + j * 0.5 } as CSSProperties}>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
