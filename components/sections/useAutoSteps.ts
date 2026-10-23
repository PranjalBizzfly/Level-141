"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/sections/HomeInteractive";

/**
 * Autoplay for step-based sections. Steps advance on their own while the
 * section is on screen; clicking a slide or a step stops on it, clicking
 * again (or scrolling the section away) plays on. `pos` glides smoothly to
 * the active step (it keeps counting up past the last step when looping, so
 * a ring can keep turning forward; `rewind` glides back to the first step
 * instead). Reduced motion: no autoplay.
 */
export function useAutoSteps(n: number, { holdMs = 3000, rewind = false }: { holdMs?: number; rewind?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [target, setTarget] = useState(0); // unwrapped step count
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const posRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
        setVisible(e.isIntersecting);
        if (!e.isIntersecting) setPaused(false); // a tap-pause ends once the section leaves
      }, { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Advance after each hold, only while visible and not paused.
  useEffect(() => {
    if (reduced || paused || !visible || n < 2) return;
    const t = window.setTimeout(() => setTarget((s) => (rewind ? (s + 1) % n : s + 1)), holdMs);
    return () => window.clearTimeout(t);
  }, [reduced, paused, visible, target, holdMs, n, rewind]);

  // Glide pos toward the target.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const from = posRef.current;
    const t0 = performance.now();
    const dur = 800;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      posRef.current = from + (target - from) * e;
      setPos(posRef.current);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced]);

  const active = ((target % n) + n) % n;

  /** Stop on step i (0-based), going forward the short way. Choosing the
   * step it is already stopped on plays again. */
  const goTo = useCallback(
    (i: number) => {
      if (i === active && paused) {
        setPaused(false);
        return;
      }
      setPaused(true);
      setTarget((s) => {
        if (rewind) return i;
        const cur = ((s % n) + n) % n;
        let d = i - cur;
        if (d < 0) d += n;
        return s + d;
      });
    },
    [n, rewind, active, paused],
  );

  /** Step on to the next slide and keep playing. */
  const next = useCallback(() => setTarget((s) => (rewind ? (s + 1) % n : s + 1)), [n, rewind]);
  /** Step back to the previous slide and keep playing. */
  const prev = useCallback(() => setTarget((s) => (rewind ? (s - 1 + n) % n : s - 1)), [n, rewind]);
  /** Bring slide i forward the shorter way round and keep playing. */
  const show = useCallback(
    (i: number) =>
      setTarget((s) => {
        if (rewind) return i;
        let d = i - (((s % n) + n) % n);
        if (d > n / 2) d -= n;
        if (d < -n / 2) d += n;
        return s + d;
      }),
    [n, rewind],
  );

  // Clicking the stage stops on the current slide; clicking again plays on.
  const bind = { onClick: () => setPaused((v) => !v) };
  const resume = useCallback(() => setPaused(false), []);
  /** Pause or play (the visible pause button). */
  const toggle = useCallback(() => setPaused((v) => !v), []);
  return { ref, pos: reduced ? target : pos, active, goTo, next, prev, show, resume, toggle, paused, bind, holdMs };
}
