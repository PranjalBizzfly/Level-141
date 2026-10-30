import Link from "next/link";
import { LogoLockup } from "@/components/brand/Logo";
import { footerNav, routes, site } from "@/lib/site";

/** Quiet, centred sign-off on black in both themes: small logo, one row of links, one line of legal. */
export function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-[#000] text-[#fff]">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="mx-auto w-full max-w-[88rem] px-5 pb-12 pt-4 sm:px-8 lg:px-20 2xl:px-28">
        <div className="flex flex-col items-center border-t border-[#fff]/15 pt-20 text-center sm:pt-28">
          <Link href="/" aria-label="Level141 — Home" className="inline-flex min-h-11 items-center">
            <LogoLockup className="h-6 w-auto" />
          </Link>
          <p className="mt-5 text-[0.95rem] text-[#fff]/70">{site.brandLine}</p>
          <nav aria-label="Explore" className="mt-14 sm:mt-16">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-1">
              {[...footerNav.explore, { label: "LQ™ Assessment", href: routes.lq }].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-[0.95rem] text-[#fff]/70 transition-colors duration-500 hover:text-[#fff]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-14 text-sm leading-relaxed text-[#fff]/70 sm:mt-16">
            © {new Date().getFullYear()} Level141. Part of the {site.ecosystem} ecosystem, headquartered in {site.headquarters}.
          </p>
        </div>
      </div>
    </footer>
  );
}
