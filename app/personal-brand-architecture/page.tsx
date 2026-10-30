import { VibeExplorer } from "@/components/diagrams/VibeExplorer";
import { ProcessTimeline } from "@/components/diagrams/Diagrams";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  BracketFrame,
  ButtonLink,
  PageHero,
  Reveal,
  More,
  Section,
  SplitFeature,
  SectionHeader,
  Photo,
  PhotoBand,
  Expandable,
} from "@/components/ui/primitives";
import {
  pbaAudience,
  pbaIsNot,
  pbaMeasures,
  pbaModules,
  pbaPains,
  pbaPrinciples,
  pbaVoices,
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

const assessmentHref = routes.lq;

export default function PersonalBrandPage() {
  return (
    <>
      <PageHero
        image="/images/client-executive-portrait-woman.webp"
        portrait
        eyebrow="Personal Brand Architecture™"
        title={
          <>
            {/* Each sentence on its own line so the statement and the question read as a pair. */}
            <span className="block">Your achievements built your reputation</span>
            <span className="serif-accent mt-3 block text-gold">What will build your next level?</span>
          </>
        }
        intro={
          <p>
            Does your personal brand reflect your vision, influence, business ambitions and the legacy you want to create?
          </p>
        }
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4">
          <ButtonLink href={assessmentHref} variant="gold">
            Start Your Personal Brand Assessment
          </ButtonLink>
          <ButtonLink href="#vibe" variant="link">
            Explore the VIBE™ Framework
          </ButtonLink>
        </div>
      </PageHero>

      {/* ---------------------------------------------------------- Purpose */}
      <SplitFeature src="/images/client-executive-library.webp" labelledBy="purpose-title">
        <Reveal>
          <p className="eyebrow text-gold-ink">Not simply about visibility</p>
          <h2 id="purpose-title" className="display mt-6 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)]">
            It&apos;s about aligning who you are, what you stand for, the impact you create and{" "}
            <span className="serif-accent">where you want to go</span>
          </h2>
          <p className="mt-8 text-base leading-[1.85] text-muted sm:text-lg">
            We architect the personal brand behind the leader—so what you know, what you have achieved and what you
            stand for can create the opportunities you are ready for next.
          </p>
        </Reveal>
      </SplitFeature>

      {/* ---------------------------------------------------------- The problem */}
      <Section tone="paper-2" labelledBy="problem-title">
        <div className="container-x">
          <SectionHeader
            id="problem-title"
            eyebrow="The Market Problem"
            title={
              <>
                Many accomplished leaders have <span className="serif-accent">more value than visibility</span>
              </>
            }
            intro="Others have visibility without a coherent reputation system."
          />

          <ul className="mt-16 border-t border-line-strong sm:mt-24 lg:mt-28">
            {pbaPains.map((p, i) => (
              <li key={p.pain}>
                <Expandable index={i} summary={<span className="text-xl tracking-[-0.015em] sm:text-2xl">{p.pain}</span>}>
                  <dl className="grid gap-8 md:grid-cols-2 md:gap-16">
                    <div>
                      <dt className="eyebrow text-muted">What it looks like</dt>
                      <dd className="measure mt-3 leading-[1.85] text-muted">{p.looks}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-muted">Business consequence</dt>
                      <dd className="measure mt-3 leading-[1.85] text-ink">{p.cost}</dd>
                    </div>
                  </dl>
                </Expandable>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------- VIBE */}
      <Section id="vibe" tone="ink" labelledBy="vibe-title">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <SectionHeader
            id="vibe-title"
            dark
            align="stack"
            eyebrow="The four dimensions of Personal Brand Architecture"
            title={
              <>
                Architected through our proprietary <span className="serif-accent text-gold">VIBE™ Framework</span>
              </>
            }
            intro="VIBE™ answers four sequential questions."
          />
          <div className="mt-20 sm:mt-28">
            <VibeExplorer />
          </div>
          <Reveal className="mt-24 text-center sm:mt-32">
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
            eyebrow="Personal Brand Architecture™"
            title={
              <>
                How we architect <span className="serif-accent">your VIBE™</span>
              </>
            }
          />
          <ProcessTimeline steps={vibeStages} className="mt-20 sm:mt-28" />
          <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 border-y border-line py-10 sm:flex-row sm:items-center sm:py-14">
            <p className="max-w-xl text-lg leading-relaxed">
              {/* Source: Website Structure, "01 — Discover Your Level". */}
              <span className="font-medium">01 — Discover Your Level</span>{" "}
              <span className="text-muted">
                We begin with an LQ™ diagnostic assessment across the four VIBE™ dimensions to understand your current
                personal brand position.
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
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-gold-ink">Ideal for</p>
              <h2 id="for-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                For people whose capability is bigger than their{" "}
                <span className="serif-accent">current visibility</span>
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

          {/* 2 — Audience: a typographic index, not chips. */}
          <Reveal as="ul" className="mt-12 grid grid-cols-2 border-t border-line-strong sm:mt-16 sm:grid-cols-4 lg:mt-20">
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
          {/* Source: Website Structure, PERSONAL BRAND ARCHITECTURE "Ideal for" closing lines. */}
          <Reveal>
            <p className="mt-12 max-w-3xl text-2xl leading-snug tracking-[-0.02em] sm:mt-16 sm:text-3xl">
              Your personal brand shouldn&apos;t simply document what you&apos;ve done.{" "}
              <span className="serif-accent">It should position you for what you want to do next</span>
            </p>
          </Reveal>

          {/* 3 — Fit: stacked rows, title left and list right on wide screens. */}
<More label="Who it is for, and what it is not" className="mt-16 sm:mt-20">
          <div className="pt-6">
            <Reveal className="grid gap-8 border-b border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
              <h3 className="text-2xl tracking-[-0.02em] sm:text-[1.75rem] lg:col-span-5">
                Qualification <span className="serif-accent">signals</span>
              </h3>
              <ol className="space-y-6 lg:col-span-7">
                {[
                  "Has demonstrable expertise, achievements, leadership experience or a credible body of work.",
                  "Has a defined ambition: growth, investment, influence, career transition, market leadership, board/advisory roles or legacy.",
                  "Is willing to articulate viewpoints and participate in the architecture process.",
                  "Understands that authority requires consistency and cannot be outsourced entirely.",
                  "Values strategic reputation and business outcomes more than short-term follower acquisition.",
                ].map((item, n) => (
                  <li key={item} className="grid grid-cols-[2.5rem_1fr] text-base leading-[1.85] sm:text-lg">
                    <span aria-hidden className="pt-[0.35em] text-sm tabular-nums text-gold-ink">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal className="grid gap-8 border-b border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
              <h3 className="text-2xl tracking-[-0.02em] text-muted sm:text-[1.75rem] lg:col-span-5">
                What it is <span className="serif-accent">not</span>
              </h3>
              <ul className="space-y-4 lg:col-span-7">
                {pbaIsNot.map((n) => (
                  <li key={n} className="grid grid-cols-[2.5rem_1fr] leading-relaxed text-muted">
                    <span aria-hidden className="text-ink/35">×</span>
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
</More>
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
                Client pain. <span className="serif-accent text-gold">Level141 intervention</span>
              </>
            }
          />
          {/* Pain → intervention, read as paired rows rather than a grid of boxes. */}
          <div className="mt-20 sm:mt-28">
            {/* Source: Personal Brand Architecture bible §10 — all four documented columns, the quote first. */}
            <ol className="border-t border-line-dark-strong">
              {pbaVoices.map((v, i) => (
                <li key={v.quote}>
                  <Expandable
                    dark
                    index={i}
                    summary={<span className="serif-accent text-xl leading-snug text-paper sm:text-2xl lg:text-[1.75rem]">“{v.quote}”</span>}
                  >
                    <dl className="grid gap-8 sm:grid-cols-3 sm:gap-12">
                      <div>
                        <dt className="eyebrow text-paper-muted">Level141 intervention</dt>
                        <dd className="mt-3 font-medium text-paper">{v.answer}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-paper-muted">Immediate effect</dt>
                        <dd className="mt-3 leading-[1.85] text-paper/75">{v.effect}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-paper-muted">Strategic impact</dt>
                        <dd className="mt-3 leading-[1.85] text-paper/75">{v.impact}</dd>
                      </div>
                    </dl>
                  </Expandable>
                </li>
              ))}
            </ol>

            {/* Closing statement and action. */}
            <Reveal className="mt-12 grid gap-8 sm:mt-14 md:grid-cols-12 md:items-center md:gap-8">
              <p className="text-xl leading-snug tracking-[-0.02em] text-paper sm:text-2xl md:col-span-7">
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

      <PhotoBand src="/images/client-keynote-auditorium.webp" />

      {/* ---------------------------------------------------------- Modules */}
      <Section tone="paper" labelledBy="modules-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow text-gold-ink">Personal Brand Architecture™</p>
                <h2 id="modules-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                  Product Architecture <span className="serif-accent">&amp; Modules</span>
                </h2>
                <p className="mt-8 leading-relaxed text-muted">
                  Level141&apos;s role is architecture, strategic direction, governance and measurement. Where execution
                  partners, internal teams or specialist vendors are required, the architecture should define the brief,
                  standards, dependencies, review mechanism and success criteria. The product should not collapse into
                  undifferentiated execution.
                </p>
                <Photo src="/images/client-executive-study-portrait.webp" sizes="(min-width: 1024px) 34vw, 100vw" className="mt-10 aspect-[4/3] lg:aspect-[5/4]" />
              </Reveal>
            </div>
          </div>
<More label="View the modules" className="self-start lg:col-span-7 lg:col-start-6">
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
</More>
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
                      Truth before theatre. <span className="serif-accent">Authority before vanity</span>
                    </>
                  }
                />
                <Reveal>
                  <Photo src="/images/client-keynote-monochrome.webp" sizes="(min-width: 1024px) 34vw, 100vw" className="mt-10 aspect-[4/3] sm:mt-12" />
                </Reveal>
              </div>
            </div>
<More label="Our guiding principles" className="self-start lg:col-span-7">
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
</More>
          </div>

          {/* Measurement: open hairline section, statement left, scorecard right. */}
<More label="Measurement & Success System" className="mt-16 sm:mt-20">
          <div className="grid gap-10 pt-6 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-gold-ink">Measurement &amp; Success System</p>
              <h3 className="mt-5 text-2xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
                Visibility metrics are useful signals, <span className="serif-accent">but they are not the product outcome</span>
              </h3>
              <p className="mt-6 leading-[1.85] text-muted">Success should be measured through a balanced scorecard.</p>
              {/* Source: Personal Brand Architecture bible §11, Recommended Reporting Rhythm. */}
              <p className="eyebrow mt-8 text-muted">Recommended Reporting Rhythm</p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                <li>Monthly: activity, signal and opportunity review.</li>
                <li>Quarterly: strategic VIBE™ review and corrective actions.</li>
                <li>Half-yearly: reputation, positioning and stakeholder perception review.</li>
                <li>Annually: full evolution reset against next-stage ambition.</li>
              </ul>
            </Reveal>
            <dl className="grid gap-x-10 border-t border-line sm:grid-cols-2 lg:col-span-7">
              {pbaMeasures.map((m, i) => (
                <Reveal key={m.name} delay={i * 40} className="flex gap-4 border-b border-line py-5 sm:last:odd:col-span-2">
                  <span aria-hidden className="eyebrow w-6 shrink-0 pt-[0.3em] tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="text-ink">{m.name}</dt>
                    <dd className="mt-1 leading-relaxed text-muted">{m.q}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
</More>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Before / after */}
      <Section tone="paper" labelledBy="outcome-title">
        <div className="container-x">
          <h2 id="outcome-title" className="sr-only">
            Before and after Personal Brand Architecture
          </h2>
          {/* Before and after as two stacked rows: label left, statement right. */}
          <div className="border-t border-line-strong">
            <Reveal className="grid gap-4 border-b border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
              <p className="eyebrow text-muted lg:col-span-5 lg:pt-2">Before</p>
              <p className="text-xl leading-snug tracking-[-0.02em] text-muted sm:text-2xl lg:col-span-7">
                Valuable but fragmented expertise, inconsistent positioning, disconnected visibility and unpredictable
                opportunity.
              </p>
            </Reveal>
            <Reveal className="grid gap-4 border-b border-line-strong py-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
              <p className="eyebrow text-gold-ink lg:col-span-5 lg:pt-2">After</p>
              <p className="text-xl leading-snug tracking-[-0.02em] sm:text-2xl lg:col-span-7">
                A clearly positioned leader with an evidence-backed narrative, coherent presence, recognizable
                intellectual territory, trusted impact, deliberate opportunity pathways and a roadmap for continuous
                evolution.
              </p>
            </Reveal>
          </div>
          <Reveal className="mx-auto mt-14 max-w-3xl sm:mt-16">
            <BracketFrame tone="ink" size="lg" className="text-center">
              <p className="eyebrow text-gold-ink">The Level141 promise</p>
              <p className="mt-6 text-xl leading-snug tracking-[-0.02em] sm:text-2xl">
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
            <span className="serif-accent text-gold">Become more valuable, influential and impactful</span>
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
