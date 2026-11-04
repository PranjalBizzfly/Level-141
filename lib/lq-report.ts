import { goalQuestion, roleQuestion, scoreAssessment, scoredQuestions, type Answers, type LqResult } from "./lq";

/**
 * The LQ™ report as an email. Same content and wording as the guide's report
 * (score, level, pillars, profile, strengths, gaps, Presence Gap, next stage);
 * it is sent to the visitor instead of being shown on the website.
 */

const fmt = (n: number) => n.toFixed(1);
const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Reads and checks the submitted answers; returns null when anything is missing or out of range. */
export function parseLqAnswers(raw: Record<string, unknown>) {
  const list = (v: unknown) => (typeof v === "string" && v ? v.split(",") : []);
  const roles = list(raw.roles).filter((r) => roleQuestion.options.some((o) => o.value === r));
  const goals = list(raw.goals).filter((g) => goalQuestion.options.some((o) => o.value === g));
  let parsed: unknown;
  try {
    parsed = JSON.parse(typeof raw.answers === "string" ? raw.answers : "");
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const answers: Answers = {};
  for (const q of scoredQuestions) {
    const v = (parsed as Record<string, unknown>)[q.id];
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v >= q.answers.length) return null;
    answers[q.id] = v;
  }
  if (!roles.length || !goals.length) return null;
  return { roles, goals, answers };
}

export function buildLqReport(name: string, input: { roles: string[]; goals: string[]; answers: Answers }) {
  const r: LqResult = scoreAssessment(input.answers, input.roles, input.goals);
  const profile = r.band.profile.replace(/^Your answers/, "your answers");

  const sections: { title: string; lines: string[] }[] = [
    {
      title: "Your four pillars",
      lines: r.categories.map((c) => `${c.name}: ${fmt(c.score)} / 100 (${c.label})`),
    },
    {
      title: "Your profile",
      lines: [
        `${r.roleWording}, ${profile}`,
        `Strongest pillar: ${r.strongest.name} (${fmt(r.strongest.score)}). Weakest: ${r.weakest.name} (${fmt(r.weakest.score)}).`,
      ],
    },
    ...(r.strengths.length ? [{ title: "Key strengths", lines: r.strengths.map((q) => q.test) }] : []),
    ...(r.gaps.length
      ? [
          {
            title: "Visibility and positioning gaps",
            lines: r.gaps.map(
              (g, i) =>
                `${i + 1}. ${g.title} (${g.subFactor}${g.forGoal ? ", matters for your goal" : ""}). Your answer: ${g.answer}. ` +
                `The LQ Standard test: ${g.test} What to do first: ${g.service}.` +
                (g.whyItMatters ? ` Why it matters: ${g.whyItMatters}` : ""),
            ),
          },
        ]
      : []),
    {
      title: `Presence Gap: ${r.presence.name}`,
      lines: [
        r.presence.text,
        `Foundation (what you hold and intend): ${fmt(r.presence.foundation)}. Footprint (what the market can see): ${fmt(r.presence.footprint)}.`,
      ],
    },
    {
      title: "What this means for your next stage",
      lines: [
        r.band.next,
        "This is a self-assessment and a first step towards an evidence-based LQ Audit, not a substitute for one.",
      ],
    },
  ];

  const heading = `Your LQ™ Score: ${fmt(r.lq)} out of 100. Level ${r.band.level} · ${r.band.name}.`;
  const subject = `Your LQ™ report: Level ${r.band.level} · ${r.band.name}`;

  const text = [
    `Hello ${name},`,
    "",
    "Thank you for completing the LQ™ Assessment. Here is your report.",
    "",
    heading,
    r.band.reading,
    "",
    ...sections.flatMap((s) => [s.title.toUpperCase(), ...s.lines, ""]),
    "Level141",
  ].join("\n");

  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:620px">
<p>Hello ${esc(name)},</p>
<p>Thank you for completing the LQ™ Assessment. Here is your report.</p>
<h1 style="font-size:22px;font-weight:500;margin:28px 0 4px">${esc(heading)}</h1>
<p style="margin:0 0 24px;color:#444">${esc(r.band.reading)}</p>
${sections
  .map(
    (s) =>
      `<h2 style="font-size:16px;font-weight:600;margin:28px 0 8px;border-top:1px solid #ddd;padding-top:16px">${esc(s.title)}</h2>` +
      s.lines.map((l) => `<p style="margin:0 0 8px">${esc(l)}</p>`).join(""),
  )
  .join("\n")}
<p style="margin-top:32px">Level141</p>
</div>`;

  // A short summary for the Level141 team's copy.
  const summary = {
    "LQ Score": `${fmt(r.lq)} (Level ${r.band.level} · ${r.band.name})`,
    Role: r.roleLabels.join(", "),
    Goal: r.goalLabels.join(", "),
    Pillars: r.categories.map((c) => `${c.name} ${fmt(c.score)}`).join(", "),
    "Presence Gap": `${r.presence.name} (${fmt(r.presence.gap)})`,
  };

  return { subject, text, html, summary };
}
