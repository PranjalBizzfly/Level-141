"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ArrowRight } from "lucide-react";
import { cx } from "@/components/ui/primitives";
import { routes } from "@/lib/site";

// Shown once the visitor is past the first screen, and hidden again near the end of
// the page, where the closing call to action and the footer take over.
function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}
function getVisible() {
  const y = window.scrollY;
  const end = document.documentElement.scrollHeight - window.innerHeight;
  const waitlist = document.getElementById("waitlist")?.getBoundingClientRect();
  const atWaitlist = waitlist ? waitlist.top < window.innerHeight && waitlist.bottom > 0 : false;
  return y > window.innerHeight * 0.8 && y < end - window.innerHeight * 0.9 && !atWaitlist;
}
const getServerVisible = () => false;

/**
 * Floating call to action: "Take the Free LQ™ Assessment" on every page except the
 * assessment itself. On Growth Architecture (organizations, waitlist only) it is
 * "Join the Waitlist" instead, so the form at the bottom is always one tap away.
 */
export function FloatingCta() {
  const pathname = usePathname();
  const visible = useSyncExternalStore(subscribe, getVisible, getServerVisible);
  if (pathname === routes.lq) return null;

  const waitlist = pathname === routes.growth;
  const cta = waitlist
    ? { label: "Join the Waitlist", href: "#waitlist" }
    : { label: "Take the Free LQ™ Assessment", href: routes.lq };

  return (
    <Link
      href={cta.href}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cx(
        "group fixed bottom-5 left-5 z-40 inline-flex min-h-12 items-center gap-3 rounded-full border border-[#fff]/25 bg-[#000] px-5 text-[0.9rem] font-medium text-[#fff] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] sm:bottom-8 sm:left-8 sm:px-6",
        "transition-[opacity,transform,background-color,color] duration-500 hover:bg-[#fff] hover:text-[#000]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      {cta.label}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
