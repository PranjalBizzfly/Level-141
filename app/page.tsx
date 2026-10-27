import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { LogoSymbol } from "@/components/brand/Logo";
import { Mark141 } from "@/components/brand/Mark141";
import { GrowthChainDiagram, ProcessTimeline } from "@/components/diagrams/Diagrams";
import { CtaBand } from "@/components/sections/CtaBand";
import { HomeHero } from "@/components/sections/HomeHero";
import {
  BracketFrame,
  ButtonLink,
  DotList,
  Eyebrow,
  Reveal,
  Section,
  SectionHeader,
  Photo,
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
      <HomeHero />

      {/* ---------------------------------------------------- Noise vs architecture */}
      <Section id="architecture" tone="paper" labelledBy="noise-title">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow index="01" className="text-gold-ink">
                Growth doesn&apos;t need more noise
              </Eyebrow>
              <h2 id="noise-title" className="display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.75rem]">
                It needs <span className="serif-accent">architecture.</span>
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
          </div>

          <div className="lg:col-span-6">
            <Reveal className="rounded-[2rem] border border-ink/10 bg-surface p-8 sm:p-14 lg:p-20">
              <p className="eyebrow text-muted">They have</p>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Typical growth activities">
                {activityList.map((a) => (
                  <li
                    key={a}
                    className="flex min-h-12 items-center justify-center rounded-2xl border border-ink/10 bg-ink/[0.03] whitespace-nowrap px-2 text-center text-sm text-ink/75 transition-colors duration-300 hover:border-ink/25 hover:text-ink"
                  >
                    {a.replace(".", "")}
                  </li>
                ))}
              </ul>
              <div className="my-12 flex items-center gap-5" aria-hidden>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-ink/20" />
                <span className="grid size-12 place-items-center rounded-full border border-ink/15 bg-surface">
                  <LogoSymbol className="size-5 text-ink" />
                </span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-ink/20" />
              </div>
              <p className="text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
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
                <span className="serif-accent">organization.</span>
              </>
            }
            intro="Level141 has built dedicated architectures for both."
          />

          <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-8">
            {/* Personal Brand Architecture — active */}
            <Reveal as="article" spotlight className="on-dark relative flex flex-col rounded-[2rem] bg-ink p-8 text-paper sm:p-12 xl:p-14">
              <Photo src="/images/client-speaker-conference-stage.webp" sizes="(min-width: 1024px) 40vw, 100vw" className="mb-10 aspect-[16/9]" />
              <div className="flex items-center justify-between gap-4">
                <span aria-hidden className="eyebrow text-paper-muted">
                  01
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
                  <span className="size-1.5 rounded-full bg-gold" aria-hidden /> Now available
                </span>
              </div>
              <h3 className="mt-10 text-3xl tracking-[-0.025em] sm:text-4xl">Personal Brand Architecture™</h3>
              <p className="serif-accent mt-4 text-2xl text-gold-soft">
                Your achievements built your reputation. What will build your next level?
              </p>
              <p className="mt-6 leading-relaxed text-paper/65">
                At Level141, we believe a powerful personal brand is not simply about visibility. It&apos;s about
                aligning who you are, what you stand for, the impact you create and where you want to go. That&apos;s
                why we architect personal brands through our proprietary VIBE™ Framework.
              </p>
              <dl className="mt-10 grid grid-cols-4 border-y border-paper/12">
                {vibe.map((v) => (
                  <div key={v.letter} className="border-r border-paper/12 px-1 py-5 text-center last:border-r-0">
                    <dt className="serif-accent text-4xl leading-none text-gold">{v.letter}</dt>
                    <dd className="mt-2 text-[0.625rem] uppercase leading-snug tracking-[0.06em] sm:text-[0.75rem] sm:tracking-[0.1em] text-paper-muted">{v.name}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-3 [&>a]:px-5 xl:[&>a]:px-4 xl:[&>a]:text-[0.875rem]">
                <ButtonLink href={`${routes.contact}?interest=personal-brand-architecture`} variant="gold">
                  Start Your Personal Brand Assessment
                </ButtonLink>
                <ButtonLink href={routes.personalBrand} variant="ghost-light">
                  Discover Your VIBE™
                </ButtonLink>
              </div>
            </Reveal>

            {/* Growth Architecture — waitlist */}
            <Reveal as="article" delay={120} className="flex flex-col rounded-[2rem] border border-ink/12 bg-surface p-8 sm:p-12 xl:p-14">
              <Photo src="/images/client-executive-dubai-window.webp" sizes="(min-width: 1024px) 40vw, 100vw" className="mb-10 aspect-[16/9]" />
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow text-muted">02</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1 text-xs text-muted">
                  <span className="size-1.5 rounded-full border border-muted" aria-hidden /> Coming later · Waitlist open
                </span>
              </div>
              <h3 className="mt-10 text-3xl tracking-[-0.025em] sm:text-4xl">Growth Architecture™</h3>
              <p className="serif-accent mt-4 text-2xl text-gold-ink">
                Your business doesn&apos;t need more disconnected growth initiatives. It needs them working together.
              </p>
              <p className="mt-6 leading-relaxed text-muted">
                For growth-stage businesses, SMEs, portfolio companies and established organizations that have the
                ambition and capability to reach a significantly higher level.
              </p>
              <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-3">
                {gaDimensions.map((d) => (
                  <li key={d.name} className="bg-surface px-4 py-4 text-sm">
                    {d.name}.
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-4 pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-3 [&>a]:px-5 xl:[&>a]:px-4 xl:[&>a]:text-[0.875rem]">
                <ButtonLink href={routes.waitlist} variant="solid">
                  Join the Waitlist
                </ButtonLink>
                <ButtonLink href={routes.growth} variant="ghost">
                  Explore Growth Architecture
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- The difference */}
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
                <span className="serif-accent text-gold">We see one architecture.</span>
              </>
            }
            intro="Treat them separately and gaps appear. Architect them together and growth begins to compound. That's the thinking behind Level141."
          />
          <div className="mt-12 sm:mt-16 lg:mt-20">
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
                Growth. <span className="serif-accent">Architected.</span>
              </>
            }
            intro="Our work is powered by proprietary frameworks designed to understand where growth stands, identify what is holding it back and architect the next level."
          />
          <ol className="mt-12 border-t border-ink/12 sm:mt-16 lg:mt-20">
            {frameworks.map((f, i) => (
              <Reveal as="li" key={f.id} delay={i * 80} className="border-b border-ink/12">
                <Link
                  href={`${routes.how}#${f.id}`}
                  className="group relative grid gap-4 py-8 transition-colors before:absolute before:inset-x-0 before:bottom-[-1px] before:h-px before:origin-left before:scale-x-0 before:bg-gold-ink before:transition-transform before:duration-500 hover:before:scale-x-100 focus-visible:before:scale-x-100 sm:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-10"
                >
                  <span className="text-4xl tracking-[-0.03em] transition-colors group-hover:text-gold-ink sm:text-5xl lg:col-span-3">
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
                We start with the <span className="serif-accent">level you&apos;re trying to reach.</span>
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
              Two matched panels on a shared subgrid so their lists and closing lines align. */}
          <div className="mt-12 grid gap-6 sm:mt-16 lg:mt-20 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-[auto_1fr_auto] lg:gap-x-6 lg:gap-y-0">
            <Reveal className="grid rounded-[2rem] border border-line bg-surface p-7 sm:p-10 lg:row-span-3 lg:grid-rows-subgrid">
              <div className="flex items-end pb-6">
                <p className="eyebrow text-muted">Deliverables</p>
              </div>
              <ul className="border-t border-line-strong">
                {mayBeNecessary.map((m) => (
                  <li
                    key={m}
                    className="group/item flex min-h-14 cursor-default items-center justify-between gap-4 border-b border-line py-4 text-lg tracking-[-0.01em] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    <span className="bg-[linear-gradient(var(--color-gold-ink),var(--color-gold-ink))] bg-[length:0%_1.5px] bg-[position:0_55%] bg-no-repeat transition-[background-size] duration-500 ease-[var(--ease-architect)] group-hover/item:bg-[length:100%_1.5px]">
                      {m} may be necessary.
                    </span>
                    <span aria-hidden className="hidden shrink-0 text-sm text-gold-ink opacity-0 transition-opacity duration-300 group-hover/item:opacity-100 sm:inline">
                      not the start
                    </span>
                  </li>
                ))}
              </ul>
              <p className="pt-6 text-xl leading-snug tracking-[-0.015em]">But none of those should be the starting point.</p>
            </Reveal>

            {/* Bridge arrow between the panels */}
            <div aria-hidden className="hidden items-center justify-center lg:row-span-3 lg:flex">
              <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-surface text-gold-ink">
                <ArrowRight className="size-5" />
              </span>
            </div>

            <Reveal delay={120} className="on-dark grid rounded-[2rem] bg-ink p-7 text-paper sm:p-10 lg:row-span-3 lg:grid-rows-subgrid">
              <div className="pb-6">
                <p className="text-2xl leading-snug tracking-[-0.02em] sm:text-3xl">
                  The starting point is the <span className="serif-accent text-gold">growth problem.</span>
                </p>
                <p className="eyebrow mt-5 text-paper-muted">Level141 first identifies:</p>
              </div>
              <ol className="border-t border-line-dark-strong">
                {startingQuestions.map((q) => (
                  <li
                    key={q}
                    className="group/q -mx-3 flex min-h-14 cursor-default items-center gap-4 rounded-xl border-b border-line-dark px-3 py-4 text-lg transition-colors duration-300 hover:bg-paper/[0.06]"
                  >
                    <span className="flex-1">{q}</span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 -translate-x-2 text-gold opacity-0 transition-[opacity,transform] duration-300 group-hover/q:translate-x-0 group-hover/q:opacity-100"
                    />
                  </li>
                ))}
              </ol>
              <p className="pt-6 text-xl leading-snug tracking-[-0.015em]">Only then do we architect the solution.</p>
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
            <h2 id="sell-title" className="mt-8 space-y-1 text-[2.4rem] leading-[1.05] tracking-[-0.035em] sm:text-6xl">
              <span className="block text-paper-muted line-through decoration-gold/70 decoration-2">Not marketing.</span>
              <span className="block text-paper-muted line-through decoration-gold/70 decoration-2">Not consulting.</span>
              <span className="block text-paper-muted line-through decoration-gold/70 decoration-2">Not another strategy deck.</span>
              <span className="serif-accent block pt-3 text-gold">Growth Architecture.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="text-2xl leading-snug tracking-[-0.02em]">Level141 sits between strategy and execution.</p>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2">
              {whatWeDo.map((w) => (
                <li key={w} className="rounded-xl border border-paper/15 px-4 py-3 text-paper/85">
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
                When ambition changes, the architecture supporting it <span className="serif-accent">must change too.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-10 md:grid-cols-2 lg:mt-20">
            {/* Both cards share six subgrid rows from md, so headline, list, closing line
                and link align across the pair. */}
            <Reveal className="rounded-[2rem] border border-ink/12 p-8 sm:p-14 lg:p-20 md:row-span-6 md:grid md:min-w-0 md:grid-cols-[minmax(0,1fr)] md:grid-rows-subgrid md:gap-0">
              <p className="eyebrow text-gold-ink">Personal Brand Architecture</p>
              <p className="mt-5 text-2xl leading-snug tracking-[-0.02em]">
                For people whose capability is bigger than their current visibility.
              </p>
              <p className="eyebrow mt-8 text-muted">Ideal for:</p>
              <DotList items={pbaAudience} className="mt-4 grid gap-x-6 self-start lg:grid-cols-2 lg:space-y-0 lg:gap-y-3" />
              <p className="mt-8 border-t border-ink/10 pt-6 leading-relaxed text-muted">
                Your personal brand shouldn&apos;t simply document what you&apos;ve done. It should position you for
                what you want to do next.
              </p>
              <ButtonLink href={routes.personalBrand} variant="ghost" className="mt-6 max-w-full justify-self-start sm:whitespace-normal">
                Build My Personal Brand
              </ButtonLink>
            </Reveal>
            <Reveal delay={120} className="rounded-[2rem] border border-ink/12 p-8 sm:p-14 lg:p-20 md:row-span-6 md:grid md:min-w-0 md:grid-cols-[minmax(0,1fr)] md:grid-rows-subgrid md:gap-0">
              <p className="eyebrow text-gold-ink">Growth Architecture</p>
              <p className="mt-5 text-2xl leading-snug tracking-[-0.02em]">
                For organizations whose ambition has outgrown their current growth system.
              </p>
              <p className="eyebrow mt-8 text-muted">Ideal for:</p>
              <DotList items={gaAudience} className="mt-4 self-start" />
              <p className="mt-8 border-t border-ink/10 pt-6 leading-relaxed text-muted">
                When ambition changes, the architecture supporting it must change too.
              </p>
              <ButtonLink href={routes.waitlist} variant="ghost" className="mt-6 max-w-full justify-self-start sm:whitespace-normal">
                Register your organization&apos;s interest
              </ButtonLink>
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
                Growth Architecture, <span className="serif-accent">not fragmented consulting.</span>
              </>
            }
          />
          <ol className="mt-12 grid gap-px overflow-hidden sm:mt-16 lg:mt-20 rounded-[2rem] border border-ink/10 bg-ink/10 md:grid-cols-2 lg:grid-cols-3">
            {whyLevel141.map((w, i) => (
              <Reveal as="li" spotlight key={w.title} delay={i * 60} className="bg-surface p-6 sm:p-8">
                <span className="eyebrow tabular-nums text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-2xl tracking-[-0.02em]">{w.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{w.body}</p>
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
              <h2 id="belief-title" className="display mt-6 text-[2.6rem] sm:text-6xl">
                Growth isn&apos;t a collection of activities.{" "}
                <span className="serif-accent text-gold">It&apos;s a system.</span>
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
              <p className="text-3xl leading-tight tracking-[-0.025em] sm:text-5xl">
                Growth happens when the pieces work together.{" "}
                <span className="serif-accent text-gold">That&apos;s what we architect.</span>
              </p>
            </BracketFrame>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Results framework */}
      <Section tone="paper" labelledBy="results-title">
        <div className="container-x">
          <SectionHeader
            id="results-title"
            index="10"
            eyebrow="Results"
            title={
              <>
                Don&apos;t show what you did. <span className="serif-accent">Show what changed.</span>
              </>
            }
          />
          <ol className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-5 lg:gap-5">
            {transformationFrame.map((t, i) => (
              <Reveal
                as="li"
                key={t.label}
                delay={i * 80}
                className={
                  "rounded-2xl border border-ink/12 p-6 lg:p-7 " +
                  (i === 4 ? "on-dark bg-ink text-paper sm:col-span-2 lg:col-span-1" : "bg-surface")
                }
              >
                <span className={"eyebrow tabular-nums " + (i === 4 ? "text-gold" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-xl tracking-[-0.015em]">{t.label}</h3>
                <p className={"mt-2 text-sm leading-relaxed " + (i === 4 ? "text-paper/70" : "text-muted")}>{t.question}</p>
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
              textClassName="text-[7rem] sm:text-[9rem]"
              closeClassName="text-ink"
              openClassName="text-ink"
            />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <Eyebrow index="11" className="text-gold-ink">
                About Level141
              </Eyebrow>
              <h2 id="why141-title" className="display mt-6 text-[2.6rem] sm:text-6xl">
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
                The <span className="serif-accent">Next Level.</span>
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
          <ul className="mt-12 grid gap-px overflow-hidden sm:mt-16 lg:mt-20 rounded-[2rem] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {insightCategories.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 60} className="bg-paper p-6 sm:p-8">
                <p className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-8 text-2xl tracking-[-0.02em]">{c.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
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
