import { BrandsSystem, FlowChain } from "@/components/diagrams/Diagrams";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { Layers } from "@/components/sections/HomeInteractive";
import {
  Bridge,
  CurtainHero,
  LineStatement,
  PanImage,
  PeakStatic,
  PillDetails,
  SpotlightGrid,
  Staircase,
  Ticker,
  ToggleCompare,
} from "@/components/sections/pages/GrowthParts";
import { RefIntro, RefSection } from "@/components/sections/Ref";
import { ButtonLink, Reveal } from "@/components/ui/primitives";
import {
  gaAudience,
  gaDimensions,
  gaGapSteps,
  gaImpactChain,
  gaOperatingLogic,
  gaTriggers,
  peakStages,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Growth Architecture™ — Join the Waitlist",
  description:
    "Level141 Growth Architecture™ diagnoses where an organization is, defines where it needs to go, and architects the integrated growth system that bridges the gap. Not yet open — register your interest.",
  path: routes.growth,
});

/** Decorative photographs (black and white) behind each trigger card, in order. */
const triggerImages = [
  "/images/home-hero-staircase-muted.webp",
  "/images/about-atrium-levels-muted.webp",
  "/images/home-strategist-compass.webp",
  "/images/about-dubai-terrace.webp",
  "/images/how-strategy-table-muted.webp",
  "/images/home-team-table-muted.webp",
  "/images/home-person-notebook.webp",
  "/images/home-cards-grid-muted.webp",
  "/images/about-meeting-room.webp",
  "/images/home-fragmented-to-integrated-muted.webp",
];

/**
 * Growth Architecture — editorial redesign on the Personal Brand Architecture
 * model: curtain hero, a line-by-line statement, a spotlight grid, the signature
 * diagrams, a drawn bridge, triggers that open in place and a contribution staircase.
 * Waitlist status is unchanged pending client confirmation.
 */
export default function GrowthArchitecturePage() {
  return (
    <>
      <CurtainHero
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
            <p className="mt-4 text-sm text-white/55">
              Not yet open for engagements. Organizations can register their interest now and will be contacted when it
              becomes available.
            </p>
          </>
        }
      >
        <div className="flex flex-col items-start gap-3">
          <ButtonLink href="#waitlist" className="!bg-white !text-black hover:!bg-white/85">
            Join the Waitlist
          </ButtonLink>
          <ButtonLink href="#peak" variant="ghost-light" className="!border-white/35 !text-white hover:!border-white">
            Explore the architecture
          </ButtonLink>
        </div>
      </CurtainHero>

      {/* Each section arrives with its own effect — none is used anywhere else on the site. */}
      <Layers page="growth">
        {/* The business problem — a statement on black */}
        <section>
          <LineStatement
            lines={["The central problem is not lack of activity."]}
            accent="It is lack of integration"
            sub={
              <>
                <p>
                  Organizations often invest in branding, social media, websites, paid media, PR, sales, CRM and content
                  independently. Each function may be active, yet the combined system fails to move the business to its
                  next level.
                </p>
                <p className="text-white">
                  Level141 Growth Architecture™ examines the complete growth environment—from brand and positioning to
                  awareness, trust, conversion, sales readiness and scale.
                </p>
              </>
            }
          />
        </section>

        {/* Six dimensions — tiles that turn over */}
        <section className="bg-paper text-ink">
          <SpotlightGrid
            label="Growth Architecture™"
            title="We identify where growth is being constrained, architect what needs to change, and establish the governance required to keep the organization moving"
            items={gaDimensions}
          />
          <div className="container-x pb-20 sm:pb-28">
            <Reveal className="max-w-3xl">
              <p className="font-display text-[1.6rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
                Growth shouldn&apos;t depend on isolated initiatives.{" "}
                <span className="text-muted">It should operate as a system</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* Operating logic — the flow chain */}
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

        {/* PEAK — the signature ascent, on black */}
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
            <PeakStatic stages={peakStages} />
          </div>
        </RefSection>

        {/* BRANDS — the integrated levers */}
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

        {/* Image break */}
        <section>
          <PanImage image="/images/ga-prioritised-bridge-muted.webp" alt="A bridge connecting a lower level to a higher one" />
        </section>

        {/* Growth gap — the bridge, one stage at a time */}
        <section>
          <Bridge
            label="Growth gap architecture"
            title={
              <>
                Not a list of recommendations. <span className="text-muted">A prioritized bridge</span>
              </>
            }
            text="The central deliverable is a prioritized bridge between Current Level and Next Level."
            items={gaGapSteps.map((s) => ({ name: s.name, body: s.q, meta: s.out }))}
          />
        </section>

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
          <Ticker label="Who Growth Architecture™ is for" items={gaAudience} />
          <Reveal className="mt-16 max-w-3xl">
            <p className="font-display text-[1.6rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
              When ambition changes, the architecture supporting it{" "}
              <span className="text-muted">must change too</span>
            </p>
          </Reveal>
        </RefSection>

        {/* Triggers — a gallery of photographed cards */}
        <section>
          <PillDetails
            label="Who it's for"
            title={
              <>
                When a company needs <span className="text-white/50">Growth Architecture</span>
              </>
            }
            items={gaTriggers.map((t, i) => ({ name: t.name, body: t.why, image: triggerImages[i % triggerImages.length] }))}
          />
        </section>

        {/* Impact — a relay of contribution */}
        <section>
          <Staircase
            label="Business impact model"
            title={
              <>
                A chain of <span className="text-white/50">contribution</span>
              </>
            }
            steps={gaImpactChain}
            foot="Level141 connects architecture to business movement without claiming that marketing alone controls revenue. Every client dashboard should separate activity metrics, leading indicators, pipeline metrics and business outcomes."
          />
        </section>

        {/* Before / after */}
        <section className="bg-paper text-ink">
          <ToggleCompare
            before="Disconnected growth activities, unclear priorities, inconsistent positioning, leakage between awareness and sales, weak accountability and scaling decisions based on activity."
            after="A diagnosed and prioritized growth system with clear market positioning, defined ICP, conversion readiness, integrated demand and nurture, stronger trust, sales alignment, measurable KPIs and governed execution."
          />
        </section>

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
      </Layers>
    </>
  );
}
