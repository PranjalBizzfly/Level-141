import type { Metadata, Viewport } from "next";
import { Fraunces, Google_Sans_Flex } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToggle } from "@/components/layout/ScrollToggle";
import { themeScript } from "@/lib/theme";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { ViewTransitions } from "@/components/motion/ViewTransitions";
import { PageCurtain } from "@/components/layout/PageCurtain";
import { Interactions } from "@/components/motion/Interactions";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { site, siteUrl } from "@/lib/site";
import { Mark141 } from "@/components/brand/Mark141";
import "./globals.css";
import "./motion.css";
import "./reference-motion.css";
import "./layouts.css";
import "./premium.css";
import "./home-layers.css";
import "./glass.css";
import "lenis/dist/lenis.css";

/**
 * Typography (client reference): Google Sans Flex for headlines and text, in
 * light weights; Fraunces (light) as the serif accent. The CSS variable names
 * are kept so every component picks the fonts up unchanged.
 */
const geist = Google_Sans_Flex({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

const poppins = Google_Sans_Flex({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-accent-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Growth Architecture for People & Organizations`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en",
    title: `${site.name} — Growth by Design`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: siteUrl,
  slogan: "Growth by Design",
  description: site.description,
  logo: `${siteUrl}/brand/level141-lockup-black.svg`,
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  parentOrganization: { "@type": "Organization", name: "1XL" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${poppins.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Marks JS as available so reveal animations may hide content until in view.
          Also opens every page on its hero, strictly: no scroll restoration on reload, and
          a #section in the address is dropped before the browser can jump to it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);window.scrollTo(0,0)}catch(e){}try{if(!sessionStorage.getItem('l141-intro')){document.documentElement.classList.add('l141-intro');sessionStorage.setItem('l141-intro','1')}}catch(e){}",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {/* Intro loader (first page of a visit only; pure CSS, see motion.css §13). */}
        <div aria-hidden className="l141-loader">
          <Mark141 className="w-28 sm:w-36" textClassName="text-4xl sm:text-5xl" closeClassName="text-white" openClassName="text-white/50" />
        </div>
        <Header />
        <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
          {children}
        </main>
        <Footer />
        <ScrollToggle />
        <RevealObserver />
        <ViewTransitions />
        <PageCurtain />
        <Interactions />
        <SmoothScroll />
        <SplitReveal />
        <div aria-hidden className="scroll-progress" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
