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
        "relative py-24 sm:py-32 lg:py-40 " +
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
    <Reveal className="@container w-full">
      <div className="@4xl:grid @4xl:grid-cols-12 @4xl:items-end @4xl:gap-x-16">
        {/* With no supporting text beside it, the title runs wider (only a button, or nothing, shares the row). */}
        <div className={text ? "max-w-4xl @4xl:col-span-6" : action ? "max-w-5xl @4xl:col-span-9" : "max-w-6xl @4xl:col-span-11"}>
          <p className="text-[0.95rem] font-medium text-muted">{label}</p>
          <h2 id={id} className="font-display mt-6 text-[clamp(1.75rem,2.72vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.035em]">
            {title}
          </h2>
        </div>
        {text || action ? (
          <div className={text ? "@4xl:col-span-6 @4xl:col-start-7" : "@4xl:col-span-3 @4xl:col-start-10 @4xl:flex @4xl:justify-end"}>
            {text ? <div className="mt-8 max-w-2xl text-muted sm:text-lg @4xl:mt-0">{text}</div> : null}
            {action ? (
              <Link
                href={action.href}
                className="mt-10 inline-flex min-h-12 items-center rounded-full bg-gold px-6 text-[0.95rem] font-medium text-ink"
              >
                {action.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
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
        "mt-12 border-t border-line sm:mt-16 " + (columns ? `grid gap-x-10 ${colClass[columns]} ` : "") + className
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
        const cls = "row-invert grid gap-1 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6";
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
    <Reveal variant="fade" className="flex flex-col items-center py-10 text-center sm:py-16">
      <h2
        data-split={reveal === "words" ? "" : undefined}
        className={"display max-w-[22ch] text-[clamp(1.84rem,3.2vw,3rem)]" + (reveal === "mask" ? " reveal-mask" : "")}
      >
        {children}
      </h2>
      {sub ? <div className="mt-10 max-w-2xl text-muted">{sub}</div> : null}
    </Reveal>
  );
}
