export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  name: "Level141",
  tagline: "Growth Architecture for People & Organizations",
  brandLine: "Level141 — Growth by Design",
  description:
    "Level141 architects the next level of growth for people and organizations through clarity, positioning, visibility, credibility, authority and growth systems.",
  headquarters: "Dubai",
  ecosystem: "1XL",
  primaryCta: { label: "Find Your Level", href: "/start-your-next-level" },
} as const;

export type NavItem = { label: string; href: string };

export const routes = {
  home: "/",
  personalBrand: "/personal-brand-architecture",
  growth: "/growth-architecture",
  waitlist: "/growth-architecture#waitlist",
  how: "/how-we-architect-growth",
  insights: "/insights",
  about: "/about",
  contact: "/start-your-next-level",
} as const;

/** Primary navigation, in the order given by the LEVEL141 WEBSITE document. */
export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Personal Brand Architecture", href: routes.personalBrand },
  { label: "Growth Architecture", href: routes.growth },
  { label: "How We Architect Growth", href: routes.how },
  { label: "Insights", href: routes.insights },
  { label: "About", href: routes.about },
  { label: "Start Your Next Level", href: routes.contact },
];

export const footerNav = {
  explore: [
    { label: "Personal Brand Architecture™", href: routes.personalBrand },
    { label: "Growth Architecture™", href: routes.growth },
    { label: "How We Work", href: routes.how },
    { label: "Insights", href: routes.insights },
    { label: "About", href: routes.about },
    { label: "Contact", href: routes.contact },
  ],
  frameworks: [
    { label: "LQ™", href: `${routes.how}#lq` },
    { label: "IGF™", href: `${routes.how}#igf` },
    { label: "BRANDS™", href: `${routes.how}#brands` },
    { label: "PEAK™", href: `${routes.how}#peak` },
  ],
} satisfies Record<string, NavItem[]>;
