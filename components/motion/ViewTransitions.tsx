"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type StartViewTransition = (cb: () => Promise<void> | void) => { finished: Promise<void> };

/** Jump to the very top without the global smooth-scroll animation. */
function toTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/**
 * Page navigation rules:
 * - Every page opens on its hero. Links to another page always land at the top
 *   (any #section on a cross-page link is dropped), and back/forward does not
 *   restore an old scroll position. Same-page #anchors still scroll in place.
 * - Cross-page fade via the native View Transitions API when available and the
 *   visitor has not asked for reduced motion; otherwise a plain navigation.
 */
export function ViewTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const resolveRef = useRef<(() => void) | null>(null);

  // On every route change (link, back or forward), open the new page on its
  // hero. Repeat on the next frame in case the router restores a position late.
  useEffect(() => {
    toTop();
    const raf = requestAnimationFrame(toTop);
    resolveRef.current?.();
    resolveRef.current = null;
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

      const start = (document as Document & { startViewTransition?: StartViewTransition }).startViewTransition;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (typeof start !== "function" || reduce) {
        router.push(target, { scroll: true });
        return;
      }
      start.call(
        document,
        () =>
          new Promise<void>((resolve) => {
            resolveRef.current = resolve;
            router.push(target, { scroll: true });
            // Never hold the page hostage if the route takes long to render.
            window.setTimeout(resolve, 800);
          }),
      );
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
