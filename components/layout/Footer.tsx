import Link from "next/link";
import { LogoLockup } from "@/components/brand/Logo";
import { BackToTop, NewsletterForm } from "@/components/layout/FooterActions";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { footerNav, routes, socialLinks, lqLanding } from "@/lib/site";

const explore = [
  { label: "LQ™ Assessment", href: lqLanding },
  { label: "Growth Architecture™", href: routes.growth },
  { label: "Personal Brand Architecture™", href: routes.personalBrand },
  { label: "How We Architect Growth", href: routes.how },
  { label: "Insights", href: routes.insights },
];
// Only pages that exist are listed.
const company = [
  { label: "About", href: routes.about },
  { label: "Blog", href: routes.blog },
  { label: "Start Your Next Level", href: routes.contact },
  { label: "Contact Us", href: routes.contactUs },
];

const link =
  "inline-flex min-h-12 items-center whitespace-nowrap text-[1rem] text-[#fff]/60 transition-colors duration-500 hover:text-[#fff]";
// Social rings fill white on hover; nothing moves.
const ring =
  "grid size-[3.25rem] place-items-center rounded-full border border-[#fff]/25 text-[#fff]/90 transition-colors duration-500 hover:border-[#fff] hover:bg-[#fff] hover:text-[#000]";
const ringIcon = "size-5";

function LinkColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <p className="text-[1.1rem] tracking-[0.06em] text-[#fff]">{title}</p>
      <ul className="mt-9">
        {items.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className={link}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * Footer to the approved mock-up: brand and promise with social rings, two link columns
 * and the "Stay Ahead" signup divided by fine vertical rules, then the legal row with
 * back to top. Black in both themes.
 */
export function Footer() {
  return (
    <footer aria-labelledby="footer-heading" className="relative overflow-hidden bg-[#000] text-[#fff]">
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>
      <div className="relative mx-auto w-full max-w-[104rem] px-5 sm:px-8 lg:px-16 2xl:px-24">
        <div className="grid gap-x-16 gap-y-20 pb-28 pt-36 sm:grid-cols-2 sm:pt-48 lg:pb-40 lg:pt-64 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1.05fr)_minmax(0,0.8fr)_minmax(0,1.2fr)] xl:gap-0">
          {/* Brand */}
          <div className="xl:pr-10 2xl:pr-14">
            <Link href="/" aria-label="Level 141 home" className="inline-flex min-h-11 items-center">
              <LogoLockup className="h-6 w-auto" />
            </Link>
            <p className="mt-10 whitespace-nowrap text-[1.3rem] font-light sm:text-[1.45rem] leading-[1.45] tracking-[-0.015em] text-[#fff]/80">
              Build a stronger personal brand.
              <br />
              Lead with greater impact.
            </p>
            <span aria-hidden className="mt-12 block h-px w-32 bg-[#fff]/40" />
            <ul aria-label="Level 141 on social media" className="mt-12 flex gap-5">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Level 141 on ${l.label}`}
                      className={ring}
                    >
                      <SocialIcon name={l.label} className={ringIcon} />
                    </a>
                  ) : (
                    // No verified address yet: shown, but not a link.
                    <span role="img" aria-label={l.label} title={l.label} className={ring}>
                      <SocialIcon name={l.label} className={ringIcon} />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:border-l xl:border-[#fff]/20 xl:px-10 2xl:px-16 min-[1800px]:px-20">
            <LinkColumn title="Explore" items={explore} />
          </div>
          <div className="xl:border-l xl:border-[#fff]/20 xl:px-10 2xl:px-16 min-[1800px]:px-20">
            <LinkColumn title="Company" items={company} />
          </div>

          {/* Stay Ahead */}
          <div className="xl:border-l xl:border-[#fff]/20 xl:pl-10 2xl:pl-16 min-[1800px]:pl-20">
            <p className="text-[1.6rem] font-light tracking-[-0.015em]">Stay Ahead</p>
            <p className="mt-7 max-w-[19rem] text-[1.1rem] font-light leading-[1.5] text-[#fff]/75">
              Get insights, tools and ideas to build your next level.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4 border-t border-[#fff]/25 pb-32 pt-14 text-[0.95rem] tracking-[0.02em] sm:pb-40 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[#fff]/65">© {new Date().getFullYear()} Level 141. All rights reserved.</p>
          <div className="flex flex-wrap items-center">
            {footerNav.legal.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-11 items-center tracking-[0.06em] text-[#fff]/60 transition-colors duration-500 hover:text-[#fff] ${i ? "ml-8 border-l border-[#fff]/30 pl-8" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <span aria-hidden className="mx-8 hidden h-8 w-px bg-[#fff]/30 sm:block" />
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
