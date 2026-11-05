export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

/**
 * The LQ™ landing page. Every "start the assessment" link on the site points here.
 * Set NEXT_PUBLIC_LQ_URL to the separate LQ landing page's address when it is live;
 * until then this site's own LQ page (/lq-assessment) is used.
 */
export const lqLanding = process.env.NEXT_PUBLIC_LQ_URL || "/lq-assessment";

export const site = {
  name: "Level 141",
  tagline: "Growth Architecture for People & Organizations.",
  slogan: "Growth By Design",
  brandLine: "Level 141 · Growth By Design.",
  description:
    "Level 141 architects the next level of growth for people and organizations through clarity, positioning, visibility, credibility and authority.",
  headquarters: "Dubai",
  /** Where Level 141 is, as the client gave it. */
  location: "Burj Khalifa, Dubai",
  /**
   * Public contact details for the Contact Us page. Each line shows only once it has a
   * value, so add the verified email, phone number and full address here when confirmed.
   */
  contact: { email: "", phone: "", address: "" } as { email: string; phone: string; address: string },
  /**
   * Legal details for the Privacy Policies and Terms. Each must come from Level 141; until
   * set, the documents show "To be confirmed by Level 141" in their place.
   */
  legal: { entity: "", governingLaw: "", effectiveDate: "" } as { entity: string; governingLaw: string; effectiveDate: string },
  parent: "1XL Holdings",
  primaryCta: { label: "Find Your Level", href: lqLanding },
} as const;

export type NavItem = { label: string; href: string };

export const routes = {
  home: "/",
  personalBrand: "/personal-brand-architecture",
  growth: "/growth-architecture",
  waitlist: "/growth-architecture#waitlist",
  how: "/how-we-architect-growth",
  insights: "/insights",
  blog: "/blog",
  lq: "/lq-assessment",
  about: "/about",
  contact: "/start-your-next-level",
  contactUs: "/contact-us",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
} as const;

/**
 * Official social profiles, shown in the footer. Fill in each verified URL: until then the
 * name shows as plain text (not a link), and only entries with a URL go into the structured data.
 */
export const socialLinks: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "" },
  { label: "YouTube", href: "" },
  { label: "Instagram", href: "" },
  { label: "X", href: "" },
];

/** The one assessment call to action. Every "Start Your Level 141 Assessment" button uses it. */
export const assessmentCta = { label: "Start Your Level 141 Assessment", href: lqLanding } as const;

/** Primary navigation, in the order given by the LEVEL141 WEBSITE document. */
export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Personal Brand Architecture™", href: routes.personalBrand },
  { label: "Growth Architecture™", href: routes.growth },
  { label: "How We Architect Growth", href: routes.how },
  { label: "LQ™ Assessment", href: lqLanding },
  { label: "Insights", href: routes.insights },
  { label: "Blog", href: routes.blog },
  { label: "About", href: routes.about },
  { label: "Start Your Next Level", href: routes.contact },
  { label: "Contact Us", href: routes.contactUs },
];

export const footerNav = {
  explore: [
    { label: "Personal Brand Architecture™", href: routes.personalBrand },
    { label: "Growth Architecture™", href: routes.growth },
    { label: "How We Architect Growth", href: routes.how },
    { label: "LQ™ Assessment", href: lqLanding },
    { label: "Insights", href: routes.insights },
    { label: "Blog", href: routes.blog },
    { label: "About", href: routes.about },
    { label: "Start Your Next Level", href: routes.contact },
    { label: "Contact Us", href: routes.contactUs },
  ],
  legal: [
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Terms & Conditions", href: routes.terms },
  ],
  frameworks: [
    { label: "LQ™", href: `${routes.how}#lq` },
    { label: "LQ™ Assessment", href: lqLanding },
    { label: "IGF™", href: `${routes.how}#igf` },
    { label: "BRANDS™", href: `${routes.how}#brands` },
    { label: "PEAK™", href: `${routes.how}#peak` },
  ],
} satisfies Record<string, NavItem[]>;
