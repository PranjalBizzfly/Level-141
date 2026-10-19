import { BracketClose, LogoSymbol } from "@/components/brand/Logo";
import { Mark141 } from "@/components/brand/Mark141";
import { CtaBand } from "@/components/sections/CtaBand";
import { BracketFrame, ButtonLink, PageHero, Reveal, Section, SectionHeader, cx } from "@/components/ui/primitives";
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
            textClassName="text-6xl sm:text-7xl"
            openClassName="text-paper/40"
          />
        }
      />

      {/* ---------------------------------------------------------- Belief */}
      <Section tone="paper" labelledBy="belief-title">
        <div className="container-x grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold-ink">A simple belief</p>
            <h2 id="belief-title" className="display mt-6 text-[2.25rem] sm:text-5xl lg:text-[3.75rem]">
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
            <h2 id="purpose-title" className="display mt-6 text-[2.5rem] sm:mt-8 sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Architect the next level <span className="serif-accent text-gold">of growth.</span>
            </h2>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-px sm:mt-12 lg:mt-12 overflow-hidden rounded-[2rem] border border-paper/12 bg-paper/12 md:grid-cols-3">
            {/* Source: Website Structure, OUR PURPOSE — exact lines. */}
            {[
              ["For people.", ""],
              ["For businesses.", ""],
              ["For ideas", "with the potential to become significantly bigger than they are today."],
            ].map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 100} className="bg-ink p-6 sm:p-8 lg:p-10">
                <p className="text-2xl tracking-[-0.02em]">
                  {title}
                  {body ? <span className="text-paper/60"> {body}</span> : null}
                </p>
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
            eyebrow="About Level141"
            title={
              <>
                Our <span className="serif-accent">principles.</span>
              </>
            }
          />
          <ol className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:mt-12">
            {principles.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={i * 80}
                className={cx(
                  "relative flex flex-col rounded-[2rem] p-6 sm:p-10 lg:p-12 md:min-h-[20rem]",
                  i === 0 || i === 3 ? "on-dark bg-ink text-paper" : "border border-line bg-surface",
                )}
              >
                <span
                  aria-hidden
                  className={cx("serif-accent text-6xl leading-none", i === 0 || i === 3 ? "text-gold" : "text-gold-ink")}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-auto pt-12 text-3xl tracking-[-0.025em]">{p.name}</h3>
                <p className={cx("mt-4 text-lg leading-relaxed", i === 0 || i === 3 ? "text-paper/80" : "text-muted")}>{p.body}</p>
                <BracketClose
                  aria-hidden
                  className={cx("absolute right-6 top-6 size-5 sm:right-8 sm:top-8", i === 0 || i === 3 ? "text-gold/60" : "text-gold-ink/50")}
                />
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
            <h2 id="offer-title" className="display mt-6 text-[2.25rem] sm:text-5xl lg:text-[3.75rem]">
              Level141 has built dedicated architectures <span className="serif-accent">for both.</span>
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-muted">
              Level141 is a Growth Architecture company. It does not treat branding, visibility, authority, lead
              generation or positioning as isolated activities. It architects the system that connects identity,
              credibility, influence and opportunity so that growth becomes deliberate, governed and measurable.
            </p>
          </Reveal>
          <div className="grid gap-4 sm:gap-6 lg:col-span-6 lg:col-start-7">
            <Reveal className="on-dark rounded-[2rem] bg-ink p-6 text-paper sm:p-10">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-gold">For people · VIBE™</p>
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
            <Reveal delay={100} className="rounded-[2rem] border border-ink/12 p-6 sm:p-10">
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
