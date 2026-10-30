"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PageCurtain, type CurtainPhase } from "@/components/motion/PageCurtain";
import { mainNav, routes } from "@/lib/site";

const COVER_MS = 750; // curtain fully closed: navigate
const HOLD_MS = 1500; // minimum time from click to lifting, so the name can be read
const LIFT_MS = 850;
const GIVE_UP_MS = 4000; // never hold the page hostage if a route is slow

function pageTitle(path: string) {
  if (path === routes.lq) return "LQ™ Assessment";
  return mainNav.find((n) => n.href === path)?.label ?? "Level141";
}

/** Jump to the very top without the global smooth-scroll animation. */
function toTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/**
 * Page navigation rules:
 * - Every page opens on its hero. Links to another page always land at the top
 *   (any #section on a cross-page link is dropped), and back/forward does not
 *   restore an old scroll position. Same-page #anchors still scroll in place.
 * - Cross-page links play the silk curtain (PageCurtain) with the page's name,
 *   unless the visitor has asked for reduced motion. Back/forward stay instant.
 */
export function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const [title, setTitle] = useState("");
  const liftRef = useRef<(() => void) | null>(null);

  // On every route change (link, back or forward), open the new page on its
  // hero. Repeat on the next frame in case the router restores a position late.
  useEffect(() => {
    toTop();
    const raf = requestAnimationFrame(toTop);
    liftRef.current?.();
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page (incl. #anchors): let the browser handle it
      if (url.pathname.startsWith("/api/")) return;

      e.preventDefault();
      const target = url.pathname + url.search; // no #hash: the next page opens on its hero

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(target, { scroll: true });
        return;
      }
      const started = performance.now();
      setTitle(pageTitle(url.pathname));
      setPhase("in");
      const lift = () => {
        liftRef.current = null;
        window.clearTimeout(giveUp);
        const wait = Math.max(0, HOLD_MS - (performance.now() - started));
        window.setTimeout(() => {
          setPhase("out");
          window.setTimeout(() => setPhase("idle"), LIFT_MS);
        }, wait);
      };
      const giveUp = window.setTimeout(lift, GIVE_UP_MS);
      window.setTimeout(() => {
        liftRef.current = lift;
        router.push(target, { scroll: true });
      }, COVER_MS);
    };
    // Capture phase: runs before next/link, which would otherwise navigate first.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return <PageCurtain phase={phase} title={title} />;
}
