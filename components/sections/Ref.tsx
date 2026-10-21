import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/primitives";

/**
 * Page patterns taken from the reference recordings:
 * - RefIntro: small label, a modest two-line headline, an optional pill
 *   (COLLINS "Programs — Eleven ways we help brands…").
 * - RefRows: name left, line right, hairlines; whole row inverts to solid
 *   black on hover and carries an arrow when it links (COLLINS 0:23).
 * - RefStatement: one centred line in a large quiet field (COLLINS hero).
 */

/** How a section arrives (app/layouts.css). Use each at most once per page. */
export type Enter = "rise" | "doors" | "expand" | "zoom" | "iris";

export function RefSection({
  id,
  children,
  tone = "paper",
  enter,
}: {
  id?: string;
  children: ReactNode;
  tone?: "paper" | "ink";
  enter?: Enter;
}) {
  return (
    <section
      id={id}
      className={
        "relative py-20 sm:py-20 lg:py-24 " +
        (tone === "ink" ? "on-dark bg-ink text-paper" : "bg-paper text-ink") +
        (enter ? ` enter-${enter}` : "")
      }
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function RefIntro({
  label,
  title,
  text,
  action,
  id,
}: {
  label: string;
  title: ReactNode;
  /** Optional short supporting paragraph under the headline. */
  text?: ReactNode;
  action?: { label: string; href: string };
  id?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <p className="text-[0.95rem] font-medium text-muted">{label}</p>
      <h2 id={id} className="font-display mt-4 text-[clamp(1.9rem,3.4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.035em]">
        {title}
      </h2>
      {text ? <div className="mt-6 max-w-xl text-muted sm:text-lg">{text}</div> : null}
      {action ? (
        <Link
          href={action.href}
          className="mt-8 inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-[0.95rem] font-medium text-ink"
        >
          {action.label}
        </Link>
      ) : null}
    </Reveal>
  );
}

export type RefRow = { name: ReactNode; line: ReactNode; extra?: ReactNode; href?: string; key: string; id?: string };

const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

export function RefRows({
  rows,
  className = "",
  columns,
}: {
  rows: readonly RefRow[];
  className?: string;
  /** Short name-only lists can flow into columns (an index). */
  columns?: 2 | 3 | 4;
}) {
  return (
    <ul
      className={
        "mt-14 border-t border-line sm:mt-16 " + (columns ? `grid gap-x-10 ${colClass[columns]} ` : "") + className
      }
    >
      {rows.map((r) => {
        const inner = (
          <>
            <span
              className={
                "text-[1.05rem] font-medium " + (!r.line ? "sm:col-span-11" : r.extra ? "sm:col-span-3" : "sm:col-span-4")
              }
            >
              {r.name}
            </span>
            {r.line ? <span className={"text-muted " + (r.extra ? "sm:col-span-4" : "sm:col-span-7")}>{r.line}</span> : null}
            {r.extra ? <span className="sm:col-span-4">{r.extra}</span> : null}
            <span className="hidden justify-self-end sm:col-span-1 sm:block">
              {r.href ? <ArrowRight aria-hidden className="size-4" /> : null}
            </span>
          </>
        );
        const cls = "row-invert grid gap-1 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6";
        return (
          <li key={r.key} id={r.id} className="scroll-mt-28 border-b border-line">
            {r.href ? (
              <Link href={r.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * reveal: "words" fades the headline in word by word; "mask" unveils it from
 * its baseline. Use a different one for a second statement on the same page.
 */
export function RefStatement({
  children,
  sub,
  reveal = "words",
}: {
  children: ReactNode;
  sub?: ReactNode;
  reveal?: "words" | "mask";
}) {
  return (
    <Reveal variant="fade" className="flex flex-col items-center py-8 text-center sm:py-12">
      <h2
        data-split={reveal === "words" ? "" : undefined}
        className={"display max-w-[22ch] text-[clamp(2rem,4vw,3.75rem)]" + (reveal === "mask" ? " reveal-mask" : "")}
      >
        {children}
      </h2>
      {sub ? <div className="mt-8 max-w-xl text-muted">{sub}</div> : null}
    </Reveal>
  );
}
