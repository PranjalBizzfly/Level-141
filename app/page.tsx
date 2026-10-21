import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { LetterItems } from "@/components/sections/LetterItems";
import { StackCards } from "@/components/sections/Layouts";
import { BeliefDeck, Layer, Layers } from "@/components/sections/HomeInteractive";
import { InsightGallery, Relay, WhySplit } from "@/components/sections/HomeEditorial";
import { BigList } from "@/components/sections/LayoutsClient";
import { LogoWindow } from "@/components/sections/LogoWindow";
import { RefIntro, RefSection, RefStatement } from "@/components/sections/Ref";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ScrubText } from "@/components/motion/ScrubText";
import {
  activityList,
  brandsLevers,
  beliefPairs,
  growthChain,
  insightCategories,
  levelProcess,
  lqOutputs,
  peakStages,
  whatWeDo,
  whyLevel141,
} from "@/lib/content";
import { altFor } from "@/lib/image-alts";
import { pageMetadata } from "@/lib/seo";
import { routes, site } from "@/lib/site";

export const metadata = {
  ...pageMetadata({
    title: "Growth Architecture for People & Organizations",
    description: site.description,
    path: "/",
  }),
  title: { absolute: "Level141 — Growth Architecture for People & Organizations" },
};

const frameworks = [
  {
    id: "lq",
    name: "LQ™",
    full: "Level Quotient",
    list: lqOutputs.slice(0, 4).map((o) => o.replace(/\.$/, "")),
  },
  {
    id: "igf",
    name: "IGF™",
    full: "Integrated Growth Framework",
    list: ["Connect the growth engine", "Growth rarely comes from one function", "Creates alignment between interconnected drivers"],
  },
  {
    id: "brands",
    name: "BRANDS™",
    full: "Six dimensions of growth",
    list: brandsLevers.map((l) => l.name),
  },
  {
    id: "peak",
    name: "PEAK™",
    full: "From presence to momentum",
    list: peakStages.map((p) => p.name),
  },
];

/** Decorative photographs (black and white) for the reasons and the insight categories, in order. */
const whyImages = [
  "/images/home-fragmented-to-integrated-muted.webp",
  "/images/about-atrium-levels-muted.webp",
  "/images/how-strategy-table-muted.webp",
  "/images/client-mentorship-conversation.webp",
  "/images/client-visionaries-horizon.webp",
  "/images/client-executive-library.webp",
];
const insightImages = [
  "/images/ga-hero-structural-node-muted.webp",
  "/images/client-keynote-auditorium.webp",
  "/images/client-executive-portrait-woman.webp",
  "/images/client-executive-study-woman.webp",
  "/images/client-mentorship.webp",
  "/images/client-keynote-monochrome.webp",
];

