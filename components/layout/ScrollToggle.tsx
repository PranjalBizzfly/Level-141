"use client";

import { useSyncExternalStore } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cx } from "@/components/ui/primitives";

// Past the halfway point the button jumps back to the top; before it, to the bottom.
function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
const getPastHalf = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 && window.scrollY > max / 2;
};
const getServerPastHalf = () => false;

export function ScrollToggle() {
  const pastHalf = useSyncExternalStore(subscribe, getPastHalf, getServerPastHalf);
  const label = pastHalf ? "Back to top" : "Go to bottom";
  const Icon = pastHalf ? ArrowUp : ArrowDown;

  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: pastHalf ? 0 : document.documentElement.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={go}
      aria-label={label}
      title={label}
      className={cx(
        "fixed bottom-5 right-5 z-40 grid size-12 place-items-center glass-control rounded-full border border-line-strong text-ink",
        "transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper",
        "sm:bottom-8 sm:right-8",
      )}
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}
