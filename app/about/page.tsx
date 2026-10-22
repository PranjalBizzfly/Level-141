import { LogoAssembly } from "@/components/sections/LogoAssembly";
import { CtaBand } from "@/components/sections/CtaBand";
import {
  CounterHero,
  ParallaxStrips,
  PrinciplesGrid,
  SplitPanels,
  SplitStatement,
  Triptych,
} from "@/components/sections/pages/AboutParts";
import { BeliefDeck, Layer, Layers } from "@/components/sections/HomeInteractive";
import { WhySplit } from "@/components/sections/HomeEditorial";
import { StackCards } from "@/components/sections/Layouts";
import { RefIntro, RefSection, RefStatement } from "@/components/sections/Ref";
import { ScrubText } from "@/components/motion/ScrubText";
import { ButtonLink } from "@/components/ui/primitives";
import { beliefPairs, levelProcess, principles, whatWeDo, whyLevel141 } from "@/lib/content";

/** Decorative photographs (black and white) for the reasons, in order. */
const whyImages = [
  "/images/home-fragmented-to-integrated-muted.webp",
  "/images/client-lone-executive-skyline.webp",
  "/images/how-strategy-table-muted.webp",
  "/images/client-mentorship-conversation.webp",
  "/images/client-visionaries-horizon.webp",
  "/images/client-executive-library.webp",
];
import { altFor } from "@/lib/image-alts";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Level141 is part of the 1XL ecosystem, headquartered in Dubai.",
  path: routes.about,
});

