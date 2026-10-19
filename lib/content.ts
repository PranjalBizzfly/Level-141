/**
 * Website copy, taken from the supplied source documents:
 *  - "WEbsite Structure.odt"            (LEVEL141 WEBSITE — primary source)
 *  - "1 Personal Brand Architecture.docx" (Personal Brand Architecture™ product bible)
 *  - "2 Growth Architecture Product.docx" (Growth Architecture™ product bible)
 * Wording is preserved; nothing here is invented company fact.
 */

/* ----------------------------------------------------------------- Shared */

export const growthChain = [
  { from: "Brand", to: "awareness" },
  { from: "Awareness", to: "discovery" },
  { from: "Discovery", to: "trust" },
  { from: "Trust", to: "conversion" },
  { from: "Conversion", to: "revenue" },
  { from: "Revenue", to: "the ability to scale" },
] as const;

export const activityList = [
  "Marketing.",
  "Sales teams.",
  "Social media.",
  "Content.",
  "Agencies.",
  "Consultants.",
  "Technology.",
  "Ideas.",
] as const;

export const beliefPairs = [
  "A great brand with poor conversion won't scale.",
  "Strong marketing without trust wastes attention.",
  "Visibility without positioning creates noise.",
  "Sales without nurture creates pressure.",
  "Strategy without governance becomes PowerPoint.",
  "Execution without architecture becomes activity.",
] as const;

/* -------------------------------------------------------- Level141 process */

export const levelProcess = [
  {
    n: "01",
    name: "Assess",
    line: "Understand the current level.",
    body: "We examine the person, organization, market, positioning, growth infrastructure and existing performance signals.",
    question: "Where are you really?",
  },
  {
    n: "02",
    name: "Architect",
    line: "Design the next level.",
    body: "We establish the positioning, priorities, growth architecture, systems and roadmap required to move forward.",
    question: "Where should you go?",
  },
  {
    n: "03",
    name: "Activate",
    line: "Turn architecture into coordinated action.",
    body: "The strategy is translated into clearly defined initiatives, ownership, priorities and execution requirements.",
    question: "What needs to happen?",
  },
  {
    n: "04",
    name: "Govern",
    line: "Keep growth aligned.",
    body: "Growth initiatives require measurement, accountability and course correction. Level141 establishes the governance structure required to keep the architecture working.",
    question: "Is everything moving together?",
  },
  {
    n: "05",
    name: "Level Up",
    line: "Measure progress. Identify the next constraint. Move again.",
    body: "Growth isn't a destination. Every new level creates another possibility.",
    question: "What's your next level?",
  },
] as const;

export const startingQuestions = [
  "Where are you now?",
  "Where are you trying to go?",
  "What's stopping you?",
  "What needs to change?",
  "How should those changes work together?",
] as const;

export const mayBeNecessary = [
  "A website",
  "Content",
  "PR",
  "A new positioning",
  "Sales architecture",
  "Leadership visibility",
] as const;

export const whatWeDo = [
  "We diagnose.",
  "We architect.",
  "We prioritize.",
  "We establish the system.",
  "We define who needs to do what.",
  "We govern the architecture.",
] as const;

export const whyLevel141 = [
  {
    title: "Integrated Thinking",
    body: "We don't look at branding, marketing, sales, trust, positioning and visibility as separate problems. We examine how they influence one another.",
  },
  {
    title: "Architecture Before Activity",
    body: "We don't prescribe more activity until we understand what the activity needs to achieve.",
  },
  {
    title: "Strategy Without Execution Dependency",
    body: "Our recommendations aren't built around selling you a particular execution service. The architecture determines what is needed.",
  },
  {
    title: "Governance After Strategy",
    body: "A strategy without ownership and measurement quickly becomes another presentation. We build governance into the architecture.",
  },
  {
    title: "Built Around Your Next Level",
    body: "Different businesses require different growth architectures. We don't begin with a predetermined package of activities. We begin with the level you want to reach.",
  },
  {
    title: "Proprietary Growth Intelligence",
    body: "LQ™, IGF™, BRANDS™ and PEAK™ provide structured methodologies for assessing, architecting and governing growth.",
  },
] as const;

