import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { Layers } from "@/components/sections/HomeInteractive";
import { FilterTabs, TypeHero } from "@/components/sections/pages/InsightsParts";
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

/** Decorative black-and-white photographs, cycled across article cards. */
const images = [
  "/images/home-person-notebook.webp",
  "/images/about-meeting-room.webp",
  "/images/home-strategist-compass.webp",
  "/images/how-strategy-table-muted.webp",
  "/images/pba-leader-skyline.webp",
  "/images/home-team-table-muted.webp",
  "/images/about-dubai-terrace.webp",
  "/images/ga-prioritised-bridge-muted.webp",
];

/**
 * Insights — typographic hero, a static editorial article list (only once
 * approved articles exist), a static category index (each row keeps its #slug
 * anchor) and filterable discovery questions.
 */
export default function InsightsPage() {
  const articles = getPublishedInsights();
  const categoryName = (slug: string) => insightCategories.find((c) => c.slug === slug)?.name ?? slug;
  const questions = [
    ...questionsWeAsk.people.map((q) => ({ kicker: "Personal Brand Architecture™", name: String(q) })),
    ...questionsWeAsk.organizations.map((q) => ({ kicker: "Growth Architecture™", name: String(q) })),
  ];

  return (
    <>
      <TypeHero
        eyebrow="Insights"
        lines={[
          "The",
          <span key="n" className="serif-accent">
            Next Level
          </span>,
        ]}
        intro={<p>Ideas for people and organizations that refuse to remain where they are.</p>}
      />

      <Layers page="insights">
        {/* Articles (shown only once real, approved articles exist) — a static editorial list */}
        {articles.length ? (
          <section aria-labelledby="latest-title" className="bg-black text-white">
            <div className="container-x py-20 sm:py-28">
              <h2 id="latest-title" className="sr-only">
                Insights
              </h2>
              <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((a, i) => (
                  <li key={a.slug} className={i === 0 ? "md:col-span-2 lg:col-span-3" : undefined}>
                    <Link href={`${routes.insights}/${a.slug}`} className="group block">
                      <div className={`relative overflow-hidden bg-white/5 ${i === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}>
                        <Image
                          src={images[i % images.length]}
                          alt=""
                          fill
                          sizes="(min-width:1024px) 60vw, 100vw"
                          className="object-cover grayscale"
                        />
                      </div>
                      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/55">
                        {categoryName(a.category)} ·{" "}
                        <time dateTime={a.publishedAt}>{dateFmt.format(new Date(a.publishedAt))}</time>
                      </p>
                      <h3
                        className={`font-display mt-3 font-medium tracking-[-0.03em] underline-offset-4 group-hover:underline ${
                          i === 0 ? "text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.02]" : "text-2xl leading-snug"
                        }`}
                      >
                        {a.title}
                      </h3>
                      <p className="mt-3 max-w-2xl leading-relaxed text-white/70">{a.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Categories — a static typographic index; each keeps its anchor for /insights#slug links */}
        <section className="bg-paper text-ink">
          <div className="container-x py-20 sm:py-28">
            <h2 className="sr-only">Insight categories</h2>
            <ol className="border-t border-ink">
              {insightCategories.map((c, i) => (
                <li
                  key={c.slug}
                  id={c.slug}
                  className="grid scroll-mt-28 gap-4 border-b border-ink/15 py-8 sm:py-10 md:grid-cols-12 md:gap-8"
                >
                  <span aria-hidden className="text-sm tabular-nums text-ink/45 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.035em] md:col-span-6">
                    {c.name}
                  </h3>
                  <div className="leading-relaxed text-ink/70 md:col-span-5">{c.body}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Discovery questions — filtered by practice */}
        <section className="bg-paper text-ink">
          <FilterTabs
            label="Insights"
            title={
              <>
                Discovery <span className="serif-accent">Questions</span>
              </>
            }
            tabs={["All", "Personal Brand Architecture™", "Growth Architecture™"]}
            items={questions}
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
