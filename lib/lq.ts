/**
 * LQ™ Assessment — questions, scoring model and report rules.
 * Source of truth: "Claimed LQ Assessment Guide" (Level141, 27 October 2026).
 * All wording below is taken from that guide; nothing here is to be reworded
 * without a matching change to the guide.
 */

export type CategoryKey = "V" | "I" | "B" | "E";

export const categories: { key: CategoryKey; name: string; weight: number; blurb: string }[] = [
  { key: "V", name: "Visionary Leadership", weight: 30, blurb: "What you stand for, and whether others can repeat it" },
  { key: "I", name: "Impact", weight: 25, blurb: "The proof behind you, and whether it holds up when checked" },
  { key: "B", name: "Business Growth", weight: 25, blurb: "Whether the people who decide your next stage can reach and see you" },
  { key: "E", name: "Evolution", weight: 20, blurb: "Where you are heading, and the knowledge you are building" },
];

/* ------------------------------------------------------------ Context questions */

export type ContextOption = { value: string; label: string; wording?: string; flags?: number[] };

export const roleQuestion = {
  id: 1,
  title: "Which best describes your role?",
  options: [
    { value: "founder", label: "Founder or entrepreneur", wording: "As a founder" },
    { value: "ceo", label: "CEO or managing director", wording: "As a chief executive" },
    { value: "investor", label: "Investor", wording: "As an investor" },
    { value: "nextgen", label: "Next-generation or family-business leader", wording: "As a next-generation leader" },
    { value: "senior", label: "Senior professional (employed, not running an organisation)", wording: "As a senior professional" },
    { value: "expert", label: "Independent expert, consultant or adviser", wording: "As an independent expert" },
    { value: "none", label: "Prefer not to say", wording: "As a leader" },
  ] satisfies ContextOption[],
};

export const goalQuestion = {
  id: 2,
  title: "What’s the biggest moment you want your reputation to bring you in the next 2 years?",
  options: [
    { value: "capital", label: "Raise capital or win investor confidence", flags: [6, 7, 5] },
    { value: "clients", label: "Win larger clients, partners or deals", flags: [3, 5, 7] },
    { value: "board", label: "Earn board, advisory or trusted-adviser roles", flags: [6, 7, 8] },
    { value: "talent", label: "Attract senior talent or build a leadership team", flags: [3, 4, 9] },
    { value: "role", label: "Step into a bigger role or lead a larger organisation", flags: [9, 7, 6] },
    { value: "voice", label: "Become a recognised industry voice (speaking, media, publishing)", flags: [4, 5, 10] },
    { value: "undefined", label: "I have not defined it yet", flags: [9] },
  ] satisfies ContextOption[],
};

/* ------------------------------------------------------------- Scored questions */

export type ScoredQuestion = {
  id: number;
  category: CategoryKey;
  subFactor: string;
  title: string;
  /** Answer labels in order; points are 100 / 50 / 0 / 0. */
  answers: [string, string, string, string];
  /** The LQ Standard's test, as stated in the guide's rationale for full points. */
  test: string;
  whyItMatters?: string;
  service: string;
};

const yesPartlyNo: [string, string, string, string] = ["Yes", "Partly", "No", "Not sure"];
export const answerPoints = [100, 50, 0, 0] as const;

