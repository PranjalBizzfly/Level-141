"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MOTION_KEY = "l141-motion";

/**
 * Page-level luxury motion, applied to every page from the layout:
 *  - Sheets: each top-level section sticks once its end is reached and the
 *    next section slides over it, while the covered one recedes slightly.
 *  - Pause motion: a visitor control that stops all movement (remembered).
 */
export function LuxuryLayer() {
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let stored = false;
    try {
      stored = localStorage.getItem(MOTION_KEY) === "off";
    } catch {}
    document.documentElement.dataset.motion = stored ? "off" : "on";
    const id = requestAnimationFrame(() => setPaused(stored));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    if (secs.length < 2) return;
    secs.forEach((s) => s.classList.add("sheet"));
    // Rhythm: light sections after the opening alternate white and soft grey.
    let light = 0;
    secs.slice(1).forEach((s) => {
      if (s.classList.contains("on-dark")) return;
      if (light++ % 2 === 1) s.classList.add("sheet-alt");
    });

    const layout = () => {
      for (const s of secs) s.style.top = `${Math.min(0, window.innerHeight - s.offsetHeight)}px`;
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        secs.forEach((s, i) => {
          const next = secs[i + 1];
          const top = next ? next.getBoundingClientRect().top : vh;
          const cover = Math.max(0, Math.min(1, (vh - top) / vh));
          s.style.setProperty("--cover", cover.toFixed(3));
        });
      });
    };

    layout();
    onScroll();
    const ro = new ResizeObserver(() => {
      layout();
      onScroll();
    });
    secs.forEach((s) => ro.observe(s));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", layout);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", layout);
      secs.forEach((s) => {
        s.classList.remove("sheet", "sheet-alt");
        s.style.removeProperty("top");
        s.style.removeProperty("--cover");
      });
    };
  }, [pathname]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motion = next ? "off" : "on";
    try {
      localStorage.setItem(MOTION_KEY, next ? "off" : "on");
    } catch {}
  };

  return (
    <div className="lux-hud pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden items-end justify-end px-7 pb-7 text-white mix-blend-difference lg:flex">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={paused}
        className="pointer-events-auto mr-16 inline-flex min-h-11 items-center gap-3 text-[0.78rem] tracking-[0.04em] opacity-70 transition-opacity hover:opacity-100"
      >
        {paused ? "Play motion" : "Pause motion"}
        <span aria-hidden className="grid size-7 place-items-center border border-current/40 text-[0.6rem]">
          {paused ? "▶" : "II"}
        </span>
      </button>
    </div>
  );
}
