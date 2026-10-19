import { LogoAssembly } from "@/components/sections/LogoAssembly";
import { CtaBand } from "@/components/sections/CtaBand";
import { RefIntro, RefRows, RefSection, RefStatement } from "@/components/sections/Ref";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { PageHero, Reveal } from "@/components/ui/primitives";
import { principles } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Level141 is a Growth Architecture company — part of the 1XL ecosystem, headquartered in Dubai. Our purpose: architect the next level of growth for people, businesses and ideas.",
  path: routes.about,
});

/** About — rebuilt on the reference structure, opening with the logo assembly. */
export default function AboutPage() {
  return (
    <>
      <PageHero
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
      />

      {/* The wordmark assembles letter by letter (MACBA-style). */}
      <LogoAssembly />

      {/* A simple belief */}
      <RefSection>
        <RefStatement
          sub={
            <>
              <p>
                Level141 was created around a simple belief: businesses don&apos;t necessarily need more agencies,
                consultants, campaigns or activity.
              </p>
              <p className="mt-4">
                We work with ambitious people and organizations to understand where they are, define where they want to go
                and architect the interconnected systems required to get there.
              </p>
              <p className="mt-4 text-ink">We call it: Growth Architecture</p>
            </>
          }
        >
          Businesses need clarity about what their <span className="serif-accent">next level requires</span>
        </RefStatement>
      </RefSection>

      {/* Our purpose */}
      <RefSection tone="ink">
        <RefIntro
          label="Our purpose"
          title={
            <>
              Architect the next level <span className="serif-accent">of growth</span>
            </>
          }
        />
        <RefRows
          rows={[
            { key: "people", name: "For people", line: "" },
            { key: "businesses", name: "For businesses", line: "" },
            {
              key: "ideas",
              name: "For ideas",
              line: "With the potential to become significantly bigger than they are today",
            },
          ]}
        />
      </RefSection>

      {/* Our principles */}
      <RefSection>
        <RefIntro
          label="About Level141"
          title={
            <>
              Our <span className="serif-accent">principles</span>
            </>
          }
        />
        <RefRows
          rows={principles.map((p, i) => ({
            key: p.name,
            name: `${String(i + 1).padStart(2, "0")} — ${p.name}`,
            line: p.body,
          }))}
        />
      </RefSection>

      {/* Two ambitions */}
      <RefSection>
        <RefIntro
          label="Two ambitions. Two architectures"
          title={
            <>
              Level141 has built dedicated architectures <span className="serif-accent">for both</span>
            </>
          }
          text="Level141 is a Growth Architecture company. It does not treat branding, visibility, authority, lead generation or positioning as isolated activities. It architects the system that connects identity, credibility, influence and opportunity so that growth becomes deliberate, governed and measurable."
        />
        <RefRows
          rows={[
            {
              key: "pba",
              name: "Personal Brand Architecture™",
              line: "Converts genuine expertise, leadership credibility and lived experience into a structured personal growth asset.",
              href: routes.personalBrand,
            },
            {
              key: "ga",
              name: "Growth Architecture™",
              line: "One integrated architecture connecting every critical growth lever to measurable business outcomes.",
              href: routes.growth,
            },
          ]}
        />
      </RefSection>

      {/* Ecosystem */}
      <div className="container-x">
        <div data-rise>
          <MediaSlot
            src="/images/about-dubai-terrace.webp"
            alt="A modern terrace overlooking the Dubai skyline"
            label="Film or image — headquartered in Dubai"
            className="aspect-[4/3] sm:aspect-[16/7]"
          />
        </div>
        <Reveal className="flex flex-col justify-between gap-2 py-8 text-sm text-muted sm:flex-row">
          <p className="text-ink">Part of the 1XL ecosystem, headquartered in Dubai</p>
          <p>Level141 — Growth By Design</p>
        </Reveal>
      </div>

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