export const scoredQuestions: ScoredQuestion[] = [
  {
    id: 3,
    category: "V",
    subFactor: "V1 Positioning Precision",
    title: "Does your audience see you exactly the way you see yourself?",
    answers: yesPartlyNo,
    test: "Your positioning is clearly stated and repeated by your audience in its own words (the Echo Test).",
    service: "Module 2 Visionary Leadership Architecture",
  },
  {
    id: 4,
    category: "V",
    subFactor: "V3 Territory Ownership",
    title: "Have you published or spoken on your key topics 6 times in the past year?",
    answers: yesPartlyNo,
    test: "Six public outputs in 12 months on two or three named subjects.",
    service: "Module 4 Thought Leadership Architecture",
  },
  {
    id: 5,
    category: "I",
    subFactor: "I2 External Validation",
    title: "Have 2 or more independent, unpaid sources featured you in the past year (a publication, an award, a ranking or a citation)?",
    answers: yesPartlyNo,
    test: "Public third-party validation in the last 12 months, tightened here to two independent, unpaid sources.",
    whyItMatters: "Your own channels are claims. Independent coverage is proof that someone else rates you.",
    service: "Module 5 Impact & Trust Architecture",
  },
  {
    id: 6,
    category: "I",
    subFactor: "I1 Evidence Depth",
    title: "Are your results documented, like paying customers, client results or past achievements?",
    answers: yesPartlyNo,
    test: "Proof of results, such as paying customers, client results or past achievements, that can be shown to someone outside the organisation.",
    service: "Module 5 Impact & Trust Architecture",
  },
  {
    id: 7,
    category: "B",
    subFactor: "B2 Audience Fit",
    title: "Do your key stakeholders know who you are and what you stand for?",
    answers: ["They know my position", "They know my name", "They don’t know me yet", "Not sure"],
    test: "The people who decide the next stage understand the leader's position.",
    service: "Module 6 Opportunity Architecture",
  },
  {
    id: 8,
    category: "B",
    subFactor: "B1 Opportunity Flow",
    title:
      "In the past year, have at least three or more relevant opportunities (investment, partnership, board seat or keynote) come from people who didn’t already know you?",
    answers: yesPartlyNo,
    test: "Three relevant, unprompted opportunities in 12 months, tightened here to people who did not already know the leader.",
    whyItMatters: "Opportunities from strangers are the clearest sign your reputation is working without you in the room.",
    service: "Module 6 Opportunity Architecture",
  },
  {
    id: 9,
    category: "E",
    subFactor: "E1 Ambition Definition",
    title: "Is your next business milestone written down with a date and a target?",
    answers: yesPartlyNo,
    test: "A dated, measurable ambition in writing.",
    service: "Module 7 Evolution & Governance",
  },
  {
    id: 10,
    category: "E",
    subFactor: "E3 Knowledge Compounding",
    title: "Have you published a book, framework, or method that others use or quote?",
    answers: yesPartlyNo,
    test: "Original knowledge that others cite, reuse or teach.",
    service: "Module 7 Evolution & Governance",
  },
];

/* ------------------------------------------------------------------ Bands */

export const bands = [
  {
    level: 5,
    name: "Reference",
    min: 85,
    reading: "A default name in your category.",
    profile:
      "Your answers describe a leader whose position, proof and reach are already established.",
    next: "Compound knowledge and steward the field. The useful question now is whether an independent review would confirm what you see.",
  },
  {
    level: 4,
    name: "Authoritative",
    min: 70,
    reading: "Recognised for a territory.",
    profile:
      "Your answers describe a clear position with real pull. The remaining gaps are usually about the proof and structure behind it.",
    next: "Own the territory and convert reputation into opportunity: a documented point of view, independent confirmation and a clear route to the people who decide.",
  },
  {
    level: 3,
    name: "Established",
    min: 50,
    reading: "Clear and credible to your core audience.",
    profile:
      "Your answers describe a leader who knows what they stand for and is credible to the people closest to them, with reach still to extend.",
    next: "Extend reach and add third-party validation. This is the step where authority starts to create opportunity.",
  },
  {
    level: 2,
    name: "Emerging",
    min: 30,
    reading: "Visible in parts.",
    profile: "Your answers describe real substance that shows up unevenly. Story and proof are not yet joined up.",
    next: "Join up story and proof, so every appearance, article and introduction adds to the same picture.",
  },
  {
    level: 1,
    name: "Latent",
    min: 0,
    reading: "Substance the market cannot yet see.",
    profile: "Your answers point to experience and results that are not yet written, published or findable.",
    next: "Build the foundation first: a clear position and a small body of proof, before any visibility effort.",
  },
] as const;

