"use client";

import { useEffect, useRef } from "react";

/**
 * Studio-style cursor companion (desktop, fine pointer, motion allowed only).
 * A small ring trails the pointer; it swells over links and buttons and shows
 * a "View" label over elements marked [data-cursor="view"]. The native
 * pointer stays visible, so clicking behaves exactly as normal.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const el = ring.current;
    if (!el || !fine.matches || reduce.matches) return;

    let x = -100, y = -100, cx = -100, cy = -100, frame = 0;
    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      el.style.translate = `${cx}px ${cy}px`;
      frame = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.visible = "true";
      const target = e.target as Element | null;
      const view = target?.closest?.('[data-cursor="view"]');
      const interactive = target?.closest?.("a, button, [role='tab'], summary, label");
      el.dataset.state = view ? "view" : interactive ? "hover" : "idle";
    };
    const onLeave = () => {
      el.dataset.visible = "false";
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ring} aria-hidden className="l141-cursor" data-visible="false" data-state="idle">
      <span>View</span>
    </div>
  );
}