/** How Level141 engagements are to be presented — a structure, not a case study. */
export const transformationFrame = [
  { label: "The Challenge", question: "Where was the person or organization?" },
  { label: "The Constraint", question: "What was preventing the next level?" },
  { label: "The Architecture", question: "What did Level141 redesign?" },
  { label: "The Shift", question: "What changed?" },
  { label: "The Impact", question: "What measurable business, market or reputation outcome followed?" },
] as const;

/* -------------------------------------------------------------- Frameworks */

export const brandsLevers = [
  {
    letter: "B",
    name: "Branding",
    line: "Build the foundation.",
    role: "Clarifies who the organization is, why it matters and why it is different.",
    components: "Purpose, proposition, category, differentiation, messaging, offer architecture and brand consistency.",
  },
  {
    letter: "R",
    name: "Conversion Readiness",
    line: "Prepare attention to become opportunity.",
    role: "Ensures attention can become action and revenue.",
    components:
      "Journeys, websites/landing environments, proof, CTAs, lead capture, sales readiness, handoff and conversion friction.",
  },
  {
    letter: "A",
    name: "Awareness",
    line: "Become visible to the right market.",
    role: "Creates qualified first-touch visibility among priority audiences.",
    components: "Paid, earned, owned, partnerships, events, communities, social and targeted reach.",
  },
  {
    letter: "N",
    name: "Nurture",
    line: "Build relationships before the decision.",
    role: "Moves prospects from awareness and interest toward confidence and action.",
    components:
      "CRM logic, segmentation, content journeys, follow-up, remarketing, email, education and sales enablement.",
  },
  {
    letter: "D",
    name: "Discover & Trust",
    line: "Become easier to find, understand and believe.",
    role: "Makes the organization easy to find and credible to validate.",
    components:
      "Search, reviews, reputation, proof, media, case studies, authority assets, listings and trust signals.",
  },
  {
    letter: "S",
    name: "Scale",
    line: "Create systems capable of supporting growth.",
    role: "Integrates demand, pipeline, optimization and governance for repeatable growth.",
    components:
      "Lead/demand architecture, KPI system, experimentation, budget logic, partner governance, feedback loops and scale roadmap.",
  },
] as const;

export const peakStages = [
  {
    letter: "P",
    name: "Presence",
    question: "Are we visible, understandable and accessible to the right market?",
    focus: "Positioning, market presence, channels, discoverability, consistency and conversion readiness.",
    outcome: "Right audiences can find, understand and engage with the organization.",
  },
  {
    letter: "E",
    name: "Equity",
    question: "Why should the market prefer and value us?",
    focus: "Customer value, experience, reputation, proof, differentiation, relationships and accumulated brand value.",
    outcome: "Higher preference, stronger trust, better retention and pricing resilience.",
  },
  {
    letter: "A",
    name: "Authority",
    question: "Why should the market believe and follow us?",
    focus:
      "Expertise, category leadership, thought leadership, proof, earned validation, partnerships and institutional credibility.",
    outcome: "Reduced buyer risk, stronger influence and higher-quality opportunity.",
  },
  {
    letter: "K",
    name: "Kinetic Growth",
    question: "How does the system create sustained forward movement?",
    focus:
      "Demand, nurture, conversion, sales integration, referrals, expansion, optimization and scalable governance.",
    outcome: "Repeatable pipeline, improved conversion, stronger economics and scalable growth.",
  },
] as const;

export const lqDomains = [
  { name: "Business & ambition", q: "Where is the organization now? What does 'next level' mean in revenue, market, customer, authority or scale terms?" },
  { name: "Brand & positioning", q: "Is the value proposition clear, differentiated and consistently expressed?" },
  { name: "Customer & market", q: "Is the ICP explicit? Are needs, buying triggers, objections and segments understood?" },
  { name: "Presence", q: "Can priority audiences find and understand the organization across relevant touchpoints?" },
  { name: "Conversion readiness", q: "Do journeys, offers, proof, CTAs, landing environments and sales handoffs convert interest?" },
  { name: "Awareness & demand", q: "Is there a balanced system for paid, earned, owned, partner and community demand?" },
  { name: "Nurture", q: "Are prospects educated, qualified and progressed systematically?" },
  { name: "Discoverability & trust", q: "Does search, reputation, proof and third-party validation reduce buyer uncertainty?" },
  { name: "Sales-growth interface", q: "Are definitions, qualification, handoffs, feedback loops and pipeline responsibilities aligned?" },
  { name: "Data & measurement", q: "Can leadership distinguish activity, leading indicators, pipeline and business outcomes?" },
  { name: "Governance & execution", q: "Are owners, agencies, priorities, review cycles and decision rights clear?" },
  { name: "Scale readiness", q: "Can systems, capacity, customer experience and economics sustain higher demand?" },
] as const;

