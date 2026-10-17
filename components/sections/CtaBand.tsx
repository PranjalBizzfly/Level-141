import type { ReactNode } from "react";
import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink, Reveal } from "@/components/ui/primitives";

type Cta = { label: string; href: string };

/** Closing call-to-action band, shared across pages with page-specific copy. */
export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  primary: Cta;
  secondary?: Cta;
}) {
  return (
    <section className="on-dark relative overflow-hidden border-t border-paper/10 bg-ink py-24 text-paper sm:py-32 lg:py-40">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <BracketClose className="pointer-events-none absolute right-5 top-10 size-12 text-gold/40 sm:right-10 sm:size-16 lg:right-14 lg:top-14 lg:size-24" />
      <BracketOpen className="pointer-events-none absolute bottom-10 left-5 size-12 text-paper/10 sm:left-10 sm:size-16 lg:bottom-14 lg:left-14 lg:size-24" />
      <div className="container-x relative">
        <Reveal className="max-w-4xl">
          <p className="eyebrow text-gold">{eyebrow}</p>
          <h2 className="display mt-7 text-[2.6rem] sm:text-6xl lg:text-[5.25rem]">{title}</h2>
          {body ? <div className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70">{body}</div> : null}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={primary.href} variant="gold">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="ghost-light">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
