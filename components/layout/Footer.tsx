import Link from "next/link";
import { FooterBigNav } from "@/components/layout/FooterBigNav";
import { ArrowRight } from "lucide-react";
import { BracketClose, BracketOpen, LogoLockup } from "@/components/brand/Logo";
import { footerNav, routes, site } from "@/lib/site";

/** Framework descriptors, as worded in the LEVEL141 WEBSITE document. */
const frameworkNotes: Record<string, string> = {
  "LQ™": "Level Quotient",
  "IGF™": "Integrated Growth Framework",
  "BRANDS™": "Six Dimensions Of Growth",
  "PEAK™": "From Presence To Momentum",
};

const nextLevel = [
  { label: "Start Your Personal Brand Assessment", href: `${routes.contact}?interest=personal-brand-architecture` },
  { label: "Join The Growth Architecture™ Waitlist", href: routes.waitlist },
];

const label = "text-xs font-semibold uppercase tracking-[0.16em] text-black/60 dark:text-white/60";

function FooterLink({ href, children, note }: { href: string; children: React.ReactNode; note?: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-11 flex-col justify-center py-1.5 text-[1.02rem] leading-snug text-black/85 transition-colors duration-300 hover:text-black dark:text-white/85 dark:hover:text-white"
    >
      <span className="w-fit bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-architect)] group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
        {children}
      </span>
      {note ? <span className="mt-0.5 text-sm text-black/60 dark:text-white/60">{note}</span> : null}
    </Link>
  );
}

/**
 * Crystal-clear glass footer: translucent, blurred over soft champagne and
 * silver light, with a crisp white rim, top highlight and a clean shadow.
 * Smoked glass in the dark theme.
 */
export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative isolate overflow-hidden bg-white px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3 lg:px-4 lg:pb-4 lg:pt-4 dark:bg-black"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      <div
        className="relative mx-auto w-full border-t border-black/15 dark:border-white/15"
      >

        <div className="relative px-6 pb-8 pt-8 sm:px-12 sm:pb-10 sm:pt-10 lg:px-20 lg:pt-10 2xl:px-28">
          {/* Giant stacked menu, the current page lit (COLLINS footer). */}
          <FooterBigNav />

          {/* Closing statement */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="display text-[2.15rem] leading-[1.03] text-black sm:text-5xl lg:col-span-8 lg:text-[3.6rem] dark:text-white">
              Growth Architecture For <span className="serif-accent">People &amp; Organizations</span>
            </p>
            <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
              <Link
                href={site.primaryCta.href}
                data-magnetic=""
                className="group inline-flex min-h-12 items-center gap-3 whitespace-nowrap rounded-full bg-gold px-7 font-medium text-ink transition-colors duration-300 hover:bg-gold-soft"
              >
                {site.primaryCta.label}
                <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className={label}>{site.brandLine}</p>
            </div>
          </div>

          {/* Bracket hairline */}
          <div aria-hidden className="mt-12 flex items-center gap-4 sm:mt-14">
            <BracketOpen className="size-3.5 text-black dark:text-white" />
            <span className="h-px flex-1 bg-black/15 shadow-[0_1px_0_rgb(255_255_255/0.85)] dark:bg-white/12 dark:shadow-none" />
            <BracketClose className="size-3.5 text-black dark:text-white" />
          </div>

          {/* Columns */}
          <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-3">
              <Link
                href="/"
                aria-label="Level141 — Home"
                className="inline-flex min-h-11 items-center text-black dark:text-white"
              >
                <LogoLockup className="h-[30px] w-auto sm:h-9" />
              </Link>
              <p className="mt-5 max-w-xs leading-relaxed text-black/70 dark:text-white/65">
                Part of the {site.ecosystem} ecosystem, headquartered in {site.headquarters}.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1.5 text-sm text-black/85 ring-1 ring-black/10 dark:bg-white/[0.06] dark:text-white/85 dark:ring-white/12">
                <span aria-hidden className="size-1.5 rounded-full bg-black dark:bg-white" />
                {site.headquarters}
              </div>
            </div>

            <nav aria-label="Explore" className="lg:col-span-3">
              <p className={label}>Explore</p>
              <ul className="mt-4">
                {footerNav.explore.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Frameworks" className="lg:col-span-3">
              <p className={label}>Frameworks</p>
              <ul className="mt-4">
                {footerNav.frameworks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href} note={frameworkNotes[item.label]}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Start your next level" className="lg:col-span-3">
              <p className={label}>Start Your Next Level</p>
              <ul className="mt-4">
                {nextLevel.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Etched divider + copyright */}
          <div
            aria-hidden
            className="mt-14 h-px bg-black/12 shadow-[0_1px_0_rgb(255_255_255/0.85)] dark:bg-white/10 dark:shadow-none"
          />
          <p className="mt-6 text-[0.95rem] text-black/70 dark:text-white/65">
            © {new Date().getFullYear()} Level141. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
