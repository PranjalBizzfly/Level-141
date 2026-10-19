"use client";

import { useEffect } from "react";

/**
 * Pointer-driven micro-interactions, delegated from one listener:
 *  - [data-spotlight]: sets --mx/--my so a soft glow follows the cursor.
 *  - [data-magnetic]: primary CTAs lean slightly toward the cursor.
 * Only on fine pointers (mouse/trackpad) and when motion is allowed;
 * touch devices and reduced-motion users get the static design.
 */
export function Interactions() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    let frame = 0;
    let lastMagnet: HTMLElement | null = null;

    const release = (el: HTMLElement | null) => {
      if (!el) return;
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = e.target as Element | null;

        const spot = target?.closest?.<HTMLElement>("[data-spotlight]");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--my", `${e.clientY - r.top}px`);
        }

        const magnet = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
        if (magnet !== lastMagnet) {
          release(lastMagnet);
          lastMagnet = magnet;
        }
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
          const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
          magnet.style.setProperty("--tx", `${Math.max(-8, Math.min(8, dx))}px`);
          magnet.style.setProperty("--ty", `${Math.max(-6, Math.min(6, dy))}px`);
        }
      });
    };

    const onLeave = () => {
      release(lastMagnet);
      lastMagnet = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
