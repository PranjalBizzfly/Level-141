import type { ReactNode } from "react";
import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink, Reveal, cx } from "@/components/ui/primitives";

type Cta = { label: string; href: string };

/** Closing call-to-action band, shared across pages with page-specific copy. */
export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  closingLine,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  primary: Cta;
  secondary?: Cta;
  /** Optional line shown directly above the actions (e.g. "Find Your Level."). */
  closingLine?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden border-t border-paper/10 bg-ink py-24 text-paper sm:py-32 lg:py-40">
      
      <BracketClose className="pointer-events-none absolute right-5 top-6 size-12 text-paper/20 sm:top-10 sm:right-10 sm:size-14 lg:right-14 lg:top-12 lg:size-16" />
      <BracketOpen className="pointer-events-none absolute bottom-6 left-5 size-12 text-paper/20 sm:bottom-10 sm:left-10 sm:size-14 lg:bottom-12 lg:left-14 lg:size-16" />
      {body ? (
        /* With supporting copy: headline left; copy and actions right behind a
           hairline, copy aligned with the eyebrow, actions with the last line. */
        <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-gold">{eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
              <span data-mask className="block">
                {title}
              </span>
            </h2>
          </Reveal>
          <Reveal
            delay={120}
            className="flex flex-col justify-between gap-8 border-t border-line-dark pt-8 sm:gap-10 sm:pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-14"
          >
            <div className="max-w-xl text-base leading-[1.85] text-paper/70 sm:text-lg">
              {body}
              {closingLine ? <p className="mt-6 text-xl font-light tracking-[-0.01em] text-paper">{closingLine}</p> : null}
            </div>
            <Actions primary={primary} secondary={secondary} stackOnLg />
          </Reveal>
        </div>
      ) : (
        /* Headline only: one wide column, actions in a row beneath — no empty panel. */
        <div className="container-x relative">
          <Reveal className="max-w-5xl">
            <p className="eyebrow text-gold">{eyebrow}</p>
            <h2 className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
              <span data-mask className="block">
                {title}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-10 border-t border-line-dark pt-8 sm:mt-16 sm:pt-12">
            <Actions primary={primary} secondary={secondary} />
          </Reveal>
        </div>
      )}
    </section>
  );
}

function Actions({ primary, secondary, stackOnLg }: { primary: Cta; secondary?: Cta; stackOnLg?: boolean }) {
  return (
    <div
      className={cx(
        "flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-8",
        stackOnLg && "lg:flex-col lg:items-start lg:gap-5",
      )}
    >
      <ButtonLink href={primary.href} variant="gold">
        {primary.label}
      </ButtonLink>
      {secondary ? (
        <ButtonLink href={secondary.href} variant="ghost-light">
          {secondary.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}
