import { BracketClose, BracketOpen, LogoSymbol } from "@/components/brand/Logo";
import { Mark141 } from "@/components/brand/Mark141";
import { CtaBand } from "@/components/sections/CtaBand";
import { BracketFrame, ButtonLink, PageHero, Reveal, Section, SectionHeader, Photo, PhotoBand } from "@/components/ui/primitives";
import { principles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Level141 is a Growth Architecture company — part of the 1XL ecosystem, headquartered in Dubai. Our purpose: architect the next level of growth for people, businesses and ideas.",
  path: routes.about,
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Level141"
        title={
          <>
            Why <span className="serif-accent text-gold">141?</span>
          </>
        }
        intro={
          <p>
            Because growth is never really about reaching a final destination. Every level changes what becomes possible
            next.
          </p>
        }
        aside={
          <Mark141
            className="mx-auto w-48 sm:w-64 lg:w-full lg:max-w-xs"
            textClassName="text-5xl sm:text-6xl"
            openClassName="text-gold"
          />
        }
      />

      {/* ---------------------------------------------------------- Belief */}
      <Section tone="paper" labelledBy="belief-title">
        {/* Headline across the top; photo and supporting text share the row beneath it. */}
        <div className="container-x grid gap-12 sm:gap-16 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-20">
          <Reveal className="lg:col-span-10">
            <p className="eyebrow text-gold-ink">A simple belief</p>
            <h2 id="belief-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
              Businesses need clarity about what their <span className="serif-accent">next level requires</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-6">
            <Photo src="/images/client-lone-executive-skyline.webp" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] lg:aspect-[16/11]" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:self-center">
            <p className="text-lg text-muted">Level141 was created around a simple belief:</p>
            <p className="mt-4 text-lg leading-[1.85] sm:text-xl">
              Businesses don&apos;t necessarily need more agencies, consultants, campaigns or activity. They need clarity
              about what their next level requires.
            </p>
            <p className="mt-8 text-base leading-[1.85] sm:text-lg">
              We work with ambitious people and organizations to understand where they are, define where they want to go
              and architect the interconnected systems required to get there.
            </p>
            <p className="mt-6 text-lg">
              We call it: <span className="serif-accent text-gold-ink">Growth Architecture</span>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Purpose */}
      <Section tone="ink" labelledBy="purpose-title">
        
        <div className="container-x relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <BracketFrame tone="gold" size="lg">
            <p className="eyebrow text-gold">Our purpose</p>
            <h2 id="purpose-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)] sm:mt-8">
              Architect the next level <span className="serif-accent text-gold">of growth</span>
            </h2>
            </BracketFrame>
          </Reveal>
          <ul className="mx-auto mt-20 max-w-5xl border-b border-line-dark sm:mt-28">
            {/* Source: Website Structure, OUR PURPOSE. The people and businesses lines reuse the
                approved one-line descriptions of the two architectures shown further down this page. */}
            {[
              ["For people", "Converts genuine expertise, leadership credibility and lived experience into a structured personal growth asset"],
              ["For businesses", "One integrated architecture connecting every critical growth lever to measurable business outcomes"],
              ["For ideas", "with the potential to become significantly bigger than they are today"],
            ].map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 100} className="grid gap-4 border-t border-line-dark py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-10">
                <p className="flex items-baseline gap-5 text-2xl tracking-[-0.02em] sm:text-[1.75rem] lg:col-span-5">
                  <span aria-hidden className="eyebrow tabular-nums text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
                  {title}
                </p>
                <p className="text-base leading-[1.85] text-paper/70 sm:text-lg lg:col-span-7">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <PhotoBand src="/images/client-walk-toward-skyline.webp" />

      {/* ---------------------------------------------------------- Principles */}
      <Section tone="paper-2" labelledBy="principles-title">
        <div className="container-x">
          <SectionHeader
            id="principles-title"
            eyebrow="About Level141"
            title={
              <>
                Our <span className="serif-accent">principles</span>
              </>
            }
          />
          <ol className="mt-20 border-b border-line sm:mt-28">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={i * 80}
                className="grid gap-4 border-t border-line py-10 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-10"
              >
                <div className="flex items-center gap-5 lg:col-span-5">
                  {/* The full symbol: both brackets, one tone. */}
                  <span aria-hidden className="relative size-4 shrink-0 text-gold-ink">
                    <BracketClose className="absolute right-0 top-0 size-[45%]" />
                    <BracketOpen className="absolute bottom-0 left-0 size-[45%]" />
                  </span>
                  <span aria-hidden className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">{p.name}</h3>
                </div>
                <p className="text-base leading-[1.85] text-muted sm:text-lg lg:col-span-7">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Two architectures */}
      <Section tone="paper" labelledBy="offer-title">
        <div className="container-x grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold-ink">Two ambitions. Two architectures.</p>
            <h2 id="offer-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
              Level141 has built dedicated architectures <span className="serif-accent">for both</span>
            </h2>
            <p className="mt-8 text-base leading-[1.85] text-muted sm:text-lg">
              Level141 is a Growth Architecture company. It does not treat branding, visibility, authority, lead
              generation or positioning as isolated activities. It architects the system that connects identity,
              credibility, influence and opportunity so that growth becomes deliberate, governed and measurable.
            </p>
          </Reveal>
          <div className="border-b border-line lg:col-span-6 lg:col-start-7">
            <Reveal className="grid gap-8 border-t border-line py-10 sm:py-14">
              <Photo src="/images/client-ceo-portrait.webp" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[16/10]" />
              <div>
              <div className="flex items-center justify-between">
                <p className="eyebrow text-gold-ink">For people · VIBE™</p>
              </div>
              <h3 className="mt-5 text-2xl sm:text-[1.75rem] tracking-[-0.02em]">Personal Brand Architecture™</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Converts genuine expertise, leadership credibility and lived experience into a structured personal growth
                asset.
              </p>
              <ButtonLink href={routes.personalBrand} variant="ghost" className="mt-8">
                Explore
              </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={100} className="grid gap-8 border-t border-line py-10 sm:py-14">
              <Photo src="/images/client-mentorship-conversation.webp" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[16/10]" />
              <div>
              <div className="flex items-center justify-between">
                <p className="eyebrow text-gold-ink">For organizations · PEAK™</p>
                <span className="text-xs text-muted">Waitlist</span>
              </div>
              <h3 className="mt-5 text-2xl sm:text-[1.75rem] tracking-[-0.02em]">Growth Architecture™</h3>
              <p className="mt-3 leading-relaxed text-muted">
                One integrated architecture connecting every critical growth lever to measurable business outcomes.
              </p>
              <ButtonLink href={routes.growth} variant="ghost" className="mt-8">
                Explore
              </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Ecosystem */}
      <Section tone="white" labelledBy="ecosystem-title" className="!py-10 sm:!py-12">
        <div className="container-x">
          <Reveal>
            <BracketFrame tone="ink" size="md" className="grid gap-8 md:grid-cols-12 md:items-center">
              <LogoSymbol className="size-14 text-ink md:col-span-1" title="Level141 symbol" />
              <div className="md:col-span-7">
                <h2 id="ecosystem-title" className="text-2xl tracking-[-0.02em] sm:text-3xl">
                  Part of the 1XL ecosystem, headquartered in Dubai.
                </h2>
              </div>
              <p className="eyebrow text-muted md:col-span-4 md:text-right">Level141 — Growth by Design.</p>
            </BracketFrame>
          </Reveal>
        </div>
      </Section>
      <CtaBand
        eyebrow="Find your level"
        title={
          <>
            You&apos;ve reached this level. <span className="serif-accent text-gold">What&apos;s your next?</span>
          </>
        }
        primary={{ label: "Start Your Level141 Assessment", href: routes.contact }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
