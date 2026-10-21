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
import { Layers } from "@/components/sections/HomeInteractive";
import { ButtonLink } from "@/components/ui/primitives";
import { principles } from "@/lib/content";
import { altFor } from "@/lib/image-alts";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Level141 is a Growth Architecture company — part of the 1XL ecosystem, headquartered in Dubai. Our purpose: architect the next level of growth for people, businesses and ideas.",
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
                <p className="text-white">We call it: Growth Architecture</p>
              </>
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
              { lead: "For people" },
              { lead: "For businesses" },
              { lead: "For ideas", rest: "with the potential to become significantly bigger than they are today" },
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
                image: "/images/pba-leader-skyline.webp",
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

        {/* Ecosystem — full-bleed Dubai photograph */}
        <section>
          <ParallaxStrips
            image="/images/about-dubai-terrace.webp"
            alt={altFor("/images/about-dubai-terrace.webp")}
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
