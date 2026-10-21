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
  return (
    <ol data-seq className={cx("relative grid gap-0 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0", className)}>
      <span
        aria-hidden
        data-seq-line
        className={cx("absolute left-0 right-0 top-[1.4rem] hidden h-px lg:block", dark ? "bg-line-dark-strong" : "bg-line-strong")}
      />
      {steps.map((s, i) => (
        <li key={s.n} data-step style={step(i)} className="group/step relative flex gap-6 pb-12 last:pb-0 lg:row-span-5 lg:grid lg:grid-rows-subgrid lg:gap-0 lg:pb-0">
          {i < steps.length - 1 ? (
            <span
              aria-hidden
              className={cx("absolute bottom-0 left-[1.4rem] top-12 w-px lg:hidden", dark ? "bg-line-dark-strong" : "bg-line-strong")}
            />
          ) : null}
          <span
            className={cx(
              "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border text-sm tabular-nums transition-[background-color,color,border-color] delay-[calc(var(--i)*110ms+300ms)] duration-500",
              dark
                ? "border-gold/60 bg-ink text-gold in-[.is-visible]:bg-gold in-[.is-visible]:text-ink"
                : "border-line-strong bg-paper text-ink in-[.is-visible]:border-ink in-[.is-visible]:bg-ink in-[.is-visible]:text-paper",
            )}
          >
            {s.n}
          </span>
          {/* On lg the wrapper dissolves so title, line, body and question each sit on a
              shared subgrid row and align across all five columns. */}
          <div className="lg:contents">
            <h3 className="text-xl tracking-[-0.015em] sm:text-2xl lg:mt-8">{s.name}</h3>
            {s.line ? <p className={cx("mt-2 font-medium", dark ? "text-gold-soft" : "text-gold-ink")}>{s.line}</p> : null}
            <p className={cx("mt-3 leading-relaxed", dark ? "text-paper/75" : "text-muted")}>{s.body}</p>
            {s.question ? (
              <p className={cx("serif-accent mt-4 text-xl", dark ? "text-paper" : "text-ink")}>{s.question}</p>
            ) : null}
          </div>
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

/** Ascending staircase: Presence → Equity → Authority → Kinetic Growth. 2×2 on tablet, 4 up on desktop. */
export function PeakAscent({ detailed, dark = true }: { detailed?: boolean; dark?: boolean }) {
  return (
    <figure data-seq>
      <figcaption className="sr-only">
        PEAK™ — Presence → Equity → Authority → Kinetic Growth
      </figcaption>
      {/* Equal cards sized to their content; the ascent is shown by a bar that
          fills 25 → 100% across the four stages instead of empty card height. */}
      <ol className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {peakStages.map((s, i) => (
          <li key={s.letter} data-step style={step(i)}>
            <div
              data-spotlight={dark ? "" : undefined}
              className={cx(
                "card-interactive relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:p-8 lg:p-6 xl:p-7",
                dark ? "border-line-dark-strong bg-ink-2" : "border-line bg-surface",
              )}
            >
              <span aria-hidden className={cx("absolute inset-x-0 top-0 h-0.5", dark ? "bg-paper/10" : "bg-ink/10")}>
                <span
                  className={cx("block h-full", dark ? "bg-gold" : "bg-gold-ink")}
                  style={{ width: `${((i + 1) / peakStages.length) * 100}%` }}
                />
              </span>
              <div className="flex items-start justify-between gap-4">
                <span aria-hidden className={cx("serif-accent text-6xl leading-none", dark ? "text-gold" : "text-gold-ink")}>
                  {s.letter}
                </span>
                <span aria-hidden className={cx("eyebrow mt-2", dark ? "text-paper-muted" : "text-muted")}>
                  0{i + 1}
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl tracking-[-0.02em]">{s.name}</h3>
                {detailed ? (
                  <>
                    <p className={cx("mt-3 text-[0.95rem] font-medium leading-snug", dark ? "text-gold-soft" : "text-gold-ink")}>
                      {s.question}
                    </p>
                    <p className={cx("mt-4 text-sm leading-relaxed", dark ? "text-paper-muted" : "text-muted")}>{s.focus}</p>
                    <p
                      className={cx(
                        "mt-4 border-t pt-4 text-sm leading-relaxed",
                        dark ? "border-line-dark text-paper/85" : "border-line",
                      )}
                    >
                      {s.outcome}
                    </p>
                  </>
                ) : (
                  <p className={cx("mt-3 text-sm leading-relaxed", dark ? "text-paper-muted" : "text-muted")}>{s.question}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div aria-hidden className={cx("mt-5 flex items-center gap-3", dark ? "text-paper-muted" : "text-muted")}>
        <span className="eyebrow">Presence</span>
        <span
          data-seq-line
          className={cx("h-px flex-1", dark ? "bg-gradient-to-r from-paper/10 to-gold" : "bg-gradient-to-r from-ink/10 to-gold-ink")}
        />
        <span className={cx("eyebrow", dark ? "text-gold" : "text-gold-ink")}>Momentum</span>
      </div>
    </figure>
  );
}

/* ---------------------------------------------------------- BRANDS™ */

/** Links hover/focus on a lever row to its letter on the ring (and back), with pure CSS. */
const brandsLinkCss =
  // Each node stays centred on the ring; global hover lifts must never override this.
  `.brands .brands-node{translate:-50% -50% !important;transition:translate .45s var(--ease-architect),scale .45s var(--ease-architect),border-color .3s;}` +
  // Out: the hovered lever (or its card) moves outward from the centre, the same for all six.
  `@media (prefers-reduced-motion:reduce){.brands .brands-node{transition:border-color .3s;}}` +
  brandsLevers
    .map((l) => {
      const out = `translate:calc(-50% + var(--ox) * 18px) calc(-50% + var(--oy) * 18px) !important;scale:1.08;border-color:var(--brands-accent);`;
      return (
        `.brands [data-lever-node="${l.letter}"]:hover,` +
        `.brands:has([data-lever-item="${l.letter}"]:is(:hover,:focus-within)) [data-lever-node="${l.letter}"]{${out}}` +
        `@media (prefers-reduced-motion:reduce){.brands [data-lever-node="${l.letter}"]:hover,.brands:has([data-lever-item="${l.letter}"]:is(:hover,:focus-within)) [data-lever-node="${l.letter}"]{translate:-50% -50% !important;scale:1;}}` +
        `.brands:has([data-lever-node="${l.letter}"]:hover) [data-lever-item="${l.letter}"]{box-shadow:inset 0 0 0 1px var(--brands-accent);}`
      );
    })
    .join("");

/**
 * Six levers arranged around the cross-cutting foundation (Customer & Market),
 * as described in the Growth Architecture™ product bible.
 */
export function BrandsSystem({ detailed, tone = "dark" }: { detailed?: boolean; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <div
      className="brands grid gap-12 lg:grid-cols-12 lg:items-center"
      style={{ "--brands-accent": dark ? "var(--color-gold)" : "var(--color-gold-ink)" } as CSSProperties}
    >
      <style>{brandsLinkCss}</style>
      <figure data-seq className="mx-auto w-full max-w-[30rem] lg:col-span-5">
        <figcaption className="sr-only">
          BRANDS™ — Six dimensions of growth.
        </figcaption>
        <div aria-hidden className={cx("relative aspect-square", dark ? "text-paper" : "text-ink")}>
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity={dark ? 0.15 : 0.18} />
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
              return (
                <line
                  key={i}
                  data-draw
                  pathLength={1}
                  style={step(i)}
                  x1={200 + Math.cos(a) * 80}
                  y1={200 + Math.sin(a) * 80}
                  x2={200 + Math.cos(a) * 122}
                  y2={200 + Math.sin(a) * 122}
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
                  "brands-node absolute grid size-[22%] place-items-center rounded-full border text-center",
                  dark ? "border-line-dark-strong bg-ink-2" : "border-line-strong bg-surface",
                )}
                style={
                  {
                    left: `${50 + Math.cos(a) * 37.5}%`,
                    top: `${50 + Math.sin(a) * 37.5}%`,
                    // Unit vector pointing away from the centre, for the hover move.
                    "--ox": Math.cos(a).toFixed(3),
                    "--oy": Math.sin(a).toFixed(3),
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

      <ol
        className={cx(
          "grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:col-span-7",
          dark ? "border-line-dark bg-line-dark" : "border-line bg-line",
        )}
      >
        {brandsLevers.map((l, i) => (
          <Reveal
            as="li"
            key={l.letter}
            delay={i * 70}
            className={dark ? "bg-ink" : "bg-surface"}
          >
            <div
              data-lever-item={l.letter}
              className="h-full p-6 transition-shadow duration-300 hover:shadow-[inset_0_0_0_1px_var(--brands-accent)] sm:p-8 lg:p-6 xl:p-8"
            >
              <p className="flex items-baseline gap-3">
                <span aria-hidden className={cx("serif-accent text-3xl leading-none", dark ? "text-gold" : "text-gold-ink")}>
                  {l.letter}
                </span>
                <span className="text-lg tracking-[-0.01em]">{l.name}</span>
              </p>
              <p className={cx("mt-3 font-medium", dark ? "text-gold-soft" : "text-gold-ink")}>{l.line}</p>
              {detailed ? (
                <>
                  <p className={cx("mt-3 text-sm leading-relaxed", dark ? "text-paper/80" : "text-ink/80")}>{l.role}</p>
                  <p className={cx("mt-3 text-sm leading-relaxed", dark ? "text-paper-muted" : "text-muted")}>{l.components}</p>
                </>
              ) : null}
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
        const last = i === items.length - 1;
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
            {!last ? (
              <ArrowRight aria-hidden className={cx("size-4 shrink-0", dark ? "text-paper/30" : "text-ink/25")} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