export type Band = (typeof bands)[number];

export function categoryLabel(score: number) {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Solid";
  if (score >= 40) return "Developing";
  if (score >= 20) return "Thin";
  return "Largely absent";
}

export function presenceReading(gap: number) {
  if (gap >= 25) return { name: "Wide", text: "The foundation is well ahead of what is visible." };
  if (gap >= 10) return { name: "Noticeable", text: "Part of what you hold has not yet become visible." };
  if (gap > -10) return { name: "Aligned", text: "What you hold and what the market can see are broadly in step." };
  return { name: "Footprint ahead", text: "Your visible footprint is ahead of the foundation behind it." };
}

/* ---------------------------------------------------------------- Scoring */

/** Answer index (0–3) per scored question id. */
export type Answers = Record<number, number>;

const roundHalfUp1 = (n: number) => Math.round(n * 10 + 1e-9) / 10;
const avg = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const pts = (answers: Answers, id: number) => answerPoints[answers[id]];

export function scoreAssessment(answers: Answers, roles: string[], goals: string[]) {
  const cats = categories.map((c) => {
    const qs = scoredQuestions.filter((q) => q.category === c.key);
    const score = avg(qs.map((q) => pts(answers, q.id)));
    return { ...c, score, label: categoryLabel(score), points: (score * c.weight) / 100 };
  });
  const lq = roundHalfUp1(cats.reduce((s, c) => s + c.points, 0));
  const band = bands.find((b) => lq >= b.min)!;

  const sorted = [...cats].sort((a, b) => b.score - a.score || b.weight - a.weight);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  const goalFlags = new Set(goalQuestion.options.filter((o) => goals.includes(o.value)).flatMap((o) => o.flags));
  const weightOf = (q: ScoredQuestion) => categories.find((c) => c.key === q.category)!.weight;

  // Strengths: Yes answers, up to three.
  const strengths = scoredQuestions
    .filter((q) => answers[q.id] === 0)
    .sort((a, b) => Number(goalFlags.has(b.id)) - Number(goalFlags.has(a.id)) || weightOf(b) - weightOf(a) || a.id - b.id)
    .slice(0, 3);

  // Gaps: answers at 50 points or below, lowest first; ties to the goal, then the heavier category. Two to four.
  const gaps = scoredQuestions
    .filter((q) => pts(answers, q.id) <= 50)
    .sort(
      (a, b) =>
        pts(answers, a.id) - pts(answers, b.id) ||
        Number(goalFlags.has(b.id)) - Number(goalFlags.has(a.id)) ||
        weightOf(b) - weightOf(a) ||
        a.id - b.id,
    )
    .slice(0, 4)
    .map((q) => ({ ...q, answer: q.answers[answers[q.id]], forGoal: goalFlags.has(q.id) }));

  // Presence Gap: Foundation (Q6, Q9) minus Footprint (Q3, Q4, Q5, Q7, Q8, Q10).
  const foundation = avg([6, 9].map((id) => pts(answers, id)));
  const footprint = avg([3, 4, 5, 7, 8, 10].map((id) => pts(answers, id)));
  const presenceGap = foundation - footprint;

  const roleOpt = roleQuestion.options.find((o) => roles.includes(o.value)) ?? roleQuestion.options.at(-1)!;

  return {
    lq,
    band,
    categories: cats,
    strongest,
    weakest,
    strengths,
    gaps,
    presence: { foundation, footprint, gap: presenceGap, ...presenceReading(presenceGap) },
    roleWording: roleOpt.wording,
    roleLabels: roleQuestion.options.filter((o) => roles.includes(o.value)).map((o) => o.label),
    goalLabels: goalQuestion.options.filter((o) => goals.includes(o.value)).map((o) => o.label),
  };
}

export type LqResult = ReturnType<typeof scoreAssessment>;
