import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/primitives";
import { altFor } from "@/lib/image-alts";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { site } from "@/lib/site";

const built = ["A career.", "A reputation.", "A business.", "A company."];

/**
 * Home hero as one composed first screen: the question set large across the
 * page, locked between the two brackets of the Level141 symbol; the documented
 * copy and the actions on one editorial row; then the photograph filling the
 * rest of the screen — nothing cut off at the fold.
 */
export function HomeHero() {
  return (
    <section className="recede relative flex min-h-[100svh] flex-col overflow-x-clip bg-paper text-ink" aria-labelledby="hero-title">
      <div className="container-x pt-28 sm:pt-32 lg:pt-36">
        <h1
          id="hero-title"
          data-split="load"
          className="display relative mx-auto block w-fit px-[0.3em] py-[0.18em] text-center text-[clamp(3rem,9.6vw,9.75rem)] leading-[0.92] tracking-[-0.045em]"
        >
          {/* The two brackets of the Level141 symbol lock around the statement. */}
          <BracketClose className="absolute right-0 top-0 size-[0.22em] bracket-in-close text-ink" />
          <BracketOpen className="absolute bottom-0 left-0 size-[0.22em] bracket-in-open text-ink/35" />
          What&apos;s Your <span className="serif-accent">Level</span>?
        </h1>

        <div className="mt-10 grid animate-rise gap-8 [animation-delay:500ms] sm:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="max-w-2xl space-y-3 text-muted sm:text-lg lg:col-span-7">
            <p>
              You&apos;ve built something. {built.join(" ")} But where you are today doesn&apos;t have to define where you
              go next.
            </p>
            <p className="text-ink">Level141 architects the next level of growth for people and organizations</p>
            <p>
              Through clarity, positioning, visibility, credibility, authority and structured growth systems, we turn
              ambition into an architecture for growth.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <ButtonLink href={site.primaryCta.href} variant="solid">
              {site.primaryCta.label}
            </ButtonLink>
            <ButtonLink href="#two-architectures" variant="ghost">
              Explore Level141
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* The photograph fills the rest of the first screen (and keeps a generous size on short screens). */}
      <div className="container-x flex flex-1 flex-col pb-6 pt-10 sm:pb-8 sm:pt-12">
        <div data-rise className="flex flex-1">
          <MediaSlot
            src="/images/home-hero-terrace-skyline.webp"
            alt={altFor("/images/home-hero-terrace-skyline.webp")}
            label="Hero film or image — growth to the next level"
            className="min-h-[clamp(16rem,42svh,34rem)] w-full flex-1"
            priority
          />
        </div>
      </div>
    </section>
  );
}
