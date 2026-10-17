import { VibeExplorer } from "@/components/diagrams/VibeExplorer";
import { ProcessTimeline } from "@/components/diagrams/Diagrams";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  BracketFrame,
  ButtonLink,
  DotList,
  PageHero,
  Reveal,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
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
          <dl className="grid grid-cols-4 overflow-hidden rounded-3xl border border-paper/15 lg:grid-cols-1">
            {vibe.map((v) => (
              <div key={v.letter} className="flex flex-col items-center gap-1 border-r border-paper/10 px-2 py-5 last:border-0 lg:flex-row lg:gap-5 lg:border-b lg:border-r-0 lg:px-6">
                <dt className="serif-accent text-4xl leading-none text-gold lg:w-10">{v.letter}</dt>
                <dd className="text-center text-[0.65rem] uppercase tracking-[0.14em] text-paper/60 lg:text-left lg:text-sm lg:normal-case lg:tracking-normal">
                  {v.full}
                </dd>
              </div>
            ))}
          </dl>
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
            <h2 id="purpose-title" className="display mt-6 text-[2.4rem] sm:text-5xl lg:text-6xl">
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

          <div className="mt-16 overflow-hidden rounded-[2rem] border border-ink/10 bg-[#fbfaf7]">
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
                  className="grid gap-2 px-6 py-6 sm:px-8 md:grid-cols-12 md:gap-6"
                >
                  <p className="text-lg font-medium tracking-[-0.01em] md:col-span-3">{p.pain}</p>
                  <p className="leading-relaxed text-muted md:col-span-5">{p.looks}</p>
                  <p className="leading-relaxed text-gold-ink md:col-span-4">
                    <span className="sr-only">Consequence: </span>
                    {p.cost}
                  </p>
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
          <div className="mt-16 lg:mt-20">
            <VibeExplorer />
          </div>
          <Reveal className="mt-20 border-t border-paper/12 pt-10 text-center">
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
          <ProcessTimeline steps={vibeStages} className="mt-16 lg:mt-24" />
          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-ink/10 bg-paper p-8 sm:flex-row sm:items-center sm:p-10">
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
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold-ink">Who it&apos;s for</p>
              <h2 id="for-title" className="display mt-6 text-[2.4rem] sm:text-5xl">
                For people whose capability is bigger than their{" "}
                <span className="serif-accent">current visibility.</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-muted">
                The strongest fit is not simply a person who wants to become famous. It is a person with genuine
                substance, a meaningful next-stage objective and sufficient credibility to convert architecture into
                authority.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal as="ul" className="flex flex-wrap gap-3" >
              {pbaAudience.map((a) => (
                <li key={a} className="rounded-full border border-ink/15 bg-[#fbfaf7] px-5 py-3 text-lg tracking-[-0.01em]">
                  {a}
                </li>
              ))}
            </Reveal>
            <Reveal delay={120} className="mt-12 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-gold-ink">A strong fit</p>
                <DotList
                  className="mt-5 text-[0.95rem] text-muted"
                  items={[
                    "Has demonstrable expertise, achievements, leadership experience or a credible body of work.",
                    "Has a defined ambition: growth, investment, influence, career transition, market leadership, board/advisory roles or legacy.",
                    "Is willing to articulate viewpoints and participate in the architecture process.",
                    "Values strategic reputation and business outcomes more than short-term follower acquisition.",
                  ]}
                />
              </div>
              <div>
                <p className="eyebrow text-muted">What it is not</p>
                <ul className="mt-5 space-y-3 text-[0.95rem] text-muted">
                  {pbaIsNot.map((n) => (
                    <li key={n} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-[0.15em] text-ink/30">×</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
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
            eyebrow="From what you hear yourself saying"
            title={
              <>
                Every frustration points to a <span className="serif-accent text-gold">missing piece of architecture.</span>
              </>
            }
          />
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-paper/10 bg-paper/10 md:grid-cols-2 lg:grid-cols-3">
            {pbaVoices.map((v, i) => (
              <Reveal as="li" key={v.quote} delay={i * 60} className="flex flex-col justify-between gap-8 bg-ink p-8 sm:p-10">
                <p className="serif-accent text-2xl leading-snug text-paper">“{v.quote}”</p>
                <p className="flex items-center gap-3 text-sm text-gold-soft">
                  <span aria-hidden className="h-px w-6 bg-gold" />
                  {v.answer}
                </p>
              </Reveal>
            ))}
            <li className="flex flex-col justify-between gap-8 bg-ink-2 p-8 sm:p-10 md:col-span-1 lg:col-span-2">
              <p className="text-2xl leading-snug tracking-[-0.02em] text-paper">
                Personal Brand Architecture™ starts by locating the gap between your actual value and the market&apos;s
                current perception of it.
              </p>
              <ButtonLink href={assessmentHref} variant="ghost-light">
                Start Your Personal Brand Assessment
              </ButtonLink>
            </li>
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Modules */}
      <Section tone="paper" labelledBy="modules-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow text-gold-ink">The architecture</p>
                <h2 id="modules-title" className="display mt-6 text-[2.4rem] sm:text-5xl">
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
          <SectionHeader
            id="principles-title"
            eyebrow="Guiding principles"
            title={
              <>
                Truth before theatre. <span className="serif-accent">Authority before vanity.</span>
              </>
            }
          />
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pbaPrinciples.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 60} className="border-t border-ink/20 pt-6">
                <h3 className="text-xl tracking-[-0.015em]">{p.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-24 grid gap-12 rounded-[2rem] bg-[#fbfaf7] p-8 sm:p-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-gold-ink">How success is measured</p>
              <h3 className="mt-5 text-3xl leading-tight tracking-[-0.025em]">
                Visibility metrics are useful signals. They are not the outcome.
              </h3>
              <p className="mt-5 leading-relaxed text-muted">
                Success is measured through a balanced scorecard, reviewed monthly, quarterly, half-yearly and annually
                against your next-stage ambition.
              </p>
            </Reveal>
            <dl className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
              {pbaMeasures.map((m) => (
                <Reveal key={m.name} className="border-b border-ink/10 py-5">
                  <dt className="font-medium">{m.name}</dt>
                  <dd className="mt-1 text-muted">{m.q}</dd>
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
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-[2rem] border border-ink/12 p-8 sm:p-12">
              <p className="eyebrow text-muted">Before</p>
              <p className="mt-6 text-2xl leading-snug tracking-[-0.02em] text-muted">
                Valuable but fragmented expertise, inconsistent positioning, disconnected visibility and unpredictable
                opportunity.
              </p>
            </Reveal>
            <Reveal delay={120} className="on-dark rounded-[2rem] bg-ink p-8 text-paper sm:p-12">
              <p className="eyebrow text-gold">After</p>
              <p className="mt-6 text-2xl leading-snug tracking-[-0.02em]">
                A clearly positioned leader with an evidence-backed narrative, coherent presence, recognizable
                intellectual territory, trusted impact, deliberate opportunity pathways and a roadmap for continuous
                evolution.
              </p>
            </Reveal>
          </div>
          <Reveal className="mx-auto mt-20 max-w-3xl">
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
        primary={{ label: "Start Your Personal Brand Assessment", href: assessmentHref }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