export const lqOutputs = [
  "Current Level scorecard and narrative diagnosis.",
  "Critical growth constraints and dependencies.",
  "Priority gap heatmap.",
  "Next-Level definition and target outcomes.",
  "90-day, 6-month and 12-month intervention priorities.",
  "Measurement baseline and governance requirements.",
] as const;

/* ----------------------------------------- Personal Brand Architecture™ */

export const vibe = [
  {
    letter: "V",
    name: "Vision",
    full: "Visionary Leadership",
    tag: "Visionary Leadership",
    headline: "Be recognised for where you're going, not just where you've been.",
    body: "We architect your leadership positioning, future vision, personal narrative and thought leadership to establish what you stand for and the direction you represent.",
    question: "What should I stand for and lead?",
    detail:
      "Visionary Leadership is the strategic foundation. It identifies the intersection between what the individual has earned the right to speak about, what they believe, what the market needs and what future they want to influence.",
    focus: [
      "Leadership identity and future ambition",
      "Positioning statement and category association",
      "Expertise and intellectual territories",
      "Signature beliefs, contrarian or distinctive viewpoints where authentic",
      "Founder/executive narrative and origin story",
      "Audience hierarchy and stakeholder relevance",
      "Digital/profile architecture and visual/verbal coherence",
      "Thought-leadership thesis and signature themes",
    ],
    outcomes: "Clear leadership proposition; memorable positioning; defined thought-leadership territories.",
  },
  {
    letter: "I",
    name: "Impact",
    full: "Impact",
    tag: "Professional, Personal, Social & Spiritual",
    headline: "Your influence should mean more than your visibility.",
    body: "We identify and articulate the impact you create across four dimensions: professional, personal, social and spiritual. Because authentic authority is built through meaningful contributions, values and demonstrated influence.",
    question: "What meaningful difference do I create?",
    detail:
      "Impact converts claims into credibility. It documents how the individual affects organizations, industries, communities and people, ensuring the personal brand is anchored in proof rather than promotion.",
    focus: [
      "Professional impact: business outcomes, transformations, innovation, teams, customers, industries and institutions",
      "Social impact: community contribution, mentoring, ecosystem development, philanthropy, advocacy or knowledge sharing where genuine",
      "Personal impact: values, leadership behaviour, relationships, resilience, learning and the human dimension of influence",
      "Evidence architecture: achievements, testimonials, case stories, credentials, milestones and third-party validation",
      "Trust architecture: consistency between what the individual says, does and is known for",
    ],
    outcomes: "Proof of value; stronger trust; credible influence; reputation with substance.",
  },
  {
    letter: "B",
    name: "Business Growth",
    full: "Business Growth",
    tag: "Business Growth",
    headline: "Turn personal authority into meaningful opportunities.",
    body: "We align your positioning, credibility, relationships and visibility with your commercial ambitions. From strategic partnerships and business development to investor relationships, speaking engagements and new opportunities, your personal brand becomes a strategic growth asset.",
    question: "How does authority create opportunity?",
    detail:
      "Business Growth makes the product commercially accountable. It maps how personal authority can create legitimate value for the individual's company, career, investments or professional ecosystem.",
    focus: [
      "Business and customer opportunity pathways",
      "Investor and deal-flow relevance",
      "Strategic partnerships and ecosystem access",
      "Speaking, panels, conferences and industry forums",
      "Media and expert-commentary opportunities",
      "Board, advisory and consulting opportunities",
      "Talent attraction and employer trust",
      "Premium positioning and referral architecture",
      "Founder-to-company trust transfer, where applicable",
    ],
    outcomes: "Qualified inbound opportunities; stronger access; business and career leverage.",
  },
  {
    letter: "E",
    name: "Evolution",
    full: "Evolution",
    tag: "Evolution",
    headline: "Your personal brand should grow as you grow.",
    body: "We architect a personal brand capable of evolving with your ambitions, achievements, responsibilities and aspirations. Because the person you are becoming matters as much as the person you are today.",
    question: "Who must I become next?",
    detail:
      "Evolution protects the brand from becoming a historical snapshot. It establishes a forward-looking reputation roadmap and identifies what the individual must learn, demonstrate, enter or leave behind to reach the next level.",
    focus: [
      "12–36 month reputation ambition",
      "Role and category evolution",
      "New knowledge and intellectual-property development",
      "Audience and geographic expansion",
      "Succession, legacy or next-generation considerations",
      "Reputation risk and relevance monitoring",
      "Periodic re-positioning triggers",
      "Continuous learning and evidence-building roadmap",
    ],
    outcomes: "A brand that remains relevant as ambition, role and market change.",
  },
] as const;

