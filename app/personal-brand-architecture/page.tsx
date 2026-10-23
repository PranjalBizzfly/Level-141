import Link from "next/link";
import { VibeExplorer } from "@/components/diagrams/VibeExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  CinemaHero,
  CompareSlider,
  FullBleed,
  Ledger,
} from "@/components/sections/Editorial";
import { Layers } from "@/components/sections/HomeInteractive";
import { Marquee } from "@/components/sections/Layouts";
import { CadenceGrid, Checklist, OutlineFill, Ring3D, ScanRows, SpotlightText } from "@/components/sections/pages/PersonalParts";
import { IsNotCollage, MetricsMosaic, VibeStairs } from "@/components/sections/pages/PremiumParts";
import { RefIntro, RefSection } from "@/components/sections/Ref";
import { StaggerCards } from "@/components/sections/StaggerCards";
import { ButtonLink, Reveal } from "@/components/ui/primitives";
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
import { altFor } from "@/lib/image-alts";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Personal Brand Architecture™",
  description:
    "Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived experience into a structured personal growth asset.",
  path: routes.personalBrand,
});

const assessmentHref = `${routes.contact}?interest=personal-brand-architecture`;

/** One photograph per module on the ring, in module order. */
const moduleImages = [
  "/images/client-executive-study-portrait.webp",
  "/images/client-lone-executive-skyline.webp",
  "/images/client-executive-portrait-woman.webp",
  "/images/client-keynote-monochrome.webp",
  "/images/client-mentorship.webp",
  "/images/client-executive-in-motion.webp",
  "/images/client-executive-contemplation.webp",
];

/** The scorecard mosaic's photographs: the four corners and the centre. */
const measureImages = [
  "/images/client-ceo-portrait.webp",
  "/images/ga-hero-structural-node-muted.webp",
  "/images/client-executive-dubai-window.webp",
  "/images/home-person-notebook.webp",
  "/images/ga-prioritised-bridge-muted.webp",
] as const;
/** One photograph per VIBE™ stage, in stage order. */
const stageImages = [
  "/images/client-executive-library.webp",
  "/images/home-strategist-compass.webp",
  "/images/client-keynote-auditorium.webp",
  "/images/home-team-table.webp",
  "/images/pba-leader-skyline.webp",
];

const qualification = [
  "Has demonstrable expertise, achievements, leadership experience or a credible body of work.",
  "Has a defined ambition: growth, investment, influence, career transition, market leadership, board/advisory roles or legacy.",
  "Is willing to articulate viewpoints and participate in the architecture process.",
  "Understands that authority requires consistency and cannot be outsourced entirely.",
  "Values strategic reputation and business outcomes more than short-term follower acquisition.",
];

const rhythm = [
  ["Monthly", "Activity, signal and opportunity review"],
  ["Quarterly", "Strategic VIBE™ review and corrective actions"],
  ["Half-yearly", "Reputation, positioning and stakeholder perception review"],
  ["Annually", "Full evolution reset against next-stage ambition"],
] as const;


/**
 * Personal Brand Architecture — editorial redesign: a cinematic hero, then
 * pinned sequences, a relay, quote stage, ledger, flip tiles and a compare
 * slider. Each section plays its own arrival (never used elsewhere on the site).
 * Wording from the Website Structure and the Personal Brand Architecture bible.
 */
