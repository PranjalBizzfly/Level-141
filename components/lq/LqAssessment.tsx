"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/components/ui/primitives";
import { routes } from "@/lib/site";
import {
  bands,
  categories,
  goalQuestion,
  roleQuestion,
  scoreAssessment,
  scoredQuestions,
  type Answers,
  type LqResult,
} from "@/lib/lq";

type Stage = "intro" | "questions" | "calculating" | "report";
const TOTAL = 2 + scoredQuestions.length;
const fmt = (n: number) => n.toFixed(1);

export function LqAssessment() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [roles, setRoles] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<LqResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new screen's heading so keyboard and screen-reader users follow the flow.
  useEffect(() => {
    if (stage !== "intro") headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [stage, step]);

  const restart = () => {
    setRoles([]);
    setGoals([]);
    setAnswers({});
    setResult(null);
    setStep(0);
    setStage("intro");
  };

  const calculate = () => {
    setResult(scoreAssessment(answers, roles, goals));
    setStage("calculating");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setStage("report"), reduce ? 300 : 2400);
  };

  return (
    <section className="on-dark relative isolate min-h-[100svh] overflow-hidden bg-ink pb-28 pt-36 text-paper sm:pb-36 sm:pt-48 lg:pb-48 lg:pt-56">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div className="container-x relative">
        {stage === "intro" ? <Intro onStart={() => setStage("questions")} /> : null}
        {stage === "questions" ? (
          <QuestionScreen
            step={step}
            headingRef={headingRef}
            roles={roles}
            goals={goals}
            answers={answers}
            setRoles={setRoles}
            setGoals={setGoals}
            setAnswers={setAnswers}
            onBack={() => (step === 0 ? setStage("intro") : setStep(step - 1))}
            onNext={() => (step === TOTAL - 1 ? calculate() : setStep(step + 1))}
          />
        ) : null}
        {stage === "calculating" ? <Calculating headingRef={headingRef} /> : null}
        {stage === "report" && result ? <Report result={result} headingRef={headingRef} onRetake={restart} /> : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Intro */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid gap-20 sm:gap-24 lg:grid-cols-12 lg:items-center lg:gap-x-12">
      <div className="lg:col-span-6">
        <p className="eyebrow animate-fade text-gold">Level141 · Leadership Quotient</p>
        <h1 className="display mt-8 animate-rise text-[2.6rem] sm:text-6xl lg:text-[4.5rem] [animation-delay:80ms]">
          LQ<span className="align-super text-[0.4em]">™</span> Assessment
        </h1>
        <p className="mt-10 max-w-xl animate-rise text-lg leading-relaxed text-paper/75 [animation-delay:200ms]">
          A concise assessment of how visible and credible your leadership is to the people who matter: your position,
          your proof, your reach and where you are heading. You receive an LQ Score out of 100, your LQ Level and a
          personal report on what to strengthen first.
        </p>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-[0.95rem]">
          {["10 questions", "About three minutes", "Change any answer before you submit"].map((t) => (
            <li key={t} className="flex items-center gap-3">
              <span aria-hidden className="size-1.5 bg-current" />
              {t}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onStart}
          className="group mt-14 inline-flex min-h-14 sm:mt-16 items-center gap-3 rounded-full bg-paper px-8 text-base font-medium text-ink transition-colors hover:bg-paper/85"
        >
          Start Assessment
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
        <p className="mt-8 max-w-sm text-sm leading-relaxed text-paper/60">
          Your LQ Score is based on your own answers. It is a self-assessment, not an audit
        </p>
      </div>
      <ol className="border-t border-paper/40 lg:col-span-5 lg:col-start-8" aria-label="The four V.I.B.E.™ categories">
        {categories.map((c) => (
          <li key={c.key} className="grid grid-cols-[3rem_1fr] gap-6 border-b border-paper/15 py-8 sm:py-10">
            <span aria-hidden className="display text-2xl">
              {c.key}
            </span>
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="mt-2 leading-relaxed text-paper/65">{c.blurb}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------------------------------------------------- Questions */

type QProps = {
  step: number;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  roles: string[];
  goals: string[];
  answers: Answers;
  setRoles: (v: string[]) => void;
  setGoals: (v: string[]) => void;
  setAnswers: (v: Answers) => void;
  onBack: () => void;
  onNext: () => void;
};

function QuestionScreen({ step, headingRef, roles, goals, answers, setRoles, setGoals, setAnswers, onBack, onNext }: QProps) {
  const isRole = step === 0;
  const isGoal = step === 1;
  const scored = !isRole && !isGoal ? scoredQuestions[step - 2] : null;
  const multi = isRole || isGoal;
  const title = isRole ? roleQuestion.title : isGoal ? goalQuestion.title : scored!.title;
  const options = isRole
    ? roleQuestion.options.map((o) => ({ value: o.value, label: o.label }))
    : isGoal
      ? goalQuestion.options.map((o) => ({ value: o.value, label: o.label }))
      : scored!.answers.map((label, i) => ({ value: String(i), label }));
  const selected = isRole ? roles : isGoal ? goals : scored && answers[scored.id] !== undefined ? [String(answers[scored.id])] : [];
  const last = step === TOTAL - 1;
  const category = scored ? categories.find((c) => c.key === scored.category) : null;

  const toggle = (value: string) => {
    if (multi) {
      const cur = isRole ? roles : goals;
      const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
      (isRole ? setRoles : setGoals)(next);
    } else {
      setAnswers({ ...answers, [scored!.id]: Number(value) });
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between gap-6 text-sm text-paper/65">
        <p aria-live="polite">
          Question <span className="text-paper">{step + 1}</span> of {TOTAL}
        </p>
        {category ? <p className="eyebrow">{category.name}</p> : null}
      </div>
      <div
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuemin={0}
        aria-valuemax={TOTAL}
        aria-valuenow={step + 1}
        className="mt-4 h-px w-full bg-paper/15"
      >
        <div className="h-px bg-paper transition-[width] duration-500" style={{ width: `${((step + 1) / TOTAL) * 100}%` }} />
      </div>

      <form
        key={step}
        className="mt-16 animate-rise sm:mt-24"
        onSubmit={(e) => {
          e.preventDefault();
          if (selected.length) onNext();
        }}
      >
        <fieldset>
          <legend className="contents">
            <h1 ref={headingRef} tabIndex={-1} className="display text-[1.8rem] leading-[1.15] outline-none sm:text-4xl lg:text-[2.6rem]">
              {title}
            </h1>
          </legend>
          {multi ? <p className="mt-5 text-paper/60">Choose all that apply</p> : null}
          <div className="mt-12 grid gap-4 sm:mt-14">
            {options.map((o) => {
              const checked = selected.includes(o.value);
              const id = `q${step + 1}-${o.value}`;
              return (
                <label
                  key={o.value}
                  htmlFor={id}
                  className={cx(
                    "flex min-h-16 cursor-pointer items-center gap-5 rounded-2xl px-6 py-4 outline outline-1 transition-colors has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-paper/30",
                    checked ? "bg-paper text-ink outline-paper" : "outline-paper/20 hover:outline-paper/60",
                  )}
                >
                  <input
                    id={id}
                    type={multi ? "checkbox" : "radio"}
                    name={`q${step + 1}`}
                    value={o.value}
                    checked={checked}
                    onChange={() => toggle(o.value)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden
                    className={cx(
                      "grid size-5 shrink-0 place-items-center border",
                      multi ? "rounded-[4px]" : "rounded-full",
                      checked ? "border-ink bg-ink text-paper" : "border-paper/50",
                    )}
                  >
                    {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
                  </span>
                  <span className="text-[1.02rem] leading-snug">{o.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-14 flex items-center justify-between gap-4 sm:mt-16">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-paper/75 transition-colors hover:text-paper"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </button>
          <button
            type="submit"
            disabled={!selected.length}
            className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-paper px-8 font-medium text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
          >
            {last ? "Calculate My LQ Score" : "Next"}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------ Calculating */

function Calculating({ headingRef }: { headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  return (
    <div className="mx-auto grid max-w-xl place-items-center py-32 text-center sm:py-40" role="status">
      <svg viewBox="0 0 100 100" className="size-28 animate-spin [animation-duration:1.6s]" aria-hidden>
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
        <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="70 300" strokeLinecap="round" />
      </svg>
      <h1 ref={headingRef} tabIndex={-1} className="display mt-12 text-3xl outline-none">
        Calculating your LQ Score
      </h1>
      <ul className="mt-8 space-y-3 text-paper/60">
        {categories.map((c, i) => (
          <li key={c.key} className="animate-fade" style={{ animationDelay: `${300 + i * 400}ms` }}>
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------------------------------------------- Report */

function Report({
  result: r,
  headingRef,
  onRetake,
}: {
  result: LqResult;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onRetake: () => void;
}) {
  const profile = r.band.profile.replace(/^Your answers/, "your answers");
  return (
    <article className="mx-auto max-w-5xl">
      {/* Score */}
      <header className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <ScoreRing value={r.lq} />
        </div>
        <div className="lg:col-span-7">
          <p className="eyebrow text-gold">Your LQ™ Score</p>
          <h1 ref={headingRef} tabIndex={-1} className="display mt-8 text-[2.4rem] leading-[1.08] outline-none sm:text-5xl">
            Level {r.band.level} · {r.band.name}
          </h1>
          <p className="mt-6 text-xl text-paper/80">{r.band.reading}</p>
          <dl className="mt-12 grid gap-8 text-sm sm:grid-cols-2">
            <div>
              <dt className="eyebrow text-paper/50">Role</dt>
              <dd className="mt-2 leading-relaxed">{r.roleLabels.join(", ")}</dd>
            </div>
            <div>
              <dt className="eyebrow text-paper/50">Goal</dt>
              <dd className="mt-2 leading-relaxed">{r.goalLabels.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      {/* Pillars */}
      <ReportSection title="Your four pillars">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-20">
          <ul className="space-y-9 lg:col-span-6">
            {r.categories.map((c) => (
              <li key={c.key}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-medium">{c.name}</span>
                  <span className="tabular-nums">
                    {fmt(c.score)} <span className="text-paper/50">/ 100 · {c.label}</span>
                  </span>
                </div>
                <div className="mt-3 h-1 bg-paper/15">
                  <div className="h-1 bg-paper transition-[width] duration-1000" style={{ width: `${c.score}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5 lg:col-start-8">
            <Radar values={r.categories.map((c) => c.score)} labels={r.categories.map((c) => c.name)} />
          </div>
        </div>
        <Ladder score={r.lq} level={r.band.level} />
      </ReportSection>

      {/* Profile */}
      <ReportSection title="Your profile">
        <p className="max-w-3xl text-xl leading-relaxed">
          {r.roleWording}, {profile}
        </p>
        <p className="mt-8 text-paper/70">
          Strongest pillar: {r.strongest.name} ({fmt(r.strongest.score)}). Weakest: {r.weakest.name} ({fmt(r.weakest.score)})
        </p>
      </ReportSection>

      {/* Strengths */}
      {r.strengths.length ? (
        <ReportSection title="Key strengths">
          <ul className="divide-y divide-paper/15 border-y border-paper/15">
            {r.strengths.map((q) => (
              <li key={q.id} className="flex gap-6 py-7 sm:py-8">
                <Check aria-hidden className="mt-1 size-5 shrink-0" />
                <p className="leading-relaxed">{q.test}</p>
              </li>
            ))}
          </ul>
        </ReportSection>
      ) : null}

      {/* Gaps */}
      {r.gaps.length ? (
        <ReportSection title="Visibility and positioning gaps">
          <ol className="grid gap-6 sm:gap-8">
            {r.gaps.map((g, i) => (
              <li key={g.id} className="rounded-2xl p-8 outline outline-1 outline-paper/15 sm:p-12 lg:p-14">
                <div className="flex flex-wrap items-center gap-3 text-sm text-paper/60">
                  <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span>{g.subFactor}</span>
                  {g.forGoal ? (
                    <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-ink">Matters for your goal</span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-xl leading-snug">{g.title}</h3>
                <p className="mt-2 text-paper/60">Your answer: {g.answer}</p>
                <dl className="mt-8 grid gap-6 text-[0.95rem] leading-relaxed sm:grid-cols-2 sm:gap-x-12 sm:gap-y-8">
                  <div>
                    <dt className="eyebrow text-paper/50">The LQ Standard test</dt>
                    <dd className="mt-2">{g.test}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-paper/50">What to do first</dt>
                    <dd className="mt-2">Level141 service for this gap: {g.service}</dd>
                  </div>
                  {g.whyItMatters ? (
                    <div className="sm:col-span-2">
                      <dt className="eyebrow text-paper/50">Why it matters</dt>
                      <dd className="mt-2">{g.whyItMatters}</dd>
                    </div>
                  ) : null}
                </dl>
              </li>
            ))}
          </ol>
        </ReportSection>
      ) : null}

      {/* Presence Gap */}
      <ReportSection title="Held versus visible">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow text-paper/50">Presence Gap</p>
            <p className="display mt-4 text-4xl">{r.presence.name}</p>
            <p className="mt-4 leading-relaxed text-paper/80">{r.presence.text}</p>
          </div>
          <div className="space-y-8 lg:col-span-6 lg:col-start-7">
            {[
              ["Foundation", "What you hold and intend", r.presence.foundation],
              ["Footprint", "What the market can see", r.presence.footprint],
            ].map(([name, hint, v]) => (
              <div key={name as string}>
                <div className="flex justify-between gap-4">
                  <span>
                    {name} <span className="text-paper/50">· {hint}</span>
                  </span>
                  <span className="tabular-nums">{fmt(v as number)}</span>
                </div>
                <div className="mt-3 h-1 bg-paper/15">
                  <div className="h-1 bg-paper" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
            <p className="text-sm leading-relaxed text-paper/55">
              Both averages come from your own answers, so the Presence Gap is a self-view, not a measurement of the market
            </p>
          </div>
        </div>
      </ReportSection>

      {/* Next stage */}
      <ReportSection title="What this means for your next stage">
        <p className="max-w-3xl text-xl leading-relaxed">{r.band.next}</p>
        <p className="mt-8 max-w-3xl leading-relaxed text-paper/70">
          This is a self-assessment and a first step towards an evidence-based LQ Audit, not a substitute for one
        </p>
        <div className="mt-12 flex flex-wrap gap-4 sm:mt-14">
          <Link
            href={`${routes.contact}?interest=personal-brand-architecture`}
            className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-paper px-8 font-medium text-ink"
          >
            Request an LQ Audit
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={routes.contact}
            className="inline-flex min-h-14 items-center gap-3 rounded-full px-8 font-medium outline outline-1 outline-paper/40 hover:outline-paper"
          >
            Discuss my results with Level141
          </Link>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex min-h-14 items-center gap-2 rounded-full px-6 text-paper/75 hover:text-paper"
          >
            <RotateCcw aria-hidden className="size-4" />
            Retake the assessment
          </button>
        </div>
      </ReportSection>
    </article>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-28 border-t border-paper/15 pt-14 sm:mt-36 sm:pt-16 lg:mt-44">
      <h2 className="display mb-12 text-[1.8rem] sm:mb-16 sm:text-4xl lg:mb-20">{title}</h2>
      {children}
    </section>
  );
}

function ScoreRing({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / 1400);
      setShown(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  const c = 2 * Math.PI * 88;
  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[20rem]">
      <svg viewBox="0 0 200 200" className="size-full -rotate-90" aria-hidden>
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - shown / 100)}
        />
      </svg>
      <figcaption className="absolute inset-0 grid place-content-center text-center">
        <span className="display text-7xl tabular-nums">{shown.toFixed(1)}</span>
        <span className="mt-2 text-sm text-paper/60">out of 100</span>
      </figcaption>
    </figure>
  );
}

function Radar({ values, labels }: { values: number[]; labels: string[] }) {
  const R = 90;
  const pt = (i: number, v: number) => {
    const a = (Math.PI / 2) * i - Math.PI / 2;
    return [Math.cos(a) * R * (v / 100), Math.sin(a) * R * (v / 100)];
  };
  const poly = (v: number[]) => v.map((x, i) => pt(i, x).join(",")).join(" ");
  return (
    <svg viewBox="-150 -125 300 250" className="w-full" role="img" aria-label={labels.map((l, i) => `${l} ${fmt(values[i])}`).join(", ")}>
      {[25, 50, 75, 100].map((s) => (
        <polygon key={s} points={poly([s, s, s, s])} fill="none" stroke="currentColor" strokeOpacity="0.15" />
      ))}
      {labels.map((_, i) => {
        const [x, y] = pt(i, 100);
        return <line key={i} x1="0" y1="0" x2={x} y2={y} stroke="currentColor" strokeOpacity="0.15" />;
      })}
      <polygon points={poly(values)} fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5" />
      {labels.map((l, i) => {
        const [x, y] = pt(i, 118);
        return (
          <text key={l} x={x} y={y + 4} textAnchor={i === 1 ? "start" : i === 3 ? "end" : "middle"} fontSize="11" fill="currentColor" opacity="0.75">
            {l}
          </text>
        );
      })}
    </svg>
  );
}

function Ladder({ score, level }: { score: number; level: number }) {
  return (
    <div className="mt-20 sm:mt-24">
      <p className="eyebrow text-paper/50">LQ Level ladder</p>
      <ol className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
        {[...bands].reverse().map((b) => {
          const here = b.level === level;
          return (
            <li key={b.name} aria-current={here ? "step" : undefined}>
              <div className={cx("h-1.5", here ? "bg-paper" : "bg-paper/15")} />
              <p className={cx("mt-3 text-xs sm:text-sm", here ? "font-medium" : "text-paper/55")}>
                <span className="block tabular-nums">
                  {b.level} · {b.min}+
                </span>
                <span className="block">{b.name}</span>
                {here ? <span className="mt-1 block tabular-nums">Your score {score.toFixed(1)}</span> : null}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
