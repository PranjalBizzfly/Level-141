import { PeakAscent } from "@/components/diagrams/Diagrams";
import { IgfConnect, LqLevels } from "@/components/diagrams/FrameworkVisuals";
import { LetterItems } from "@/components/sections/LetterItems";
import { FrameworkNav } from "@/components/sections/FrameworkNav";
import { CtaBand } from "@/components/sections/CtaBand";
import { RefIntro, RefRows, RefSection, RefStatement } from "@/components/sections/Ref";
import { PageHero, Reveal } from "@/components/ui/primitives";
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

export const metadata = pageMetadata({
  title: "How We Architect Growth",
  description:
    "Assess, Architect, Activate, Govern, Level Up — the Level141 approach, powered by the proprietary LQ™, IGF™, BRANDS™ and PEAK™ frameworks.",
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

/** How We Architect Growth — rebuilt on the reference structure. */
export default function HowPage() {
  return (
    <>
      <PageHero
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
        <nav aria-label="On this page" className="flex flex-wrap justify-center gap-2">
          {jump.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-10 items-center rounded-full border border-line-dark-strong px-4 text-sm text-paper/85"
            >
              {label}
            </a>
          ))}
        </nav>
      </PageHero>

      {/* The starting point */}
      <RefSection id="starting-point">
        <RefIntro
          label="The starting point"
          title={
            <>
              But none of those should be <span className="serif-accent">the starting point</span>
            </>
          }
        />
        <RefRows columns={3} rows={mayBeNecessary.map((m) => ({ key: m, name: `${m} may be necessary.`, line: "" }))} />
        <div className="mt-24">
          <RefIntro
            label="The starting point is the growth problem"
            title="Level141 first identifies:"
            text="Only then do we architect the solution."
          />
          <RefRows
            rows={startingQuestions.map((q, i) => ({ key: q, name: String(i + 1).padStart(2, "0"), line: q }))}
          />
        </div>
      </RefSection>

      {/* Process */}
      <RefSection id="process">
        <RefIntro
          label="How Level141 works"
          title={
            <>
              Assess. Architect. Activate. Govern. <span className="serif-accent">Level up</span>
            </>
          }
          text="Growth isn't a destination. Every new level creates another possibility."
        />
        <RefRows
          rows={levelProcess.map((s) => ({
            key: s.n,
            name: `${s.n} — ${s.name}`,
            line: (
              <>
                <span className="text-ink">{s.line}</span> {s.body}
              </>
            ),
            extra: <span className="font-medium">{s.question}</span>,
          }))}
        />
      </RefSection>

      {/* Growth system — framework index */}
      <RefSection tone="ink">
        <RefIntro
          label="The Level141 Growth System"
          title={
            <>
              Growth. <span className="serif-accent">Architected</span>
            </>
          }
          text="Our work is powered by proprietary frameworks designed to understand where growth stands, identify what is holding it back and architect the next level."
        />
        <RefRows
          rows={[
            { key: "lq", name: "LQ™", line: "Level Quotient — First, know your level", href: "#lq" },
            { key: "igf", name: "IGF™", line: "Integrated Growth Framework — Connect the growth engine", href: "#igf" },
            { key: "brands", name: "BRANDS™", line: "Six dimensions of growth", href: "#brands" },
            { key: "peak", name: "PEAK™", line: "From presence to momentum", href: "#peak" },
          ]}
        />
      </RefSection>

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
                <p className="mt-3 text-sm">
                  For people, LQ™ is assessed across the four VIBE™ dimensions. For organizations, the LQ™ Growth Audit
                  examines the domains below.
                </p>
              </>
            }
          />
          <LqLevels />
          <div className="mt-24">
            <RefIntro label="LQ™ Growth Audit" title="LQ™ outputs" />
            <RefRows columns={2} rows={lqOutputs.map((o) => ({ key: o, name: o, line: "" }))} />
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
        <RefSection id="brands">
          <RefIntro
            label="BRANDS™"
            title={
              <>
                Six dimensions <span className="serif-accent">of growth</span>
              </>
            }
            text="Branding builds the foundation. Conversion Readiness prepares attention to become opportunity. Awareness, Nurture, Discover & Trust and Scale complete a system that is architected together — never as separate campaigns."
          />
          <LetterItems
            markClass="!text-[clamp(4rem,7vw,6.5rem)]"
            items={brandsLevers.map((l) => ({
              key: l.letter,
              title: l.name,
              mark: l.letter,
              list: splitList(l.components),
            }))}
          />
        </RefSection>

        {/* PEAK */}
        <RefSection id="peak" tone="ink">
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
            <PeakAscent />
          </div>
        </RefSection>
      </div>

      {/* What we actually sell */}
      <RefSection>
        <RefStatement
          sub={
            <>
              <p>
                Level141 sits between strategy and execution. {whatWeDo.join(" ")} Execution may involve internal teams,
                specialist partners, agencies or existing vendors. Our responsibility is bigger:
              </p>
              <p className="mt-4 text-ink">Making sure everything is moving toward the same growth outcome.</p>
            </>
          }
        >
          Not marketing. Not consulting. Not another strategy deck. <span className="serif-accent">Growth Architecture</span>
        </RefStatement>
      </RefSection>

      {/* Why Level141 */}
      <RefSection id="why" tone="ink">
        <RefIntro
          label="Why Level141?"
          title={
            <>
              Growth Architecture, <span className="serif-accent">not fragmented consulting</span>
            </>
          }
        />
        <RefRows rows={whyLevel141.map((w) => ({ key: w.title, name: w.title, line: w.body }))} />
      </RefSection>

      {/* Results frame */}
      <RefSection>
        <RefIntro
          label="Results"
          title={
            <>
              Don&apos;t show what you did. <span className="serif-accent">Show what changed</span>
            </>
          }
        />
        <RefRows
          rows={transformationFrame.map((t, i) => ({
            key: t.label,
            name: `${String(i + 1).padStart(2, "0")} — ${t.label}`,
            line: t.question,
          }))}
        />
        <Reveal className="mt-10 flex flex-wrap gap-3">
          <RefIntroLink href={routes.personalBrand}>Personal Brand Architecture™</RefIntroLink>
          <RefIntroLink href={routes.growth}>Growth Architecture™</RefIntroLink>
        </Reveal>
      </RefSection>

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
    <a href={href} className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-5 text-sm font-medium">
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
