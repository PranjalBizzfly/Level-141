"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { altFor } from "@/lib/image-alts";

/* ---------------------------------------------------------------- BigList */

/**
 * Oversized, editorial list (luxury reference "programs"): names set large;
 * hovering one brings the others back and a photograph follows the pointer.
 * The photograph is decorative and only appears for fine pointers.
 */
export function BigList({ items }: {
  items: readonly { key: string; id?: string; name: ReactNode; line?: ReactNode; href?: string; image?: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="biglist relative mt-16 sm:mt-24"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul data-active={active !== null ? "" : undefined}>
        {items.map((it, i) => {
          const inner = (
            <>
              <span className="font-display text-[clamp(1.78rem,3.72vw,3.56rem)] font-medium leading-[0.98] tracking-[-0.045em]">
                {it.name}
              </span>
              <span className="flex items-end justify-between gap-8 sm:max-w-[24rem] sm:shrink-0 sm:items-center sm:text-right lg:ml-24">
                {it.line ? <span className="text-muted">{it.line}</span> : null}
                {it.href ? <ArrowUpRight aria-hidden className="biglist-arrow size-6 shrink-0" /> : null}
              </span>
            </>
          );
          const cls = "biglist-item flex flex-col gap-4 py-12 outline-none sm:flex-row sm:items-center sm:justify-between sm:gap-16 sm:py-24 lg:py-28";
          return (
            <li
              key={it.key}
              id={it.id}
              className="scroll-mt-28"
              data-on={active === i ? "" : undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            >
              {it.href ? (
                <Link href={it.href} className={cls} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
                  {inner}
                </Link>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      {/* Pointer-following photograph (decorative). */}
      <div
        aria-hidden
        className="biglist-photo pointer-events-none absolute left-0 top-0 z-10 hidden aspect-[4/5] w-[min(22vw,20rem)] overflow-hidden rounded-[1.25rem] [@media(hover:hover)]:block"
        data-show={active !== null && items[active]?.image ? "" : undefined}
        style={{ translate: `calc(${pos.x}px - 50%) calc(${pos.y}px - 60%)` }}
      >
        {items.map((it, i) =>
          it.image ? (
            <Image
              key={it.key}
              src={it.image}
              alt={altFor(it.image)}
              fill
              sizes="20rem"
              className={"object-cover grayscale transition-opacity duration-300 " + (active === i ? "opacity-100" : "opacity-0")}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- TiltGrid */

/**
 * Cards that turn toward the pointer in 3D — for a set of equal statements.
 * Keyboard focus lifts the card flat; touch and reduced motion get no tilt.
 */
export function TiltGrid({
  items,
  cols = 3,
}: {
  items: readonly { key: string; title: ReactNode; body?: ReactNode; foot?: ReactNode }[];
  cols?: 2 | 3 | 4;
}) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  const card = "border-[color-mix(in_oklab,currentColor_14%,transparent)] bg-[color-mix(in_oklab,currentColor_3%,transparent)]";
  return (
    <ul className={"tilt-grid mt-12 grid gap-3 sm:mt-16 " + grid}>
      {items.map((it, i) => (
        <TiltCard key={it.key} className={card} index={i}>
          <span aria-hidden className="text-sm tabular-nums opacity-75">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="mt-12">
            <h3 className="font-display text-[1.6rem] font-medium leading-[1.1] tracking-[-0.03em] sm:text-[1.85rem]">{it.title}</h3>
            {it.body ? <p className="mt-6 opacity-70">{it.body}</p> : null}
            {it.foot ? <div className="mt-8 border-t border-current/15 pt-4 text-[0.95rem]">{it.foot}</div> : null}
          </div>
        </TiltCard>
      ))}
    </ul>
  );
}

function TiltCard({ children, className, index }: { children: ReactNode; className: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  return (
    <li
      ref={ref}
      tabIndex={-1}
      className="tilt-wrap [perspective:1100px]"
      style={{ "--i": index } as CSSProperties}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setT({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      }}
      onPointerLeave={() => setT({ x: 0, y: 0 })}
    >
      <div
        className={"tilt-card flex h-full min-h-[17rem] flex-col justify-between rounded-[1.25rem] border p-9 sm:p-10 " + className}
        style={{ "--rx": `${(-t.y * 10).toFixed(2)}deg`, "--ry": `${(t.x * 12).toFixed(2)}deg` } as CSSProperties}
      >
        {children}
      </div>
    </li>
  );
}
