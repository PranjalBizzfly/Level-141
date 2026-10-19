import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { LetterItems } from "@/components/sections/LetterItems";
import { LogoWindow } from "@/components/sections/LogoWindow";
import { RefIntro, RefRows, RefSection, RefStatement } from "@/components/sections/Ref";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Reveal } from "@/components/ui/primitives";
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
      <RefSection id="architecture">
        <RefStatement
          sub={
            <>
              <p>
                Most businesses don&apos;t have a shortage of activity. They have{" "}
                {activityList.map((a) => a.replace(".", "")).join(", ")}. Yet growth can still feel fragmented.
              </p>
              <p className="mt-4 text-ink">Level141 connects the pieces.</p>
            </>
          }
        >
          Growth doesn&apos;t need more noise. <span className="serif-accent">It needs architecture</span>
        </RefStatement>
      </RefSection>

      {/* Two ambitions. Two architectures — as a programs list */}
      <RefSection id="two-architectures">
        <RefIntro
          label="Two ambitions. Two architectures"
          title="Growth begins either with the person or the organization. Level141 has built dedicated architectures for both"
          action={{ label: site.primaryCta.label, href: routes.contact }}
        />
        <RefRows
          rows={[
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
      </RefSection>

      {/* Media frame between sections, as on both references */}
      <div className="container-x">
        <div data-rise>
          <MediaSlot
            src="/images/home-team-table-muted.webp"
            alt="A team around one table working on a shared plan"
            label="Film or image — growth as one architecture"
            className="aspect-[16/10] sm:aspect-[16/7]"
          />
        </div>
      </div>

      {/* The Level141 difference — the chain as rows */}
      <RefSection>
        <RefIntro
          label="The Level141 difference"
          title={
            <>
              Most businesses manage growth in departments. <span className="serif-accent">We see one architecture</span>
            </>
          }
        />
        <RefRows
          rows={[
            ...growthChain.map((c) => ({ key: c.from, name: c.from, line: `affects ${c.to}` })),
            { key: "leadership", name: "Leadership", line: "influences all of them" },
          ]}
        />
        <Reveal className="mt-10 max-w-xl text-muted">
          <p>
            Treat them separately and gaps appear. Architect them together and growth begins to compound. That&apos;s the
            thinking behind Level141.
          </p>
        </Reveal>
      </RefSection>

      {/* The Level141 Growth System — Mucho "Explore our services" letter columns. */}
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



      {/* How Level141 works — process as rows */}
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
        <RefRows
          rows={levelProcess.map((s) => ({
            key: s.n,
            name: `${s.n} — ${s.name}`,
            line: s.line,
            href: `${routes.how}#process`,
          }))}
        />
      </RefSection>

      {/* What we actually sell */}
      <RefSection tone="ink">
        <RefStatement
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
      </RefSection>

      {/* Why Level141? */}
      <RefSection>
        <RefIntro label="Why Level141?" title="Growth Architecture, not fragmented consulting" />
        <RefRows rows={whyLevel141.map((w) => ({ key: w.title, name: w.title, line: w.body }))} />
      </RefSection>

      {/* The Level141 belief */}
      <RefSection tone="ink">
        <Reveal variant="fade" className="flex min-h-[50svh] items-center justify-center text-center">
          <h2 className="display max-w-[20ch] text-[clamp(2rem,4vw,3.75rem)]">
            <ScrubText text="Growth isn't a collection of activities" accent="It's a system" />
          </h2>
        </Reveal>
        <RefRows rows={beliefPairs.map((b) => ({ key: b, name: b, line: "" }))} />
        <Reveal className="mt-10 text-paper-muted">
          <p>Growth happens when the pieces work together. That&apos;s what we architect.</p>
        </Reveal>
      </RefSection>

      {/* Insights */}
      <RefSection>
        <RefIntro
          label="Insights"
          title="The Next Level — ideas for people and organizations that refuse to remain where they are"
          action={{ label: "Explore Insights", href: routes.insights }}
        />
        <RefRows
          rows={insightCategories.map((c) => ({
            key: c.slug,
            name: c.name,
            line: c.body,
            href: `${routes.insights}#${c.slug}`,
          }))}
        />
      </RefSection>

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