export const vibeStages = [
  {
    n: "01",
    name: "Discover Your Level",
    body: "We begin with an LQ™ diagnostic assessment across the four VIBE™ dimensions to understand your current personal brand position.",
  },
  {
    n: "02",
    name: "Architect Your VIBE™",
    body: "We develop your positioning, leadership narrative, authority strategy, impact architecture and opportunity roadmap.",
  },
  {
    n: "03",
    name: "Activate Your Presence",
    body: "We translate the architecture into coordinated visibility, credibility, communication and thought-leadership initiatives.",
  },
  {
    n: "04",
    name: "Govern Your Growth",
    body: "We establish accountability, review mechanisms and strategic oversight to ensure your personal brand develops in alignment with your ambitions.",
  },
  {
    n: "05",
    name: "Measure Your Next Level",
    body: "We reassess your LQ™ to evaluate progress against your starting position and identify the next stage of your evolution.",
  },
] as const;

export const pbaAudience = [
  "Founders",
  "CEOs",
  "Entrepreneurs",
  "Investors",
  "Business Owners",
  "Senior Professionals",
  "Industry Experts",
  "Next-generation Leaders",
] as const;

export const pbaPains = [
  { pain: "Invisible expertise", looks: "Strong track record but weak discoverability or inconsistent digital presence.", cost: "Opportunities go to more visible peers." },
  { pain: "Unclear positioning", looks: "The leader is known, but not clearly known for something.", cost: "Low recall and weak category association." },
  { pain: "Fragmented narrative", looks: "Bio, interviews, social profiles, speeches and company story communicate different messages.", cost: "Trust and memorability are diluted." },
  { pain: "Content without authority", looks: "Frequent posting without an intellectual territory or point of view.", cost: "Activity rises but influence does not." },
  { pain: "Reputation trapped in a network", looks: "Credibility exists mainly among people who already know the individual.", cost: "Growth is constrained by existing circles." },
  { pain: "Founder-company dependency", looks: "The founder and organization either compete for attention or are disconnected.", cost: "Lost trust-transfer and commercial leverage." },
  { pain: "Vanity-led measurement", looks: "Followers, impressions and likes dominate reporting.", cost: "Teams cannot prove strategic or commercial value." },
  { pain: "No opportunity system", looks: "Media, speaking, partnerships, advisory, investor and business opportunities happen randomly.", cost: "Personal brand does not reliably create growth." },
  { pain: "Static identity", looks: "Brand remains tied to an old title, company or phase of life.", cost: "Future ambition is constrained by past perception." },
] as const;

