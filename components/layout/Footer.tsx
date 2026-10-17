import Link from "next/link";
import { LogoLockup } from "@/components/brand/Logo";
import { footerNav, routes, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="container-x relative pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Level141 — Home" className="inline-block">
              <LogoLockup className="h-6 w-auto" />
            </Link>
            <p className="mt-8 max-w-sm text-xl leading-snug tracking-[-0.01em] text-paper/80">{site.tagline}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/50">
              Part of the {site.ecosystem} ecosystem, headquartered in {site.headquarters}.
            </p>
          </div>

          <nav aria-label="Explore" className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-6 space-y-3">
              {footerNav.explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-paper/75 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Frameworks" className="lg:col-span-3">
            <p className="eyebrow text-gold">Frameworks</p>
            <ul className="mt-6 space-y-3">
              {footerNav.frameworks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline text-paper/75 transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={routes.contact}
              className="mt-10 inline-flex min-h-11 items-center rounded-full border border-paper/25 px-5 text-sm transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              {site.primaryCta.label} →
            </Link>
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-paper/10 pt-8 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-paper/60">{site.brandLine}</p>
          <p>© {new Date().getFullYear()} Level141. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
