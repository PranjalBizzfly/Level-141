import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero, Reveal, Section } from "@/components/ui/primitives";
import { insightCategories } from "@/lib/content";
import { getPublishedInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { assessmentCta, routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Ideas on growth architecture, personal authority, brand and positioning, growth intelligence and leadership, for people and organizations ready to grow.",
  path: routes.insights,
});

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function InsightsPage() {
  const articles = getPublishedInsights();
  const categoryName = (slug: string) => insightCategories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <PageHero
        image="/images/client-keynote-auditorium.webp"
        eyebrow="Insights"
        title={
          <>
            The <span className="serif-accent text-gold">Next Level</span>
          </>
        }
        intro={<p>Ideas for people and organizations that refuse to remain where they are.</p>}
      />

      {/* ---------------------------------------------------------- Articles (shown only once real, approved articles exist) */}
      {articles.length ? (
        <Section tone="paper" labelledBy="latest-title">
          <div className="container-x">
            <h2 id="latest-title" className="sr-only">
              Insights
            </h2>
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
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
          </div>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------- Categories */}
      <Section tone="ink" labelledBy="themes-title">
        <div className="container-x">
          {/* Source: Website Structure, INSIGHTS content categories (no public heading in the document). */}
          <h2 id="themes-title" className="sr-only">
            Insights categories
          </h2>
          <ol className="border-t border-line-dark">
            {insightCategories.map((c, i) => (
              <Reveal
                as="li"
                key={c.slug}
                id={c.slug}
                delay={i * 60}
                className="relative grid scroll-mt-28 items-baseline gap-x-6 gap-y-3 py-8 sm:grid-cols-12 sm:gap-x-8 sm:py-12"
              >
                <span
                  aria-hidden
                  className="eyebrow tabular-nums text-paper-muted sm:col-span-2"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl tracking-[-0.02em] sm:col-span-10 sm:text-[1.75rem] lg:col-span-4">{c.name}</h3>
                <p className="measure text-base leading-[1.85] text-paper/75 sm:col-span-10 sm:col-start-3 sm:text-lg lg:col-span-6 lg:col-start-auto">
                  {c.body}
                </p>
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line-dark" />
                <span aria-hidden data-reveal-line className="absolute bottom-0 left-0 h-px w-1/4 bg-gold" />
              </Reveal>
            ))}
          </ol>
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
        primary={assessmentCta}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
