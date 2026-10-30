import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import Image from "next/image";
import { ButtonLink, onPhoto } from "@/components/ui/primitives";
import { site } from "@/lib/site";

/** Home hero: the headline alone on a full-screen photograph. */
export function HomeHero() {
  return (
    <section style={onPhoto} className="relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src="/images/client-hero-skyline-opening.webp" alt="" fill priority sizes="100vw" quality={90} className="object-cover grayscale" />
        <div className="absolute inset-0 bg-black/55" />
      </div>
      <div className="container-x grid gap-12 pb-16 pt-28 sm:gap-16 sm:pb-20 sm:pt-36 min-h-[100svh] items-end lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade text-gold">Growth Architecture for People &amp; Organizations</p>
          <h1
            id="hero-title"
            className="display relative mt-8 inline-block py-[0.12em] pl-[0.16em] pr-[0.3em] text-[clamp(2.75rem,1.9rem+3vw,4.25rem)]"
          >
            {/* Corner brackets from the Level141 symbol frame the headline block. */}
            <BracketClose className="absolute right-0 top-0 size-[0.2em] animate-fade text-gold [animation-delay:300ms]" />
            <BracketOpen className="absolute bottom-0 left-0 size-[0.2em] animate-fade text-gold [animation-delay:300ms]" />
            <span className="block animate-rise [animation-delay:60ms]">What&apos;s Your</span>
            <span className="block animate-rise [animation-delay:160ms]">
              <span className="serif-accent text-gold">Level</span>?
            </span>
          </h1>
          <p className="mt-10 max-w-xl animate-rise text-base leading-[1.85] text-paper/85 [animation-delay:280ms] sm:text-lg">
            Level141 architects the next level of growth for people and organizations.
          </p>
          <div className="mt-12 flex animate-rise flex-col gap-4 [animation-delay:400ms] sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={site.primaryCta.href} variant="gold">
              {site.primaryCta.label}
            </ButtonLink>
            <ButtonLink href="#two-architectures" variant="link">
              Explore Level141
            </ButtonLink>
          </div>
        </div>

      </div>
    </section>
  );
}
