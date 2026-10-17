import type { InsightCategorySlug } from "./content";

/**
 * Insights content model. Articles are added here (or swapped for a CMS
 * loader with the same shape). Only articles with `status: "published"` are
 * listed, routed or included in the sitemap — drafts never appear publicly.
 */
export type InsightBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  category: InsightCategorySlug;
  /** ISO date (YYYY-MM-DD) of real publication. */
  publishedAt: string;
  author?: string;
  status: "draft" | "published";
  body: InsightBlock[];
};

/** No articles have been supplied yet. Add real articles here when they are ready to publish. */
const insights: Insight[] = [];

export function getPublishedInsights(): Insight[] {
  return insights
    .filter((i) => i.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getInsight(slug: string): Insight | undefined {
  return getPublishedInsights().find((i) => i.slug === slug);
}
