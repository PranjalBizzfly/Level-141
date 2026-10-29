import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { LogoSymbol } from "@/components/brand/Logo";
import { Mark141 } from "@/components/brand/Mark141";
import { GrowthChainDiagram, ProcessTimeline } from "@/components/diagrams/Diagrams";
import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeIntro } from "@/components/motion/HomeIntro";
import {
  BracketFrame,
  ButtonLink,
  DotList,
  Eyebrow,
  Reveal,
  Section,
  SectionHeader,
  Photo,
  PhotoBand,
} from "@/components/ui/primitives";
import {
  activityList,
  beliefPairs,
  gaAudience,
  gaDimensions,
  insightCategories,
  levelProcess,
  mayBeNecessary,
  startingQuestions,
  transformationFrame,
  whatWeDo,
  whyLevel141,
  pbaAudience,
  vibe,
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
    line: "First, know your level.",
    body: "Before recommending what should change, we establish where you currently stand. Because you cannot architect the next level without understanding the current one.",
  },
  {
    id: "igf",
    name: "IGF™",
    full: "Integrated Growth Framework",
    line: "Connect the growth engine.",
    body: "Growth rarely comes from one function. IGF™ looks across the interconnected drivers influencing organizational growth and creates alignment between them.",
  },
  {
    id: "brands",
    name: "BRANDS™",
    full: "Six dimensions of growth",
    line: "Branding · Conversion Readiness · Awareness · Nurture · Discover & Trust · Scale",
    body: "BRANDS™ ensures that the major market-facing growth levers are not managed as separate campaigns.",
  },
  {
    id: "peak",
    name: "PEAK™",
    full: "From presence to momentum",
    line: "Presence → Equity → Authority → Kinetic Growth",
    body: "How a person or organization progresses from simply being visible to building genuine market authority and ultimately creating sustained growth momentum.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <HomeHero />

      {/* ---------------------------------------------------- Noise vs architecture */}
      <Section id="architecture" tone="paper" labelledBy="noise-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index="01" className="text-gold-ink">
                Growth doesn&apos;t need more noise
              </Eyebrow>
              <h2 id="noise-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                It needs <span className="serif-accent">architecture</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-muted">
              <p>Most businesses don&apos;t have a shortage of activity. Yet growth can still feel fragmented.</p>
              <p>
                Because more activity doesn&apos;t necessarily create more growth. When positioning, visibility, trust,
                sales, communication and strategy operate independently, businesses work harder without necessarily
                moving further.
              </p>
            </Reveal>
            {/* Busy crowd, one purposeful figure: activity versus direction. */}
            <Reveal delay={200} className="mt-12 sm:mt-16">
              <Photo src="/images/client-walk-through-crowd.webp" sizes="(min-width: 1024px) 42vw, 100vw" className="aspect-[4/3]" />
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal className="border-t border-line pt-10 lg:mt-3">
              <p className="eyebrow text-muted">They have</p>
              <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-base leading-[1.85] text-muted sm:text-lg" aria-label="Typical growth activities">
                {activityList.map((a, i) => (
                  <li key={a} className="whitespace-nowrap">
                    {a.replace(".", "")}
                    {i < activityList.length - 1 ? <span aria-hidden className="ml-3 opacity-50">·</span> : null}
                  </li>
                ))}
              </ul>
              <div className="my-12 flex items-center gap-5" aria-hidden>
                <span className="h-px flex-1 bg-line" />
                <LogoSymbol className="size-5 text-ink" />
                <span className="h-px flex-1 bg-line" />
              </div>
              <p className="text-2xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
                Level141 <span className="serif-accent">connects</span> the pieces.
              </p>
              <p className="mt-5 max-w-md leading-relaxed text-muted">
                We look at growth as one integrated architecture—then identify what needs to change for you to reach
                your next level.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Two architectures */}
      <Section id="two-architectures" tone="paper-2" labelledBy="two-title">
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

          {/* Two stacked full-width rows, photo beside text, sides alternating. */}
          <div className="mt-20 border-t border-line sm:mt-28">
            {/* Personal Brand Architecture — active */}
            <Reveal as="article" className="grid gap-10 border-b border-line py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-24">
              <Photo src="/images/client-speaker-conference-stage.webp" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] lg:col-span-6" />
              <div className="lg:col-span-6">
                <p className="eyebrow flex items-center gap-3 text-muted">
                  <span aria-hidden className="tabular-nums">01</span>
                  <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                  <span className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ink" aria-hidden /> Now available
                  </span>
                </p>
                <h3 className="mt-6 text-2xl tracking-[-0.02em] sm:text-[1.75rem]">Personal Brand Architecture™</h3>
                <p className="serif-accent mt-4 text-lg leading-[1.6] sm:text-xl">
                  Your achievements built your reputation. What will build your next level?
                </p>
                <p className="mt-5 leading-[1.85] text-muted">
                  At Level141, we believe a powerful personal brand is not simply about visibility. It&apos;s about
                  aligning who you are, what you stand for, the impact you create and where you want to go. That&apos;s
                  why we architect personal brands through our proprietary VIBE™ Framework.
                </p>
                <dl className="mt-8 grid grid-cols-4 border-y border-line">
                  {vibe.map((v) => (
                    <div key={v.letter} className="border-r border-line px-1 py-5 text-center last:border-r-0">
                      <dt className="text-3xl font-light leading-none">{v.letter}</dt>
                      <dd className="mt-2 text-[0.625rem] uppercase leading-snug tracking-[0.06em] text-muted sm:text-[0.75rem] sm:tracking-[0.1em]">{v.name}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
                  <ButtonLink href={`${routes.contact}?interest=personal-brand-architecture`} variant="gold">
                    Start Your Personal Brand Assessment
                  </ButtonLink>
                  <ButtonLink href={routes.personalBrand} variant="link">
                    Discover Your VIBE™
                  </ButtonLink>
                </div>
              </div>
            </Reveal>

            {/* Growth Architecture — waitlist */}
            <Reveal as="article" className="grid gap-10 border-b border-line py-12 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-24">
              <Photo src="/images/client-executive-dubai-window.webp" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] lg:order-2 lg:col-span-6" />
              <div className="lg:col-span-6">
                <p className="eyebrow flex items-center gap-3 text-muted">
                  <span aria-hidden className="tabular-nums">02</span>
                  <span aria-hidden className="h-px w-8 bg-current opacity-50" />
                  <span className="inline-flex items-center gap-2">
                    <span className="size-1.5 rounded-full border border-ink" aria-hidden /> Coming later · Waitlist open
                  </span>
                </p>
                <h3 className="mt-6 text-2xl tracking-[-0.02em] sm:text-[1.75rem]">Growth Architecture™</h3>
                <p className="serif-accent mt-4 text-lg leading-[1.6] sm:text-xl">
                  Your business doesn&apos;t need more disconnected growth initiatives. It needs them working together.
                </p>
                <p className="mt-5 leading-[1.85] text-muted">
                  For growth-stage businesses, SMEs, portfolio companies and established organizations that have the
                  ambition and capability to reach a significantly higher level.
                </p>
                <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-1 border-y border-line py-5 text-sm text-muted">
                  {gaDimensions.map((d, i) => (
                    <li key={d.name}>
                      {d.name}
                      {i < gaDimensions.length - 1 ? <span aria-hidden className="ml-3 opacity-50">·</span> : null}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
                  <ButtonLink href={routes.waitlist} variant="solid">
                    Join the Waitlist
                  </ButtonLink>
                  <ButtonLink href={routes.growth} variant="link">
                    Explore Growth Architecture
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- The difference */}
      <PhotoBand src="/images/client-hero-skyline-opening.webp" />

      <Section tone="ink" labelledBy="difference-title">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-70" />
        <div className="container-x relative">
          <SectionHeader
            id="difference-title"
            dark
            index="03"
            eyebrow="The Level141 difference"
            title={
              <>
                Most businesses manage growth in departments.{" "}
                <span className="serif-accent text-gold">We see one architecture</span>
              </>
            }
            intro="Treat them separately and gaps appear. Architect them together and growth begins to compound. That's the thinking behind Level141."
          />
          <div className="mt-20 sm:mt-28">
            <GrowthChainDiagram />
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Growth system */}
      <Section tone="paper" labelledBy="system-title">
        <div className="container-x">
          <SectionHeader
            id="system-title"
            index="04"
            eyebrow="The Level141 Growth System"
            title={
              <>
                Growth. <span className="serif-accent">Architected</span>
              </>
            }
            intro="Our work is powered by proprietary frameworks designed to understand where growth stands, identify what is holding it back and architect the next level."
          />
          <ol className="mt-20 border-t border-line sm:mt-28">
            {frameworks.map((f, i) => (
              <Reveal as="li" key={f.id} delay={i * 80} className="border-b border-line">
                <Link
                  href={`${routes.how}#${f.id}`}
                  className="group relative grid gap-4 py-8 transition-colors before:absolute before:inset-x-0 before:bottom-[-1px] before:h-px before:origin-left before:scale-x-0 before:bg-gold-ink before:transition-transform before:duration-500 hover:before:scale-x-100 focus-visible:before:scale-x-100 sm:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-10"
                >
                  <span className="text-2xl tracking-[-0.02em] transition-colors group-hover:text-gold-ink sm:text-[1.75rem] lg:col-span-3">
                    {f.name}
                  </span>
                  <span className="lg:col-span-4">
                    <span className="eyebrow block text-muted">{f.full}</span>
                    <span className="mt-2 block text-lg font-medium">{f.line}</span>
                  </span>
                  <span className="leading-relaxed text-muted lg:col-span-4">{f.body}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="hidden size-6 justify-self-end text-ink/30 transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink lg:col-span-1 lg:block"
                  />
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- How Level141 works */}
      <Section tone="white" labelledBy="works-title">
        <div className="container-x">
          <SectionHeader
            id="works-title"
            index="05"
            eyebrow="We don't start with deliverables"
            title={
              <>
                We start with the <span className="serif-accent">level you&apos;re trying to reach</span>
              </>
            }
            intro={
              <div className="flex lg:justify-end">
                <ButtonLink href={routes.how} variant="ghost">
                  How we architect growth
                </ButtonLink>
              </div>
            }
          />

          {/* Source: Website Structure, "WE DON'T START WITH DELIVERABLES." — in document order.
              Two stacked editorial rows: title on the left, list and closing line on the right. */}
          <div className="mt-20 border-t border-line sm:mt-28">
            <Reveal className="grid gap-8 border-b border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow text-muted">Deliverables</p>
                <p className="mt-5 text-2xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
                  Deliverables <span className="serif-accent block">may be necessary</span>
                </p>
              </div>
              <div className="lg:col-span-7">
                <ul className="border-t border-line-strong">
                  {mayBeNecessary.map((m) => (
                    <li
                      key={m}
                      className="group/item flex min-h-14 cursor-default items-center justify-between gap-4 border-b border-line py-4 text-base tracking-[-0.01em] text-muted transition-colors duration-300 hover:text-ink sm:text-lg"
                    >
                      <span className="bg-[linear-gradient(var(--color-gold-ink),var(--color-gold-ink))] bg-[length:0%_1.5px] bg-[position:0_55%] bg-no-repeat transition-[background-size] duration-500 ease-[var(--ease-architect)] group-hover/item:bg-[length:100%_1.5px]">
                        {m} may be necessary
                      </span>
                      <span aria-hidden className="hidden shrink-0 text-sm text-gold-ink opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 sm:inline">
                        not the start
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="pt-6 text-lg leading-snug tracking-[-0.015em] sm:text-xl">But none of those should be the starting point</p>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid gap-8 border-b border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow text-muted">Level141 first identifies:</p>
                <p className="mt-5 text-2xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
                  The starting point is the <span className="serif-accent block">growth problem</span>
                </p>
              </div>
              <div className="lg:col-span-7">
                <ol className="border-t border-line-strong">
                  {startingQuestions.map((q) => (
                    <li
                      key={q}
                      className="group/q flex min-h-14 cursor-default items-center gap-4 border-b border-line py-4 text-base sm:text-lg"
                    >
                      <span className="flex-1">{q}</span>
                      <ArrowRight
                        aria-hidden
                        className="size-4 -translate-x-2 text-gold-ink opacity-0 transition-[opacity,transform] duration-300 group-hover/q:translate-x-0 group-hover/q:opacity-100"
                      />
                    </li>
                  ))}
                </ol>
                <p className="pt-6 text-lg leading-snug tracking-[-0.015em] sm:text-xl">Only then do we architect the solution</p>
              </div>
            </Reveal>
          </div>

          {/* Source: Website Structure, "HOW LEVEL141 WORKS". */}
          <Eyebrow className="mt-20 text-gold-ink sm:mt-24 lg:mt-28">How Level141 works</Eyebrow>
          <ProcessTimeline steps={levelProcess} className="mt-8 sm:mt-10" />
        </div>
      </Section>

      {/* ---------------------------------------------------------- What we actually sell */}
      <Section tone="ink" labelledBy="sell-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow index="06" className="text-gold">
              What we actually sell
            </Eyebrow>
            <h2 id="sell-title" className="mt-8 space-y-1 text-[clamp(2rem,1.4rem+2vw,3rem)] font-light leading-[1.15] tracking-[-0.025em]">
              <span className="block text-paper-muted line-through decoration-gold/70 decoration-2">Not marketing</span>
              <span className="block text-paper-muted line-through decoration-gold/70 decoration-2">Not consulting</span>
              <span className="block text-paper-muted line-through decoration-gold/70 decoration-2">Not another strategy deck</span>
              <span className="serif-accent block pt-3 text-gold">Growth Architecture</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="text-2xl leading-snug tracking-[-0.02em]">Level141 sits between strategy and execution.</p>
            <ul className="mt-8 border-t border-paper/15">
              {whatWeDo.map((w) => (
                <li key={w} className="border-b border-paper/15 py-4 text-paper/85">
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-8 leading-relaxed text-paper/65">
              Execution may involve internal teams, specialist partners, agencies or existing vendors. Our responsibility
              is bigger:
            </p>
            <p className="mt-4 text-xl leading-snug text-gold-soft">
              Making sure everything is moving toward the same growth outcome.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Who it's for */}
      <Section tone="paper" labelledBy="for-title">
        <div className="container-x">
          <SectionHeader
            id="for-title"
            index="07"
            eyebrow="Ideal for"
            title={
              <>
                When ambition changes, the architecture supporting it <span className="serif-accent">must change too</span>
              </>
            }
          />
          {/* Two stacked rows: who it is for on the left, the list and next step on the right. */}
          <div className="mt-20 border-t border-line sm:mt-28">
            <Reveal className="grid gap-8 border-b border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow text-gold-ink">Personal Brand Architecture</p>
                <p className="mt-5 text-2xl leading-snug tracking-[-0.02em]">
                  For people whose capability is bigger than their current visibility
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="eyebrow text-muted">Ideal for:</p>
                <DotList items={pbaAudience} className="mt-4" />
                <p className="mt-8 border-t border-line pt-6 leading-[1.85] text-muted">
                  Your personal brand shouldn&apos;t simply document what you&apos;ve done. It should position you for
                  what you want to do next.
                </p>
                <ButtonLink href={routes.personalBrand} variant="ghost" className="mt-6 max-w-full sm:whitespace-normal">
                  Build My Personal Brand
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal className="grid gap-8 border-b border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="eyebrow text-gold-ink">Growth Architecture</p>
                <p className="mt-5 text-2xl leading-snug tracking-[-0.02em]">
                  For organizations whose ambition has outgrown their current growth system
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="eyebrow text-muted">Ideal for:</p>
                <DotList items={gaAudience} className="mt-4" />
                <p className="mt-8 border-t border-line pt-6 leading-[1.85] text-muted">
                  When ambition changes, the architecture supporting it must change too.
                </p>
                <ButtonLink href={routes.waitlist} variant="ghost" className="mt-6 max-w-full sm:whitespace-normal">
                  Register your organization&apos;s interest
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Why Level141 */}
      <Section tone="white" labelledBy="why-title">
        <div className="container-x">
          <SectionHeader
            id="why-title"
            index="08"
            eyebrow="Why Level141?"
            title={
              <>
                Growth Architecture, <span className="serif-accent">not fragmented consulting</span>
              </>
            }
          />
          <ol className="mt-20 border-t border-line sm:mt-28">
            {whyLevel141.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 60} className="grid gap-4 border-b border-line py-10 sm:py-14 lg:grid-cols-12 lg:gap-16">
                <div className="flex items-baseline gap-6 lg:col-span-5">
                  <span aria-hidden className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-light tracking-[-0.015em] sm:text-2xl">{w.title}</h3>
                </div>
                <p className="measure leading-[1.85] text-muted lg:col-span-7">{w.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Belief */}
      <Section tone="ink" labelledBy="belief-title">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <Eyebrow index="09" className="text-gold">
                The Level141 belief
              </Eyebrow>
              <h2 id="belief-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                Growth isn&apos;t a collection of activities.{" "}
                <span className="serif-accent text-gold">It&apos;s a system</span>
              </h2>
              <Photo src="/images/client-visionaries-horizon.webp" sizes="(min-width: 1024px) 38vw, 100vw" className="mt-10 aspect-[4/3] sm:mt-12" />
            </Reveal>
            <ul className="divide-y divide-paper/10 border-y border-paper/10 lg:col-span-7">
              {beliefPairs.map((b, i) => (
                <Reveal as="li" key={b} delay={i * 70} className="flex items-baseline gap-6 py-5 text-lg text-paper/80 sm:text-xl">
                  <span aria-hidden className="eyebrow w-6 shrink-0 tabular-nums text-paper-muted">{String(i + 1).padStart(2, "0")}</span>
                  {b}
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal className="mt-12 lg:mt-14">
            <BracketFrame size="lg" className="mx-auto max-w-3xl text-center">
              <p className="text-2xl font-light leading-snug tracking-[-0.02em] sm:text-[2rem]">
                Growth happens when the pieces work together.{" "}
                <span className="serif-accent text-gold">That&apos;s what we architect</span>
              </p>
            </BracketFrame>
          </Reveal>
        </div>
      </Section>

      <PhotoBand src="/images/client-walk-toward-skyline.webp" />

      {/* ---------------------------------------------------------- Results framework */}
      <Section tone="paper" labelledBy="results-title">
        <div className="container-x">
          <SectionHeader
            id="results-title"
            index="10"
            eyebrow="Results"
            title={
              <>
                Don&apos;t show what you did. <span className="serif-accent">Show what changed</span>
              </>
            }
          />
          <ol className="mt-20 border-t border-line sm:mt-28">
            {transformationFrame.map((t, i) => (
              <Reveal as="li" key={t.label} delay={i * 80} className="grid gap-3 border-b border-line py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-16">
                <div className="flex items-baseline gap-6 lg:col-span-5">
                  <span aria-hidden className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-light tracking-[-0.015em] sm:text-2xl">{t.label}</h3>
                </div>
                <p className="leading-[1.85] text-muted lg:col-span-7">{t.question}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- About teaser */}
      <Section tone="paper-2" labelledBy="why141-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="relative lg:col-span-5">
            <Mark141
              className="mx-auto w-full max-w-sm"
              textClassName="text-[5rem] sm:text-[6.5rem]"
              closeClassName="text-ink"
              openClassName="text-ink"
            />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow index="11" className="text-gold-ink">
                About Level141
              </Eyebrow>
              <h2 id="why141-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                Why <span className="serif-accent">141?</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              <p className="text-ink">
                Because growth is never really about reaching a final destination. Every level changes what becomes
                possible next.
              </p>
              <p>
                We work with ambitious people and organizations to understand where they are, define where they want to
                go and architect the interconnected systems required to get there.
              </p>
              <p className="text-base">Level141 is part of the 1XL ecosystem, headquartered in Dubai.</p>
            </Reveal>
            <Reveal delay={200} className="mt-10">
              <ButtonLink href={routes.about} variant="outline">
                About Level141
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Insights preview */}
      <Section tone="paper" labelledBy="insights-title">
        <div className="container-x">
          <SectionHeader
            id="insights-title"
            index="12"
            eyebrow="Insights"
            title={
              <>
                The <span className="serif-accent">Next Level</span>
              </>
            }
            intro={
              <>
                <p>Ideas for people and organizations that refuse to remain where they are.</p>
                <ButtonLink href={routes.insights} variant="ghost" className="mt-6">
                  Explore Insights
                </ButtonLink>
              </>
            }
          />
          <ul className="mt-20 border-t border-line sm:mt-28">
            {insightCategories.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 60} className="grid gap-4 border-b border-line py-10 sm:py-12 lg:grid-cols-12 lg:gap-16">
                <div className="flex items-baseline gap-6 lg:col-span-5">
                  <span aria-hidden className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-xl font-light tracking-[-0.015em] sm:text-2xl">{c.name}</h3>
                </div>
                <p className="measure leading-[1.85] text-muted lg:col-span-7">{c.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
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
        primary={{ label: "Start Your Level141 Assessment", href: routes.contact }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
