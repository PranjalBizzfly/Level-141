"use client";

import { useEffect } from "react";

/**
 * Inertial wheel scrolling for desktop: wheel and trackpad input eases to a
 * stop instead of stepping. Deliberately limited so it never hijacks
 * navigation:
 *  - mouse/trackpad only (fine pointer); touch, keyboard, scrollbar dragging,
 *    anchor links and programmatic scrolls stay native;
 *  - ignored inside anything that can scroll itself (menus, nav strips,
 *    text areas), with ctrl/⌘ held (zoom), and while the page is locked
 *    (e.g. the mobile menu is open);
 *  - fully disabled under prefers-reduced-motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const EASE = 0.1; // share of the remaining distance covered per frame
    let target = window.scrollY;
    let current = window.scrollY;
    let frame = 0;
    let animating = false;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const step = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        animating = false;
      }
      window.scrollTo({ top: current, behavior: "instant" });
      if (animating) frame = requestAnimationFrame(step);
    };

    /** True if the element (or an ancestor) can itself scroll in this direction. */
    const scrollsItself = (start: EventTarget | null, dy: number, dx: number) => {
      let el = start instanceof Element ? start : null;
      while (el && el !== document.body && el !== document.documentElement) {
        const s = getComputedStyle(el);
        if (dy && /(auto|scroll)/.test(s.overflowY) && el.scrollHeight > el.clientHeight) {
          const atTop = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
          if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) return true;
        }
        if (dx && /(auto|scroll)/.test(s.overflowX) && el.scrollWidth > el.clientWidth) return true;
        if (el.tagName === "TEXTAREA" || el.tagName === "SELECT") return true;
        el = el.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;
      if (document.documentElement.dataset.motion === "off") return;
      if (document.body.style.overflow === "hidden") return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal gestures stay native
      if (scrollsItself(e.target, e.deltaY, e.deltaX)) return;

      e.preventDefault();
      const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight : 1;
      if (!animating) target = current = window.scrollY;
      target = Math.max(0, Math.min(maxScroll(), target + e.deltaY * unit));
      if (!animating) {
        animating = true;
        frame = requestAnimationFrame(step);
      }
    };

    // Keyboard, scrollbar, anchors, the scroll button and route changes move
    // the page natively; follow them so the next wheel starts from there.
    const onScroll = () => {
      if (!animating) target = current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
