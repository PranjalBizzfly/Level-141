import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * Section layouts, each chosen for what its content is rather than one row
 * template for everything. Motion lives in app/layouts.css and is
 * scroll-driven CSS (no layout shift, nothing hidden without it); every
 * layout reads fully with reduced motion or without scroll timelines.
 */

const n2 = (i: number) => String(i + 1).padStart(2, "0");
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ------------------------------------------------------------ StickyIndex */

/**
 * A sticky heading on the left; on the right, each item as a large editorial
 * block with its numeral. The block passing the middle of the screen is lit,
 * the rest step back — for lists you read one idea at a time.
 */
export function StickyIndex({
  head,
  items,
}: {
  head: ReactNode;
  items: readonly { name: ReactNode; body?: ReactNode }[];
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">{head}</div>
      </div>
      <ol className="lg:col-span-7 lg:col-start-6">
        {items.map((it, i) => (
          <li key={i} className="si-item grid grid-cols-[3.25rem_1fr] gap-x-4 py-8 sm:grid-cols-[5rem_1fr] sm:py-12">
            <span aria-hidden className="font-display text-[1.75rem] leading-none tracking-[-0.04em] text-muted sm:text-[2.75rem]">
              {n2(i)}
            </span>
            <div>
              <h3 className="font-display text-[1.6rem] font-medium leading-[1.1] tracking-[-0.025em] sm:text-[2.4rem]">
                {/* Headings carry no closing full stop (brand guidance). */}
                {typeof it.name === "string" ? it.name.replace(/\.$/, "") : it.name}
              </h3>
              {it.body ? <p className="mt-4 max-w-xl text-muted sm:text-lg">{it.body}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------- StackCards */

/**
 * Steps as full panels that pin one over another. As the next panel arrives,
 * the one beneath tilts back in 3D and recedes — a process you climb.
 */
export function StackCards({ items }: {
  items: readonly { n?: string; name: ReactNode; line?: ReactNode; body?: ReactNode; aside?: ReactNode }[];
}) {
  return (
    <ol className="stack mt-14 sm:mt-20">
      {items.map((it, i) => (
        <li key={i} className="stack-slot" style={vars({ "--i": i, "--n": items.length })}>
          <div
            className={
              "stack-card relative grid min-h-[min(68svh,34rem)] gap-8 overflow-hidden rounded-[1.75rem] p-7 sm:p-12 lg:grid-cols-12 lg:p-16 " +
              (i % 2
                ? "border border-white/15 bg-black text-white dark:border-black/10 dark:bg-white dark:text-black"
                : "border border-black/10 bg-white text-black dark:border-white/15 dark:bg-[#0d0d0d] dark:text-white")
            }
          >
            <span
              aria-hidden
              className="font-display text-[clamp(4.5rem,13vw,11rem)] leading-[0.8] tracking-[-0.06em] opacity-90 lg:col-span-5"
            >
              {it.n ?? n2(i)}
            </span>
            <div className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
              <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1] tracking-[-0.035em]">{it.name}</h3>
              {it.line ? <p className="mt-4 text-lg opacity-90 sm:text-xl">{it.line}</p> : null}
              {it.body ? <p className="mt-4 max-w-lg opacity-70">{it.body}</p> : null}
              {it.aside ? <div className="mt-8 border-t border-current/20 pt-5 font-medium">{it.aside}</div> : null}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- Cascade */

/**
 * A staircase of statements: each line steps one level further across and
 * arrives as it is reached — growth read as levels.
 */
export function Cascade({ lines }: { lines: readonly { lead: ReactNode; rest?: ReactNode }[] }) {
  return (
    <ol className="mt-14 space-y-2 sm:mt-20 sm:space-y-3">
      {lines.map((l, i) => (
        <li
          key={i}
          className="cascade-line font-display text-[clamp(1.6rem,4.6vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.035em]"
          style={vars({ "--step": `${(i / Math.max(lines.length - 1, 1)) * 100}%` })}
        >
          <span className="cascade-inner inline-flex flex-wrap items-baseline gap-x-[0.3em]">
            <span aria-hidden className="cascade-tick inline-block h-[0.06em] w-[0.7em] translate-y-[-0.3em] bg-current" />
            {l.lead}
            {l.rest ? <span className="text-muted">{l.rest}</span> : null}
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ----------------------------------------------------------------- Strike */

/**
 * Statements that are crossed out as they are read — for things that are
 * true but are not the point ("may be necessary", "what it is not").
 */
export function Strike({ items, conclusion }: { items: readonly string[]; conclusion?: ReactNode }) {
  return (
    <div className="mt-14 sm:mt-20">
      <ul className="space-y-1 sm:space-y-2">
        {items.map((t) => (
          <li key={t} className="font-display text-[clamp(1.5rem,4.2vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.03em]">
            <span className="strike relative inline">
              <span className="strike-text">{t}</span>
            </span>
          </li>
        ))}
      </ul>
      {conclusion ? <div className="mt-14 max-w-2xl text-xl sm:text-2xl">{conclusion}</div> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- Marquee */

/** Short labels set huge and drifting sideways with the scroll. */
export function Marquee({ items, label }: { items: readonly string[]; label: string }) {
  const row = (rev: boolean) => (
    <div aria-hidden className={"marquee-row flex w-max gap-[0.45em] whitespace-nowrap " + (rev ? "marquee-rev" : "")}>
      {[...items, ...items].map((t, i) => (
        <span key={i} className="flex items-center gap-[0.45em]">
          <span className={i % 2 ? "text-muted" : ""}>{t}</span>
          <span className="inline-block size-[0.18em] translate-y-[-0.05em] bg-current opacity-40" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee mt-14 overflow-hidden font-display text-[clamp(2.5rem,7.5vw,7rem)] font-medium leading-[1.05] tracking-[-0.04em] sm:mt-20">
      <ul className="sr-only" aria-label={label}>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {row(false)}
      {row(true)}
    </div>
  );
}

/* ------------------------------------------------------------------ Bento */

/** An asymmetric grid: the first idea large, the rest around it. */
export function Bento({ items }: {
  items: readonly { name: ReactNode; body?: ReactNode; kicker?: ReactNode; href?: string }[];
}) {
  const card = "border-[color-mix(in_oklab,currentColor_14%,transparent)] bg-[color-mix(in_oklab,currentColor_3%,transparent)]";
  return (
    <ul className="mt-14 grid auto-rows-[minmax(12rem,auto)] gap-3 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it, i) => (
        <li
          key={i}
          className={
            "bento-card rounded-[1.5rem] border " +
            card +
            (i === 0 ? " sm:col-span-2 lg:row-span-2" : "") +
            (i === items.length - 1 ? bentoTail(items.length) : "") +
            (i === 0 ? " !border-black !bg-black !text-white dark:!border-white dark:!bg-white dark:!text-black" : "")
          }
          style={vars({ "--i": i })}
        >
          <BentoInner href={it.href}>
          <span aria-hidden className="text-sm tabular-nums opacity-60">
            {it.kicker ?? n2(i)}
          </span>
          <div>
            <h3
              className={
                "font-display font-medium leading-[1.05] tracking-[-0.03em] " +
                (i === 0 ? "text-[clamp(2.25rem,4.5vw,4rem)]" : "text-[1.5rem] sm:text-[1.75rem]")
              }
            >
              {it.name}
            </h3>
            {it.body ? <p className={"mt-3 opacity-70 " + (i === 0 ? "max-w-md text-lg" : "text-[0.95rem]")}>{it.body}</p> : null}
          </div>
          </BentoInner>
        </li>
      ))}
    </ul>
  );
}

/** Widen the last tile so the final row is always full. */
function bentoTail(n: number) {
  const sm = (n - 1) % 2 === 1 ? " sm:col-span-2" : "";
  const rest = n - 5;
  const lastRow = rest > 0 ? rest % 4 || 4 : 4;
  const span: Record<number, string> = { 2: " lg:col-span-2", 3: " lg:col-span-3", 4: " lg:col-span-4" };
  const lg = rest > 0 && lastRow < 4 ? span[5 - lastRow] : "";
  return sm + lg;
}

function BentoInner({ href, children }: { href?: string; children: ReactNode }) {
  const cls = "flex h-full flex-col justify-between gap-8 p-6 sm:p-8";
  return href ? (
    <Link href={href} className={cls + " transition-opacity hover:opacity-80"}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

/* ---------------------------------------------------------------- Timeline */

/** Points on one line that fills as the section is read. */
export function Timeline({ items }: { items: readonly { name: ReactNode; body: ReactNode }[] }) {
  return (
    <div className="timeline relative mt-14 sm:mt-20">
      <div aria-hidden className="absolute left-[0.4rem] top-0 h-full w-px bg-current opacity-15 lg:left-0 lg:top-[0.4rem] lg:h-px lg:w-full" />
      <div aria-hidden className="timeline-fill absolute left-[0.4rem] top-0 h-full w-px bg-current lg:left-0 lg:top-[0.4rem] lg:h-px lg:w-full" />
      <ol className="relative grid gap-10 lg:gap-8" style={{ gridTemplateColumns: `repeat(1, 1fr)` }}>
        <style>{`@media (min-width:1024px){.timeline ol{grid-template-columns:repeat(${items.length},1fr)!important}}`}</style>
        {items.map((it, i) => (
          <li key={i} className="relative pl-10 lg:pl-0 lg:pt-12">
            <span aria-hidden className="absolute left-0 top-0 size-[0.85rem] rounded-full border border-current bg-[var(--color-paper)] lg:top-0" />
            <h3 className="font-display text-[1.75rem] font-medium leading-tight tracking-[-0.03em] sm:text-[2.25rem]">{it.name}</h3>
            <p className="mt-3 max-w-xs text-muted">{it.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ Lanes */

/**
 * A zigzag of large statements, each answered on the opposite side — for
 * a voice and its response.
 */
export function Lanes({ items }: {
  items: readonly { lead: ReactNode; answer: ReactNode; note?: ReactNode }[];
}) {
  return (
    <ol className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
      {items.map((it, i) => (
        <li key={i} className="lane grid gap-6 lg:grid-cols-12 lg:items-end" data-side={i % 2 ? "r" : "l"}>
          <p
            className={
              "font-display text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] lg:col-span-7 " +
              (i % 2 ? "lg:order-2 lg:col-start-6" : "")
            }
          >
            {it.lead}
          </p>
          <div className={"lg:col-span-4 " + (i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
            <p className="flex items-start gap-3 text-lg">
              <span aria-hidden className="mt-[0.7em] h-px w-6 shrink-0 bg-current" />
              <span>{it.answer}</span>
            </p>
            {it.note ? <p className="mt-3 pl-9 text-muted">{it.note}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- Compare */

/** Before and after as two contrasting panels; the after panel rises in. */
export function Compare({ before, after }: { before: ReactNode; after: ReactNode }) {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      <div className="flex min-h-[22rem] flex-col justify-between rounded-[1.75rem] border border-black/12 bg-white p-8 text-black sm:p-12 dark:border-white/15 dark:bg-black dark:text-white">
        <p className="font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-none tracking-[-0.05em] opacity-50">Before</p>
        <p className="mt-10 max-w-md text-lg opacity-75">{before}</p>
      </div>
      <div className="compare-after flex min-h-[22rem] flex-col justify-between rounded-[1.75rem] bg-black p-8 text-white sm:p-12 dark:bg-white dark:text-black">
        <p className="font-display text-[clamp(3rem,7vw,6rem)] font-medium leading-none tracking-[-0.05em]">After</p>
        <p className="mt-10 max-w-md text-lg">{after}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Shelf */

/**
 * A horizontal shelf of cards in 3D. On wide screens the section pins and the
 * shelf slides sideways as you scroll down, each card tilted like a page on a
 * shelf; on small screens it is a swipeable row.
 */
export function Shelf({
  items,
  label = "Cards — scroll sideways",
}: {
  items: readonly { kicker?: ReactNode; name: ReactNode; body?: ReactNode }[];
  label?: string;
}) {
  const card = "border-[color-mix(in_oklab,currentColor_14%,transparent)] bg-[color-mix(in_oklab,currentColor_3%,transparent)] backdrop-blur-[2px]";
  return (
    <div className="shelf" style={vars({ "--count": items.length })}>
      <div className="shelf-pin">
        {/* Focusable so the row can be scrolled from the keyboard on small screens. */}
        <ol tabIndex={0} aria-label={label} className="shelf-track flex gap-4 outline-none focus-visible:ring-2 focus-visible:ring-current sm:gap-5">
          {items.map((it, i) => (
            <li key={i} className={"shelf-card flex w-[78vw] shrink-0 flex-col justify-between rounded-[1.5rem] border p-7 sm:w-[24rem] sm:p-9 " + card}>
              <span className="text-sm tabular-nums opacity-60">{it.kicker ?? n2(i)}</span>
              <div className="mt-16">
                <h3 className="font-display text-[1.75rem] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[2rem]">{it.name}</h3>
                {it.body ? <p className="mt-4 opacity-70">{it.body}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