export default function PersonalBrandPage() {
  return (
    <>
      <CinemaHero
        image="/images/client-speaker-conference-stage.webp"
        eyebrow="Personal Brand Architecture™"
        title={
          <>
            Your achievements built your reputation. <span className="serif-accent">What will build your next level?</span>
          </>
        }
        intro={
          <p>
            You&apos;ve spent years building expertise, businesses, relationships and accomplishments. But does the
            world recognise your true value? Does your personal brand reflect your vision, influence, business ambitions
            and the legacy you want to create?
          </p>
        }
      >
        <div className="flex flex-col items-start gap-3">
          <ButtonLink href={assessmentHref} className="!bg-white !text-black hover:!bg-white/85">
            Start Your Personal Brand Assessment
          </ButtonLink>
        </div>
      </CinemaHero>

      {/* Each section arrives with its own effect — none is used anywhere else on the site. */}
      <Layers page="personal">
        {/* Not simply about visibility */}
        <section>
          <OutlineFill
            text="It's about aligning who you are, what you stand for, the impact you create and"
            accent="where you want to go"
            sub={
              <>
                <p>
                  Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived
                  experience into a structured personal growth asset. It is designed to help accomplished people become
                  clearer, more credible, more influential and more commercially relevant without manufacturing a
                  persona.
                </p>
                <p className="text-white">
                  We architect the personal brand behind the leader—so what you know, what you have achieved and what you
                  stand for can create the opportunities you are ready for next.
                </p>
              </>
            }
          />
        </section>

        {/* The Market Problem — each pain opens as it crosses the scan line */}
        <section>
          <ScanRows
            label="The Market Problem"
            title={
              <>
                Many accomplished leaders have more value than visibility
              </>
            }
            text="Others have visibility without a coherent reputation system. The market therefore sees fragments rather than a clear leadership proposition."
            items={pbaPains.map((p) => ({ name: p.pain, body: p.looks, meta: p.cost }))}
          />
        </section>

        {/* VIBE — the signature diagram, full screen on black */}
        <RefSection id="vibe" tone="ink">
          <RefIntro
            label="VIBE™ — The four dimensions of Personal Brand Architecture"
            title={
              <>
                Architected through our proprietary <span className="serif-accent">VIBE™ Framework</span>
              </>
            }
            text="VIBE™ answers four sequential questions: What leadership should this person represent? What impact should that leadership create? How should reputation translate into growth? How must the person and brand evolve next?"
          />
          <div className="mt-16 sm:mt-24">
            <VibeExplorer />
          </div>
          <Reveal className="mx-auto mt-12 max-w-4xl text-center text-xl leading-relaxed text-paper/80 sm:text-2xl">
            <p>
              Visionary Leadership that creates Impact, Impact that enables Business Growth, and Business Growth that fuels
              continuous Evolution
            </p>
          </Reveal>
        </RefSection>

        {/* How we architect your VIBE — the stages as a staircase */}
        <section>
          <VibeStairs
            label="Personal Brand Architecture™"
            title="How we architect your VIBE™"
            items={vibeStages.map((s, i) => ({ n: s.n, name: s.name, body: s.body, image: stageImages[i % stageImages.length] }))}
            foot={
              <Link href={assessmentHref} className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
                Start Your Personal Brand Assessment
              </Link>
            }
          />
        </section>

        {/* Image break */}
        <section>
          <FullBleed image="/images/client-walk-toward-skyline.webp" alt={altFor("/images/client-walk-toward-skyline.webp")} />
        </section>

        {/* Ideal for */}
        <RefSection>
          <RefIntro
            label="Ideal for"
            title={
              <>
                For people whose capability is bigger than <span className="serif-accent">their current visibility</span>
              </>
            }
            text="The strongest fit is not simply a person who wants to become famous. It is a person with genuine substance, a meaningful next-stage objective and sufficient credibility to convert architecture into authority."
          />
          <Marquee label="Ideal for" items={pbaAudience} />
        </RefSection>

        {/* Qualification signals — opened by the closing line of "Ideal for"; each signal is checked off as it comes into view */}
        <section>
          <Checklist
            lead={
              <>
                Your personal brand shouldn&apos;t simply document what you&apos;ve done.{" "}
                <span className="text-muted">It should position you for what you want to do next</span>
              </>
            }
            label="Ideal for"
            title="Qualification signals"
            items={qualification}
          />
        </section>

        {/* What it is not — an editorial collage */}
        <section>
          <IsNotCollage
            label="Personal Brand Architecture™"
            title="What it is not"
            items={pbaIsNot}
            images={["/images/client-lone-executive-skyline.webp", "/images/about-dubai-terrace.webp", "/images/contact-corridor-warm.webp"]}
          />
        </section>

        {/* Pain → Solution → Impact — each client voice, answered, on an offset grid of tiles */}
        <RefSection>
          <StaggerCards
            compact
            head={
              <RefIntro
                label="Pain → Solution → Impact"
                title="Client pain. Level141 intervention"
                action={{ label: "Start Your Personal Brand Assessment", href: assessmentHref }}
              />
            }
            items={pbaVoices.map((v) => ({ name: `“${v.quote}”`, line: v.answer, body: `${v.effect} ${v.impact}` }))}
          />
        </RefSection>

        {/* Modules — on a 3D ring that turns with the scroll */}
        <section>
          <Ring3D
            dark={false}
            label="Personal Brand Architecture™"
            title="Product Architecture & Modules"
            text="Level141's role is architecture, strategic direction, governance and measurement. Where execution partners, internal teams or specialist vendors are required, the architecture should define the brief, standards, dependencies, review mechanism and success criteria. The product should not collapse into undifferentiated execution."
            items={pbaModules.map((m, i) => ({ name: m.name, body: m.purpose, image: moduleImages[i % moduleImages.length] }))}
          />
        </section>

        {/* Principles — a ledger */}
        <section className="bg-paper text-ink">
          <Ledger
            label="Guiding principles"
            title={
              <>
                Truth before theatre. Authority before vanity
              </>
            }
            items={pbaPrinciples.map((p) => ({ name: p.name, body: p.body }))}
          />
        </section>

        {/* Measurement — scorecard tiles that turn over */}
        <section>
          <MetricsMosaic
            label="Measurement & Success System"
            title="Visibility metrics are useful signals, but they are not the product outcome"
            text="Success should be measured through a balanced scorecard."
            items={pbaMeasures}
            images={measureImages}
          />
        </section>

        {/* Reporting rhythm */}
        <section>
          <CadenceGrid label="Measurement & Success System" title="Recommended Reporting Rhythm" items={rhythm} />
        </section>

        {/* Before / after */}
        <section>
          <CompareSlider
            dark
            before="Valuable but fragmented expertise, inconsistent positioning, disconnected visibility and unpredictable opportunity."
            after="A clearly positioned leader with an evidence-backed narrative, coherent presence, recognizable intellectual territory, trusted impact, deliberate opportunity pathways and a roadmap for continuous evolution."
          />
        </section>

        {/* The promise */}
        <section>
          <SpotlightText
            text="Level141 does not manufacture a personal brand. It architects the conditions through which a person's real leadership, expertise and impact can be understood, trusted and"
            accent="translated into the next level of opportunity"
            sub={<p>The Level141 promise</p>}
          />
        </section>
      </Layers>

      <CtaBand
        eyebrow="Discover your VIBE™. Architect your next level"
        title={
          <>
            Don&apos;t just become more visible.{" "}
            <span className="serif-accent text-gold">Become more valuable, influential and impactful</span>
          </>
        }
        body={
          <p>
            Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived experience
            into a structured personal growth asset.
          </p>
        }
        primary={{ label: "Start Your Personal Brand Assessment", href: assessmentHref }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
