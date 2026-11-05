"use client";

import { LogoSymbol } from "@/components/brand/Logo";
import { cx } from "@/components/ui/primitives";

export type CurtainPhase = "idle" | "in" | "out";

/**
 * Full-screen page-change curtain: a plain black panel rises, the Level 141 symbol and
 * the next page's name settle in while a hairline draws across beneath them, then the
 * panel lifts away. Quiet and architectural: no texture, only type, line and black.
 */
export function PageCurtain({ phase, title }: { phase: CurtainPhase; title: string }) {
  const shown = phase === "in";
  return (
    <div
      aria-hidden
      data-curtain={phase}
      className={cx(
        "fixed inset-0 z-[100] overflow-hidden bg-[#000] text-[#fff] transition-[clip-path] duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "in"
          ? "[clip-path:inset(0_0_0_0)]"
          : phase === "out"
            ? "[clip-path:inset(0_0_100%_0)]"
            : "invisible [clip-path:inset(100%_0_0_0)] !duration-0",
      )}
    >
      <div className="absolute inset-x-0 bottom-[22%] px-6 sm:px-12 lg:px-20">
        <LogoSymbol
          title=""
          className={cx(
            "size-8 transition-[opacity,transform] duration-700 ease-out sm:size-10",
            shown ? "translate-y-0 opacity-100 delay-150" : "translate-y-4 opacity-0",
          )}
        />
        <p
          className={cx(
            "mt-8 text-[clamp(2.75rem,9vw,8.5rem)] font-light leading-[1] tracking-[-0.035em] transition-[opacity,transform] duration-700 ease-out",
            shown ? "translate-y-0 opacity-100 delay-200" : "translate-y-8 opacity-0",
          )}
        >
          {title}
        </p>
        <span
          className={cx(
            "mt-10 block h-px origin-left bg-[#fff]/35 transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            shown ? "scale-x-100 delay-300" : "scale-x-0",
          )}
        />
      </div>
    </div>
  );
}
