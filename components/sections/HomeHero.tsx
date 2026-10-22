import Image from "next/image";
import { ButtonLink } from "@/components/ui/primitives";
import { altFor } from "@/lib/image-alts";
import { site } from "@/lib/site";

const built = ["A career.", "A reputation.", "A business.", "A company."];
const heroImage = "/images/client-hero-skyline-opening.webp";

/**
 * Home hero as one full-bleed dark first screen (client reference): the
 * photograph behind, a veil darkening the left, and the question, the
 * documented copy and the actions stacked left in light, restrained type.
 */
export function HomeHero() {
  return (
    <section
      className="on-dark recede relative flex min-h-[100svh] items-center overflow-hidden bg-[#000] text-[#fff]"
      aria-labelledby="hero-title"
    >
      <div className="photo-tone absolute inset-0">
        <Image src={heroImage} alt={altFor(heroImage)} fill priority sizes="100vw" className="object-cover object-[66%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000] via-[#000]/85 to-[#000]/25" />
      </div>

      <div className="container-x relative w-full pb-20 pt-32 sm:pt-36">
        <div className="max-w-2xl">
          <h1
            id="hero-title"
            data-split="load"
            className="font-display text-[clamp(2.75rem,4.4vw,4rem)] font-light leading-[1.05] tracking-[-0.03em]"
          >
            What&apos;s Your <span className="serif-accent">Level</span>?
          </h1>

          <span aria-hidden className="mt-10 block h-px w-14 bg-current opacity-40" />

          <div className="mt-8 max-w-xl animate-rise space-y-4 text-[1.0625rem] leading-relaxed text-[#fff]/75 [animation-delay:500ms]">
            <p>
              You&apos;ve built something. {built.join(" ")} But where you are today doesn&apos;t have to define where you
              go next.
            </p>
            <p className="text-[#fff]">Level141 architects the next level of growth for people and organizations</p>
            <p>
              Through clarity, positioning, visibility, credibility, authority and structured growth systems, we turn
              ambition into an architecture for growth.
            </p>
          </div>

          <div className="mt-10 flex animate-rise flex-col gap-3 [animation-delay:650ms] sm:flex-row">
            <ButtonLink href={site.primaryCta.href} variant="solid" className="!bg-[#fff] !text-[#000] hover:!bg-[#fff]/85">
              {site.primaryCta.label}
            </ButtonLink>
            <ButtonLink href="#two-architectures" variant="ghost" className="!border-[#fff]/40 !text-[#fff] hover:!border-[#fff]">
              Explore Level141
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
