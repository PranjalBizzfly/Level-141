"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { cx } from "@/components/ui/primitives";

// Appears once the visitor has scrolled past the first screen.
function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
const getScrolled = () => window.scrollY > window.innerHeight;
const getServerScrolled = () => false;

export function ScrollToggle() {
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);

  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={go}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={scrolled ? 0 : -1}
      className={cx(
        "fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-[#fff]/30 bg-[#000] text-[#fff]",
        "transition-[opacity,background-color,color] duration-500 hover:bg-[#fff] hover:text-[#000] sm:bottom-8 sm:right-8",
        scrolled ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp aria-hidden className="size-5" />
    </button>
  );
}
