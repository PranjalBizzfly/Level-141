import { ArrowRight, ArrowDown } from "lucide-react";
import type { CSSProperties } from "react";
import { Reveal, cx } from "@/components/ui/primitives";
import { brandsLevers, growthChain, peakStages } from "@/lib/content";

/**
 * Sequenced diagrams use [data-seq] on the container and [data-step] (with a
 * --i index) on each part; globals.css animates them in order once the
 * RevealObserver marks the container visible. Without JS or with reduced
 * motion everything simply renders in its final state.
 */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

/* ------------------------------------------------------- Process timeline */

type Step = { n: string; name: string; body: string; line?: string; question?: string };

/**
 * Connected sequence of numbered stages. Horizontal rail on large screens,
 * vertical rail on small screens. Each stage number fills with the brand
 * accent as it scrolls into view.
 */
export function ProcessTimeline({ steps, dark, className }: { steps: readonly Step[]; dark?: boolean; className?: string }) {
  const rule = dark ? "border-paper/15" : "border-line";
  return (
    <ol data-seq className={cx("border-t", rule, className)}>
      {steps.map((s, i) => (
        <li
          key={s.n}
          data-step
          style={step(i)}
          className={cx("grid gap-5 border-b py-10 sm:py-14 lg:grid-cols-12 lg:items-baseline lg:gap-x-10 lg:py-16", rule)}
        >
          <span className={cx("text-sm tabular-nums lg:col-span-1", dark ? "text-paper/55" : "text-muted")}>{s.n}</span>
          <h3 className="display text-[2.5rem] leading-[1.02] sm:text-6xl lg:col-span-4 lg:text-[3.75rem]">{s.name}</h3>
          <div className="lg:col-span-4">
            {s.line ? <p className={cx("text-lg font-medium leading-snug", dark ? "text-paper" : "text-ink")}>{s.line}</p> : null}
            <p className={cx("mt-3 leading-relaxed", dark ? "text-paper/70" : "text-muted")}>{s.body}</p>
          </div>
          {s.question ? (
            <p className={cx("text-xl leading-snug tracking-[-0.015em] lg:col-span-3 lg:text-right", dark ? "text-paper" : "text-ink")}>
              {s.question}
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------- Growth chain */

/** "Brand affects awareness … Revenue creates the ability to scale. And leadership influences all of them." */
export function GrowthChainDiagram() {
  const nodes = [...growthChain.map((c) => c.from), "Scale"];
  return (
    <figure aria-labelledby="chain-caption">
      <figcaption id="chain-caption" className="sr-only">
        Brand affects awareness. Awareness affects discovery. Discovery affects trust. Trust affects conversion.
        Conversion affects revenue. Revenue creates the ability to scale. And leadership influences all of them.
      </figcaption>
      <div aria-hidden data-seq className="relative">
        {/* gold line drawn through the chain, start to end */}
        <span data-seq-line className="absolute left-[7%] right-[7%] top-10 hidden h-px bg-gold/70 lg:block" />
        <span data-seq-line="y" className="absolute bottom-24 left-1/2 top-7 w-px -translate-x-1/2 bg-gold/50 lg:hidden" />
        <ol className="relative flex flex-col items-stretch gap-1 lg:flex-row lg:items-center lg:gap-0">
          {nodes.map((n, i) => {
            const edge = i === 0 || i === nodes.length - 1;
            return (
              <li key={n} data-step style={step(i)} className="flex flex-col items-center lg:flex-1 lg:flex-row">
                <span
                  className={cx(
                    "flex min-h-14 w-full items-center justify-center rounded-full border px-3 text-center text-sm lg:min-h-20 lg:px-2 lg:text-[0.95rem]",
                    edge ? "border-gold bg-gold text-ink" : "border-line-dark-strong bg-ink-2 text-paper",
                  )}
                >
                  {n}
                </span>
                {i < nodes.length - 1 ? (
                  <>
                    <ArrowDown className="my-1 size-4 shrink-0 text-gold lg:hidden" />
                    <ArrowRight className="mx-1 hidden size-4 shrink-0 text-gold lg:block" />
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>
        <div
          data-step
          style={step(nodes.length)}
          className="relative mt-4 flex items-center justify-center rounded-2xl border border-gold/50 bg-gold/10 px-6 py-4 text-center text-gold-soft"
        >
          <span className="eyebrow">And leadership influences all of them</span>
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------ PEAK™ */

/** Presence → Equity → Authority → Kinetic Growth, as open full-width rows. */
export function PeakAscent({ detailed, dark = true }: { detailed?: boolean; dark?: boolean }) {
  return (
    <figure data-seq>
      <figcaption className="sr-only">
        PEAK™: Presence, then Equity, then Authority, then Kinetic Growth — from presence to momentum.
      </figcaption>
      {/* Open editorial rows: one stage at a time, climbing down the page. */}
      <ol className={cx("border-b", dark ? "border-line-dark" : "border-line")}>
        {peakStages.map((s, i) => (
          <li
            key={s.letter}
            data-step
            style={step(i)}
            className={cx("grid gap-6 border-t py-12 sm:py-16 lg:grid-cols-12 lg:gap-10", dark ? "border-line-dark" : "border-line")}
          >
            <span aria-hidden className="text-6xl font-light leading-none lg:col-span-2 lg:text-7xl">
              {s.letter}
            </span>
            <div className="lg:col-span-5">
              <h3 className="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">{s.name}</h3>
              <p className={cx("mt-4 text-lg leading-snug", dark ? "text-paper/85" : "text-ink/85")}>{s.question}</p>
            </div>
            {detailed ? (
              <div className={cx("leading-[1.85] lg:col-span-4 lg:col-start-9", dark ? "text-paper/75" : "text-muted")}>
                <p>{s.focus}</p>
                <p className={cx("mt-4", dark ? "text-paper" : "text-ink")}>{s.outcome}</p>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ---------------------------------------------------------- BRANDS™ */

/* BRANDS wheel geometry, in the 400×400 SVG space. Levers sit on the outer ring
   (radius 150 = 37.5% of the box) and are 22% of the box wide. On hover the ring
   grows by ORBIT_OPEN; spokes and levers move out by the same distance. */
const ORBIT_R = 150;
const SPOKE_IN = 80;
const SPOKE_OUT = 122;
const ORBIT_OPEN = 1.1;
const OPEN_BY = ORBIT_R * (ORBIT_OPEN - 1);
const SPOKE_OPEN = +((SPOKE_OUT + OPEN_BY - SPOKE_IN) / (SPOKE_OUT - SPOKE_IN)).toFixed(3);
const NODE_SHIFT = ((OPEN_BY / 400) * 100 * 100) / 22;

/** Links hover/focus on a lever row to its letter on the ring (and back), with pure CSS. */
const brandsLinkCss = brandsLevers
  .map(
    (l) =>
      `.brands:has([data-lever-item="${l.letter}"]:is(:hover,:focus-within)) [data-lever-node="${l.letter}"],` +
      `.brands:has([data-lever-node="${l.letter}"]:hover) [data-lever-item="${l.letter}"]{border-color:var(--brands-accent);}` +
      `.brands:has([data-lever-node="${l.letter}"]:hover) [data-lever-item="${l.letter}"]{box-shadow:inset 0 0 0 1px var(--brands-accent);}` +
      `.brands:has([data-lever-item="${l.letter}"]:is(:hover,:focus-within)) [data-lever-node="${l.letter}"]{scale:1.08;}`,
  )
  .join("") +
  // Hovering the wheel opens it outward as one piece: the outer ring grows from the
  // centre, each spoke stretches from its inner end, and each lever moves out along its
  // spoke by the same distance (`transform`, so the centring `translate` stays intact).
  // Levers are centred with `translate`; glass.css lifts hovered bordered pills with
  // `translate`, which would knock a hovered lever off its spoke. Keep the centring fixed.
  ".brands [data-lever-node],.brands [data-lever-node]:hover{translate:-50% -50% !important}" +
  "@media (hover:hover) and (prefers-reduced-motion:no-preference){" +
  ".brands [data-lever-node]{transition:transform .6s var(--ease-architect),border-color .3s,scale .3s}" +
  ".brands [data-orbit]{transform-box:view-box;transition:transform .6s var(--ease-architect)}" +
  `.brands figure:hover [data-orbit="ring"]{transform:scale(${ORBIT_OPEN})}` +
  `.brands figure:hover [data-orbit="spoke"]{transform:scale(${SPOKE_OPEN})}` +
  ".brands figure:hover [data-lever-node]{transform:translate(var(--out-x),var(--out-y))}" +
  "}";

/**
 * Six levers arranged around the cross-cutting foundation (Customer & Market),
 * as described in the Growth Architecture™ product bible.
 */
export function BrandsSystem({ detailed, tone = "dark" }: { detailed?: boolean; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div
      className="brands grid gap-12 lg:grid-cols-12 lg:items-start"
      style={{ "--brands-accent": dark ? "var(--color-gold)" : "var(--color-gold-ink)" } as CSSProperties}
    >
      <style>{brandsLinkCss}</style>
      <figure data-seq className="mx-auto w-full max-w-[30rem] lg:sticky lg:top-32 lg:col-span-5">
        <figcaption className="sr-only">
          BRANDS™: Branding, Conversion Readiness, Awareness, Nurture, Discover &amp; Trust and Scale, arranged around a
          shared foundation of customer and market understanding.
        </figcaption>
        <div aria-hidden className={cx("relative aspect-square", dark ? "text-paper" : "text-ink")}>
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
            <circle
              data-orbit="ring"
              cx="200"
              cy="200"
              r={ORBIT_R}
              fill="none"
              stroke="currentColor"
              strokeOpacity={dark ? 0.15 : 0.18}
              style={{ transformOrigin: "200px 200px" }}
            />
            <circle
              cx="200"
              cy="200"
              r="78"
              fill="none"
              stroke={dark ? "var(--color-gold)" : "var(--color-gold-ink)"}
              strokeOpacity="0.6"
              strokeDasharray="2 6"
            />
            {brandsLevers.map((_, i) => {
              const a = (Math.PI / 3) * i - Math.PI / 2;
              const x1 = 200 + Math.cos(a) * SPOKE_IN;
              const y1 = 200 + Math.sin(a) * SPOKE_IN;
              return (
                <line
                  key={i}
                  data-draw
                  data-orbit="spoke"
                  pathLength={1}
                  style={{ ...step(i), transformOrigin: `${x1.toFixed(2)}px ${y1.toFixed(2)}px` }}
                  x1={x1}
                  y1={y1}
                  x2={200 + Math.cos(a) * SPOKE_OUT}
                  y2={200 + Math.sin(a) * SPOKE_OUT}
                  stroke="currentColor"
                  strokeOpacity={dark ? 0.3 : 0.3}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className={cx("eyebrow text-[0.7rem]", dark ? "text-gold" : "text-gold-ink")}>Foundation</p>
              <p className="mt-1 text-sm leading-tight">
                Customer
                <br />& Market
              </p>
            </div>
          </div>
          {brandsLevers.map((l, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 2;
            return (
              <div
                key={l.letter}
                data-lever-node={l.letter}
                className={cx(
                  "absolute grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-center transition-[border-color,scale] duration-300",
                  dark ? "border-line-dark-strong bg-ink-2" : "border-line-strong bg-surface",
                )}
                style={
                  {
                    left: `${50 + Math.cos(a) * 37.5}%`,
                    top: `${50 + Math.sin(a) * 37.5}%`,
                    // Move out by the ring's growth, expressed as a share of the node's own size.
                    "--out-x": `${(Math.cos(a) * NODE_SHIFT).toFixed(2)}%`,
                    "--out-y": `${(Math.sin(a) * NODE_SHIFT).toFixed(2)}%`,
                  } as CSSProperties
                }
              >
                <span data-step style={step(i)} className={cx("serif-accent text-3xl leading-none sm:text-5xl", dark ? "text-gold" : "text-gold-ink")}>
                  {l.letter}
                </span>
              </div>
            );
          })}
        </div>
      </figure>

      {/* Open rows beside the wheel, which stays in view on desktop. */}
      <ol className={cx("border-b lg:col-span-6 lg:col-start-7", dark ? "border-line-dark" : "border-line")}>
        {brandsLevers.map((l, i) => (
          <Reveal as="li" key={l.letter} delay={i * 70} className={cx("border-t", dark ? "border-line-dark" : "border-line")}>
            <div data-lever-item={l.letter} className="grid grid-cols-[3.5rem_1fr] py-8 sm:py-10">
              <span aria-hidden className="text-4xl font-light leading-none">
                {l.letter}
              </span>
              <div>
                <h3 className="text-xl tracking-[-0.015em] sm:text-2xl">{l.name}</h3>
                <p className={cx("mt-2 text-lg leading-snug", dark ? "text-paper/85" : "text-ink/85")}>{l.line}</p>
                {detailed ? (
                  <>
                    <p className={cx("mt-4 leading-[1.85]", dark ? "text-paper/75" : "text-muted")}>{l.role}</p>
                    <p className={cx("mt-2 text-sm leading-[1.85]", dark ? "text-paper/75" : "text-muted")}>{l.components}</p>
                  </>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* --------------------------------------------------------- Flow chain */

/**
 * A chain of stages joined by arrows (e.g. the GA operating logic).
 * Each arrow travels with the step it points to, so a wrapped line never ends
 * on a stranded arrow. Vertical on small screens.
 */
/**
 * A numbered sequence read left-to-right, top-to-bottom: three across on
 * desktop (nine steps form a clean 3 × 3), one column on mobile. Highlighted
 * milestones carry a solid marker instead of a filled pill.
 */
export function FlowChain({ items, dark, highlight }: { items: readonly string[]; dark?: boolean; highlight?: string[] }) {
  return (
    <ol data-seq className={cx("grid border-t md:grid-cols-3 md:gap-x-10", dark ? "border-line-dark-strong" : "border-line-strong")}>
      {items.map((item, i) => {
        const key = highlight?.includes(item);
        return (
          <li
            key={item}
            data-step
            style={step(i)}
            className={cx("flex items-center gap-4 border-b py-5 sm:py-6", dark ? "border-line-dark" : "border-line")}
          >
            <span aria-hidden className={cx("eyebrow w-7 shrink-0 tabular-nums", dark ? "text-paper-muted" : "text-muted")}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              aria-hidden
              className={cx(
                "size-2 shrink-0 rounded-full border",
                key
                  ? dark
                    ? "border-gold bg-gold"
                    : "border-ink bg-ink"
                  : dark
                    ? "border-line-dark-strong"
                    : "border-line-strong",
              )}
            />
            <span
              className={cx(
                "flex-1 text-lg leading-snug tracking-[-0.015em] sm:text-xl",
                key ? "font-medium" : dark ? "text-paper/80" : "text-ink/80",
              )}
            >
              {item}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
