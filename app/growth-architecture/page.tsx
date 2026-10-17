import { Clock } from "lucide-react";
import { BrandsSystem, FlowChain, PeakAscent } from "@/components/diagrams/Diagrams";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { BracketFrame, ButtonLink, DotList, PageHero, Reveal, Section, SectionHeader } from "@/components/ui/primitives";
import {
  gaAudience,
  gaDimensions,
  gaGapSteps,
  gaImpactChain,
  gaOperatingLogic,
  gaTriggers,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Growth Architecture™ — Join the Waitlist",
  description:
    "Level141 Growth Architecture™ diagnoses where an organisation is, defines where it needs to go, and architects the integrated growth system that bridges the gap. Not yet open — register your interest.",
  path: routes.growth,
});

function AvailabilityCard() {
  return (
    <div className="rounded-3xl border border-paper/15 bg-ink-2 p-7">
      <p className="flex items-center gap-2 text-sm text-gold">
        <Clock aria-hidden className="size-4" />
        <span className="eyebrow">Availability</span>
      </p>
      <p className="mt-4 text-xl leading-snug tracking-[-0.01em]">Not yet open for engagements.</p>
      <p className="mt-3 text-sm leading-relaxed text-paper/60">
        Growth Architecture™ will open at a later date. Organizations can register their interest now and will be
        contacted when it becomes available.
      </p>
    </div>
  );
}