/** About — editorial redesign: cinematic hero, logo assembly, then one distinct layout per section. */
export default function AboutPage() {
  return (
    <>
      <CounterHero
        image="/images/about-atrium-levels-muted.webp"
        eyebrow="About Level141"
        title={
          <>
            Why <span className="serif-accent">141?</span>
          </>
        }
        intro={
          <p>
            Because growth is never really about reaching a final destination. Every level changes what becomes possible
            next.
          </p>
        }
      >
        <div className="flex flex-col items-start gap-3">
          <ButtonLink href={routes.contact} className="!bg-white !text-black hover:!bg-white/85">
            Start Your Level141 Assessment
          </ButtonLink>
          <ButtonLink href={routes.how} variant="ghost-light" className="!border-white/35 !text-white hover:!border-white">
            How we architect growth
          </ButtonLink>
        </div>
      </CounterHero>

      {/* Sections stack as sheets, each arriving with its own pattern. */}
      <Layers page="about">
        {/* The wordmark assembles letter by letter. */}
        <section>
          <LogoAssembly />
        </section>

        {/* A simple belief — a statement on black */}
        <section>
          <SplitStatement
            left="Businesses need clarity about what their"
            right="next level requires"
            sub={
              <>
                <p>
                  Level141 was created around a simple belief: businesses don&apos;t necessarily need more agencies,
                  consultants, campaigns or activity.
                </p>
                <p>
                  We work with ambitious people and organizations to understand where they are, define where they want to go
                  and architect the interconnected systems required to get there.
                </p>
              </>
            }
            aside={
              <p>
                We call it: <span className="serif-accent">Growth Architecture</span>
              </p>
            }
          />
        </section>

        {/* Our purpose — a relay, one phrase at a time */}
        <section>
          <Triptych
            label="Our purpose"
            title={
              <>
                Architect the next level <span className="serif-accent">of growth</span>
              </>
            }
            items={[
              { lead: "For people", image: "/images/client-executive-portrait-woman.webp" },
              { lead: "For businesses", image: "/images/home-team-table.webp" },
              { lead: "For ideas", rest: "with the potential to become significantly bigger than they are today", image: "/images/client-executive-study-woman.webp" },
            ]}
          />
        </section>

        {/* Our principles — a ledger */}
        <section>
          <PrinciplesGrid
            label="About Level141"
            title={
              <>
                Our <span className="serif-accent">principles</span>
              </>
            }
            items={principles.map((p) => ({ name: p.name, body: p.body }))}
          />
        </section>

        {/* The Level141 belief — the statements turn over into place (moved from home, keeps its pattern) */}
        <Layer pattern="turn">
          <section className="on-dark bg-ink text-paper">
            <BeliefDeck
              head={
                <h2 className="display max-w-[22ch] text-[clamp(1.61rem,2.88vw,2.8rem)]">
                  <ScrubText text="Growth isn't a collection of activities" accent="It's a system" />
                </h2>
              }
              items={beliefPairs}
              foot={<p className="text-paper-muted">Growth happens when the pieces work together. That&apos;s what we architect.</p>}
            />
          </section>
        </Layer>

        {/* Two ambitions — a gliding gallery of the two architectures */}
        <section>
          <SplitPanels
            label="Two ambitions. Two architectures"
            title={
              <>
                Level141 has built dedicated architectures <span className="serif-accent">for both</span>
              </>
            }
            text="Level141 is a Growth Architecture company. It does not treat branding, visibility, authority, lead generation or positioning as isolated activities. It architects the system that connects identity, credibility, influence and opportunity so that growth becomes deliberate, governed and measurable."
            items={[
              {
                name: "Personal Brand Architecture™",
                body: "Converts genuine expertise, leadership credibility and lived experience into a structured personal growth asset.",
                href: routes.personalBrand,
                image: "/images/client-executive-study-portrait.webp",
              },
              {
                name: "Growth Architecture™",
                body: "One integrated architecture connecting every critical growth lever to measurable business outcomes.",
                href: routes.growth,
                image: "/images/ga-prioritised-bridge-muted.webp",
              },
            ]}
          />
        </section>

        {/* What we actually sell (moved from home, keeps its pattern) */}
        <Layer pattern="doors">
          <RefSection tone="ink">
            <div className="flex min-h-[70svh] items-center justify-center">
              <RefStatement
                reveal="mask"
                sub={
                  <>
                    <p>Level141 sits between strategy and execution. {whatWeDo.join(" ")}</p>
                    <p className="mt-6 text-paper">Making sure everything is moving toward the same growth outcome.</p>
                  </>
                }
              >
                Not marketing. Not consulting. Not another strategy deck.{" "}
                <span className="serif-accent">Growth Architecture</span>
              </RefStatement>
            </div>
          </RefSection>
        </Layer>

        {/* How Level141 works — process as stacked cards (moved from home, keeps its pattern) */}
        <Layer pattern="split">
          <RefSection>
            <RefIntro
              label="How Level141 works"
              title={
                <>
                  We don&apos;t start with deliverables. <span className="serif-accent">We start with the level you&apos;re trying to reach</span>
                </>
              }
              action={{ label: "How we architect growth", href: routes.how }}
            />
            <StackCards
              items={levelProcess.map((s) => ({ n: s.n, name: s.name, line: s.line, body: s.body, aside: s.question }))}
            />
          </RefSection>
        </Layer>

        {/* Why Level141? — the reasons on a 3D cube (moved from home, keeps its pattern) */}
        <Layer pattern="slide">
          <section className="bg-paper text-ink">
            <WhySplit
              label="Why Level141?"
              title="Growth Architecture, not fragmented consulting"
              items={whyLevel141.map((w, i) => ({ name: w.title, body: w.body, image: whyImages[i % whyImages.length] }))}
            />
          </section>
        </Layer>

        {/* Ecosystem — full-bleed Dubai photograph */}
        <section>
          <ParallaxStrips
            image="/images/client-executive-city-lounge.webp"
            alt={altFor("/images/client-executive-city-lounge.webp")}
            caption={
              <span className="flex flex-col justify-between gap-2 sm:flex-row">
                <span>Part of the 1XL ecosystem, headquartered in Dubai</span>
                <span>Level141 — Growth By Design</span>
              </span>
            }
          />
        </section>
      </Layers>

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
