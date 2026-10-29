"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { LogoLockup } from "@/components/brand/Logo";

/** Matches the timeline in motion.css (§7): the logo fills, then the screen fades. */
const TOTAL_MS = 3000;

declare global {
  interface Window {
    __l141IntroLoad?: number;
  }
}

/**
 * Home page opening, played on every full load of the home page (not when a
 * visitor returns to Home from another page). The official lockup sits in the
 * centre, drawn faint, and fills from left to right as it loads, with a small
 * loading line beneath; then the screen fades away on the hero. The sequence
 * is CSS, so the screen always clears even if scripts fail; JS only decides
 * whether it plays and removes the node afterwards. Hidden without JS and for
 * reduced motion (motion.css).
 */
export function HomeIntro() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    const html = document.documentElement;
    // Play only when this browser load itself opened the home page, and only once
    // per load: arriving at Home from another page (client navigation) skips it.
    const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const loadedHome = !!entry && new URL(entry.name).pathname === "/";
    if (window.__l141IntroLoad === undefined) window.__l141IntroLoad = loadedHome ? 1 : 0;
    if (!el || !window.__l141IntroLoad || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (el) el.style.display = "none";
      return;
    }
    html.dataset.introActive = "";
    // The load flag is cleared only when the opening finishes, so a repeated
    // effect run (React dev mode runs effects twice) still plays it.
    const end = window.setTimeout(() => {
      window.__l141IntroLoad = 0;
      delete html.dataset.introActive;
      setDone(true);
    }, TOTAL_MS);
    return () => {
      window.clearTimeout(end);
      delete html.dataset.introActive;
    };
  }, []);

  if (done) return null;
  return (
    <>
      <div ref={rootRef} role="status" className="home-intro fixed inset-0 z-110 bg-paper text-ink">
        <div className="flex h-full flex-col items-center justify-center">
          <span aria-hidden className="relative block">
            <LogoLockup title="" className="block h-9 w-auto opacity-15 sm:h-11" />
            <span className="intro-fill absolute inset-0">
              <LogoLockup title="" className="block h-9 w-auto sm:h-11" />
            </span>
          </span>
          <p className="mt-14 text-sm text-ink">Loading Level141</p>
          <span aria-hidden className="relative mt-3 block h-px w-12 overflow-hidden bg-line">
            <span className="intro-track absolute inset-0 origin-left bg-ink" />
          </span>
        </div>
      </div>
    </>
  );
}
