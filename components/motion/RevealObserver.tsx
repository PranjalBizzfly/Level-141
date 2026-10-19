"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR =
  "[data-reveal]:not(.is-visible), [data-reveal-line]:not(.is-visible), [data-seq]:not(.is-visible)";

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
      // Reveal just before content enters the viewport, so a section is never
      // blank on screen while its animation runs.
      { rootMargin: "0px 0px 12% 0px", threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));

    // Failsafe: anything in view or already scrolled past that is still hidden
    // after 4s is shown. Content further down keeps its scroll animation.
    const revealPassed = () =>
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      });
    const failsafe = window.setTimeout(revealPassed, 4000);
    // Printing needs every section visible.
    window.addEventListener("beforeprint", revealAll);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener("beforeprint", revealAll);
    };
  }, [pathname]);

  return null;
}
