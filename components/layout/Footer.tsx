import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BracketClose, BracketOpen, LogoLockup } from "@/components/brand/Logo";
import { footerNav, routes, site } from "@/lib/site";

/** Framework descriptors, as worded in the LEVEL141 WEBSITE document. */
const frameworkNotes: Record<string, string> = {
  "LQ™": "Level Quotient",
  "IGF™": "Integrated Growth Framework",
  "BRANDS™": "Six dimensions of growth",
  "PEAK™": "From presence to momentum",
};

function FooterLink({ href, children, note }: { href: string; children: React.ReactNode; note?: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-11 items-center justify-between gap-4 py-2 text-paper/80 transition-colors duration-300 hover:text-paper"
    >
      <span className="flex flex-col">
        <span className="flex items-center gap-2">
          <ArrowRight
            aria-hidden
            className="-ml-6 size-4 shrink-0 text-gold opacity-0 transition-[margin,opacity] duration-300 ease-[var(--ease-architect)] group-hover:ml-0 group-hover:opacity-100 group-focus-visible:ml-0 group-focus-visible:opacity-100"
          />
          <span>{children}</span>
        </span>
        {note ? <span className="mt-0.5 text-sm text-paper-muted">{note}</span> : null}
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      {/* Soft champagne light from the top edge and a faint architectural grid. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(60%_100%_at_50%_0%,rgb(222_187_147/0.10),transparent_70%)]"
      />
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />

      <div className="container-x relative pb-10 pt-20 sm:pt-24 lg:pt-28">
        {/* Closing statement */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <p className="display text-[2.25rem] leading-[1.02] sm:text-5xl lg:col-span-8 lg:text-[3.75rem]">
            Growth Architecture for <span className="serif-accent text-gold">People &amp; Organizations.</span>
          </p>
          <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
            <Link
              href={site.primaryCta.href}
              data-magnetic=""
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-gold px-6 text-[0.95rem] font-medium text-ink transition-colors duration-300 hover:bg-gold-soft"
            >
              {site.primaryCta.label}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="eyebrow text-paper-muted">{site.brandLine}</p>
          </div>
        </div>

        {/* Bracket hairline */}
        <div aria-hidden className="mt-16 flex items-center gap-4 sm:mt-20">
          <BracketOpen className="size-3.5 text-gold" />
          <span className="h-px flex-1 bg-gradient-to-r from-gold/60 via-paper/15 to-gold/60" />
          <BracketClose className="size-3.5 text-gold" />
        </div>

        {/* Columns */}
        <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-3">
            <Link href="/" aria-label="Level141 — Home" className="inline-flex min-h-11 items-center">
              <LogoLockup className="h-6 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs leading-relaxed text-paper-muted">
              Part of the {site.ecosystem} ecosystem, headquartered in {site.headquarters}.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-dark-strong px-3 py-1.5 text-sm text-paper/80">
              <span aria-hidden className="size-1.5 rounded-full bg-gold" />
              {site.headquarters}
            </div>
          </div>

          <nav aria-label="Explore" className="lg:col-span-4 xl:pr-6">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-5">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Frameworks" className="lg:col-span-3">
            <p className="eyebrow text-gold">Frameworks</p>
            <ul className="mt-5 space-y-1">
              {footerNav.frameworks.map((item) => (
                <li key={item.href}>
                  <FooterLink href={item.href} note={frameworkNotes[item.label]}>
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Start your next level" className="lg:col-span-2">
            <p className="eyebrow text-gold">Start your next level</p>
            <ul className="mt-5">
              <li>
                <FooterLink href={`${routes.contact}?interest=personal-brand-architecture`}>
                  Start Your Personal Brand Assessment
                </FooterLink>
              </li>
              <li>
                <FooterLink href={routes.waitlist}>Join the Growth Architecture™ waitlist</FooterLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line-dark pt-8 text-sm text-paper-muted sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Level141. All rights reserved.</p>
          <a
            href="#main"
            className="group inline-flex min-h-11 items-center gap-2 transition-colors hover:text-paper"
          >
            Back to top
            <ArrowUpRight aria-hidden className="size-4 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
