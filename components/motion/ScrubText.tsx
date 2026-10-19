"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-linked statement: each word fills from faint to solid as the line
 * travels up the viewport, and empties again when scrolling back. Text is
 * never blurred; it is fully solid once in place. Without JS, or with
 * reduced motion, the statement is simply shown solid.
 */
export function ScrubText({ text, accent, accentClassName = "serif-accent" }: { text: string; accent?: string; accentClassName?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const total = words.length + accentWords.length;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.scrub = "on";
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the line's top reaches 90% of the viewport, 1 when it reaches 40%.
      const progress = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.5)));
      el.style.setProperty("--p", String(progress * (total + 1)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [total]);

  const word = (w: string, i: number) => (
    <span key={i} data-word style={{ "--i": i } as React.CSSProperties}>
      {w}{" "}
    </span>
  );

  return (
    <span ref={ref} className="scrub-text">
      {words.map((w, i) => word(w, i))}
      {accent ? <span className={accentClassName}>{accentWords.map((w, i) => word(w, words.length + i))}</span> : null}
    </span>
  );
}
