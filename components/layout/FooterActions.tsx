"use client";

import { ArrowRight, ArrowUp, Check } from "lucide-react";
import { useState } from "react";
import { HONEYPOT_FIELD, type SubmitResponse } from "@/lib/forms/validation";

/** "Stay Ahead" email field: a pill with a round white submit button inside it. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [startedAt] = useState(() => Date.now());
  const [state, setState] = useState<{ s: "idle" | "sending" | "done" | "error"; msg?: string }>({ s: "idle" });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state.s === "sending") return;
    setState({ s: "sending" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, startedAt: startedAt - 3000, [HONEYPOT_FIELD]: "" }),
      });
      const data = (await res.json().catch(() => null)) as SubmitResponse | null;
      if (data?.ok) return setState({ s: "done" });
      setState({
        s: "error",
        msg: data && data.code === "validation" ? data.errors.email : data && "message" in data ? data.message : "Something went wrong. Please try again.",
      });
    } catch {
      setState({ s: "error", msg: "We couldn't reach the server. Please try again." });
    }
  };

  if (state.s === "done")
    return (
      <p role="status" className="mt-8 flex items-center gap-3 text-[0.95rem] text-[#fff]/80">
        <Check aria-hidden className="size-4" /> Thank you. You&apos;re on the list.
      </p>
    );

  return (
    <form onSubmit={submit} noValidate className="mt-10">
      <div className="flex h-[3.75rem] items-center rounded-full border border-[#fff]/30 pl-6 pr-1.5 transition-colors duration-500 focus-within:border-[#fff]/70 hover:border-[#fff]/60">
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={state.s === "error" ? "footer-email-error" : undefined}
          className="min-w-0 flex-1 bg-transparent text-[0.95rem] text-[#fff] placeholder:text-[#fff]/45 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={state.s === "sending"}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-[#fff] text-[#000] transition-shadow duration-500 hover:shadow-[0_0_0_6px_rgba(255,255,255,0.14)] disabled:opacity-60"
        >
          <ArrowRight aria-hidden className="size-4" />
        </button>
      </div>
      {state.s === "error" ? (
        <p id="footer-email-error" role="alert" className="mt-3 text-sm text-[#fff]/70">
          {state.msg}
        </p>
      ) : null}
    </form>
  );
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="inline-flex min-h-11 items-center gap-3 text-[#fff]/60 transition-colors duration-500 hover:text-[#fff]"
    >
      Back to top
      <ArrowUp aria-hidden className="size-4" strokeWidth={1.5} />
    </button>
  );
}
