"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/components/ui/primitives";
import { Field, Honeypot, StatusMessage, fieldA11y, inputClasses, useFormSubmit, useVisibleErrors } from "@/components/forms/fields";
import { routes } from "@/lib/site";
import { limits, normaliseLqContact, validateLqContact, type LqContactInput } from "@/lib/forms/validation";
import { categories, goalQuestion, roleQuestion, scoredQuestions, type Answers } from "@/lib/lq";

/**
 * LQ™ Assessment: intro, ten questions, then name and email. The score and report are
 * calculated on the server and emailed (see app/api/lq); they are never shown on the page.
 */
type Stage = "intro" | "questions" | "details";
const TOTAL = 2 + scoredQuestions.length;

export function LqAssessment() {
  const [stage, setStage] = useState<Stage>("intro");
  const [step, setStep] = useState(0);
  const [roles, setRoles] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answers>({});
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new screen's heading so keyboard and screen-reader users follow the flow.
  useEffect(() => {
    if (stage !== "intro") headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [stage, step]);

  const answered = Number(roles.length > 0) + Number(goals.length > 0) + Object.keys(answers).length;
  const compact = stage !== "intro";

  return (
    <section
      className={cx(
        "on-dark relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper",
        // Questions and the email step fit one screen: less space above, none wasted below.
        compact ? "pb-10 pt-24 sm:pb-14 sm:pt-28" : "pb-28 pt-36 sm:pb-36 sm:pt-48 lg:pb-48 lg:pt-56",
      )}
    >
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
            answered={answered}
            onBack={() => (step === 0 ? setStage("intro") : setStep(step - 1))}
            onNext={() => (step === TOTAL - 1 ? setStage("details") : setStep(step + 1))}
          />
        ) : null}
        {stage === "details" ? (
          <Details
            headingRef={headingRef}
            roles={roles}
            goals={goals}
            answers={answers}
            onBack={() => {
              setStep(TOTAL - 1);
              setStage("questions");
            }}
          />
        ) : null}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Intro */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid gap-20 sm:gap-24 lg:grid-cols-12 lg:items-center lg:gap-x-12">
      <div className="lg:col-span-6">
        <p className="eyebrow animate-fade text-gold">Level 141 · Level Quotient</p>
        <h1 className="display mt-8 animate-rise text-[2.6rem] sm:text-6xl lg:text-[4.5rem] [animation-delay:80ms]">
          LQ<span className="align-super text-[0.4em]">™</span> Assessment
        </h1>
        <p className="mt-10 max-w-xl animate-rise text-lg leading-relaxed text-paper/75 [animation-delay:200ms]">
          A concise assessment of how visible and credible your leadership is to the people who matter: your position,
          your proof, your reach and where you are heading. We email you an LQ Score out of 100, your LQ Level and a
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
          Your LQ Score is based on your own answers. It is a self-assessment, not an audit.
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
  answered: number;
  onBack: () => void;
  onNext: () => void;
};

