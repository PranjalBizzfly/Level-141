import Link from "next/link";
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

const label = "text-xs font-semibold uppercase tracking-[0.16em] text-[#6b6c72] dark:text-[#9a9ba1]";

function FooterLink({ href, children, note }: { href: string; children: React.ReactNode; note?: string }) {
  return (
    <Link
      href={href}
      className="group flex min-h-11 flex-col justify-center py-1.5 text-[1.02rem] leading-snug text-[#2b2c30] transition-colors duration-300 hover:text-[#0d0d0e] dark:text-[#d4d5da] dark:hover:text-white"
    >
      <span className="w-fit bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-architect)] group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
        {children}
      </span>
      {note ? <span className="mt-0.5 text-sm text-[#6b6c72] dark:text-[#9a9ba1]">{note}</span> : null}
    </Link>
  );
}

/**
 * Crystal-clear glass footer: translucent, blurred over soft neutral
 * silver light (neutral, no colour tint), with a crisp white rim, top highlight and a clean shadow.
 * Smoked glass in the dark theme.
 */
export function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative isolate overflow-hidden bg-[#efefef] px-2 pb-2 pt-2 sm:px-3 sm:pb-3 sm:pt-3 lg:px-4 lg:pb-4 lg:pt-4 dark:bg-[#09090a]"
    >
      <h2 id="footer-heading" className="sr-only">
        Site footer
      </h2>

      {/* Light behind the glass */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[18%] h-[26rem] w-[26rem] rounded-full bg-[#d4d4d4]/45 blur-[90px] dark:bg-white/[0.06]" />
        <div className="absolute right-[-6%] top-[8%] h-[30rem] w-[30rem] rounded-full bg-[#dcdcdc]/70 blur-[100px] dark:bg-white/[0.07]" />
        <div className="absolute bottom-[-20%] left-[38%] h-[22rem] w-[34rem] rounded-full bg-white blur-[90px] dark:bg-white/[0.05]" />
      </div>

      <div
        className={[
          "group/panel relative mx-auto w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]",
          "transition-shadow duration-700 ease-[var(--ease-architect)]",
          "bg-white/40 backdrop-blur-2xl backdrop-saturate-150 dark:bg-white/[0.045]",
          "ring-1 ring-white/90 dark:ring-white/[0.14]",
          "shadow-[inset_0_1px_0_rgb(255_255_255/1),inset_0_0_0_1px_rgb(255_255_255/0.35),inset_0_-1px_0_rgb(15_15_20/0.06),0_30px_70px_-28px_rgb(15_15_25/0.30),0_8px_20px_-10px_rgb(15_15_25/0.12)]",
          "dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),inset_0_-1px_0_rgb(0_0_0/0.6),0_40px_80px_-30px_rgb(0_0_0/0.9)]",
          // deeper glass shadow on hover (fine pointers only)
          "[@media(hover:hover)]:hover:shadow-[inset_0_1px_0_rgb(255_255_255/1),inset_0_0_0_1px_rgb(255_255_255/0.45),inset_0_-1px_0_rgb(15_15_20/0.06),0_40px_90px_-30px_rgb(15_15_25/0.38),0_10px_24px_-10px_rgb(15_15_25/0.16)]",
        ].join(" ")}
      >
        {/* Light sweep across the glass on hover, matching the buttons. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_35%,rgb(255_255_255/0.55)_50%,transparent_65%)] bg-[length:260%_100%] bg-[position:130%_0] bg-no-repeat opacity-0 motion-reduce:hidden [@media(hover:hover)]:group-hover/panel:bg-[position:-30%_0] [@media(hover:hover)]:group-hover/panel:opacity-100 [@media(hover:hover)]:group-hover/panel:transition-[background-position,opacity] [@media(hover:hover)]:group-hover/panel:duration-[1400ms] dark:bg-[linear-gradient(110deg,transparent_35%,rgb(255_255_255/0.08)_50%,transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgb(255_255_255/0.55)_0%,transparent_32%,transparent_68%,rgb(255_255_255/0.25)_100%)] dark:opacity-[0.12]"
        />

        <div className="relative px-6 pb-8 pt-10 sm:px-12 sm:pb-10 sm:pt-14 lg:px-20 lg:pt-16 2xl:px-28">
          {/* Closing statement */}
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className="display text-[2.15rem] leading-[1.03] text-[#0d0d0e] sm:text-5xl lg:col-span-8 lg:text-[3.6rem] dark:text-white">
              Growth Architecture For <span className="serif-accent">People &amp; Organizations.</span>
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
            <BracketOpen className="size-3.5 text-[#0d0d0e] dark:text-white" />
            <span className="h-px flex-1 bg-[#0d0d0e]/15 shadow-[0_1px_0_rgb(255_255_255/0.85)] dark:bg-white/12 dark:shadow-none" />
            <BracketClose className="size-3.5 text-[#0d0d0e] dark:text-white" />
          </div>

          {/* Columns */}
          <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-3">
              <Link
                href="/"
                aria-label="Level141 — Home"
                className="inline-flex min-h-11 items-center text-[#0d0d0e] dark:text-white"
              >
                <LogoLockup className="h-6 w-auto" />
              </Link>
              <p className="mt-5 max-w-xs leading-relaxed text-[#4d4e54] dark:text-[#a9aab0]">
                Part of the {site.ecosystem} ecosystem, headquartered in {site.headquarters}.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1.5 text-sm text-[#2b2c30] ring-1 ring-[#0d0d0e]/10 dark:bg-white/[0.06] dark:text-[#d4d5da] dark:ring-white/12">
                <span aria-hidden className="size-1.5 rounded-full bg-[#0d0d0e] dark:bg-white" />
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
            className="mt-14 h-px bg-[#0d0d0e]/12 shadow-[0_1px_0_rgb(255_255_255/0.85)] dark:bg-white/10 dark:shadow-none"
          />
          <p className="mt-6 text-[0.95rem] text-[#4d4e54] dark:text-[#a9aab0]">
            © {new Date().getFullYear()} Level141. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
