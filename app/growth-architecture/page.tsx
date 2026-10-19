import { BrandsSystem, FlowChain, PeakAscent } from "@/components/diagrams/Diagrams";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { RefIntro, RefRows, RefSection, RefStatement } from "@/components/sections/Ref";
import { ScrubText } from "@/components/motion/ScrubText";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ButtonLink, PageHero, Reveal } from "@/components/ui/primitives";
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

/**
 * Growth Architecture — rebuilt on the reference structure. Waitlist status is
 * unchanged pending client confirmation.
 */
export default function GrowthArchitecturePage() {
  return (
    <>
      <PageHero
        image="/images/ga-hero-structural-node-muted.webp"
        eyebrow="Growth Architecture™ · Coming later · Waitlist open"
        title={
          <>
            Your business doesn&apos;t need more disconnected growth initiatives.{" "}
            <span className="serif-accent">It needs them working together</span>
          </>
        }
        intro={
          <>
            <p>
              We diagnose where your organization is, define where it needs to go, and architect the integrated growth
              system that bridges the gap.
            </p>
            <p className="mt-4 text-sm text-paper-muted">
              Not yet open for engagements. Organizations can register their interest now and will be contacted when it
              becomes available.
            </p>
          </>
        }
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <ButtonLink href="#waitlist" variant="gold">
            Join the Waitlist
          </ButtonLink>
          <ButtonLink href="#peak" variant="ghost-light">
            Explore the architecture
          </ButtonLink>
        </div>
      </PageHero>

      {/* The business problem */}
      <RefSection>
        <RefStatement
          sub={
            <>
              <p>
                Organizations often invest in branding, social media, websites, paid media, PR, sales, CRM and content
                independently. Each function may be active, yet the combined system fails to move the business to its
                next level.
              </p>
              <p className="mt-4 text-ink">
                Level141 Growth Architecture™ examines the complete growth environment—from brand and positioning to
                awareness, trust, conversion, sales readiness and scale.
              </p>
            </>
          }
        >
          The central problem is not lack of activity. <span className="serif-accent">It is lack of integration</span>
        </RefStatement>
      </RefSection>

      {/* Six dimensions */}
      <RefSection>
        <RefIntro
          label="Growth Architecture™"
          title="We identify where growth is being constrained, architect what needs to change, and establish the governance required to keep the organization moving"
        />
        <RefRows rows={gaDimensions.map((d) => ({ key: d.name, name: d.name, line: d.body }))} />
        <Reveal className="mt-16 max-w-3xl">
          <p className="font-display text-[1.6rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
            <ScrubText text="Growth shouldn't depend on isolated initiatives." accent="It should operate as a system" />
          </p>
        </Reveal>
      </RefSection>

      {/* Operating logic */}
      <RefSection>
        <RefIntro
          label="Core operating logic"
          title={
            <>
              From current level to <span className="serif-accent">next level</span> — in one governed sequence
            </>
          }
          text="Level141 does not begin with campaigns, channels or isolated marketing activities. We begin with the organization's current level, define the next level it intends to reach, identify the structural growth gaps between the two, and architect the integrated system required to bridge that gap."
        />
        <div className="mt-14 sm:mt-16">
          <FlowChain items={gaOperatingLogic} highlight={["Current Level", "Next Level", "Scale"]} />
        </div>
      </RefSection>

      {/* PEAK */}
      <RefSection id="peak" tone="ink">
        <RefIntro
          label="PEAK™ — From presence to momentum"
          title={
            <>
              From being present in the market to <span className="serif-accent">self-reinforcing growth</span>
            </>
          }
          text="PEAK™ helps us understand how a person or organization progresses from simply being visible to building genuine market authority and ultimately creating sustained growth momentum."
        />
        <div className="mt-14 sm:mt-16">
          <PeakAscent detailed />
        </div>
      </RefSection>

      {/* BRANDS */}
      <RefSection>
        <RefIntro
          label="BRANDS™ — The integrated growth levers"
          title={
            <>
              The operating architecture <span className="serif-accent">beneath PEAK™</span>
            </>
          }
          text="BRANDS™ ensures the major market-facing growth levers are not managed as separate campaigns. Customer & Market is a cross-cutting foundation: every lever is built around the defined ICP, buying context and market reality."
        />
        <div className="mt-14 sm:mt-16">
          <BrandsSystem detailed tone="light" />
        </div>
      </RefSection>

      {/* Media break */}
      <div className="container-x">
        <div data-rise>
          <MediaSlot
            src="/images/ga-prioritised-bridge-muted.webp"
            alt="A bridge connecting a lower level to a higher one"
            label="Film or image — a prioritized bridge"
            className="aspect-[4/3] sm:aspect-[16/7]"
          />
        </div>
      </div>

      {/* Growth gap */}
      <RefSection>
        <RefIntro
          label="Growth gap architecture"
          title={
            <>
              Not a list of recommendations. <span className="serif-accent">A prioritized bridge</span>
            </>
          }
          text="The central deliverable is a prioritized bridge between Current Level and Next Level."
        />
        <RefRows
          rows={gaGapSteps.map((s, i) => ({
            key: s.name,
            name: `${String(i + 1).padStart(2, "0")} — ${s.name}`,
            line: s.q,
            extra: <span className="font-medium">{s.out}</span>,
          }))}
        />
      </RefSection>

      {/* Who it's for */}
      <RefSection>
        <RefIntro
          label="Who it's for"
          title={
            <>
              For organizations whose ambition has <span className="serif-accent">outgrown</span> their current growth
              system
            </>
          }
          text="The best-fit client has a real business, a credible offer, leadership ambition and sufficient organizational or financial capacity to act on the architecture."
        />
        <RefRows columns={3} rows={gaAudience.map((a) => ({ key: a, name: a, line: "" }))} />
        <Reveal className="mt-16 max-w-3xl">
          <p className="font-display text-[1.6rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
            <ScrubText text="When ambition changes, the architecture supporting it" accent="must change too" />
          </p>
        </Reveal>
      </RefSection>

      {/* Triggers */}
      <RefSection>
        <RefIntro
          label="Who it's for"
          title={
            <>
              When a company needs <span className="serif-accent">Growth Architecture</span>
            </>
          }
        />
        <RefRows rows={gaTriggers.map((t) => ({ key: t.name, name: t.name, line: t.why }))} />
      </RefSection>

      {/* Impact */}
      <RefSection tone="ink">
        <RefIntro
          label="Business impact model"
          title={
            <>
              A chain of <span className="serif-accent">contribution</span>
            </>
          }
          text="Level141 connects architecture to business movement without claiming that marketing alone controls revenue. Every client dashboard should separate activity metrics, leading indicators, pipeline metrics and business outcomes."
        />
        <div className="mt-14 sm:mt-16">
          <FlowChain dark items={gaImpactChain} highlight={["Repeatable growth"]} />
        </div>
        <RefRows
          rows={[
            {
              key: "before",
              name: "Before",
              line: "Disconnected growth activities, unclear priorities, inconsistent positioning, leakage between awareness and sales, weak accountability and scaling decisions based on activity.",
            },
            {
              key: "after",
              name: "After",
              line: "A diagnosed and prioritized growth system with clear market positioning, defined ICP, conversion readiness, integrated demand and nurture, stronger trust, sales alignment, measurable KPIs and governed execution.",
            },
          ]}
        />
      </RefSection>

      {/* Waitlist */}
      <RefSection id="waitlist">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RefIntro
              label="Growth Architecture™ waitlist"
              title={
                <>
                  Register your organization&apos;s <span className="serif-accent">interest</span>
                </>
              }
              text="Growth Architecture™ is not yet available. Join the waitlist and we'll contact you when it opens. Registering interest does not book or start an engagement."
            />
            <Reveal className="mt-10 border-t border-line pt-6 text-sm">
              <p>
                Building your personal authority as a founder or leader?{" "}
                <span className="text-muted">Personal Brand Architecture™ is available now.</span>
              </p>
              <ButtonLink href={routes.personalBrand} variant="ghost" className="mt-4">
                Explore Personal Brand Architecture
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={80} className="lg:col-span-6 lg:col-start-7">
            <WaitlistForm />
          </Reveal>
        </div>
      </RefSection>
    </>
  );
}
