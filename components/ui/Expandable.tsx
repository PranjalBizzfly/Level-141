"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

/**
 * Keeps long documented lists calm: the first items are shown by the parent,
 * the remainder sits behind a "View all" control. Content is server-rendered
 * (hidden, not removed) so it stays accessible and indexable.
 */
export function Expandable({
  children,
  count,
  noun,
  dark,
}: {
  children: ReactNode;
  /** Total number of items in the full list, shown in the control. */
  count: number;
  noun: string;
  dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <>
      <div id={id} hidden={!open} className={open ? "animate-fade [animation-duration:0.5s]" : undefined}>
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={
          "group mt-8 inline-flex min-h-11 items-center gap-3 rounded-full border px-5 text-sm font-medium " +
          (dark ? "border-paper/25 text-paper hover:border-paper/60" : "border-line-strong text-ink hover:border-ink")
        }
      >
        <Plus aria-hidden className={"size-4 transition-transform duration-300 " + (open ? "rotate-45" : "")} />
        {open ? "Show less" : `View all ${count} ${noun}`}
      </button>
    </>
  );
}
