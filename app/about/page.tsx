import { BracketClose, BracketOpen, LogoSymbol } from "@/components/brand/Logo";
import { CtaBand } from "@/components/sections/CtaBand";
import { BracketFrame, ButtonLink, PageHero, Reveal, Section, SectionHeader } from "@/components/ui/primitives";
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
          <div aria-hidden className="relative mx-auto aspect-square w-48 sm:w-64 lg:w-full lg:max-w-xs">
            <BracketClose className="absolute right-0 top-0 size-1/3 text-gold" />
            <BracketOpen className="absolute bottom-0 left-0 size-1/3 text-paper/40" />
            <p className="absolute inset-0 grid place-items-center text-6xl font-light tracking-[-0.06em] sm:text-7xl">141</p>
          </div>
        }
      />

      {/* ---------------------------------------------------------- Belief */}
      <Section tone="paper" labelledBy="belief-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold-ink">A simple belief</p>
            <h2 id="belief-title" className="display mt-6 text-[2.4rem] sm:text-5xl lg:text-6xl">
              Businesses need clarity about what their <span className="serif-accent">next level requires.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-lg text-muted">Level141 was created around a simple belief:</p>
            <p className="mt-4 text-xl leading-snug tracking-[-0.01em]">
              Businesses don&apos;t necessarily need more agencies, consultants, campaigns or activity. They need clarity
              about what their next level requires.
            </p>
            <p className="mt-8 text-lg leading-relaxed">
              We work with ambitious people and organizations to understand where they are, define where they want to go
              and architect the interconnected systems required to get there.
            </p>
            <p className="mt-6 text-lg">
              We call it: <span className="serif-accent text-2xl text-gold-ink">Growth Architecture.</span>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Purpose */}
      <Section tone="ink" labelledBy="purpose-title">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="eyebrow text-gold">Our purpose</p>
            <h2 id="purpose-title" className="display mt-8 text-[2.6rem] sm:text-6xl lg:text-[5.5rem]">
              Architect the next level <span className="serif-accent text-gold">of growth.</span>
            </h2>
          </Reveal>
          <ul className="mx-auto mt-16 grid max-w-5xl gap-px overflow-hidden rounded-[2rem] border border-paper/12 bg-paper/12 md:grid-cols-3">
            {[
              ["For people.", "Founders, leaders, investors and experts whose capability is bigger than their current visibility."],
              ["For businesses.", "Organizations whose ambition has outgrown their current growth system."],
              ["For ideas", "with the potential to become significantly bigger than they are today."],
            ].map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 100} className="bg-ink p-8 sm:p-10">
                <p className="text-2xl tracking-[-0.02em]">{title}</p>
                <p className="mt-3 leading-relaxed text-paper/60">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Principles */}
      <Section tone="paper-2" labelledBy="principles-title">
        <div className="container-x">
          <SectionHeader
            id="principles-title"
            eyebrow="Our principles"
            title={
              <>
                Four principles behind <span className="serif-accent">every architecture.</span>
              </>
            }
          />
          <ol className="mt-16 grid gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 80} className="group relative rounded-[2rem] bg-[#fbfaf7] p-8 sm:p-12">
                <span className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-10 text-3xl tracking-[-0.025em]">{p.name}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{p.body}</p>
                <BracketClose className="absolute right-8 top-8 size-5 text-ink/15 transition-colors duration-500 group-hover:text-gold-ink" />
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Two architectures */}
      <Section tone="paper" labelledBy="offer-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold-ink">What we do</p>
            <h2 id="offer-title" className="display mt-6 text-[2.4rem] sm:text-5xl">
              Two architectures, <span className="serif-accent">kept distinct.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              Level141 is a Growth Architecture company. It does not treat branding, visibility, authority, lead
              generation or positioning as isolated activities. It architects the system that connects identity,
              credibility, influence and opportunity so that growth becomes deliberate, governed and measurable.
            </p>
          </Reveal>
          <div className="grid gap-6 lg:col-span-6 lg:col-start-7">
            <Reveal className="on-dark rounded-[2rem] bg-ink p-8 text-paper sm:p-10">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-gold">For people · VIBE™</p>
                <span className="text-xs text-gold">Now available</span>
              </div>
              <h3 className="mt-6 text-2xl tracking-[-0.02em]">Personal Brand Architecture™</h3>
              <p className="mt-3 leading-relaxed text-paper/65">
                Converts genuine expertise, leadership credibility and lived experience into a structured personal growth
                asset.
              </p>
              <ButtonLink href={routes.personalBrand} variant="ghost-light" className="mt-4">
                Explore
              </ButtonLink>
            </Reveal>
            <Reveal delay={100} className="rounded-[2rem] border border-ink/12 p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-gold-ink">For organizations · PEAK™</p>
                <span className="text-xs text-muted">Waitlist</span>
              </div>
              <h3 className="mt-6 text-2xl tracking-[-0.02em]">Growth Architecture™</h3>
              <p className="mt-3 leading-relaxed text-muted">
                One integrated architecture connecting every critical growth lever to measurable business outcomes.
              </p>
              <ButtonLink href={routes.growth} variant="ghost" className="mt-4">
                Explore
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Ecosystem */}
      <Section tone="white" labelledBy="ecosystem-title" className="!py-16 sm:!py-20">
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
        primary={{ label: "Start Your Next Level", href: routes.contact }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
