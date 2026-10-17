import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaBand } from "@/components/sections/CtaBand";
import { BracketFrame, PageHero, Reveal, Section, SectionHeader } from "@/components/ui/primitives";
import { insightCategories, questionsWeAsk } from "@/lib/content";
import { getPublishedInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Insights — The Next Level",
  description:
    "Ideas for people and organizations that refuse to remain where they are — on growth architecture, personal authority, brand and positioning, growth intelligence and leadership.",
  path: routes.insights,
});

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function InsightsPage() {
  const articles = getPublishedInsights();
  const categoryName = (slug: string) => insightCategories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            The <span className="serif-accent text-gold">Next Level.</span>
          </>
        }
        intro={<p>Ideas for people and organizations that refuse to remain where they are.</p>}
      />

      {/* ---------------------------------------------------------- Articles or honest empty state */}
      <Section tone="paper" labelledBy="latest-title">
        <div className="container-x">
          {articles.length ? (
            <>
              <SectionHeader id="latest-title" eyebrow="Latest" title="Recent perspectives" />
              <ul className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`${routes.insights}/${a.slug}`} className="group grid gap-3 py-8 lg:grid-cols-12 lg:gap-10">
                      <span className="eyebrow text-gold-ink lg:col-span-3">{categoryName(a.category)}</span>
                      <span className="lg:col-span-7">
                        <span className="block text-2xl tracking-[-0.02em] group-hover:text-gold-ink">{a.title}</span>
                        <span className="mt-2 block leading-relaxed text-muted">{a.summary}</span>
                      </span>
                      <time dateTime={a.publishedAt} className="text-sm text-muted lg:col-span-2 lg:text-right">
                        {dateFmt.format(new Date(a.publishedAt))}
                      </time>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <Reveal className="lg:col-span-7">
                <p className="eyebrow text-gold-ink">Perspectives in preparation</p>
                <h2 id="latest-title" className="display mt-6 text-[2.4rem] sm:text-5xl">
                  The first essays are <span className="serif-accent">being written.</span>
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
                  Level141 Insights will publish across the six themes below. Nothing has been published yet — rather than
                  fill this page with placeholders, we&apos;ll add each piece when it&apos;s ready.
                </p>
              </Reveal>
              <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
                <BracketFrame tone="ink" size="md">
                  <p className="text-lg leading-relaxed">
                    Have a question about your next level in the meantime?
                  </p>
                  <Link
                    href={routes.contact}
                    className="link-underline mt-4 inline-flex items-center gap-2 font-medium"
                  >
                    Start the conversation <ArrowUpRight aria-hidden className="size-4" />
                  </Link>
                </BracketFrame>
              </Reveal>
            </div>
          )}
        </div>
      </Section>

      {/* ---------------------------------------------------------- Categories */}
      <Section tone="ink" labelledBy="themes-title">
        <div className="container-x">
          <SectionHeader
            id="themes-title"
            dark
            eyebrow="What we write about"
            title={
              <>
                Six themes. <span className="serif-accent text-gold">One question: what&apos;s next?</span>
              </>
            }
          />
          <ol className="mt-16 border-t border-paper/12">
            {insightCategories.map((c, i) => (
              <Reveal
                as="li"
                key={c.slug}
                id={c.slug}
                delay={i * 60}
                className="grid scroll-mt-28 gap-3 border-b border-paper/12 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10"
              >
                <span className="eyebrow tabular-nums text-paper/35 sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl tracking-[-0.025em] sm:col-span-5 lg:text-4xl">{c.name}</h3>
                <p className="text-lg leading-relaxed text-paper/65 sm:col-span-6">{c.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------------------------------------------------- Questions */}
      <Section tone="paper-2" labelledBy="questions-title">
        <div className="container-x">
          <SectionHeader
            id="questions-title"
            eyebrow="Questions we keep asking"
            title={
              <>
                Good architecture begins with <span className="serif-accent">better questions.</span>
              </>
            }
            intro="A few of the questions Level141 asks at the start of every engagement. They're worth asking yourself."
          />
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {(
              [
                ["For leaders and founders", questionsWeAsk.people],
                ["For organizations", questionsWeAsk.organizations],
              ] as const
            ).map(([label, qs], col) => (
              <Reveal key={label} delay={col * 120} className="rounded-[2rem] bg-[#fbfaf7] p-8 sm:p-10">
                <p className="eyebrow text-gold-ink">{label}</p>
                <ul className="mt-6 divide-y divide-ink/10">
                  {qs.map((q) => (
                    <li key={q} className="serif-accent py-4 text-xl leading-snug sm:text-2xl">
                      {q}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Find your level"
        title={
          <>
            Ready to answer them <span className="serif-accent text-gold">together?</span>
          </>
        }
        primary={{ label: "Start Your Next Level", href: routes.contact }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
