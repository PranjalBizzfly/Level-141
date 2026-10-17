"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not(.is-visible), [data-reveal-line]:not(.is-visible)";

/**
 * Adds `.is-visible` to [data-reveal] elements as they enter the viewport.
 * Re-scans on every route change. If IntersectionObserver is unavailable, or
 * something goes wrong, everything is revealed immediately — content is never
 * left hidden.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    const revealAll = () => els.forEach((el) => el.classList.add("is-visible"));

    if (!("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));

    // Failsafe: anything still hidden after 4s (e.g. printing, odd viewports) is shown.
    const failsafe = window.setTimeout(revealAll, 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
