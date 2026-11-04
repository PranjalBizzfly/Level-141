import type { Metadata, Viewport } from "next";
import { Google_Sans_Flex } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { ScrollToggle } from "@/components/layout/ScrollToggle";
import { themeScript } from "@/lib/theme";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { ViewTransitions } from "@/components/motion/ViewTransitions";
import { Interactions } from "@/components/motion/Interactions";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site, siteUrl, socialLinks } from "@/lib/site";
import "./globals.css";
import "./motion.css";

/* One typeface across the site: Google Sans Flex.
   Weight and size carry emphasis; there is no second (serif) family. */
const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name}: Growth Architecture for People & Organizations`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en",
    title: `${site.name}: ${site.slogan}`,
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
  slogan: site.slogan,
  description: site.description,
  logo: `${siteUrl}/brand/level141-logo-512.png`,
  address: { "@type": "PostalAddress", addressLocality: site.headquarters, addressCountry: "AE" },
  parentOrganization: { "@type": "Organization", name: site.parent },
  ...(socialLinks.some((l) => l.href) ? { sameAs: socialLinks.filter((l) => l.href).map((l) => l.href) } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={googleSans.variable} suppressHydrationWarning>
      <head>
        {/*
          Marks JS as available so reveal animations may hide content until in view.
          Also opens every page on its hero, strictly: no scroll restoration on reload. A #section in
          the address is removed before the browser can jump to it, and ViewTransitions scrolls to
          it once the page has laid out.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.hash){window.__l141Hash=decodeURIComponent(location.hash.slice(1));history.replaceState(history.state,'',location.pathname+location.search)}window.scrollTo(0,0)}catch(e){}",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <FloatingCta />
        <ScrollToggle />
        <RevealObserver />
        <ViewTransitions />
        <Interactions />
        <SmoothScroll />
        <div aria-hidden className="scroll-progress" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