/** Source: Personal Brand Architecture bible §10, Pain → Solution → Impact Map (all four columns). */
export const pbaVoices = [
  {
    quote: "People do not know what I really do.",
    answer: "Leadership positioning + expertise territories.",
    effect: "Sharper market understanding.",
    impact: "Stronger recall and category association.",
  },
  {
    quote: "My profiles do not reflect my level.",
    answer: "Presence/profile architecture.",
    effect: "Coherent first impression.",
    impact: "Higher trust and executive credibility.",
  },
  {
    quote: "I post, but it does not build authority.",
    answer: "Thought-leadership architecture.",
    effect: "Content gains purpose and intellectual consistency.",
    impact: "Recognized expertise rather than generic visibility.",
  },
  {
    quote: "My achievements are scattered.",
    answer: "Impact + evidence architecture.",
    effect: "Proof becomes accessible and structured.",
    impact: "Claims become credible and defensible.",
  },
  {
    quote: "Opportunities come randomly.",
    answer: "Opportunity + network architecture.",
    effect: "Clear target pathways and calls to action.",
    impact: "More intentional inbound and relationship-led growth.",
  },
  {
    quote: "My personal brand does not help my company.",
    answer: "Founder-company trust-transfer architecture.",
    effect: "Alignment between founder authority and corporate goals.",
    impact: "Commercial leverage and stronger stakeholder confidence.",
  },
  {
    quote: "I am known for my past role.",
    answer: "Evolution roadmap.",
    effect: "Future identity becomes explicit.",
    impact: "Relevance for the next career/business chapter.",
  },
] as const;

export const pbaModules = [
  { name: "Personal Brand Diagnostic", purpose: "Establish current-state reality and gap to ambition." },
  { name: "Visionary Leadership Architecture", purpose: "Define what the individual should stand for." },
  { name: "Presence & Profile System", purpose: "Translate strategy into a coherent market-facing identity." },
  { name: "Thought Leadership Architecture", purpose: "Turn expertise into repeatable intellectual authority." },
  { name: "Impact & Trust Architecture", purpose: "Make credibility provable and human." },
  { name: "Opportunity Architecture", purpose: "Connect reputation to tangible growth." },
  { name: "Evolution & Governance", purpose: "Keep the brand relevant and measurable." },
] as const;

export const pbaPrinciples = [
  { name: "Architecture before activity", body: "Define the system before selecting channels or content." },
  { name: "Truth before theatre", body: "Build from real expertise, evidence, values and outcomes." },
  { name: "Authority before vanity", body: "Optimize for trust, relevance and opportunity rather than follower counts." },
  { name: "Integration before fragmentation", body: "Connect narrative, digital presence, thought leadership, media, networks and commercial opportunity." },
  { name: "Governance before noise", body: "Establish decision rights, review rhythms, standards and measurement." },
  { name: "Evolution by design", body: "A senior leader's brand must change as roles, markets and ambitions change." },
] as const;

export const pbaIsNot = [
  "Not social media management.",
  "Not follower building as the primary objective.",
  "Not a cosmetic profile makeover.",
  "Not fabricated influence or manufactured credentials.",
  "Not a PR-only engagement.",
  "Not content volume without strategic purpose.",
  "Not guaranteed fame, virality or media placement.",
] as const;

export const pbaMeasures = [
  { name: "Positioning clarity", q: "Does the market understand what the individual stands for?" },
  { name: "Authority", q: "Is the individual increasingly treated as a credible authority?" },
  { name: "Impact proof", q: "Is reputation supported by evidence?" },
  { name: "Audience quality", q: "Are the right people paying attention?" },
  { name: "Opportunity", q: "Is authority converting into useful access?" },
  { name: "Business contribution", q: "Is the personal brand supporting commercial or strategic growth?" },
  { name: "Evolution", q: "Is the brand moving toward the next ambition?" },
] as const;

/* ------------------------------------------------- Growth Architecture™ */

export const gaDimensions = [
  { name: "Clarity", body: "Know where you're going and why the market should choose you." },
  { name: "Positioning", body: "Create a differentiated position that can support growth." },
  { name: "Visibility", body: "Build systematic market awareness around the organization." },
  { name: "Trust", body: "Strengthen the signals that reduce uncertainty and increase confidence." },
  { name: "Conversion Readiness", body: "Make sure attention has somewhere productive to go." },
  { name: "Scale", body: "Build systems capable of supporting the next stage of the organization." },
] as const;

export const gaAudience = [
  "Growth-stage companies",
  "SMEs",
  "Portfolio companies",
  "Founder-led businesses",
  "Established organizations entering their next growth phase",
  "Businesses entering new markets",
  "Companies preparing to scale",
] as const;

export const gaOperatingLogic = [
  "Current Level",
  "LQ™ Growth Audit",
  "Next Level",
  "Growth Gap",
  "PEAK™ Architecture",
  "BRANDS™ Growth Levers",
  "Governed Activation",
  "Measurement",
  "Scale",
] as const;

