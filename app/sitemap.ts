import type { MetadataRoute } from "next";
import { getPublishedInsights } from "@/lib/insights";
import { routes, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: routes.home, priority: 1 },
    { path: routes.personalBrand, priority: 0.9 },
    { path: routes.growth, priority: 0.8 },
    { path: routes.how, priority: 0.8 },
    { path: routes.about, priority: 0.7 },
    { path: routes.insights, priority: 0.6 },
    { path: routes.contact, priority: 0.7 },
  ];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p.path === "/" ? "" : p.path}`, priority: p.priority })),
    ...getPublishedInsights().map((a) => ({
      url: `${siteUrl}${routes.insights}/${a.slug}`,
      lastModified: a.publishedAt,
      priority: 0.5,
    })),
  ];
}
