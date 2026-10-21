"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cx } from "@/components/ui/primitives";

/**
 * Back to top — shown only when it is wanted: after the first screen, while
 * the visitor is scrolling back up, and not over the footer. The rest of the
 * time it stays out of the way instead of sitting on top of the content.
 */
export function ScrollToggle() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const goingUp = y < last - 2;
      const goingDown = y > last + 2;
      if (y < window.innerHeight || y > max - 160) setShow(false);
      else if (goingUp) setShow(true);
      else if (goingDown) setShow(false);
      last = y;
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", on);
    };
  }, []);

  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Use the smooth scroller when it is running; otherwise scroll natively.
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={go}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={cx(
        "fixed bottom-5 right-5 z-40 grid size-11 place-items-center glass-control rounded-full border border-line-strong text-ink",
        "transition-[opacity,transform,background-color,color,border-color] duration-300 hover:border-ink hover:bg-ink hover:text-paper",
        "sm:bottom-8 sm:right-8",
        show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0",
        "scroll-toggle",
      )}
    >
      <ArrowUp aria-hidden className="size-5" />
    </button>
  );
}
