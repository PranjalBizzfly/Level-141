import { Clock } from "lucide-react";
import { BrandsSystem, FlowChain, PeakAscent } from "@/components/diagrams/Diagrams";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { BracketFrame, ButtonLink, PageHero, Reveal, Section, SectionHeader, Photo, Expandable } from "@/components/ui/primitives";
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
    "Level141 Growth Architecture™ diagnoses where an organization is, defines where it needs to go, and architects the integrated growth system that bridges the gap. Not yet open — register your interest.",
  path: routes.growth,
});

function AvailabilityCard() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-paper/15 bg-ink-2 p-8 sm:p-14">
      <p className="flex items-center gap-3 text-gold">
        <span aria-hidden className="grid size-9 place-items-center rounded-full border border-gold/60">
          <Clock className="size-4" />
        </span>
        <span className="eyebrow">Availability</span>
      </p>
      <p className="mt-5 text-2xl leading-snug tracking-[-0.015em]">Not yet open for engagements.</p>
      <p className="mt-3 leading-relaxed text-paper-muted">
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
            <span className="block">Your business doesn&apos;t need more disconnected growth initiatives</span>
            <span className="serif-accent mt-3 block text-gold">It needs them working together</span>
          </>
        }
        intro={
          <p>
            We diagnose where your organization is, define where it needs to go, and architect the integrated growth
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
        {/* Headline across the top; photo and supporting text share the row beneath it. */}
        <div className="container-x grid gap-12 sm:gap-16 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-20">
          <Reveal className="lg:col-span-10">
            <p className="eyebrow text-gold-ink">The business problem</p>
            <h2 id="integration-title" className="display mt-6 text-[2.25rem] sm:text-5xl lg:text-[3.75rem]">
              The central problem is not lack of activity.{" "}
              <span className="serif-accent">It is lack of integration</span>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-6">
            <Photo src="/images/client-mentorship.webp" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] lg:aspect-[16/11]" />
          </Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-5 lg:col-start-8 lg:self-center">
            <p>
              Organizations often invest in branding, social media, websites, paid media, PR, sales, CRM and content
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

        <div className="container-x mt-16 sm:mt-24 lg:mt-28">
          {/* Six dimensions as editorial entries: three across, two rows, hairlines only. */}
          <ol data-seq className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
            {gaDimensions.map((d, i) => (
              <li
                key={d.name}
                data-step
                style={{ "--i": i } as React.CSSProperties}
                className="border-t border-line-strong py-8 sm:py-10"
              >
                <span aria-hidden className="eyebrow tabular-nums text-gold-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl tracking-[-0.025em] sm:text-3xl">{d.name}</h3>
                <p className="mt-3 max-w-sm leading-relaxed text-muted">{d.body}</p>
              </li>
            ))}
          </ol>
          <Reveal className="mt-6 border-t border-line-strong pt-10 sm:mt-8">
            <p className="max-w-4xl text-2xl leading-snug tracking-[-0.02em] sm:text-3xl lg:text-4xl">
              Growth shouldn&apos;t depend on isolated initiatives.{" "}
              <span className="serif-accent text-gold-ink">It should operate as a system</span>
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
            intro="Level141 does not begin with campaigns, channels or isolated marketing activities. We begin with the organization's current level, define the next level it intends to reach, identify the structural growth gaps between the two, and architect the integrated system required to bridge that gap."
          />
          <div className="mt-16 sm:mt-24 lg:mt-28">
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
            eyebrow="PEAK™ — From presence to momentum."
            title={
              <>
                From being present in the market to{" "}
                <span className="serif-accent text-gold">self-reinforcing growth</span>
              </>
            }
            intro="PEAK™ helps us understand how a person or organization progresses from simply being visible to building genuine market authority and ultimately creating sustained growth momentum."
          />
          <div className="mt-16 sm:mt-24 lg:mt-28">
            <PeakAscent detailed />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- BRANDS */}
      <Section tone="paper" labelledBy="brands-title">
        <div className="container-x">
          <SectionHeader
            id="brands-title"
            eyebrow="BRANDS™ — The integrated growth levers"
            title={
              <>
                The operating architecture <span className="serif-accent">beneath PEAK™</span>
              </>
            }
            intro="BRANDS™ ensures the major market-facing growth levers are not managed as separate campaigns. Customer & Market is a cross-cutting foundation: every lever is built around the defined ICP, buying context and market reality."
          />
          <div className="mt-16 sm:mt-24 lg:mt-28">
            <BrandsSystem detailed tone="light" />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Growth gap */}
      <Section tone="white" labelledBy="gap-title">
        <div className="container-x">
          <SectionHeader
            id="gap-title"
            eyebrow="Growth gap architecture"
            title={
              <>
                Not a list of recommendations. <span className="serif-accent">A prioritized bridge</span>
              </>
            }
            intro="The central deliverable is a prioritized bridge between Current Level and Next Level."
          />
          {/* The bridge as a sequence of paired rows: step, the question it answers, what it delivers. */}
          <ol className="group/list mt-12 border-t border-line-strong sm:mt-16 lg:mt-20">
            {gaGapSteps.map((s, i) => (
              <Reveal
                as="li"
                key={s.name}
                delay={i * 50}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-2 border-b border-line py-7 transition-opacity duration-500 sm:py-8 md:grid-cols-12 md:items-baseline md:gap-8 [@media(hover:hover)]:md:group-hover/list:opacity-40 [@media(hover:hover)]:md:hover:opacity-100!"
              >
                <span aria-hidden className="eyebrow row-span-3 pt-[0.5em] tabular-nums text-gold-ink md:col-span-1 md:row-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl tracking-[-0.02em] md:col-span-3">{s.name}</h3>
                <p className="leading-relaxed text-muted md:col-span-4">{s.q}</p>
                <p className="flex items-baseline gap-3 font-medium md:col-span-4">
                  <span aria-hidden className="h-px w-5 shrink-0 translate-y-[-0.3em] bg-gold-ink transition-[width] duration-500 group-hover:w-8" />
                  {s.out}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Triggers + audience */}
      <Section tone="paper-2" labelledBy="triggers-title">
        <div className="container-x">
          {/* 1 — Header: headline left, best-fit statement right. */}
          <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow text-gold-ink">Who it&apos;s for</p>
              <h2 id="triggers-title" className="display mt-5 text-[2.25rem] sm:mt-6 sm:text-5xl lg:text-[3.75rem]">
                For organizations whose ambition has <span className="serif-accent">outgrown</span> their current growth
                system.
              </h2>
            </Reveal>
            <Reveal delay={120} className="measure text-base leading-relaxed text-muted sm:text-lg lg:col-span-5">
              <p>
                The best-fit client has a real business, a credible offer, leadership ambition and sufficient
                organizational or financial capacity to act on the architecture.
              </p>
            </Reveal>
          </div>

          {/* 2 — Audience as a typographic index. */}
          {/* Column flow (3 · 2 · 2) avoids a lone item on its own row. */}
          <Reveal as="ul" className="mt-12 gap-x-10 border-t border-line-strong sm:mt-16 sm:columns-2 lg:mt-20 lg:columns-3">
            {gaAudience.map((a, n) => (
              <li key={a} className="flex break-inside-avoid items-baseline gap-4 border-b border-line py-5 pr-6 text-lg leading-snug tracking-[-0.01em] sm:py-6">
                <span aria-hidden className="eyebrow shrink-0 tabular-nums text-muted">
                  {String(n + 1).padStart(2, "0")}
                </span>
                {a}
              </li>
            ))}
          </Reveal>
          {/* Source: Website Structure, GROWTH ARCHITECTURE "Ideal for" closing line. */}
          <Reveal>
            <p className="mt-8 max-w-3xl text-2xl leading-snug tracking-[-0.02em] sm:mt-10 sm:text-3xl">
              When ambition changes, the architecture supporting it <span className="serif-accent">must change too</span>
            </p>
          </Reveal>

          {/* 3 — Triggers: full width, two columns of signal → reason rows. */}
          <Reveal className="mt-12 sm:mt-14">
            <h3 className="text-3xl tracking-[-0.025em] sm:text-4xl">
              When a company needs <span className="serif-accent">Growth Architecture</span>
            </h3>
          </Reveal>
          <ul className="mt-10 grid gap-x-16 md:grid-cols-2">
            {gaTriggers.map((t) => (
              <li key={t.name} className="first:border-t md:[&:nth-child(2)]:border-t border-line-strong">
                <Expandable summary={<span className="text-lg tracking-[-0.01em] sm:text-xl">{t.name}</span>}>
                  <p className="measure leading-[1.85] text-muted">{t.why}</p>
                </Expandable>
              </li>
            ))}
          </ul>
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
                A chain of <span className="serif-accent">contribution</span>
              </>
            }
            intro="Level141 connects architecture to business movement without claiming that marketing alone controls revenue. Every client dashboard should separate activity metrics, leading indicators, pipeline metrics and business outcomes."
          />
          <div className="mt-16 sm:mt-24 lg:mt-28">
            <FlowChain items={gaImpactChain} highlight={["Repeatable growth"]} />
          </div>
          {/* Before / after: two open columns split by a single hairline. */}
          <div className="mt-16 grid gap-12 border-t border-line-strong pt-10 sm:mt-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
            <Reveal className="md:pr-12 lg:pr-16">
              <p className="eyebrow text-muted">Before</p>
              <p className="mt-6 text-xl leading-snug tracking-[-0.015em] text-muted sm:text-2xl">
                Disconnected growth activities, unclear priorities, inconsistent positioning, leakage between awareness
                and sales, weak accountability and scaling decisions based on activity.
              </p>
            </Reveal>
            <Reveal delay={120} className="md:pl-12 lg:pl-16">
              <p className="eyebrow text-gold-ink">After</p>
              <p className="mt-6 text-xl leading-snug tracking-[-0.015em] sm:text-2xl">
                A diagnosed and prioritized growth system with clear market positioning, defined ICP, conversion
                readiness, integrated demand and nurture, stronger trust, sales alignment, measurable KPIs and governed
                execution.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Waitlist */}
      <section id="waitlist" aria-labelledby="waitlist-title" className="relative bg-paper-2 py-28 sm:py-40 lg:py-48">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold-ink">Growth Architecture™ waitlist</p>
              <h2 id="waitlist-title" className="display mt-6 text-[2.25rem] sm:text-5xl lg:text-[3.75rem]">
                Register your organization&apos;s <span className="serif-accent">interest</span>
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
              <Photo src="/images/client-walk-toward-skyline.webp" sizes="(min-width: 1024px) 40vw, 100vw" className="mt-10 aspect-[16/10] sm:mt-12" />
            </Reveal>
          </div>
          {/* Card fits its form and stays in view beside the taller left column. */}
          <Reveal delay={80} className="rounded-[2rem] border border-ink/10 bg-surface p-8 sm:p-12 lg:sticky lg:top-28 lg:col-span-6 lg:col-start-7 lg:self-start xl:p-14">
            <WaitlistForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