export const gaTriggers = [
  { name: "Revenue plateau", why: "More of the same activity is no longer producing proportional growth." },
  { name: "New market/geography", why: "The company must redefine audience, positioning, channels, trust and conversion for a new context." },
  { name: "New product/category", why: "The market needs to understand why the offer matters and why this company should win." },
  { name: "Post-investment scale", why: "Capital needs to be converted into a governed value-creation roadmap." },
  { name: "High marketing spend / low ROI", why: "The system must be diagnosed before increasing spend." },
  { name: "Sales and marketing disconnect", why: "Demand, qualification, nurture, handoff and feedback loops require one architecture." },
  { name: "Rebrand / repositioning", why: "Identity changes must connect to market, customer, conversion and growth outcomes." },
  { name: "Agency proliferation", why: "Execution needs one strategic source of truth and governance layer." },
  { name: "Founder-led selling ceiling", why: "Institutional trust, demand and conversion systems must reduce dependence on the founder." },
  { name: "Competitive disruption", why: "The company must rebuild relevance, authority and demand in a changing market." },
] as const;

export const gaGapSteps = [
  { name: "Current State", q: "What is true today?", out: "Evidence-based LQ™ baseline." },
  { name: "Next Level", q: "What specific business state are we trying to reach?", out: "Target outcomes and strategic definition." },
  { name: "Gap", q: "What prevents movement from current to next?", out: "Pprioritized constraints, dependencies and opportunities." },
  { name: "Architecture", q: "Which integrated systems must change?", out: "PEAK™ / BRANDS™ blueprint." },
  { name: "Activation", q: "What must happen first, by whom and in what sequence?", out: "90-day and phased roadmap." },
  { name: "Measurement", q: "How will we know the system is moving?", out: "Leading, pipeline and outcome KPIs." },
  { name: "Governance", q: "How will decisions, execution and corrections be managed?", out: "Operating cadence, ownership and review model." },
] as const;

export const gaImpactChain = [
  "Architecture quality",
  "Market clarity",
  "Relevant attention",
  "Trust",
  "Engagement",
  "Qualified demand",
  "Conversion",
  "Customer value",
  "Repeatable growth",
] as const;

/* ------------------------------------------------------------ About */

export const principles = [
  { name: "Growth Integration", body: "Everything affecting growth should work as one connected system." },
  { name: "Architected Clarity", body: "Clarity must come before activity." },
  { name: "Governed Execution", body: "Strategy requires ownership, accountability and measurement." },
  {
    name: "Authority Reality",
    body: "Authority must be earned through genuine capability, evidence and contribution—not manufactured perception.",
  },
] as const;

/* ------------------------------------------------------------ Insights */

export const insightCategories = [
  { slug: "growth-architecture", name: "Growth Architecture", body: "Why businesses plateau and what actually unlocks the next level." },
  { slug: "personal-authority", name: "Personal Authority", body: "How founders, CEOs and leaders build meaningful market authority." },
  { slug: "brand-positioning", name: "Brand & Positioning", body: "Why being different matters more than simply being visible." },
  { slug: "growth-intelligence", name: "Growth Intelligence", body: "Observations on changing markets, customers and business models." },
  { slug: "leadership", name: "Leadership", body: "The role leaders play in shaping organizational growth." },
  { slug: "level141-perspectives", name: "Level141 Perspectives", body: "Contrarian ideas, frameworks and observations from the Level141 team." },
] as const;

export type InsightCategorySlug = (typeof insightCategories)[number]["slug"];

/** Questions drawn from the Level141 discovery playbooks. */
export const questionsWeAsk = {
  people: [
    "What do you want to be known for three years from now?",
    "What are you currently known for—and is that helping or limiting your next stage?",
    "What expertise or achievements do you believe the market underestimates?",
    "Which opportunities should your reputation create more consistently?",
    "What evidence best proves your impact?",
  ],
  organizations: [
    "What does the next level look like in 12–36 months?",
    "What has stopped the company from reaching it already?",
    "Where does the funnel lose the most value today?",
    "What creates trust before a buyer speaks to sales?",
    "If demand doubled next month, could the organization convert and fulfil it?",
  ],
} as const;
