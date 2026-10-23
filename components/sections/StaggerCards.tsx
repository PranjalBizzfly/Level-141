"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Item = {
  n?: string;
  name: ReactNode;
  line?: ReactNode;
  body?: ReactNode;
  aside?: ReactNode;
};

const n2 = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Steps as tiles on an offset three-column grid, a gallery index: the heading
 * opens the top row with the first tiles to its right, and the rest start a
 * lower row at the left. The first time a tile reaches the screen it flies
 * in, the top row from the right edge and the lower one from the left, each
 * row travelling as one coupled train; then they stay put. Motion lives in
 * app/premium.css (none with reduced motion).
 */
export function StaggerCards({
  head,
  items,
}: {
  head?: ReactNode;
  items: readonly Item[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const [seen, setSeen] = useState<ReadonlySet<number>>(new Set());
  const top = Math.floor(items.length / 2); // three columns: 5 → 2 on top, 3 below
  const wide = items.length - top; // five columns, edge to edge: 5 → 3 on top, 2 below

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.i);
          setSeen((s) => new Set(s).add(i));
          io.unobserve(e.target); // once in, a tile never moves again
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    el.querySelectorAll(".stagger-card").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <ol
      ref={ref}
      className="stagger-cards relative grid gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3 lg:gap-y-40"
    >
      {head ? (
        <li className="stagger-head list-none pb-10 sm:col-span-2 lg:[grid-area:1/1/2/2] lg:pb-0 lg:pr-10 2xl:[grid-area:1/1/2/3]">
          {head}
        </li>
      ) : null}
      {items.map((it, i) => {
        const upper = i < top;
        const row = upper ? 1 : 2;
        const dark = i % 2 === 1;
        return (
          <li
            key={i}
            data-row={row}
            data-i={i}
            data-in={seen.has(i) || undefined}
            className="stagger-card relative flex flex-col"
            style={
              {
                "--col": upper ? 2 + i : 1 + i - top,
                "--row": row,
                "--side": upper ? 1 : -1,
                "--col2": i < wide ? 3 + i : 1 + i - wide,
                "--row2": i < wide ? 1 : 2,
                "--side2": i < wide ? 1 : -1,
              } as CSSProperties
            }
          >
            {/* The slot stays still (it is what is watched); the layer inside flies in. */}
            <div className="stagger-fly flex flex-1 flex-col">
              {/* At least square; grows only when its text needs the room, and a row's tiles share one height. */}
              <div
                className={
                  "stagger-tile relative flex aspect-square flex-1 flex-col justify-between gap-8 rounded-[1.5rem] p-7 sm:p-8 2xl:gap-6 2xl:p-7 " +
                  (dark ? "is-dark" : "")
                }
              >
                <span
                  aria-hidden
                  className="font-display text-[clamp(2.6rem,3.4vw,3.2rem)] leading-[0.8] 2xl:text-[2.6rem] tracking-[-0.06em] tabular-nums opacity-90"
                >
                  {it.n ?? n2(i)}
                </span>
                <div>
                  <h3 className="font-display text-[clamp(1.6rem,2.1vw,1.95rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                    {it.name}
                  </h3>
                  {it.line ? (
                    <p className="mt-3 font-medium opacity-90 2xl:mt-2">{it.line}</p>
                  ) : null}
                  {it.body ? (
                    <p className="mt-2 text-[0.95rem] leading-relaxed opacity-65 2xl:text-[0.9rem] 2xl:leading-normal">
                      {it.body}
                    </p>
                  ) : null}
                  {it.aside ? (
                    <p className="mt-5 border-t border-current/15 pt-4 text-[0.95rem] font-medium 2xl:mt-4 2xl:pt-3">
                      {it.aside}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
