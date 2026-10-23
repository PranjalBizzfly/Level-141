"use client";

import { cx } from "@/components/ui/primitives";

/**
 * Pause / play for anything that moves by itself (WCAG 2.2.2): a small round
 * button that shows two bars while playing and a triangle once paused.
 */
export function PauseButton({ paused, onToggle, label = "autoplay", className }: { paused: boolean; onToggle: () => void; label?: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={paused ? `Play ${label}` : `Pause ${label}`}
      className={cx(
        "grid size-9 shrink-0 place-items-center rounded-full border border-current/30 transition-colors duration-300 hover:bg-current/10",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
        {paused ? <path d="M4.5 2.8v10.4L13 8z" /> : <path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" />}
      </svg>
    </button>
  );
}
