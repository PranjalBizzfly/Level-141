import { site, siteUrl } from "@/lib/site";

/** schema.org Service for a product page, provided by the Level141 organization. */
export function ServiceJsonLd({ name, description, path, audience }: { name: string; description: string; path: string; audience: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${path}`,
    serviceType: "Growth architecture consultancy",
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    audience: { "@type": "Audience", audienceType: audience },
    provider: { "@type": "Organization", name: site.name, url: siteUrl },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