export default function GrowthArchitecturePage() {
  return (
    <>
      <PageHero
        eyebrow="Growth Architecture™ · Coming later · Waitlist open"
        title={
          <>
            Your business doesn&apos;t need more disconnected growth initiatives.{" "}
            <span className="serif-accent text-gold">It needs them working together.</span>
          </>
        }
        intro={
          <p>
            We diagnose where your organisation is, define where it needs to go, and architect the integrated growth
            system that bridges the gap.
          </p>
        }
        aside={<AvailabilityCard />}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <ButtonLink href="#waitlist" variant="gold">
            Join the Waitlist
          </ButtonLink>
          <ButtonLink href="#peak" variant="ghost-light">
            Explore the architecture
          </ButtonLink>
        </div>
      </PageHero>

      {/* ---------------------------------------------------------- Problem */}
      <Section tone="paper" labelledBy="integration-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold-ink">The business problem</p>
            <h2 id="integration-title" className="display mt-6 text-[2.4rem] sm:text-5xl lg:text-6xl">
              The central problem is not lack of activity.{" "}
              <span className="serif-accent">It is lack of integration.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-8 lg:self-end">
            <p>
              Organisations often invest in branding, social media, websites, paid media, PR, sales, CRM and content
              independently. Each function may be active, yet the combined system fails to move the business to its next
              level.
            </p>
            <p className="text-ink">
              Level141 Growth Architecture™ examines the complete growth environment—from brand and positioning to
              awareness, trust, conversion, sales readiness and scale. We identify where growth is being constrained,
              architect what needs to change, and establish the governance required to keep the organization moving.
            </p>
          </Reveal>
        </div>

        <div className="container-x mt-20">
          <ul className="grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {gaDimensions.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 60} className="bg-[#fbfaf7] p-8 sm:p-10">
                <p className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-8 text-3xl tracking-[-0.025em]">{d.name}.</h3>
                <p className="mt-3 leading-relaxed text-muted">{d.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-14 text-center">
            <p className="text-2xl tracking-[-0.02em] sm:text-3xl">
              Growth shouldn&apos;t depend on isolated initiatives.{" "}
              <span className="serif-accent text-gold-ink">It should operate as a system.</span>
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Operating logic */}
      <Section tone="white" labelledBy="logic-title">
        <div className="container-x">
          <SectionHeader
            id="logic-title"
            eyebrow="Core operating logic"
            title={
              <>
                From current level to <span className="serif-accent">next level</span> — in one governed sequence.
              </>
            }
            intro="Level141 does not begin with campaigns, channels or isolated marketing activities. We begin with the organisation's current level, define the next level it intends to reach, identify the structural growth gaps between the two, and architect the integrated system required to bridge that gap."
          />
          <div className="mt-14">
            <FlowChain items={gaOperatingLogic} highlight={["Current Level", "Next Level", "Scale"]} />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- PEAK */}
      <Section id="peak" tone="ink" labelledBy="peak-title">
        <div className="container-x">
          <SectionHeader
            id="peak-title"
            dark
            eyebrow="PEAK™ — The organisational growth framework"
            title={
              <>
                From being present in the market to{" "}
                <span className="serif-accent text-gold">self-reinforcing growth.</span>
              </>
            }
            intro="PEAK™ is the strategic outcome framework under which the detailed growth levers are architected. It is Level141's framework for organisations — VIBE™ is reserved for people."
          />
          <div className="mt-16">
            <PeakAscent detailed />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- BRANDS */}
      <Section tone="ink" className="border-t border-paper/10" labelledBy="brands-title">
        <div className="container-x">
          <SectionHeader
            id="brands-title"
            dark
            eyebrow="BRANDS™ — The integrated growth levers"
            title={
              <>
                The operating architecture <span className="serif-accent text-gold">beneath PEAK™.</span>
              </>
            }
            intro="BRANDS™ ensures the major market-facing growth levers are not managed as separate campaigns. Customer & Market is a cross-cutting foundation: every lever is built around the defined ICP, buying context and market reality."
          />
          <div className="mt-16">
            <BrandsSystem detailed />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Growth gap */}
      <Section tone="paper" labelledBy="gap-title">
        <div className="container-x">
          <SectionHeader
            id="gap-title"
            eyebrow="Growth gap architecture"
            title={
              <>
                Not a list of recommendations. <span className="serif-accent">A prioritised bridge.</span>
              </>
            }
            intro="The central deliverable is a prioritised bridge between Current Level and Next Level."
          />
          <div className="mt-16">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
              {gaGapSteps.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.name}
                  delay={i * 70}
                  className="relative flex flex-col rounded-2xl border border-ink/12 bg-[#fbfaf7] p-5 lg:rounded-none lg:border-l-0 lg:first:rounded-l-2xl lg:first:border-l lg:last:rounded-r-2xl"
                >
                  <span className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-lg tracking-[-0.01em]">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.q}</p>
                  <p className="mt-auto border-t border-ink/10 pt-4 text-sm text-gold-ink sm:mt-6">{s.out}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Triggers + audience */}
      <Section tone="paper-2" labelledBy="triggers-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold-ink">Who it&apos;s for</p>
              <h2 id="triggers-title" className="display mt-6 text-[2.4rem] sm:text-5xl">
                For organizations whose ambition has <span className="serif-accent">outgrown</span> their current growth
                system.
              </h2>
              <DotList items={gaAudience} className="mt-10 text-lg" />
              <p className="mt-10 leading-relaxed text-muted">
                The best-fit client has a real business, a credible offer, leadership ambition and sufficient
                organisational or financial capacity to act on the architecture.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-muted">When a company needs Growth Architecture</p>
            </Reveal>
            <dl className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
              {gaTriggers.map((t, i) => (
                <Reveal key={t.name} delay={i * 40} variant="fade" className="grid gap-1 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="font-medium">{t.name}</dt>
                  <dd className="leading-relaxed text-muted">{t.why}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Impact chain */}
      <Section tone="paper" labelledBy="impact-title">
        <div className="container-x">
          <SectionHeader
            id="impact-title"
            eyebrow="Business impact model"
            title={
              <>
                A chain of contribution — <span className="serif-accent">not an overclaim.</span>
              </>
            }
            intro="Level141 connects architecture to business movement without claiming that marketing alone controls revenue. Activity metrics, leading indicators, pipeline metrics and business outcomes are always kept separate."
          />
          <div className="mt-14">
            <FlowChain items={gaImpactChain} highlight={["Repeatable growth"]} />
          </div>
          <div className="mt-20 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-[2rem] border border-ink/12 p-8 sm:p-12">
              <p className="eyebrow text-muted">Before</p>
              <p className="mt-6 text-xl leading-snug tracking-[-0.015em] text-muted sm:text-2xl">
                Disconnected growth activities, unclear priorities, inconsistent positioning, leakage between awareness
                and sales, weak accountability and scaling decisions based on activity.
              </p>
            </Reveal>
            <Reveal delay={120} className="on-dark rounded-[2rem] bg-ink p-8 text-paper sm:p-12">
              <p className="eyebrow text-gold">After</p>
              <p className="mt-6 text-xl leading-snug tracking-[-0.015em] sm:text-2xl">
                A diagnosed and prioritised growth system with clear market positioning, defined ICP, conversion
                readiness, integrated demand and nurture, stronger trust, sales alignment, measurable KPIs and governed
                execution.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Waitlist */}
      <section id="waitlist" aria-labelledby="waitlist-title" className="relative bg-paper-2 py-20 sm:py-28 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold-ink">Growth Architecture™ waitlist</p>
              <h2 id="waitlist-title" className="display mt-6 text-[2.4rem] sm:text-5xl lg:text-6xl">
                Register your organization&apos;s <span className="serif-accent">interest.</span>
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-muted">
                Growth Architecture™ is not yet available. Join the waitlist and we&apos;ll contact you when it opens.
                Registering interest does not book or start an engagement.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-12">
              <BracketFrame tone="ink" size="sm">
                <p className="leading-relaxed">
                  Building your personal authority as a founder or leader?{" "}
                  <span className="text-muted">Personal Brand Architecture™ is available now.</span>
                </p>
                <ButtonLink href={routes.personalBrand} variant="ghost" className="mt-3">
                  Explore Personal Brand Architecture
                </ButtonLink>
              </BracketFrame>
            </Reveal>
          </div>
          <Reveal delay={80} className="rounded-[2rem] border border-ink/10 bg-[#fbfaf7] p-6 sm:p-10 lg:col-span-6 lg:col-start-7">
            <WaitlistForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
