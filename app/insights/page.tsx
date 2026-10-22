import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { Layer, Layers } from "@/components/sections/HomeInteractive";
import { InsightGallery } from "@/components/sections/HomeEditorial";
import { RefIntro } from "@/components/sections/Ref";

/** Decorative photographs (black and white) for the insight categories, in order. */
const insightImages = [
  "/images/ga-hero-structural-node-muted.webp",
  "/images/client-keynote-auditorium.webp",
  "/images/client-executive-portrait-woman.webp",
  "/images/client-executive-study-woman.webp",
  "/images/client-mentorship.webp",
  "/images/client-keynote-monochrome.webp",
];
import { CategoryIndex, FilterTabs, TypeHero } from "@/components/sections/pages/InsightsParts";
import { insightCategories, questionsWeAsk } from "@/lib/content";
import { getPublishedInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";
import { altFor } from "@/lib/image-alts";

export const metadata = pageMetadata({
  title: "Insights: The Next Level",
  description:
    "Ideas for people and organizations that refuse to remain where they are.",
  path: routes.insights,
});

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Black-and-white photographs for the first five article cards only (never
 * repeated; the page carries at most five photos). Later articles are text-only.
 */
const images = [
  "/images/home-person-notebook.webp",
  "/images/home-strategist-compass.webp",
  "/images/how-strategy-table-muted.webp",
  "/images/pba-leader-skyline.webp",
  "/images/about-dubai-terrace.webp",
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
            <div className="container-x py-20 sm:py-24 lg:py-24">
              <h2 id="latest-title" className="sr-only">
                Insights
              </h2>
              <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((a, i) => (
                  <li key={a.slug} className={i === 0 ? "md:col-span-2 lg:col-span-3" : undefined}>
                    <Link href={`${routes.insights}/${a.slug}`} className="group block">
                      {images[i] ? (
                        <div className={`relative mb-6 overflow-hidden rounded-[1.25rem] ${i === 0 ? "aspect-[16/7]" : "aspect-[4/3]"}`}>
                          <Image
                            src={images[i]}
                            alt={altFor(images[i])}
                            fill
                            sizes="(min-width:1024px) 60vw, 100vw"
                            className="object-cover grayscale"
                          />
                        </div>
                      ) : null}
                      <p className="text-sm font-medium text-white/70">
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
                      <p className="mt-4 max-w-3xl leading-relaxed text-white/75">{a.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Insights gallery — tall photo cards gliding sideways (moved from home, keeps its pattern) */}
        <Layer pattern="zoom">
          <section className="bg-paper text-ink">
            <InsightGallery
              head={
                <RefIntro
                  label="Insights"
                  title="The Next Level. Ideas for people and organizations that refuse to remain where they are"
                  action={{ label: "Explore Insights", href: routes.insights }}
                />
              }
              items={insightCategories.map((c, i) => ({
                name: c.name,
                body: c.body,
                href: `${routes.insights}#${c.slug}`,
                image: insightImages[i % insightImages.length],
              }))}
            />
          </section>
        </Layer>

        {/* Categories — a static typographic index; each keeps its anchor for /insights#slug links */}
        <CategoryIndex items={insightCategories.map((c) => ({ id: c.slug, name: c.name, body: c.body }))} />

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
