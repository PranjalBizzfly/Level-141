import { ArrowRight } from "lucide-react";
import { VibeExplorer } from "@/components/diagrams/VibeExplorer";
import { ProcessTimeline } from "@/components/diagrams/Diagrams";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  BracketFrame,
  ButtonLink,
  PageHero,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
import { Photo } from "@/components/ui/Photo";
import {
  pbaAudience,
  pbaIsNot,
  pbaMeasures,
  pbaModules,
  pbaPains,
  pbaPrinciples,
  pbaVoices,
  vibe,
  vibeStages,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Personal Brand Architecture™",
  description:
    "Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived experience into a structured personal growth asset — architected through the VIBE™ Framework.",
  path: routes.personalBrand,
});

const assessmentHref = `${routes.contact}?interest=personal-brand-architecture`;

export default function PersonalBrandPage() {
  return (
    <>
      <PageHero
        image="/images/pba-hero-speaker.webp"
        imageColour
        eyebrow="Personal Brand Architecture™ · Now available"
        title={
          <>
            Your achievements built your reputation.{" "}
            <span className="serif-accent text-gold">What will build your next level?</span>
          </>
        }
        intro={
          <p>
            You&apos;ve spent years building expertise, businesses, relationships and accomplishments. But does the
            world recognise your true value? Does your personal brand reflect your vision, influence, business ambitions
            and the legacy you want to create?
          </p>
        }
        aside={
          <div className="overflow-hidden rounded-[2rem] border border-paper/15 bg-ink-2">
            <p className="eyebrow hidden border-b border-paper/10 px-7 py-5 text-paper-muted lg:block">The VIBE™ Framework</p>
            <dl className="grid grid-cols-4 lg:grid-cols-1">
              {vibe.map((v) => (
                <div key={v.letter} className="flex flex-col items-center gap-1 border-r border-paper/10 px-2 py-5 last:border-0 lg:flex-row lg:gap-6 lg:border-b lg:border-r-0 lg:px-7 lg:py-6">
                  <dt className="serif-accent text-4xl leading-none text-gold lg:w-10 lg:text-5xl">{v.letter}</dt>
                  <dd className="text-center text-[0.75rem] uppercase tracking-[0.08em] text-paper-muted lg:text-left lg:text-lg lg:normal-case lg:tracking-[-0.01em] lg:text-paper">
                    {v.full}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        }
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <ButtonLink href={assessmentHref} variant="gold">
            Start Your Personal Brand Assessment
          </ButtonLink>
          <ButtonLink href="#vibe" variant="ghost-light">
            Explore the VIBE™ Framework
          </ButtonLink>
        </div>
      </PageHero>

      {/* ---------------------------------------------------------- Purpose */}
      <Section tone="paper" labelledBy="purpose-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold-ink">Not simply about visibility</p>
            <h2 id="purpose-title" className="display mt-6 text-[2.25rem] sm:text-5xl lg:text-[3.75rem]">
              It&apos;s about aligning who you are, what you stand for, the impact you create and{" "}
              <span className="serif-accent">where you want to go.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-8 lg:self-end">
            <p>
              Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived
              experience into a structured personal growth asset.
            </p>
            <p>
              It is designed to help accomplished people become clearer, more credible, more influential and more
              commercially relevant — without manufacturing a persona.
            </p>
            <BracketFrame tone="ink" size="sm" className="!mt-10">
              <p className="text-ink">
                We architect the personal brand behind the leader—so what you know, what you have achieved and what you
                stand for can create the opportunities you are ready for next.
              </p>
            </BracketFrame>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- The problem */}
      <Section tone="paper-2" labelledBy="problem-title">
        <div className="container-x">
          <SectionHeader
            id="problem-title"
            eyebrow="The problem"
            title={
              <>
                Many accomplished leaders have <span className="serif-accent">more value than visibility.</span>
              </>
            }
            intro="Others have visibility without a coherent reputation system. Their expertise sits across years of work, disconnected profiles, speeches, media mentions, relationships and achievements. The market therefore sees fragments rather than a clear leadership proposition."
          />

          <div className="mt-12 sm:mt-14 lg:mt-16 overflow-hidden rounded-[2rem] border border-ink/10 bg-surface">
            <div className="hidden grid-cols-12 gap-6 border-b border-ink/10 px-8 py-4 text-muted md:grid">
              <p className="eyebrow col-span-3">Pain</p>
              <p className="eyebrow col-span-5">What it looks like</p>
              <p className="eyebrow col-span-4">Business consequence</p>
            </div>
            <ul className="divide-y divide-ink/10">
              {pbaPains.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.pain}
                  delay={i * 40}
                  variant="fade"
                >
                  {/* Mobile: expandable disclosure. Tablet/desktop: table row. Only one is rendered visibly. */}
                  <details className="group md:hidden">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 [&::-webkit-details-marker]:hidden">
                      <span className="text-lg font-medium tracking-[-0.01em]">{p.pain}</span>
                      <span
                        aria-hidden
                        className="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-lg leading-none transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="space-y-3 px-6 pb-6">
                      <p className="leading-relaxed text-muted">{p.looks}</p>
                      <p className="leading-relaxed text-gold-ink">
                        <span className="sr-only">Consequence: </span>
                        {p.cost}
                      </p>
                    </div>
                  </details>
                  <div className="hidden gap-6 px-8 py-6 md:grid md:grid-cols-12">
                    <p className="text-lg font-medium tracking-[-0.01em] md:col-span-3">{p.pain}</p>
                    <p className="leading-relaxed text-muted md:col-span-5">{p.looks}</p>
                    <p className="leading-relaxed text-gold-ink md:col-span-4">
                      <span className="sr-only">Consequence: </span>
                      {p.cost}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- VIBE */}
      <Section id="vibe" tone="ink" labelledBy="vibe-title">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <SectionHeader
            id="vibe-title"
            dark
            eyebrow="VIBE™ — The four dimensions of Personal Brand Architecture"
            title={
              <>
                Architected through our proprietary <span className="serif-accent text-gold">VIBE™ Framework.</span>
              </>
            }
            intro="VIBE™ answers four sequential questions: What leadership should this person represent? What impact should that leadership create? How should reputation translate into growth? How must the person and brand evolve next?"
          />
          <div className="mt-12 sm:mt-14 lg:mt-16">
            <VibeExplorer />
          </div>
          <Reveal className="mt-14 border-t border-paper/12 pt-10 text-center sm:mt-16">
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-paper/80 sm:text-2xl">
              Visionary Leadership that creates Impact, Impact that enables Business Growth, and Business Growth that
              fuels continuous Evolution.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Process */}
      <Section tone="white" labelledBy="process-title">
        <div className="container-x">
          <SectionHeader
            id="process-title"
            eyebrow="The process"
            title={
              <>
                How we architect <span className="serif-accent">your VIBE™.</span>
              </>
            }
            intro="Five stages, beginning and ending with your LQ™ — so progress is measured against where you started."
          />
          <ProcessTimeline steps={vibeStages} className="mt-12 sm:mt-14 lg:mt-16" />
          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-ink/10 bg-paper p-6 sm:flex-row sm:items-center sm:p-10">
            <p className="max-w-xl text-lg leading-relaxed">
              <span className="font-medium">Begin with Discover Your Level.</span>{" "}
              <span className="text-muted">
                The LQ™ diagnostic assessment establishes your current personal brand position across all four VIBE™
                dimensions.
              </span>
            </p>
            <ButtonLink href={assessmentHref}>Start Your Personal Brand Assessment</ButtonLink>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Who it's for */}
      <Section tone="paper" labelledBy="for-title">
        <div className="container-x">
          {/* 1 — Header: headline left, intro right. */}
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-gold-ink">Who it&apos;s for</p>
              <h2 id="for-title" className="display mt-5 text-[2.25rem] sm:mt-6 sm:text-5xl lg:text-[3.75rem]">
                For people whose capability is bigger than their{" "}
                <span className="serif-accent">current visibility.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="measure text-base leading-relaxed text-muted sm:text-lg lg:col-span-5">
              <p>
                The strongest fit is not simply a person who wants to become famous. It is a person with genuine
                substance, a meaningful next-stage objective and sufficient credibility to convert architecture into
                authority.
              </p>
            </Reveal>
          </div>

          {/* Editorial portrait illustrating the leader behind the architecture */}
          <Reveal className="mt-12 sm:mt-14 lg:mt-16">
            <Photo
              src="/images/pba-leader-skyline.webp"
              alt="Accomplished senior executive leader standing thoughtfully beside floor-to-ceiling windows in an architectural office overlooking the city skyline"
              className="aspect-[16/9] lg:aspect-[21/9]"
              sizes="(min-width: 1408px) 1300px, 100vw"
            />
          </Reveal>

          {/* 2 — Audience: a typographic index, not chips. */}
          <Reveal as="ul" className="mt-12 grid grid-cols-2 border-t border-line-strong sm:mt-14 sm:grid-cols-4 lg:mt-16">
            {pbaAudience.map((a, n) => (
              <li
                key={a}
                className="flex items-baseline gap-3 border-b border-line py-5 pr-4 text-lg leading-tight tracking-[-0.015em] sm:py-6 sm:text-xl lg:text-2xl"
              >
                <span aria-hidden className="eyebrow shrink-0 tabular-nums text-muted">
                  {String(n + 1).padStart(2, "0")}
                </span>
                {a}
              </li>
            ))}
          </Reveal>

          {/* 3 — Fit comparison: two open columns split by a single hairline. */}
          <div className="mt-16 grid gap-12 sm:mt-20 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
            <Reveal className="md:pr-12 lg:pr-16">
              <h3 className="text-3xl tracking-[-0.025em] sm:text-4xl">
                A strong <span className="serif-accent">fit.</span>
              </h3>
              <ol className="mt-8 space-y-6">
                {[
                  "Has demonstrable expertise, achievements, leadership experience or a credible body of work.",
                  "Has a defined ambition: growth, investment, influence, career transition, market leadership, board/advisory roles or legacy.",
                  "Is willing to articulate viewpoints and participate in the architecture process.",
                  "Values strategic reputation and business outcomes more than short-term follower acquisition.",
                ].map((item, n) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] text-lg leading-relaxed">
                    <span aria-hidden className="pt-[0.35em] text-sm tabular-nums text-gold-ink">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal delay={120} className="md:pl-12 lg:pl-16">
              <h3 className="text-3xl tracking-[-0.025em] text-muted sm:text-4xl">
                What it is <span className="serif-accent">not.</span>
              </h3>
              <ul className="mt-8 space-y-4">
                {pbaIsNot.map((n) => (
                  <li key={n} className="grid grid-cols-[2.5rem_1fr] leading-relaxed text-muted">
                    <span aria-hidden className="text-ink/35">×</span>
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Pain → architecture */}
      <Section tone="ink" labelledBy="voices-title">
        <div className="container-x">
          <SectionHeader
            id="voices-title"
            dark
            eyebrow="Pain → Solution → Impact"
            title={
              <>
                Client pain. <span className="serif-accent text-gold">Level141 intervention.</span>
              </>
            }
          />
          {/* Pain → intervention, read as paired rows rather than a grid of boxes. */}
          <div className="mt-12 sm:mt-14 lg:mt-16">
            <div aria-hidden className="hidden grid-cols-12 gap-8 border-b border-line-dark-strong pb-4 md:grid">
              <p className="eyebrow col-span-6 col-start-2 text-paper-muted">Client pain</p>
              <p className="eyebrow col-span-4 col-start-9 text-paper-muted">Level141 intervention</p>
            </div>
            {/* Spotlight list: on hover-capable screens the other rows recede. */}
            <ol className="group/list">
              {pbaVoices.map((v, i) => (
                <Reveal
                  as="li"
                  key={v.quote}
                  delay={i * 50}
                  className="group grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-3 border-b border-line-dark py-7 transition-opacity duration-500 sm:py-9 md:grid-cols-12 md:items-center md:gap-8 [@media(hover:hover)]:md:group-hover/list:opacity-35 [@media(hover:hover)]:md:hover:opacity-100!"
                >
                  <span aria-hidden className="eyebrow row-span-2 pt-[0.6em] tabular-nums text-paper-muted md:col-span-1 md:row-span-1 md:pt-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="serif-accent text-[1.75rem] leading-snug text-paper sm:text-3xl md:col-span-6 lg:text-[2.35rem]">
                    “{v.quote}”
                  </p>
                  <span aria-hidden className="hidden items-center md:col-span-1 md:flex">
                    <span className="h-px w-4 bg-paper/30 transition-[width,background-color] duration-500 ease-[var(--ease-architect)] group-hover:w-8 group-hover:bg-gold" />
                    <ArrowRight className="-ml-1.5 size-4 text-paper/30 transition-colors duration-500 group-hover:text-gold" />
                  </span>
                  <p className="text-paper/75 transition-colors duration-500 group-hover:text-paper md:col-span-4 md:text-lg">
                    {v.answer}
                  </p>
                </Reveal>
              ))}
            </ol>

            {/* Closing statement and action. */}
            <Reveal className="mt-12 grid gap-8 sm:mt-14 md:grid-cols-12 md:items-center md:gap-8">
              <p className="text-2xl leading-snug tracking-[-0.02em] text-paper sm:text-3xl md:col-span-7">
                Personal Brand Architecture™ starts by locating the gap between your actual value and the market&apos;s
                current perception of it.
              </p>
              <div className="md:col-span-5 md:col-start-8 md:flex md:justify-end">
                <ButtonLink href={assessmentHref} variant="gold">
                  Start Your Personal Brand Assessment
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Modules */}
      <Section tone="paper" labelledBy="modules-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow text-gold-ink">The architecture</p>
                <h2 id="modules-title" className="display mt-6 text-[2.25rem] sm:text-5xl">
                  Seven modules. <span className="serif-accent">One system.</span>
                </h2>
                <p className="mt-8 leading-relaxed text-muted">
                  Level141&apos;s role is architecture, strategic direction, governance and measurement. Where execution
                  partners, internal teams or specialist vendors are required, the architecture defines the brief,
                  standards, dependencies, review mechanism and success criteria.
                </p>
              </Reveal>
            </div>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {pbaModules.map((m, i) => (
              <Reveal
                as="li"
                key={m.name}
                delay={i * 50}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-ink/10 py-7 first:border-t sm:grid-cols-[4rem_1fr_1fr] sm:gap-8"
              >
                <span className="eyebrow pt-1 tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl tracking-[-0.015em]">{m.name}</h3>
                <p className="col-start-2 leading-relaxed text-muted sm:col-start-3">{m.purpose}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Principles + measurement */}
      <Section tone="paper-2" labelledBy="principles-title">
        <div className="container-x">
          {/* Principles: headline holds on the left while the manifesto rows scroll. */}
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <SectionHeader
                  id="principles-title"
                  align="stack"
                  eyebrow="Guiding principles"
                  title={
                    <>
                      Truth before theatre. <span className="serif-accent">Authority before vanity.</span>
                    </>
                  }
                />
              </div>
            </div>
            <ol className="border-t border-line-strong lg:col-span-7">
              {pbaPrinciples.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.name}
                  delay={i * 50}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-b border-line py-6 sm:grid-cols-[3rem_1fr_1fr] sm:gap-x-8 sm:py-8"
                >
                  <span aria-hidden className="eyebrow pt-[0.55em] tabular-nums text-gold-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl leading-snug tracking-[-0.015em] sm:text-2xl">{p.name}</h3>
                  <p className="col-start-2 mt-2 leading-relaxed text-muted sm:col-start-3 sm:mt-0 sm:pt-[0.2em]">{p.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Measurement: a contrasting panel, statement left, scorecard right. */}
          <div className="on-dark mt-20 grid gap-10 rounded-[2rem] bg-ink p-6 text-paper sm:mt-24 sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-14">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-gold">How success is measured</p>
              <h3 className="mt-5 text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
                Visibility metrics are useful signals. <span className="serif-accent">They are not the outcome.</span>
              </h3>
              <p className="mt-6 leading-relaxed text-paper/70">
                Success is measured through a balanced scorecard, reviewed monthly, quarterly, half-yearly and annually
                against your next-stage ambition.
              </p>
            </Reveal>
            <dl className="grid gap-x-10 border-t border-line-dark sm:grid-cols-2 lg:col-span-7">
              {pbaMeasures.map((m, i) => (
                <Reveal key={m.name} delay={i * 40} className="flex gap-4 border-b border-line-dark py-5 sm:last:odd:col-span-2">
                  <span aria-hidden className="eyebrow w-6 shrink-0 pt-[0.3em] tabular-nums text-paper-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="font-medium">{m.name}</dt>
                    <dd className="mt-1 leading-relaxed text-paper/70">{m.q}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Before / after */}
      <Section tone="paper" labelledBy="outcome-title">
        <div className="container-x">
          <h2 id="outcome-title" className="sr-only">
            Before and after Personal Brand Architecture
          </h2>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <Reveal className="rounded-[2rem] border border-ink/12 p-6 sm:p-10">
              <p className="eyebrow text-muted">Before</p>
              <p className="mt-6 text-2xl leading-snug tracking-[-0.02em] text-muted">
                Valuable but fragmented expertise, inconsistent positioning, disconnected visibility and unpredictable
                opportunity.
              </p>
            </Reveal>
            <Reveal delay={120} className="on-dark rounded-[2rem] bg-ink p-6 text-paper sm:p-10">
              <p className="eyebrow text-gold">After</p>
              <p className="mt-6 text-2xl leading-snug tracking-[-0.02em]">
                A clearly positioned leader with an evidence-backed narrative, coherent presence, recognizable
                intellectual territory, trusted impact, deliberate opportunity pathways and a roadmap for continuous
                evolution.
              </p>
            </Reveal>
          </div>
          <Reveal className="mx-auto mt-14 max-w-3xl sm:mt-16">
            <BracketFrame tone="ink" size="lg" className="text-center">
              <p className="eyebrow text-gold-ink">The Level141 promise</p>
              <p className="mt-6 text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">
                Level141 does not manufacture a personal brand. It architects the conditions through which a
                person&apos;s real leadership, expertise and impact can be understood, trusted and translated into the
                next level of opportunity.
              </p>
            </BracketFrame>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Discover your VIBE™. Architect your next level."
        title={
          <>
            Don&apos;t just become more visible.{" "}
            <span className="serif-accent text-gold">Become more valuable, influential and impactful.</span>
          </>
        }
        body={
          <p>
            Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived experience
            into a structured personal growth asset — architected through the VIBE™ Framework.
          </p>
        }
        primary={{ label: "Start Your Personal Brand Assessment", href: assessmentHref }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
