import { ArrowRight, ArrowDown } from "lucide-react";
import { Reveal, cx } from "@/components/ui/primitives";
import { brandsLevers, growthChain, peakStages } from "@/lib/content";

/* ------------------------------------------------------- Process timeline */

type Step = { n: string; name: string; body: string; line?: string; question?: string };

/**
 * Connected sequence of numbered stages. Horizontal rail on large screens,
 * vertical rail on small screens.
 */
export function ProcessTimeline({ steps, dark, className }: { steps: readonly Step[]; dark?: boolean; className?: string }) {
  return (
    <ol className={cx("relative grid gap-0 lg:grid-cols-5 lg:gap-6", className)}>
      <span
        aria-hidden
        data-reveal-line
        className={cx("absolute left-0 right-0 top-[1.4rem] hidden h-px lg:block", dark ? "bg-paper/20" : "bg-ink/15")}
      />
      {steps.map((s, i) => (
        <Reveal as="li" key={s.n} delay={i * 110} className="relative flex gap-6 pb-12 last:pb-0 lg:block lg:pb-0">
          {/* vertical rail for small screens */}
          {i < steps.length - 1 ? (
            <span
              aria-hidden
              className={cx("absolute bottom-0 left-[1.4rem] top-12 w-px lg:hidden", dark ? "bg-paper/20" : "bg-ink/15")}
            />
          ) : null}
          <span
            className={cx(
              "relative z-10 grid size-11 shrink-0 place-items-center rounded-full border text-sm tabular-nums",
              dark ? "border-gold/60 bg-ink text-gold" : "border-ink/20 bg-paper text-ink",
            )}
          >
            {s.n}
          </span>
          <div className="lg:mt-8">
            <h3 className="text-xl tracking-[-0.015em] sm:text-2xl">{s.name}</h3>
            {s.line ? <p className={cx("mt-2 font-medium", dark ? "text-gold-soft" : "text-gold-ink")}>{s.line}</p> : null}
            <p className={cx("mt-3 leading-relaxed", dark ? "text-paper/65" : "text-muted")}>{s.body}</p>
            {s.question ? (
              <p className={cx("serif-accent mt-4 text-xl", dark ? "text-paper" : "text-ink")}>{s.question}</p>
            ) : null}
          </div>
        </Reveal>
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
      <div aria-hidden>
        <ol className="flex flex-col items-stretch gap-1 md:flex-row md:items-center md:gap-0">
          {nodes.map((n, i) => (
            <Reveal as="li" key={n} delay={i * 90} className="flex flex-col items-center md:flex-1 md:flex-row">
              <span className="flex min-h-14 w-full items-center justify-center rounded-full border border-paper/20 bg-ink-2 px-3 text-center text-sm text-paper md:min-h-20 md:text-[0.95rem]">
                {n}
              </span>
              {i < nodes.length - 1 ? (
                <>
                  <ArrowDown className="my-1 size-4 shrink-0 text-gold md:hidden" />
                  <ArrowRight className="mx-1 hidden size-4 shrink-0 text-gold md:block" />
                </>
              ) : null}
            </Reveal>
          ))}
        </ol>
        <Reveal
          delay={700}
          className="relative mt-4 flex items-center justify-center rounded-2xl border border-gold/50 bg-gold/10 px-6 py-4 text-center text-gold-soft"
        >
          <span className="eyebrow">And leadership influences all of them</span>
        </Reveal>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------ PEAK™ */

/** Ascending staircase: Presence → Equity → Authority → Kinetic Growth. */
export function PeakAscent({ detailed, dark = true }: { detailed?: boolean; dark?: boolean }) {
  return (
    <figure>
      <figcaption className="sr-only">
        PEAK™: Presence, then Equity, then Authority, then Kinetic Growth — from presence to momentum.
      </figcaption>
      <ol className="grid gap-3 md:grid-cols-4 md:items-end md:gap-4">
        {peakStages.map((s, i) => (
          <Reveal as="li" key={s.letter} delay={i * 140} className="md:h-full">
            <div
              className={cx(
                "flex h-full flex-col justify-between rounded-2xl border p-6 transition-colors duration-500",
                dark ? "border-paper/15 bg-ink-2 hover:border-gold/60" : "border-ink/12 bg-white hover:border-gold-ink/50",
                (detailed
                  ? ["md:min-h-[22rem]", "md:min-h-[26rem]", "md:min-h-[30rem]", "md:min-h-[34rem]"]
                  : ["md:min-h-[13rem]", "md:min-h-[16rem]", "md:min-h-[19rem]", "md:min-h-[22rem]"])[i],
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={cx("serif-accent text-6xl leading-none", dark ? "text-gold" : "text-gold-ink")}>
                  {s.letter}
                </span>
                <span className={cx("eyebrow mt-2", dark ? "text-paper/40" : "text-muted")}>0{i + 1}</span>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl tracking-[-0.02em]">{s.name}</h3>
                {detailed ? (
                  <>
                    <p className={cx("serif-accent mt-3 text-lg", dark ? "text-gold-soft" : "text-gold-ink")}>{s.question}</p>
                    <p className={cx("mt-4 text-sm leading-relaxed", dark ? "text-paper/60" : "text-muted")}>{s.focus}</p>
                    <p className={cx("mt-4 border-t pt-4 text-sm leading-relaxed", dark ? "border-paper/10 text-paper/80" : "border-ink/10")}>
                      {s.outcome}
                    </p>
                  </>
                ) : (
                  <p className={cx("mt-3 text-sm leading-relaxed", dark ? "text-paper/60" : "text-muted")}>{s.question}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
      <div aria-hidden className={cx("mt-5 flex items-center gap-3", dark ? "text-paper/40" : "text-muted")}>
        <span className="eyebrow">Presence</span>
        <span className={cx("h-px flex-1", dark ? "bg-gradient-to-r from-paper/10 to-gold" : "bg-gradient-to-r from-ink/10 to-gold-ink")} />
        <span className={cx("eyebrow", dark ? "text-gold" : "text-gold-ink")}>Momentum</span>
      </div>
    </figure>
  );
}

/* ---------------------------------------------------------- BRANDS™ */

/**
 * Six levers arranged around the cross-cutting foundation (Customer & Market),
 * as described in the Growth Architecture™ product bible.
 */
export function BrandsSystem({ detailed }: { detailed?: boolean }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
      <figure className="mx-auto w-full max-w-[30rem] lg:col-span-5">
        <figcaption className="sr-only">
          BRANDS™: Branding, Conversion Readiness, Awareness, Nurture, Discover &amp; Trust and Scale, arranged around a
          shared foundation of customer and market understanding.
        </figcaption>
        <div aria-hidden className="relative aspect-square">
          <svg viewBox="0 0 400 400" className="absolute inset-0 size-full">
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.15" />
            <circle cx="200" cy="200" r="78" fill="none" stroke="#DEBB93" strokeOpacity="0.6" strokeDasharray="2 6" />
            {brandsLevers.map((_, i) => {
              const a = (Math.PI / 3) * i - Math.PI / 2;
              return (
                <line
                  key={i}
                  x1={200 + Math.cos(a) * 80}
                  y1={200 + Math.sin(a) * 80}
                  x2={200 + Math.cos(a) * 122}
                  y2={200 + Math.sin(a) * 122}
                  stroke="currentColor"
                  strokeOpacity="0.2"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <p className="eyebrow text-[0.62rem] text-gold">Foundation</p>
              <p className="mt-1 text-sm leading-tight">
                Customer
                <br />& Market
              </p>
            </div>
          </div>
          {brandsLevers.map((l, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 2;
            const x = 50 + Math.cos(a) * 37.5;
            const y = 50 + Math.sin(a) * 37.5;
            return (
              <div
                key={l.letter}
                className="absolute grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-current/20 bg-ink-2 text-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="serif-accent text-4xl leading-none text-gold sm:text-5xl">{l.letter}</span>
              </div>
            );
          })}
        </div>
      </figure>

      <ol className="grid gap-px overflow-hidden rounded-2xl border border-paper/12 bg-paper/12 sm:grid-cols-2 lg:col-span-7">
        {brandsLevers.map((l, i) => (
          <Reveal as="li" key={l.letter} delay={i * 70} className="bg-ink p-6 sm:p-7">
            <p className="flex items-baseline gap-3">
              <span className="serif-accent text-3xl leading-none text-gold">{l.letter}</span>
              <span className="text-lg tracking-[-0.01em]">{l.name}</span>
            </p>
            <p className="mt-3 font-medium text-gold-soft">{l.line}</p>
            {detailed ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{l.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-paper/45">{l.components}</p>
              </>
            ) : null}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* --------------------------------------------------------- Flow chain */

/** A wrapping chain of stages joined by arrows (e.g. the GA operating logic). */
export function FlowChain({ items, dark, highlight }: { items: readonly string[]; dark?: boolean; highlight?: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 60} variant="fade" className="flex items-center gap-2">
          <span
            className={cx(
              "inline-flex min-h-11 items-center rounded-full border px-4 text-sm",
              highlight?.includes(item)
                ? dark
                  ? "border-gold bg-gold text-ink"
                  : "border-ink bg-ink text-paper"
                : dark
                  ? "border-paper/20 text-paper/85"
                  : "border-ink/15 bg-white text-ink",
            )}
          >
            {item}
          </span>
          {i < items.length - 1 ? (
            <ArrowRight aria-hidden className={cx("size-4", dark ? "text-gold" : "text-gold-ink")} />
          ) : null}
        </Reveal>
      ))}
    </ol>
  );
}
