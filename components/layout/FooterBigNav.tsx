"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/site";

const items = [
  { href: routes.personalBrand, label: "Personal Brand Architecture™" },
  { href: routes.growth, label: "Growth Architecture™" },
  { href: routes.how, label: "How We Architect Growth" },
  { href: routes.insights, label: "Insights" },
  { href: routes.about, label: "About" },
] as const;

/** Giant stacked menu at the top of the footer; the page you are on is lit. */
export function FooterBigNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main pages" className="footer-bignav pb-14 sm:pb-20">
      <ul>
        {items.map((it) => {
          const on = pathname === it.href;
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={on ? "page" : undefined}
                className={
                  "inline-block font-display text-[clamp(2rem,5.6vw,5rem)] font-medium leading-[1.04] tracking-[-0.045em] " +
                  (on ? "text-black dark:text-white" : "text-black/45 hover:text-black dark:text-white/45 dark:hover:text-white")
                }
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
