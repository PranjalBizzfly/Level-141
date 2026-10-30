import { GrowthChainDiagram } from "@/components/diagrams/Diagrams";
import { BrandsSystem, PeakAscent } from "@/components/diagrams/Diagrams";
import { FrameworkNav } from "@/components/sections/FrameworkNav";
import { CtaBand } from "@/components/sections/CtaBand";
import { BracketFrame, ButtonLink, Eyebrow, PageHero, Reveal, Section, SectionHeader, cx, Photo, PhotoBand } from "@/components/ui/primitives";
import {
  levelProcess,
  lqDomains,
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


export default function HowPage() {
  return (
    <>
      <PageHero
        image="/images/client-executive-contemplation.webp"
        eyebrow="How we architect growth"
        title={
          <>
            <span className="block">We don&apos;t start with deliverables</span>
            <span className="serif-accent mt-3 block text-gold">We start with the level you&apos;re trying to reach</span>
          </>
        }
        intro={<p>Level141 sits between strategy and execution. The starting point is the growth problem.</p>}
      >
        {/* A quiet text index rather than a row of pills: fits one line on desktop, wraps cleanly on phones. */}
        <nav aria-label="On this page" className="max-w-2xl border-t border-line-dark-strong pt-6">
          <p className="eyebrow text-paper-muted">On this page</p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
          {[
            ["The starting point", "#starting-point"],
            ["Process", "#process"],
            ["LQ™", "#lq"],
            ["IGF™", "#igf"],
            ["BRANDS™", "#brands"],
            ["PEAK™", "#peak"],
            ["Why Level141", "#why"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 min-w-11 items-center justify-center text-[0.95rem] text-paper/80 underline-offset-[6px] decoration-gold/60 transition-colors hover:text-gold hover:underline"
            >
              {label}
            </a>
          ))}
          </div>
        </nav>
      </PageHero>

      {/* ---------------------------------------------------------- Starting point */}
      <Section id="starting-point" tone="paper" labelledBy="start-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow index="01" className="text-gold-ink">The starting point</Eyebrow>
              <h2 id="start-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                But none of those should be <span className="serif-accent">the starting point</span>
              </h2>
            </Reveal>
            <Reveal as="ul" delay={100} className="mt-10 space-y-3">
              {mayBeNecessary.map((m) => (
                <li key={m} className="flex items-baseline justify-between gap-4 border-b border-line py-4 text-lg">
                  <span>{m}</span>
                  <span className="text-sm text-muted">may be necessary</span>
                </li>
              ))}
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="border-t border-line-strong pt-10 sm:pt-12">
              <p className="eyebrow text-gold-ink">The starting point is the growth problem</p>
              <p className="mt-6 text-lg text-muted">Level141 first identifies:</p>
              <ol className="mt-6 space-y-1">
                {startingQuestions.map((q, i) => (
                  <li key={q} className="flex items-baseline gap-5 border-b border-line py-4 last:border-0">
                    <span aria-hidden className="eyebrow tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-xl font-light sm:text-2xl">{q}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-lg">Only then do we architect the solution</p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="ink" labelledBy="difference-title">
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

      <PhotoBand src="/images/client-executive-library.webp" />

      {/* ---------------------------------------------------------- Process */}
      <Section id="process" tone="white" labelledBy="process-title">
        <div className="container-x">
          <SectionHeader
            index="02"
            id="process-title"
            eyebrow="How Level141 works"
            title={
              <>
                Assess. Architect. Activate. Govern. <span className="serif-accent">Level up</span>
              </>
            }
            intro="Growth isn't a destination. Every new level creates another possibility."
          />
          <ol className="mt-20 sm:mt-28 border-t border-ink/12">
            {levelProcess.map((s, i) => (
              <Reveal
                as="li"
                key={s.n}
                delay={i * 60}
                className="group grid gap-6 border-b border-ink/12 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
              >
                <div className="flex items-baseline gap-6 lg:col-span-4">
                  <span
                    aria-hidden
                    className="text-4xl font-light tracking-[-0.04em] text-ink/45 transition-colors duration-500 group-hover:text-gold-ink lg:text-5xl"
                  >
                    {s.n}
                  </span>
                  <h3 className="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">{s.name}</h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-xl font-medium tracking-[-0.01em]">{s.line}</p>
                  <p className="mt-3 leading-[1.85] text-muted sm:text-lg">{s.body}</p>
                </div>
                <p className="serif-accent text-xl text-gold-ink lg:col-span-3 lg:text-right">{s.question}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Growth system intro */}
      <Section tone="ink" labelledBy="system-title" className="pb-10 sm:pb-14 lg:pb-16">
        <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        <div className="container-x relative">
          <SectionHeader
            index="03"
            id="system-title"
            dark
            eyebrow="The Level141 Growth System"
            title={
              <>
                Growth. <span className="serif-accent text-gold">Architected</span>
              </>
            }
            intro="Our work is powered by proprietary frameworks designed to understand where growth stands, identify what is holding it back and architect the next level."
          />
          <Reveal className="mt-20 border-b border-line-dark sm:mt-28">
            {[
              ["LQ™", "Know your level", "#lq"],
              ["IGF™", "Connect the growth engine", "#igf"],
              ["BRANDS™", "Six dimensions", "#brands"],
              ["PEAK™", "Presence to momentum", "#peak"],
            ].map(([name, line, href]) => (
              <a key={href} href={href} className="group grid gap-2 border-t border-line-dark py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-12">
                <span className="block text-2xl tracking-[-0.02em] transition-colors group-hover:text-gold sm:text-[1.75rem] lg:col-span-5">{name}</span>
                <span className="block text-paper-muted lg:col-span-7">{line}</span>
              </a>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* LQ */}
      <div className="relative">
        <FrameworkNav />
      <Section id="lq" tone="ink" labelledBy="lq-title" className="scroll-mt-12 !pt-12 sm:!pt-14 lg:!pt-16">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow text-gold"><span aria-hidden className="tabular-nums">04 · </span>LQ™ — Level Quotient</p>
                <h2 id="lq-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                  First, <span className="serif-accent text-gold">know your level</span>
                </h2>
                <p className="mt-8 leading-relaxed text-paper/70">
                  Before recommending what should change, we establish where you currently stand. LQ™ provides a
                  structured assessment of the factors influencing your current growth position.
                </p>
                <p className="mt-5 leading-relaxed text-paper">
                  Because you cannot architect the next level without understanding the current one.
                </p>
                <p className="mt-5 text-sm leading-relaxed text-paper-muted">
                  For people, LQ™ is assessed across the four VIBE™ dimensions. For organizations, the LQ™ Growth Audit
                  examines the domains shown here.
                </p>
                <ButtonLink href={routes.lq} variant="link" className="mt-6 !px-0 text-paper">
                  Take the LQ™ Assessment
                </ButtonLink>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <p className="eyebrow text-paper-muted">LQ™ Growth Audit — domains</p>
            </Reveal>
            {/* Business & ambition defines what 'next level' means, so it leads; the other eleven domains follow. */}
            <dl className="mt-6 border-b border-line-dark">
              {lqDomains.map((d, i) => (
                <Reveal
                  key={d.name}
                  delay={(i % 4) * 50}
                  variant="fade"
                  className="grid gap-2 border-t border-line-dark py-7 sm:grid-cols-12 sm:gap-8 sm:py-8"
                >
                  <dt className="flex items-baseline gap-4 font-medium sm:col-span-5">
                    <span aria-hidden className="eyebrow tabular-nums text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {d.name}
                  </dt>
                  <dd className={cx("leading-[1.85] sm:col-span-7", i === 0 ? "text-paper/80" : "text-paper-muted")}>{d.q}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal className="mt-14 sm:mt-16">
              <p className="eyebrow text-gold">LQ™ outputs</p>
              <ul className="mt-6 space-y-3 text-paper/80">
                {lqOutputs.map((o) => (
                  <li key={o} className="flex gap-3 leading-[1.85]">
                    <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-gold" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* IGF */}
      <Section id="igf" tone="paper" labelledBy="igf-title" className="scroll-mt-12">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold-ink"><span aria-hidden className="tabular-nums">05 · </span>IGF™ — Integrated Growth Framework</p>
              <h2 id="igf-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                Connect the <span className="serif-accent">growth engine</span>
              </h2>
            </Reveal>
          </div>
          {/* Source: Website Structure, IGF™ — Integrated Growth Framework. The documents
              do not name IGF™'s drivers, so none are shown. */}
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <BracketFrame tone="ink" size="lg" className="space-y-6">
              <p className="text-2xl leading-snug tracking-[-0.02em] sm:text-[1.75rem]">Growth rarely comes from one function.</p>
              <p className="text-lg leading-relaxed text-muted">
                IGF™ looks across the interconnected drivers influencing organizational growth and creates alignment
                between them.
              </p>
              <p className="text-lg leading-relaxed">
                Instead of optimizing individual activities, we architect how the entire growth ecosystem works
                together.
              </p>
            </BracketFrame>
          </Reveal>
        </div>
      </Section>

      {/* BRANDS */}
      <Section id="brands" tone="ink" labelledBy="brands-title" className="scroll-mt-12">
        <div className="container-x">
          <SectionHeader
            index="06"
            id="brands-title"
            dark
            eyebrow="BRANDS™"
            title={
              <>
                Six dimensions <span className="serif-accent text-gold">of growth</span>
              </>
            }
            intro="Branding builds the foundation. Conversion Readiness prepares attention to become opportunity. Awareness, Nurture, Discover & Trust and Scale complete a system that is architected together — never as separate campaigns."
          />
          <div className="mt-20 sm:mt-28">
            <BrandsSystem />
          </div>
        </div>
      </Section>

      {/* PEAK */}
      <Section id="peak" tone="paper-2" labelledBy="peak-title" className="scroll-mt-12">
        <div className="container-x">
          <SectionHeader
            index="07"
            id="peak-title"
            eyebrow="PEAK™"
            title={
              <>
                From presence <span className="serif-accent">to momentum</span>
              </>
            }
            intro="PEAK™ helps us understand how a person or organization progresses from simply being visible to building genuine market authority and ultimately creating sustained growth momentum."
          />
          <div className="mt-20 sm:mt-28">
            <PeakAscent dark={false} />
          </div>
        </div>
      </Section>
      </div>

      {/* ---------------------------------------------------------- What we sell */}
      <Section tone="paper" labelledBy="sell-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-gold-ink"><span aria-hidden className="tabular-nums">08 · </span>What we actually sell</p>
            <h2 id="sell-title" className="mt-6 space-y-1 text-[clamp(2rem,1.4rem+2vw,3rem)] font-light leading-[1.15] tracking-[-0.025em]">
              <span className="block text-muted line-through decoration-gold-ink/60 decoration-2">Not marketing</span>
              <span className="block text-muted line-through decoration-gold-ink/60 decoration-2">Not consulting</span>
              <span className="block text-muted line-through decoration-gold-ink/60 decoration-2">Not another strategy deck</span>
              <span className="serif-accent block pt-3 text-ink">Growth Architecture</span>
            </h2>
            <Photo src="/images/client-mentorship-conversation.webp" sizes="(min-width: 1024px) 45vw, 100vw" className="mt-10 aspect-[4/3] sm:mt-12 lg:aspect-[16/11]" />
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={100}>
              <p className="text-2xl leading-snug tracking-[-0.02em]">Level141 sits between strategy and execution.</p>
              <ul className="mt-8 border-t border-line">
                {whatWeDo.map((w) => (
                  <li key={w} className="border-b border-line py-4">
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-8 leading-relaxed text-muted">
                Execution may involve internal teams, specialist partners, agencies or existing vendors. Our
                responsibility is bigger:
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <BracketFrame tone="ink" size="sm">
                <p className="text-xl leading-snug tracking-[-0.015em]">
                  Making sure everything is moving toward the same growth outcome
                </p>
              </BracketFrame>
            </Reveal>
          </div>
        </div>
      </Section>

      <PhotoBand src="/images/client-visionaries-horizon.webp" />

      {/* ---------------------------------------------------------- Why Level141 */}
      <Section id="why" tone="ink" labelledBy="why-title">
        <div className="container-x">
          <SectionHeader
            index="09"
            id="why-title"
            dark
            eyebrow="Why Level141?"
            title={
              <>
                Growth Architecture, <span className="serif-accent text-gold">not fragmented consulting</span>
              </>
            }
          />
          <ol className="mt-20 border-b border-line-dark sm:mt-28">
            {whyLevel141.map((w, i) => (
              <Reveal as="li" key={w.title} delay={i * 60} className="grid gap-4 border-t border-line-dark py-10 sm:py-14 lg:grid-cols-12 lg:items-baseline lg:gap-12">
                <div className="flex items-baseline gap-6 lg:col-span-5">
                  <span aria-hidden className="eyebrow tabular-nums text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">{w.title}</h3>
                </div>
                <p className="measure leading-[1.85] text-paper/75 lg:col-span-7">{w.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Transformation frame */}
      <Section tone="white" labelledBy="shift-title">
        <div className="container-x">
          <SectionHeader
            index="10"
            id="shift-title"
            eyebrow="Results"
            title={
              <>
                Don&apos;t show what you did. <span className="serif-accent">Show what changed</span>
              </>
            }
          />
          <ol className="mt-20 border-b border-line sm:mt-28">
            {transformationFrame.map((t, i) => (
              <Reveal
                as="li"
                key={t.label}
                delay={i * 80}
                className="grid gap-3 border-t border-line py-10 sm:py-14 lg:grid-cols-12 lg:items-baseline lg:gap-12"
              >
                <div className="flex items-baseline gap-6 lg:col-span-5">
                  <span aria-hidden className={cx("eyebrow tabular-nums", i === transformationFrame.length - 1 ? "text-gold-ink" : "text-muted")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl tracking-[-0.02em] sm:text-[1.75rem]">{t.label}</h3>
                </div>
                <p className="measure leading-[1.85] text-muted lg:col-span-7">{t.question}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={routes.personalBrand} variant="solid">
              Personal Brand Architecture™
            </ButtonLink>
            <ButtonLink href={routes.growth} variant="link">
              Growth Architecture™
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
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
