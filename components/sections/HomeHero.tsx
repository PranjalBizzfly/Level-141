import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/primitives";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { site } from "@/lib/site";

const built = ["A career.", "A reputation.", "A business.", "A company."];

/**
 * Home hero after the luxury reference: the question set as one large
 * statement across the page, locked between the two brackets of the Level141
 * symbol; the documented supporting copy and the actions on a quiet editorial
 * row beneath it; then a wide media frame that rises as the page scrolls.
 */
export function HomeHero() {
  return (
    <section className="recede relative overflow-x-clip bg-paper text-ink" aria-labelledby="hero-title">
      <div className="container-x pb-14 pt-32 sm:pb-16 sm:pt-40 lg:pt-44">
        <h1
          id="hero-title"
          data-split="load"
          className="display relative mx-auto block w-fit px-[0.3em] py-[0.18em] text-center text-[clamp(3rem,10.4vw,10.5rem)] leading-[0.92] tracking-[-0.045em]"
        >
          {/* The two brackets of the Level141 symbol lock around the statement. */}
          <BracketClose className="absolute right-0 top-0 size-[0.22em] bracket-in-close text-ink" />
          <BracketOpen className="absolute bottom-0 left-0 size-[0.22em] bracket-in-open text-ink/35" />
          What&apos;s Your <span className="serif-accent">Level</span>?
        </h1>

        <div className="mt-14 grid animate-rise gap-8 [animation-delay:500ms] sm:mt-20 lg:grid-cols-12 lg:items-end">
          <div className="max-w-xl space-y-3 text-muted lg:col-span-6">
            <p>
              You&apos;ve built something. {built.join(" ")} But where you are today doesn&apos;t have to define where you
              go next.
            </p>
            <p className="text-ink">Level141 architects the next level of growth for people and organizations</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:col-start-8 lg:justify-end">
            <ButtonLink href={site.primaryCta.href} variant="solid">
              {site.primaryCta.label}
            </ButtonLink>
            <ButtonLink href="#two-architectures" variant="ghost">
              Explore Level141
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* One wide media frame beneath the statement; it rises into place on scroll. */}
      <div className="container-x pb-20 sm:pb-28">
        <div data-rise>
          <MediaSlot
            src="/images/home-hero-staircase-muted.webp"
            alt="A staircase rising into light"
            label="Hero film or image — growth to the next level"
            className="aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9]"
            priority
          />
        </div>
        <p className="mt-5 max-w-3xl text-sm text-muted">
          Through clarity, positioning, visibility, credibility, authority and structured growth systems, we turn ambition
          into an architecture for growth.
        </p>
      </div>
    </section>
  );
}
