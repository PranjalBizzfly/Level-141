import type { InsightCategorySlug } from "./content";
import type { InsightBlock } from "./insights";

/**
 * Blog content model. Posts are added here (or swapped for a CMS loader with
 * the same shape). Only posts with `status: "published"` are listed, routed or
 * included in the sitemap — drafts never appear publicly.
 */
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: InsightCategorySlug;
  /** ISO date (YYYY-MM-DD) of real publication. */
  publishedAt: string;
  author?: string;
  /** Optional cover photograph, e.g. "/images/client-mentorship.webp". */
  cover?: string;
  status: "draft" | "published";
  body: InsightBlock[];
};

/** No posts have been supplied yet. Add the client's articles here when they are ready to publish. */
const posts: BlogPost[] = [];

export function getPublishedPosts(): BlogPost[] {
  return posts
    .filter((p) => p.status === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): BlogPost | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}

/** Estimated reading time in minutes (about 200 words a minute). */
export function readingMinutes(post: BlogPost): number {
  const words = post.body
    .flatMap((b) => (b.type === "list" ? b.items : [b.text]))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
