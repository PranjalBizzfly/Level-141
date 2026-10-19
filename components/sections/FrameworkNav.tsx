"use client";

import { useEffect, useState } from "react";
import { cx } from "@/components/ui/primitives";

const items = [
  { id: "lq", label: "LQ™" },
  { id: "igf", label: "IGF™" },
  { id: "brands", label: "BRANDS™" },
  { id: "peak", label: "PEAK™" },
] as const;

/**
 * Sticky in-page navigation for the four frameworks on How We Architect Growth.
 * Zero-height sticky wrapper, so it never shifts layout. Plain links: works
 * without JS; with JS the current section is highlighted.
 */
export function FrameworkNav() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="sticky top-16 z-40 h-0">
      <nav aria-label="Frameworks on this page" className="container-x flex justify-center pt-3">
        <ul className="on-dark flex max-w-full gap-1 overflow-x-auto overscroll-x-contain rounded-full [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border border-line-dark-strong bg-ink/90 p-1 text-paper shadow-[0_8px_30px_rgb(0_0_0/0.18)] backdrop-blur-md">
          {items.map((item) => {
            const active = current === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  aria-current={active ? "location" : undefined}
                  className={cx(
                    "inline-flex min-h-11 items-center rounded-full px-3 text-sm sm:px-4 transition-colors duration-300",
                    active ? "bg-gold text-ink" : "text-paper-muted hover:text-paper",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
