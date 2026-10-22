import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export type LetterItem = { key: string; title: ReactNode; mark: ReactNode; list: readonly string[]; href?: string };

/**
 * Framework columns after the reference service grid: one hairline column per
 * item, a title on top and the mark on the floor. On hover (or keyboard focus)
 * the column widens and a grey list opens beside the mark while the other
 * columns narrow. Below lg the items stack with their lists showing.
 */
export function LetterItems({ items, markClass = "" }: { items: readonly LetterItem[]; markClass?: string }) {
  return (
    <ul className="letter-items mt-12 sm:mt-16">
      {items.map((it) => {
        const inner = (
          <>
            <span className="letter-items__left">
              <span className="flex items-start justify-between gap-3 text-[1.35rem] leading-[1.15] sm:text-[1.6rem] lg:text-[1.35rem] xl:text-[1.6rem]">
                <span className="letter-items__title">{it.title}</span>
                {it.href ? <ArrowRight aria-hidden className="mt-1 size-5 shrink-0 lg:hidden" /> : null}
              </span>
              <span className={"letter-items__mark font-display font-normal leading-[0.85] tracking-[-0.04em] " + markClass}>
                {it.mark}
              </span>
            </span>
            <span className="letter-items__right">
              <ul className="letter-items__list">
                {it.list.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </span>
          </>
        );
        return (
          <li key={it.key} className="letter-items__item">
            {it.href ? (
              <Link href={it.href} className="letter-items__link" data-cursor="view">
                {inner}
              </Link>
            ) : (
              <div tabIndex={0} className="letter-items__link">
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
