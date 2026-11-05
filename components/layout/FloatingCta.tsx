"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { routes, lqLanding } from "@/lib/site";

/**
 * Floating call to action, always on screen: "Take the Free LQ™ Assessment" on every
 * page except the assessment itself (it opens the LQ landing page). On Growth Architecture
 * (organizations, waitlist only) it is "Join the Waitlist", so the form is one tap away.
 * It rises in shortly after the page opens, and a slow ring pulses around it now and then
 * so it stays noticeable without moving (motion.css §16).
 */
export function FloatingCta() {
  const pathname = usePathname();
  if (pathname === routes.lq) return null;

  const waitlist = pathname === routes.growth;
  const cta = waitlist
    ? { label: "Join the Waitlist", href: "#waitlist" }
    : { label: "Take the Free LQ™ Assessment", href: lqLanding };

  return (
    <Link
      key={pathname}
      href={cta.href}
      className="floating-cta group fixed bottom-5 left-5 z-40 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-5 text-[0.9rem] font-medium text-paper shadow-[0_14px_36px_-12px_rgba(0,0,0,0.55)] ring-1 ring-paper/15 transition-opacity duration-500 hover:opacity-90 sm:bottom-8 sm:left-8 sm:px-6"
    >
      {cta.label}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
    </Link>
  );
}
