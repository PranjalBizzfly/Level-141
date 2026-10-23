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
import { altFor } from "@/lib/image-alts";
import { pageMetadata } from "@/lib/seo";
import { DetailsPanel, RuleQuote } from "@/components/sections/Premium";
import { AudienceIndex } from "@/components/sections/pages/PremiumParts";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Growth Architecture™: Join the Waitlist",
  description:
    "Growth Architecture™ diagnoses where an organization is and architects the integrated growth system that bridges the gap.",
  path: routes.growth,
});

/**
 * Growth Architecture — editorial redesign on the Personal Brand Architecture
 * model: curtain hero, a line-by-line statement, a spotlight grid, the signature
 * diagrams, a drawn bridge, triggers that open in place and a contribution staircase.
 * Waitlist: the "Join the Waitlist" CTA plus the not-yet-open note in the hero (client-approved).
 */
/** One photograph per "Ideal for" audience, in order. */
const audienceImages = [
  "/images/client-executive-study-portrait.webp",
  "/images/client-executive-portrait-woman.webp",
  "/images/client-lone-executive-skyline.webp",
  "/images/client-executive-study-woman.webp",
  "/images/pba-leader-skyline.webp",
  "/images/client-executive-dubai-window.webp",
  "/images/client-visionaries-horizon.webp",
];
const triggerImages = [
  "/images/home-hero-staircase-muted.webp",
  "/images/client-walk-through-crowd.webp",
  "/images/home-strategist-compass.webp",
  "/images/about-dubai-terrace.webp",
  "/images/how-strategy-table-muted.webp",
  "/images/home-team-table-muted.webp",
  "/images/home-person-notebook.webp",
  "/images/home-cards-grid-muted.webp",
  "/images/client-ceo-portrait.webp",
  "/images/client-executive-in-motion.webp",
];

export default function GrowthArchitecturePage() {
  return (
    <>
      <CurtainHero
        image="/images/ga-hero-stair-light.webp"
        eyebrow="Growth Architecture™"
        title={
          <>
            <span className="block">Your business</span>
            <span className="block text-white/70">doesn&apos;t need more</span>
            <span className="block">disconnected</span>
            <span className="block">growth initiatives.</span>
          </>
        }
        intro={
          <p>
            We diagnose where your organization is, define where it needs to go, and architect the integrated growth
            system that bridges the gap.
          </p>
        }
      >
        <div className="flex flex-col items-start gap-3">
          <ButtonLink href="#waitlist" className="!bg-white !text-black hover:!bg-white/85">
            Join the Waitlist
          </ButtonLink>
          <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/70">
            Not yet open for engagements. Organizations can register their interest now and will be contacted when it
            becomes available.
          </p>
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
            <Reveal className="max-w-4xl">
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
            label="Growth Architecture™"
            title={
              <>
                Core operating <span className="serif-accent">logic</span>
              </>
            }
            text="Level141 is a Growth Architecture Company. We do not begin with campaigns, channels or isolated marketing activities. We begin with the organization's current level, define the next level it intends to reach, identify the structural growth gaps between the two, and architect the integrated system required to bridge that gap."
          />
          <div className="mt-16 sm:mt-24">
            <FlowChain items={gaOperatingLogic} highlight={["Current Level", "Next Level", "Scale"]} />
          </div>
        </RefSection>

        {/* PEAK — the signature ascent, on black */}
        <RefSection id="peak" tone="ink">
          <RefIntro
            label="PEAK™"
            title={
              <>
                From being present in the market to <span className="serif-accent">self-reinforcing growth</span>
              </>
            }
            text="PEAK™ helps us understand how a person or organization progresses from simply being visible to building genuine market authority and ultimately creating sustained growth momentum."
          />
          <div className="mt-16 sm:mt-24">
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
            text="BRANDS™ is the operating architecture beneath PEAK™. It ensures that the major market-facing growth levers are not managed as separate campaigns. Customer & Market is a cross-cutting foundation across all six BRANDS™ levers. It is not a separate campaign; every lever must be built around the defined ICP, buying context and market reality."
          />
          <div className="mt-16 sm:mt-24">
            <BrandsSystem detailed tone="light" />
          </div>
        </RefSection>

        {/* Image break */}
        <section>
          <PanImage image="/images/ga-prioritised-bridge-muted.webp" alt={altFor("/images/ga-prioritised-bridge-muted.webp")} />
        </section>

        {/* Growth gap — the bridge, one stage at a time */}
        <section>
          <Bridge
            label="Growth Architecture™"
            title={
              <>
                Growth Gap Architecture
              </>
            }
            text="The central deliverable is not a list of recommendations. It is a prioritized bridge between Current Level and Next Level."
            items={gaGapSteps.map((s) => ({ name: s.name, body: s.q, meta: s.out }))}
          />
        </section>

        {/* Ideal for */}
        <RefSection>
          <RefIntro
            label="Ideal for"
            title={
              <>
                For organizations whose ambition has <span className="serif-accent">outgrown</span> their current growth
                system
              </>
            }
            text="The best-fit client has a real business, a credible offer, leadership ambition and sufficient organizational or financial capacity to act on the architecture."
          />
          <AudienceIndex items={gaAudience} images={audienceImages} />
          <div className="pb-16 sm:pb-24">
            <RuleQuote>
              When ambition changes, the architecture supporting it <span className="text-muted">must change too</span>
            </RuleQuote>
          </div>
        </RefSection>

        {/* Triggers — a gallery of photographed cards */}
        <section>
          <PillDetails
            label="Trigger events"
            title={
              <>
                When a company needs <span className="text-white/70">Growth Architecture</span>
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
                A chain of contribution
              </>
            }
            steps={gaImpactChain}
            foot="Level141 must connect architecture to business movement without claiming that marketing alone controls revenue. Every client dashboard should separate activity metrics, leading indicators, pipeline metrics and business outcomes."
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
            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <RefIntro
                label="Join the Waitlist"
                title={
                  <>
                    Register your organization&apos;s <span className="serif-accent">interest</span>
                  </>
                }
              />
              <DetailsPanel
                rows={[
                  { label: "For", value: gaAudience.slice(0, 4).join(" · ") },
                  { label: "Frameworks", value: "LQ™ · PEAK™ · BRANDS™" },
                ]}
              />
              <Reveal className="mt-12 border-t border-line pt-8 text-base sm:text-lg">
                <p>Building your personal authority as a founder or leader?</p>
                <ButtonLink href={routes.personalBrand} variant="ghost" className="mt-6">
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
