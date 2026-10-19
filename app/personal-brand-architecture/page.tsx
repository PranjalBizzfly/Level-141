import { VibeExplorer } from "@/components/diagrams/VibeExplorer";
import { CtaBand } from "@/components/sections/CtaBand";
import { RefIntro, RefRows, RefSection, RefStatement } from "@/components/sections/Ref";
import { ScrubText } from "@/components/motion/ScrubText";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { ButtonLink, PageHero, Reveal } from "@/components/ui/primitives";
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
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Personal Brand Architecture™",
  description:
    "Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived experience into a structured personal growth asset — architected through the VIBE™ Framework.",
  path: routes.personalBrand,
});

const assessmentHref = `${routes.contact}?interest=personal-brand-architecture`;

const qualification = [
  "Has demonstrable expertise, achievements, leadership experience or a credible body of work.",
  "Has a defined ambition: growth, investment, influence, career transition, market leadership, board/advisory roles or legacy.",
  "Is willing to articulate viewpoints and participate in the architecture process.",
  "Understands that authority requires consistency and cannot be outsourced entirely.",
  "Values strategic reputation and business outcomes more than short-term follower acquisition.",
];

const rhythm = [
  ["Monthly", "Activity, signal and opportunity review."],
  ["Quarterly", "Strategic VIBE™ review and corrective actions."],
  ["Half-yearly", "Reputation, positioning and stakeholder perception review."],
  ["Annually", "Full evolution reset against next-stage ambition."],
] as const;

/**
 * Personal Brand Architecture — rebuilt on the reference structure:
 * centred hero and media, then alternating statements and row lists.
 * Wording from the Website Structure and the Personal Brand Architecture bible.
 */
