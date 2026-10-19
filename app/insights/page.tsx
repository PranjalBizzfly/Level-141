import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { RefIntro, RefRows, RefSection } from "@/components/sections/Ref";
import { PageHero, Section } from "@/components/ui/primitives";
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
            The <span className="serif-accent">Next Level</span>
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

      {/* Categories — suggested content categories (Website Structure), as rows */}
      <RefSection tone="ink">
        <RefIntro label="Insights" title="The Next Level" />
        <RefRows
          rows={insightCategories.map((c, i) => ({
            key: c.slug,
            id: c.slug,
            name: `${String(i + 1).padStart(2, "0")} — ${c.name}`,
            line: c.body,
          }))}
        />
      </RefSection>

      {/* Discovery questions */}
      <RefSection>
        <RefIntro
          label="Insights"
          title={
            <>
              Discovery <span className="serif-accent">Questions</span>
            </>
          }
        />
        <div className="mt-6 grid gap-x-16 lg:grid-cols-2">
          <div>
            <RefRows rows={questionsWeAsk.people.map((q) => ({ key: q, name: q, line: "" }))} />
            <p className="mt-4 text-sm text-muted">Personal Brand Architecture™</p>
          </div>
          <div>
            <RefRows rows={questionsWeAsk.organizations.map((q) => ({ key: q, name: q, line: "" }))} />
            <p className="mt-4 text-sm text-muted">Growth Architecture™</p>
          </div>
        </div>
      </RefSection>

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
        closingLine="Find Your Level"
        primary={{ label: "Start Your Level141 Assessment", href: routes.contact }}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
