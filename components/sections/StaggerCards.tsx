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
  compact,
  side,
  items,
}: {
  head?: ReactNode;
  /** Smaller tile titles, for longer ones such as quotations. */
  compact?: boolean;
  /** The heading stands beside every row (centred on them) and the tiles keep to its right in a plain grid. */
  side?: boolean;
  items: readonly Item[];
}) {
  const ref = useRef<HTMLOListElement>(null);
  const [seen, setSeen] = useState<ReadonlySet<number>>(new Set());
  // The heading takes the first `span` columns of the top row; tiles fill the
  // rest of it, then whole rows from the left (or, beside the heading, rows
  // to its right only). Rows alternate the side they arrive from: odd rows
  // from the right, even rows from the left.
  const place = (i: number, cols: number, span: number) => {
    const top = cols - span;
    if (side) {
      const row = Math.floor(i / top) + 1;
      return { col: span + 1 + (i % top), row, side: row % 2 ? 1 : -1 };
    }
    const j = i - top;
    const row = i < top ? 1 : 2 + Math.floor(j / cols);
    return { col: i < top ? span + 1 + i : (j % cols) + 1, row, side: row % 2 ? 1 : -1 };
  };
  const lgCols = compact ? 4 : 3;
  const xlCols = compact ? 6 : 5;
  const rows = (cols: number, span: number) => Math.ceil(items.length / (cols - span));

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
      className={
        "stagger-cards relative grid gap-x-5 gap-y-5 sm:grid-cols-2 sm:gap-y-16 " +
        (side ? "stagger-side lg:gap-y-5 " : "lg:gap-y-40 ") +
        (compact ? "lg:grid-cols-4 2xl:gap-x-4" : "lg:grid-cols-3")
      }
      style={{ "--xl-cols": xlCols, "--rows-lg": rows(lgCols, 1), "--rows-xl": rows(xlCols, 2) } as CSSProperties}
    >
      {head ? (
        <li className="stagger-head list-none pb-10 sm:col-span-2 lg:[grid-area:1/1/2/2] lg:pb-0 lg:pr-10 2xl:[grid-area:1/1/2/3]">
          {head}
        </li>
      ) : null}
      {items.map((it, i) => {
        const lg = place(i, lgCols, 1); // three columns (four when compact)
        const xl = place(i, xlCols, 2); // five columns edge to edge (six when compact)
        const dark = i % 2 === 1;
        return (
          <li
            key={i}
            data-i={i}
            data-in={seen.has(i) || undefined}
            className="stagger-card relative flex flex-col"
            style={
              {
                "--col": lg.col,
                "--row": lg.row,
                "--side": lg.side,
                "--col2": xl.col,
                "--row2": xl.row,
                "--side2": xl.side,
              } as CSSProperties
            }
          >
            {/* The slot stays still (it is what is watched); the layer inside flies in. */}
            <div className="stagger-fly flex flex-1 flex-col">
              {/* At least square; grows only when its text needs the room, and a row's tiles share one height. */}
              <div
                className={
                  "stagger-tile relative flex aspect-square flex-1 flex-col justify-between rounded-[1.5rem] " +
                  (compact ? "gap-5 p-6 " : "gap-8 p-7 sm:p-8 2xl:gap-6 2xl:p-7 ") +
                  (dark ? "is-dark" : "")
                }
              >
                <span
                  aria-hidden
                  className={"font-display leading-[0.8] tracking-[-0.06em] tabular-nums opacity-90 " + (compact ? "text-[2.2rem]" : "text-[clamp(2.6rem,3.4vw,3.2rem)] 2xl:text-[2.6rem]")}
                >
                  {it.n ?? n2(i)}
                </span>
                <div>
                  <h3 className={"font-display font-medium leading-[1.05] tracking-[-0.03em] " + (compact ? "text-[clamp(1.25rem,1.35vw,1.4rem)]" : "text-[clamp(1.6rem,2.1vw,1.95rem)]")}>
                    {it.name}
                  </h3>
                  {it.line ? (
                    <p className={"font-medium opacity-90 " + (compact ? "mt-2 text-[0.9rem]" : "mt-3 2xl:mt-2")}>{it.line}</p>
                  ) : null}
                  {it.body ? (
                    <p className={"mt-2 opacity-65 " + (compact ? "text-[0.85rem] leading-normal" : "text-[0.95rem] leading-relaxed 2xl:text-[0.9rem] 2xl:leading-normal")}>
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