export default function PersonalBrandPage() {
  return (
    <>
      <PageHero
        image="/images/pba-hero-speaker.webp"
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
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <ButtonLink href={assessmentHref} variant="gold">
            Start Your Personal Brand Assessment
          </ButtonLink>
          <ButtonLink href="#vibe" variant="ghost-light">
            Explore the VIBE™ Framework
          </ButtonLink>
        </div>
      </PageHero>

      {/* Not simply about visibility */}
      <RefSection>
        <RefStatement
          sub={
            <>
              <p>
                Level141 Personal Brand Architecture™ converts genuine expertise, leadership credibility and lived
                experience into a structured personal growth asset. It is designed to help accomplished people become
                clearer, more credible, more influential and more commercially relevant — without manufacturing a
                persona.
              </p>
              <p className="mt-4 text-ink">
                We architect the personal brand behind the leader—so what you know, what you have achieved and what you
                stand for can create the opportunities you are ready for next.
              </p>
            </>
          }
        >
          It&apos;s about aligning who you are, what you stand for, the impact you create and{" "}
          <span className="serif-accent">where you want to go</span>
        </RefStatement>
      </RefSection>

      {/* The Market Problem */}
      <RefSection>
        <RefIntro
          label="The Market Problem"
          title={
            <>
              Many accomplished leaders have <span className="serif-accent">more value than visibility</span>
            </>
          }
          text="Others have visibility without a coherent reputation system. The market therefore sees fragments rather than a clear leadership proposition."
        />
        <RefRows
          rows={pbaPains.map((p) => ({
            key: p.pain,
            name: p.pain,
            line: p.looks,
            extra: <span className="text-ink">{p.cost}</span>,
          }))}
        />
      </RefSection>

      {/* VIBE */}
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
        <div className="mt-14 sm:mt-16">
          <VibeExplorer />
        </div>
        <Reveal className="mx-auto mt-16 max-w-3xl text-center text-xl leading-relaxed text-paper/80 sm:text-2xl">
          <p>
            Visionary Leadership that creates Impact, Impact that enables Business Growth, and Business Growth that fuels
            continuous Evolution
          </p>
        </Reveal>
      </RefSection>

      {/* How we architect your VIBE */}
      <RefSection>
        <RefIntro
          label="Personal Brand Architecture™"
          title={
            <>
              How we architect <span className="serif-accent">your VIBE™</span>
            </>
          }
          action={{ label: "Start Your Personal Brand Assessment", href: assessmentHref }}
        />
        <RefRows rows={vibeStages.map((s) => ({ key: s.n, name: `${s.n} — ${s.name}`, line: s.body }))} />
      </RefSection>

      {/* Media break */}
      <div className="container-x">
        <div data-rise>
          <MediaSlot
            src="/images/pba-leader-skyline.webp"
            alt="A leader standing by floor-to-ceiling windows overlooking a city"
            label="Film or image — the leader behind the architecture"
            className="aspect-[4/3] sm:aspect-[16/7]"
          />
        </div>
      </div>

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
        <RefRows columns={4} rows={pbaAudience.map((a) => ({ key: a, name: a, line: "" }))} />
        <Reveal className="mt-16 max-w-3xl">
          <p className="font-display text-[1.6rem] font-medium leading-[1.2] tracking-[-0.02em] sm:text-[2rem]">
            <ScrubText
              text="Your personal brand shouldn't simply document what you've done."
              accent="It should position you for what you want to do next"
            />
          </p>
        </Reveal>
      </RefSection>

      {/* Qualification + what it is not */}
      <RefSection>
        <RefIntro label="Ideal for" title="Qualification signals" />
        <RefRows rows={qualification.map((q, i) => ({ key: q, name: String(i + 1).padStart(2, "0"), line: q }))} />
        <div className="mt-24">
          <RefIntro label="Personal Brand Architecture™" title="What it is not" />
          <RefRows rows={pbaIsNot.map((n) => ({ key: n, name: n, line: "" }))} />
        </div>
      </RefSection>

      {/* Pain → Solution → Impact */}
      <RefSection tone="ink">
        <RefIntro
          label="Pain → Solution → Impact"
          title={
            <>
              Client pain. <span className="serif-accent">Level141 intervention</span>
            </>
          }
          text="Personal Brand Architecture™ starts by locating the gap between your actual value and the market's current perception of it."
          action={{ label: "Start Your Personal Brand Assessment", href: assessmentHref }}
        />
        <RefRows
          rows={pbaVoices.map((v) => ({
            key: v.quote,
            name: `“${v.quote}”`,
            line: v.answer,
            extra: (
              <span className="text-paper-muted">
                {v.effect} {v.impact}
              </span>
            ),
          }))}
        />
      </RefSection>

      {/* Modules */}
      <RefSection>
        <RefIntro
          label="Personal Brand Architecture™"
          title={
            <>
              Product Architecture <span className="serif-accent">&amp; Modules</span>
            </>
          }
          text="Level141's role is architecture, strategic direction, governance and measurement. Where execution partners, internal teams or specialist vendors are required, the architecture should define the brief, standards, dependencies, review mechanism and success criteria. The product should not collapse into undifferentiated execution."
        />
        <RefRows
          rows={pbaModules.map((m, i) => ({
            key: m.name,
            name: `${String(i + 1).padStart(2, "0")} — ${m.name}`,
            line: m.purpose,
          }))}
        />
      </RefSection>

      {/* Principles */}
      <RefSection>
        <RefIntro
          label="Guiding principles"
          title={
            <>
              Truth before theatre. <span className="serif-accent">Authority before vanity</span>
            </>
          }
        />
        <RefRows rows={pbaPrinciples.map((p) => ({ key: p.name, name: p.name, line: p.body }))} />
      </RefSection>

      {/* Measurement */}
      <RefSection tone="ink">
        <RefIntro
          label="Measurement & Success System"
          title={
            <>
              Visibility metrics are useful signals, <span className="serif-accent">but they are not the product outcome</span>
            </>
          }
          text="Success should be measured through a balanced scorecard."
        />
        <RefRows rows={pbaMeasures.map((m) => ({ key: m.name, name: m.name, line: m.q }))} />
        <div className="mt-24">
          <RefIntro label="Measurement & Success System" title="Recommended Reporting Rhythm" />
          <RefRows rows={rhythm.map(([k, v]) => ({ key: k, name: k, line: v }))} />
        </div>
      </RefSection>

      {/* Before / after + promise */}
      <RefSection>
        <RefRows
          className="!mt-0"
          rows={[
            {
              key: "before",
              name: "Before",
              line: "Valuable but fragmented expertise, inconsistent positioning, disconnected visibility and unpredictable opportunity.",
            },
            {
              key: "after",
              name: "After",
              line: "A clearly positioned leader with an evidence-backed narrative, coherent presence, recognizable intellectual territory, trusted impact, deliberate opportunity pathways and a roadmap for continuous evolution.",
            },
          ]}
        />
        <div className="mt-20">
          <RefStatement sub={<p>The Level141 promise</p>}>
            Level141 does not manufacture a personal brand. It architects the conditions through which a person&apos;s
            real leadership, expertise and impact can be understood, trusted and{" "}
            <span className="serif-accent">translated into the next level of opportunity</span>
          </RefStatement>
        </div>
      </RefSection>

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
            into a structured personal growth asset — architected through the VIBE™ Framework.
          </p>
        }
        primary={{ label: "Start Your Personal Brand Assessment", href: assessmentHref }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