/**
 * Home, rebuilt on the reference structure: hero → statement → lists of
 * rows (programs) → framework index → statement → rows → final CTA.
 * All wording comes from the Website Structure document.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* MACBA logo window */}
      <LogoWindow caption="Level141 — Growth by Design" />

      {/* Growth doesn't need more noise */}
      {/* Waits behind the black intro and is uncovered as it slides away (motion.css "stack-under"). */}
      <div className="stack-under">
        <div className="stack-under__inner">
        <RefSection id="architecture">
            <RefStatement
              sub={
                <>
                  <p>
                    Most businesses don&apos;t have a shortage of activity. They have{" "}
                    {activityList.map((a) => a.replace(".", "")).join(", ")}. Yet growth can still feel fragmented.
                  </p>
                  <p className="mt-4 text-ink">Level141 connects the pieces</p>
                </>
              }
            >
              Growth doesn&apos;t need more noise. <span className="serif-accent">It needs architecture</span>
            </RefStatement>
        </RefSection>
        </div>
        <div aria-hidden className="stack-under__spacer" />
      </div>

      {/* From here the sections stack as sheets, each arriving its own way (home-layers.css). */}
      <Layers>
        {/* Two ambitions. Two architectures — as a programs list, then the media frame */}
        <Layer pattern="tilt">
          <RefSection id="two-architectures">
            <RefIntro
              label="Two ambitions. Two architectures"
              title="Growth begins either with the person or the organization. Level141 has built dedicated architectures for both"
              action={{ label: site.primaryCta.label, href: routes.contact }}
            />
            <BigList
              items={[
                {
                  key: "pba",
                  name: "Personal Brand Architecture™",
                  line: "Your achievements built your reputation. What will build your next level?",
                  href: routes.personalBrand,
                },
                {
                  key: "ga",
                  name: "Growth Architecture™",
                  line: "Your business doesn't need more disconnected growth initiatives. It needs them working together",
                  href: routes.growth,
                },
              ]}
            />
            <div className="mt-16 sm:mt-24" data-rise>
              <MediaSlot
                src="/images/home-team-table-muted.webp"
                alt={altFor("/images/home-team-table-muted.webp")}
                label="Film or image — growth as one architecture"
                className="aspect-[16/10] sm:aspect-[16/7]"
              />
            </div>
          </RefSection>
        </Layer>

        {/* The Level141 difference — the chain as a relay, one word handing over to the next */}
        <Layer pattern="curtain">
          <section className="bg-black text-white">
            <Relay
              label="The Level141 difference"
              title={
                <>
                  Most businesses manage growth in departments. <span className="text-white/50">We see one architecture</span>
                </>
              }
              chain={growthChain}
              last={{ lead: "Leadership", rest: "influences all of them" }}
              foot={
                <p>
                  Treat them separately and gaps appear. Architect them together and growth begins to compound. That&apos;s the
                  thinking behind Level141.
                </p>
              }
            />
          </section>
        </Layer>

        {/* The Level141 Growth System — Mucho "Explore our services" letter columns. */}
        <Layer pattern="depth">
          <RefSection>
            <RefIntro
              id="system-title"
              label="The Level141 Growth System"
              title={
                <>
                  Growth. <span className="serif-accent">Architected</span>
                </>
              }
              text="Our work is powered by proprietary frameworks designed to understand where growth stands, identify what is holding it back and architect the next level."
            />
            <LetterItems
              markClass="!text-[clamp(3rem,3.9vw,3.6rem)]"
              items={frameworks.map((f) => ({
                key: f.id,
                title: f.full,
                mark: f.name,
                list: f.list,
                href: `${routes.how}#${f.id}`,
              }))}
            />
          </RefSection>
        </Layer>

        {/* How Level141 works — process as stacked cards */}
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

        {/* What we actually sell */}
        <Layer pattern="doors">
          <RefSection tone="ink">
            <div className="flex min-h-[70svh] items-center justify-center">
              <RefStatement
                reveal="mask"
                sub={
                  <>
                    <p>Level141 sits between strategy and execution. {whatWeDo.join(" ")}</p>
                    <p className="mt-4 text-paper">Making sure everything is moving toward the same growth outcome.</p>
                  </>
                }
              >
                Not marketing. Not consulting. Not another strategy deck.{" "}
                <span className="serif-accent">Growth Architecture</span>
              </RefStatement>
            </div>
          </RefSection>
        </Layer>

        {/* Why Level141? — slides up over the held dark statement, as in the reference recording */}
        <Layer pattern="slide">
          <section className="bg-paper text-ink">
            <WhySplit
              label="Why Level141?"
              title="Growth Architecture, not fragmented consulting"
              items={whyLevel141.map((w, i) => ({ name: w.title, body: w.body, image: whyImages[i % whyImages.length] }))}
            />
          </section>
        </Layer>

        {/* The Level141 belief — the statements turn over into place */}
        <Layer pattern="turn">
          <section className="on-dark bg-ink text-paper">
            <BeliefDeck
              head={
                <h2 className="display max-w-[22ch] text-[clamp(1.75rem,3.6vw,3.5rem)]">
                  <ScrubText text="Growth isn't a collection of activities" accent="It's a system" />
                </h2>
              }
              items={beliefPairs}
              foot={<p className="text-paper-muted">Growth happens when the pieces work together. That&apos;s what we architect.</p>}
            />
          </section>
        </Layer>

        {/* Insights */}
        <Layer pattern="zoom">
          <section className="bg-paper text-ink">
            <InsightGallery
              head={
                <RefIntro
                  label="Insights"
                  title="The Next Level — ideas for people and organizations that refuse to remain where they are"
                  action={{ label: "Explore Insights", href: routes.insights }}
                />
              }
              items={insightCategories.map((c, i) => ({
                name: c.name,
                body: c.body,
                href: `${routes.insights}#${c.slug}`,
                image: insightImages[i % insightImages.length],
              }))}
            />
          </section>
        </Layer>
      </Layers>

      <CtaBand
        eyebrow="Find your level"
        title={
          <>
            You&apos;ve reached this level. <span className="serif-accent text-gold">What&apos;s your next?</span>
          </>
        }
        body={
          <p>
            Whether you&apos;re building your personal authority or preparing an organization for its next stage of
            growth, the first step isn&apos;t another campaign. It&apos;s understanding your current level.
          </p>
        }
        closingLine="Find Your Level"
        primary={{ label: "Start Your Level141 Assessment", href: routes.contact }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
