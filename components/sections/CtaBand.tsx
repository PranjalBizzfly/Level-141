import type { ReactNode } from "react";
import { ButtonLink, Reveal, onPhoto } from "@/components/ui/primitives";

type Cta = { label: string; href: string };

/** Closing call-to-action: true black in both themes, one message and one action. */
export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  closingLine,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  primary: Cta;
  /** Kept for callers; the band shows a single action. */
  secondary?: Cta;
  /** Optional line shown directly above the action (e.g. "Find Your Level."). */
  closingLine?: string;
}) {
  return (
    <section style={onPhoto} className="relative overflow-hidden bg-ink py-28 text-paper sm:py-40 lg:py-56">
      <Reveal className="container-x mx-auto max-w-3xl text-center">
        <p className="eyebrow text-paper/70">{eyebrow}</p>
        <h2 className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
          <span data-mask className="block">
            {title}
          </span>
        </h2>
        {body ? <div className="mx-auto mt-8 max-w-xl text-base leading-[1.85] text-paper/75 sm:text-lg">{body}</div> : null}
        {closingLine ? <p className="mt-8 text-xl font-light tracking-[-0.01em]">{closingLine}</p> : null}
        <div className="mt-12">
          <ButtonLink href={primary.href} variant="gold">
            {primary.label}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
