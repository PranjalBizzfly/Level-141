import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { site } from "@/lib/site";

const built = ["A career.", "A reputation.", "A business.", "A company."];

/**
 * Home hero after the luxury reference: one modest, centred statement in a
 * large quiet field, the documented supporting copy beneath it, then a
 * full-width media frame.
 */
export function HomeHero() {
  return (
    <section className="relative bg-paper text-ink" aria-labelledby="hero-title">
      <div className="container-x flex flex-col items-center pb-12 pt-36 text-center sm:pb-14 sm:pt-44 lg:pt-48">
        <h1
          id="hero-title"
          data-split="load"
          className="display relative inline-block px-[0.35em] py-[0.2em] text-[clamp(2.5rem,5.2vw,4.75rem)]"
        >
          {/* The two brackets of the Level141 symbol lock around the statement. */}
          <BracketClose className="absolute right-0 top-0 size-[0.3em] bracket-in-close text-ink" />
          <BracketOpen className="absolute bottom-0 left-0 size-[0.3em] bracket-in-open text-ink/35" />
          What&apos;s Your <span className="serif-accent">Level</span>?
        </h1>

        <div className="mt-10 max-w-xl animate-rise space-y-3 text-muted [animation-delay:500ms]">
          <p>
            You&apos;ve built something. {built.join(" ")} But where you are today doesn&apos;t have to define where you go
            next.
          </p>
          <p className="text-ink">Level141 architects the next level of growth for people and organizations.</p>
        </div>

        <div className="mt-10 flex animate-rise flex-col items-center gap-3 [animation-delay:650ms] sm:flex-row">
          <ButtonLink href={site.primaryCta.href} variant="solid">
            {site.primaryCta.label}
          </ButtonLink>
          <ButtonLink href="#two-architectures" variant="ghost">
            Explore Level141
          </ButtonLink>
        </div>
      </div>

      {/* Full-width media frame (reference: hero film beneath the statement). */}
      {/* Reference: one large, centred media frame beneath the statement. */}
      <div className="container-x pb-20 sm:pb-28">
        <MediaSlot
          src="/images/home-hero-staircase-muted.webp"
          alt="A staircase rising into light"
          label="Hero film or image — growth to the next level"
          className="mx-auto aspect-[4/3] max-w-5xl sm:aspect-[16/9]"
          priority
        />
        <p className="mx-auto mt-5 max-w-5xl text-sm text-muted">
          Through clarity, positioning, visibility, credibility, authority and structured growth systems, we turn ambition
          into an architecture for growth.
        </p>
      </div>
    </section>
  );
}
