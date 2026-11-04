import type { ReactNode } from "react";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero, Reveal, Section } from "@/components/ui/primitives";
import { assessmentCta, routes } from "@/lib/site";

/**
 * Privacy Policy and Terms & Conditions, built like every other page: photo hero,
 * editorial rows that reveal as they arrive (title left, text right, numbered),
 * and the closing call to action.
 */
export function LegalPage({
  image,
  eyebrow,
  title,
  intro,
  labelledBy,
  sections,
  portrait,
}: {
  image: string;
  /** Upright photograph: held in the right half of the hero so the face stays in frame. */
  portrait?: boolean;
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  labelledBy: string;
  sections: { title: string; body: ReactNode }[];
}) {
  return (
    <>
      <PageHero image={image} portrait={portrait} eyebrow={eyebrow} title={title} intro={intro} />

      <Section tone="paper" labelledBy={labelledBy}>
        <div className="container-x">
          <h2 id={labelledBy} className="sr-only">
            {eyebrow}
          </h2>
          <ol className="border-b border-line">
            {sections.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 60}
                className="grid gap-4 border-t border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-10"
              >
                <div className="flex items-baseline gap-5 lg:col-span-5">
                  <span aria-hidden className="eyebrow tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">{s.title}</h3>
                </div>
                <div className="text-base leading-[1.85] text-muted sm:text-lg lg:col-span-7 [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-ink">
                  {s.body}
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <CtaBand
        eyebrow="Find your level"
        title={
          <>
            You&apos;ve reached this level. <span className="serif-accent text-gold">What&apos;s your next?</span>
          </>
        }
        primary={assessmentCta}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
