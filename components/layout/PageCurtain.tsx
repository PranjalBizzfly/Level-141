"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoLockup } from "@/components/brand/Logo";

const COVER_MS = 550;
const LIFT_MS = 900;

/**
 * Between pages, a black curtain carrying the Level141 lockup rises over the
 * old page, holds while the next page renders, then lifts away to reveal it
 * (the reference sites' loader between pages). Listens in the capture phase,
 * so it sees in-site link clicks before the router handles them. Not shown on
 * the first load (the intro loader covers that) or with reduced motion.
 */
export function PageCurtain() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "cover" | "lift">("idle");
  const started = useRef(0);
  const first = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || url.pathname.startsWith("/api/")) return;
      started.current = performance.now();
      setPhase("cover");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // When the new page is in place, lift once the cover has fully closed.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const wait = Math.max(0, COVER_MS + 120 - (performance.now() - started.current));
    const t1 = window.setTimeout(() => setPhase((p) => (p === "cover" ? "lift" : p)), wait);
    const t2 = window.setTimeout(() => setPhase((p) => (p === "lift" ? "idle" : p)), wait + LIFT_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  if (phase === "idle") return null;
  return (
    <div aria-hidden className="page-curtain" data-phase={phase}>
      <LogoLockup />
    </div>
  );
}