function QuestionScreen({ step, headingRef, roles, goals, answers, setRoles, setGoals, setAnswers, answered, onBack, onNext }: QProps) {
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
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between gap-6 text-sm text-paper/65">
        <p aria-live="polite">
          Question <span className="text-paper">{step + 1}</span> of {TOTAL}
          {category ? <span className="ml-4 hidden sm:inline">· {category.name}</span> : null}
        </p>
        <p>{answered} answered</p>
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
        className="mt-6 animate-rise [@media(min-height:860px)]:mt-12"
        onSubmit={(e) => {
          e.preventDefault();
          if (selected.length) onNext();
        }}
      >
        <fieldset>
          <legend className="contents">
            <h1 ref={headingRef} tabIndex={-1} className="display max-w-3xl text-[1.6rem] leading-[1.15] outline-none sm:text-[2.1rem] lg:text-[2.5rem]">
              {title}
            </h1>
          </legend>
          {multi ? <p className="mt-4 text-sm text-paper/65">Choose all that apply</p> : null}
          {scored && scored.answers[1] === "Partly" ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/65">
              Answer Yes only when the statement is true today and you could show it. Choose Partly when it is only partly
              true, No when it is not true, and Not sure when you have not checked.
            </p>
          ) : null}
          <div className="mt-6 grid border-t border-paper/15 sm:grid-cols-2 sm:gap-x-10 [@media(min-height:860px)]:mt-10">
            {options.map((o, i) => {
              const checked = selected.includes(o.value);
              const id = `q${step + 1}-${o.value}`;
              return (
                <label
                  key={o.value}
                  htmlFor={id}
                  // Options arrive one after another, just after the question.
                  style={{ animationDelay: `${120 + i * 60}ms` }}
                  className={cx(
                    "flex min-h-12 animate-rise cursor-pointer items-center gap-4 border-b border-paper/15 py-2.5 [@media(min-height:860px)]:min-h-14 [@media(min-height:860px)]:py-4 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-paper/50",
                    checked ? "font-medium text-paper" : "text-paper/70 hover:text-paper",
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
                  {/* One marker for every question: a ring that fills white when chosen, with a
                      dot popping in (multiple choice too). */}
                  <span
                    aria-hidden
                    className={cx(
                      "grid size-5 shrink-0 place-items-center rounded-full border-[1.5px] text-ink transition-colors duration-300",
                      checked ? "border-paper bg-paper" : "border-paper/50",
                    )}
                  >
                    <span
                      className={cx(
                        "size-2 rounded-full bg-ink transition-transform duration-300 ease-[var(--ease-architect)]",
                        checked ? "scale-100" : "scale-0",
                      )}
                    />
                  </span>
                  <span className="text-[1.02rem] leading-snug">{o.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-paper/15 pt-5 [@media(min-height:860px)]:mt-14 [@media(min-height:860px)]:pt-8">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-12 items-center gap-2 text-sm text-paper/70 transition-colors hover:text-paper"
          >
            <span aria-hidden>←</span>
            Previous
          </button>
          <button
            type="submit"
            disabled={!selected.length}
            className="group inline-flex min-h-12 items-center gap-3 rounded-[2px] bg-paper px-7 text-sm font-medium text-ink transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-35"
          >
            {last ? "Continue" : "Next"}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

/* --------------------------------------------------------- Email details */

const emptyContact: LqContactInput = { name: "", email: "" };

function Details({
  headingRef,
  roles,
  goals,
  answers,
  onBack,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  roles: string[];
  goals: string[];
  answers: Answers;
  onBack: () => void;
}) {
  const [values, setValues] = useState<LqContactInput>(emptyContact);
  const { status, submit, serverErrors, markStarted } = useFormSubmit("/api/lq");
  const live = validateLqContact(normaliseLqContact(values));
  const { errors, blur, markSubmitted } = useVisibleErrors<LqContactInput>(live, serverErrors);

  // The answers count as time spent on the form, so the fill-time check never blocks a real visitor.
  useEffect(() => markStarted(), [markStarted]);

  const set = (key: keyof LqContactInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    markSubmitted();
    const first = Object.keys(live)[0];
    if (first) {
      document.getElementById(`lq-${first}`)?.focus();
      return;
    }
    await submit({ ...values, roles: roles.join(","), goals: goals.join(","), answers: JSON.stringify(answers) });
  };

  if (status.state === "success") {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center sm:py-16" role="status">
        <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-full border border-paper/40">
          <Check className="size-6" />
        </span>
        <h1 ref={headingRef} tabIndex={-1} className="display mt-10 text-[2rem] leading-[1.1] outline-none sm:text-5xl">
          Your LQ™ report is on its way
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-paper/75">
          We&apos;ll email your LQ Score, LQ Level and personal report to{" "}
          <strong className="font-medium text-paper">{values.email}</strong>. If it hasn&apos;t arrived soon, please
          check your spam folder.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={routes.personalBrand}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-paper px-7 font-medium text-ink"
          >
            Explore Personal Brand Architecture
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href={routes.home} className="inline-flex min-h-12 items-center px-4 text-paper/75 hover:text-paper">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <p className="text-sm text-paper/65">All {TOTAL} questions answered</p>
      <div aria-hidden className="mt-4 h-px w-full bg-paper" />
      <h1 ref={headingRef} tabIndex={-1} className="display mt-10 text-[1.8rem] leading-[1.15] outline-none sm:mt-12 sm:text-[2.4rem]">
        Where should we send your LQ™ report?
      </h1>
      <p className="mt-4 leading-relaxed text-paper/70">
        Your LQ Score, LQ Level and personal report are sent by email. Level 141 receives a copy, so we can discuss it
        with you if you ask. See the{" "}
        <Link href={routes.privacy} className="text-paper underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>
      <form
        noValidate
        onSubmit={onSubmit}
        className="mt-10 space-y-6 [&_input]:!border-paper/40 [&_input]:!text-paper [&_input:focus]:!border-paper [&_label]:!text-paper [&_label_span]:!text-paper/60"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id="lq-name" label="Name" required error={errors.name}>
            <input
              {...fieldA11y("lq-name", errors.name)}
              type="text"
              autoComplete="name"
              required
              maxLength={limits.name}
              value={values.name}
              onChange={set("name")}
              onBlur={blur("name")}
              className={inputClasses(errors.name)}
            />
          </Field>
          <Field id="lq-email" label="Email" required error={errors.email}>
            <input
              {...fieldA11y("lq-email", errors.email)}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              maxLength={limits.email}
              value={values.email}
              onChange={set("email")}
              onBlur={blur("email")}
              className={inputClasses(errors.email)}
            />
          </Field>
        </div>
        <Honeypot />
        <StatusMessage status={status} />
        <div className="flex items-center justify-between gap-4 border-t border-paper/15 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="-ml-4 inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-paper/75 transition-colors hover:text-paper"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Previous
          </button>
          <button
            type="submit"
            disabled={status.state === "submitting"}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-paper px-7 font-medium text-ink transition-opacity disabled:cursor-wait disabled:opacity-60"
          >
            {status.state === "submitting" ? "Sending…" : "Email My LQ Report"}
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </div>
  );
}
