import { PeakAscent } from "@/components/diagrams/Diagrams";
import { IgfConnect, LqLevels } from "@/components/diagrams/FrameworkVisuals";
import { FrameworkNav } from "@/components/sections/FrameworkNav";
import { CtaBand } from "@/components/sections/CtaBand";
import { RefIntro, RefSection, RefStatement } from "@/components/sections/Ref";
import { Timeline } from "@/components/sections/Layouts";
import {
  ExpandRows,
  NecessaryList,
  Orbit,
  PortalHero,
  VerticalTabs,
} from "@/components/sections/pages/HowParts";
import { BrandsSpell, OrbStatement, QuestionFocus } from "@/components/sections/pages/HowScenes";
import { Reveal } from "@/components/ui/primitives";
import {
  brandsLevers,
  levelProcess,
  lqOutputs,
  mayBeNecessary,
  startingQuestions,
  transformationFrame,
  whatWeDo,
  whyLevel141,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";
import { Mosaic } from "@/components/sections/Premium";
import { Layers } from "@/components/sections/HomeInteractive";

export const metadata = pageMetadata({
  title: "How We Architect Growth",
  description:
    "We don't start with deliverables. We start with the level you're trying to reach.",
  path: routes.how,
});

const jump = [
  ["The starting point", "#starting-point"],
  ["Process", "#process"],
  ["LQ™", "#lq"],
  ["IGF™", "#igf"],
  ["BRANDS™", "#brands"],
  ["PEAK™", "#peak"],
  ["Why Level141", "#why"],
] as const;

/** How We Architect Growth — editorial redesign; each section plays its own arrival. */
const questionImages = [
  "/images/client-executive-contemplation.webp",
  "/images/client-lone-executive-skyline.webp",
  "/images/home-fragmented-to-integrated-muted.webp",
  "/images/ga-prioritised-bridge-muted.webp",
  "/images/home-hero-staircase-muted.webp",
];

export default function HowPage() {
  return (
    <>
      <PortalHero
        image="/images/how-strategy-table-muted.webp"
        eyebrow="How we architect growth"
        title={
          <>
            We don&apos;t start with deliverables.{" "}
            <span className="serif-accent">We start with the level you&apos;re trying to reach</span>
          </>
        }
        intro={<p>Level141 sits between strategy and execution. The starting point is the growth problem.</p>}
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-2">
          {jump.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-12 items-center rounded-full border border-white/35 px-5 text-[0.95rem] text-white/85 hover:border-white hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </PortalHero>

      <Layers page="how">
        {/* The starting point — what may be necessary, a quiet register */}
        <RefSection id="starting-point" tone="ink">
          <RefIntro
            label="The starting point"
            title={
              <>
                But none of those should be <span className="serif-accent">the starting point</span>
              </>
            }
          />
          <NecessaryList items={mayBeNecessary} />
        </RefSection>

        {/* The growth problem — question cards fanning out like a hand */}
        <section>
          <QuestionFocus
            label="The starting point is the growth problem"
            title="Level141 first identifies:"
            text="Only then do we architect the solution."
            items={startingQuestions.map((q, i) => ({ name: q, image: questionImages[i % questionImages.length] }))}
          />
        </section>

        {/* Process — an orbit, the active stage at the top */}
        <section id="process">
          <Orbit
            label="How Level141 works"
            title="How Level141 works"
            stages={levelProcess}
          />
        </section>

        {/* Growth system — framework index as expanding rows */}
        <section>
          <ExpandRows
            label="The Level141 Growth System"
            title={
              <>
                Growth. <span className="serif-accent">Architected</span>
              </>
            }
            text="Our work is powered by proprietary frameworks designed to understand where growth stands, identify what is holding it back and architect the next level."
            items={[
              { name: "LQ™", body: "Level Quotient — First, know your level", href: "#lq" },
              { name: "IGF™", body: "Integrated Growth Framework — Connect the growth engine", href: "#igf" },
              { name: "BRANDS™", body: "Six dimensions of growth", href: "#brands" },
              { name: "PEAK™", body: "From presence to momentum", href: "#peak" },
            ]}
          />
        </section>

        <div className="relative">
          <FrameworkNav />

          {/* LQ */}
          <RefSection id="lq">
            <RefIntro
              label="LQ™ — Level Quotient"
              title={
                <>
                  First, <span className="serif-accent">know your level</span>
                </>
              }
              text={
                <>
                  <p>
                    Before recommending what should change, we establish where you currently stand. LQ™ provides a
                    structured assessment of the factors influencing your current growth position.
                  </p>
                  <p className="mt-3 text-ink">
                    Because you cannot architect the next level without understanding the current one.
                  </p>
                </>
              }
            />
            <LqLevels />
            <div className="mt-24">
              <RefIntro label="LQ™ Growth Audit" title="LQ™ outputs" />
              <Mosaic kicker="LQ™ output" items={lqOutputs} />
            </div>
          </RefSection>

          {/* IGF */}
          <RefSection id="igf" tone="ink">
            <RefStatement
              sub={
                <>
                  <p>
                    IGF™ looks across the interconnected drivers influencing organizational growth and creates alignment
                    between them.
                  </p>
                  <p className="mt-4 text-paper">
                    Instead of optimizing individual activities, we architect how the entire growth ecosystem works
                    together.
                  </p>
                </>
              }
            >
              IGF™ — Connect the growth engine.{" "}
              <span className="serif-accent">Growth rarely comes from one function</span>
            </RefStatement>
            <IgfConnect />
          </RefSection>

          {/* BRANDS */}
          <div id="brands">
            <BrandsSpell
              head={
                <RefIntro
                  label="BRANDS™"
                  title={
                    <>
                      Six dimensions <span className="serif-accent">of growth</span>
                    </>
                  }
                />
              }
              items={brandsLevers.map((l) => ({ letter: l.letter, name: l.name, line: l.line, role: l.role, list: splitList(l.components) }))}
            />
          </div>

          {/* PEAK */}
          <RefSection id="peak">
            <RefIntro
              label="PEAK™"
              title={
                <>
                  From presence <span className="serif-accent">to momentum</span>
                </>
              }
              text="PEAK™ helps us understand how a person or organization progresses from simply being visible to building genuine market authority and ultimately creating sustained growth momentum."
            />
            <div className="mt-14 sm:mt-16">
              <PeakAscent dark={false} />
            </div>
          </RefSection>
        </div>

        {/* What we actually sell — the statement revealed by a growing light */}
        <section>
          <OrbStatement
            text="Not marketing. Not consulting. Not another strategy deck."
            accent="Growth Architecture"
            sub={
              <>
                <p>
                  Level141 sits between strategy and execution. {whatWeDo.join(" ")} Execution may involve internal teams,
                  specialist partners, agencies or existing vendors. Our responsibility is bigger:
                </p>
                <p className="text-white">Making sure everything is moving toward the same growth outcome.</p>
              </>
            }
          />
        </section>

        {/* Why Level141 — vertical tabs */}
        <section id="why" className="bg-paper text-ink">
          <VerticalTabs
            label="Why Level141?"
            title={
              <>
Growth Architecture, not fragmented consulting</>
            }
            items={whyLevel141.map((w) => ({ name: w.title, body: w.body }))}
          />
        </section>

        {/* Results frame — a timeline from challenge to impact */}
        <RefSection tone="ink">
          <RefIntro
            label="Results"
            title={
              <>
                Don&apos;t show what you did. <span className="serif-accent">Show what changed</span>
              </>
            }
          />
          <Timeline items={transformationFrame.map((t) => ({
              name: t.label,
              body: <span className="block text-[1.0625rem] leading-relaxed text-paper/85 sm:text-lg">{t.question}</span>,
            }))} />
          <Reveal className="mt-10 flex flex-wrap gap-3">
            <RefIntroLink href={routes.personalBrand}>Personal Brand Architecture™</RefIntroLink>
            <RefIntroLink href={routes.growth}>Growth Architecture™</RefIntroLink>
          </Reveal>
        </RefSection>
      </Layers>

      <CtaBand
        eyebrow="Find your level"
        title={
          <>
            The first step isn&apos;t another campaign.{" "}
            <span className="serif-accent text-gold">It&apos;s understanding your current level</span>
          </>
        }
        primary={{ label: "Start Your Level141 Assessment", href: routes.contact }}
        secondary={{ label: "About Level141", href: routes.about }}
      />
    </>
  );
}

function RefIntroLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center rounded-full border border-line-dark-strong px-5 text-[0.95rem] font-medium text-paper/85 hover:text-paper"
    >
      {children}
    </a>
  );
}

/** "Purpose, proposition and brand consistency." -> ["Purpose", "Proposition", "Brand consistency"] */
function splitList(s: string) {
  return s
    .replace(/.$/, "")
    .split(/, | and /)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1));
}
