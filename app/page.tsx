import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeIntro } from "@/components/motion/HomeIntro";
import {
  ButtonLink,
  Eyebrow,
  Reveal,
  Section,
  SectionHeader,
  SplitFeature,
} from "@/components/ui/primitives";
import {
  activityList,
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

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <HomeHero />

      {/* ---------------------------------------------------- Noise vs architecture */}
      <Section id="architecture" tone="paper" labelledBy="noise-title">
        <Reveal className="container-x mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center text-gold-ink">Growth doesn&apos;t need more noise</Eyebrow>
          <h2 id="noise-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
            It needs <span className="serif-accent">architecture</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-[1.85] text-muted">
            Most businesses don&apos;t have a shortage of activity. Yet growth can still feel fragmented.
          </p>
          <p className="mx-auto mt-10 max-w-2xl text-sm leading-[1.85] text-muted">
            {activityList.map((x) => x.replace(".", "")).join(" · ")}
          </p>
          <p className="mt-10 text-2xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">Level141 connects the pieces.</p>
        </Reveal>
      </Section>

      {/* ---------------------------------------------------------- Two architectures */}
      <Section id="two-architectures" tone="paper" className="!pt-0" labelledBy="two-title">
        <div className="container-x">
          <SectionHeader
            id="two-title"
            index="02"
            eyebrow="Two ambitions. Two architectures."
            title={
              <>
                Growth begins either with the <span className="serif-accent">person</span> or the{" "}
                <span className="serif-accent">organization</span>
              </>
            }
            intro="Level141 has built dedicated architectures for both."
          />

        </div>
      </Section>

      {/* ---------------------------------------------------------- The two products */}
      <SplitFeature src="/images/client-speaker-conference-stage.webp" labelledBy="pba-title">
        <Reveal>
          <p className="eyebrow text-muted">Now available</p>
          <h3 id="pba-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">Personal Brand Architecture™</h3>
          <p className="mt-6 text-base leading-[1.85] text-muted sm:text-lg">
            Your achievements built your reputation. What will build your next level?
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <ButtonLink href={routes.lq} variant="gold">
              Start Your Personal Brand Assessment
            </ButtonLink>
            <ButtonLink href={routes.personalBrand} variant="link">
              Discover Your VIBE™
            </ButtonLink>
          </div>
        </Reveal>
      </SplitFeature>

      <SplitFeature reverse src="/images/client-executive-dubai-window.webp" labelledBy="ga-title">
        <Reveal>
          <p className="eyebrow text-muted">Coming later · Waitlist open</p>
          <h3 id="ga-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">Growth Architecture™</h3>
          <p className="mt-6 text-base leading-[1.85] text-muted sm:text-lg">
            Your business doesn&apos;t need more disconnected growth initiatives. It needs them working together.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
            <ButtonLink href={routes.waitlist} variant="gold">
              Join the Waitlist
            </ButtonLink>
            <ButtonLink href={routes.growth} variant="link">
              Explore Growth Architecture
            </ButtonLink>
          </div>
        </Reveal>
      </SplitFeature>

      {/* ---------------------------------------------------------- About teaser */}
      <SplitFeature src="/images/client-walk-toward-skyline.webp" labelledBy="why141-title">
        <Reveal>
          <p className="eyebrow text-muted">About Level141</p>
          <h2 id="why141-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
            Why <span className="serif-accent">141?</span>
          </h2>
          <p className="mt-6 text-base leading-[1.85] text-muted sm:text-lg">
            Because growth is never really about reaching a final destination. Every level changes what becomes
            possible next.
          </p>
          <div className="mt-10">
            <ButtonLink href={routes.about} variant="link" className="!px-0">
              About Level141
            </ButtonLink>
          </div>
        </Reveal>
      </SplitFeature>

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
        closingLine="Find Your Level."
        primary={{ label: "Start Your Level141 Assessment", href: routes.lq }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
