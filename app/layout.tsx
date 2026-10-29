import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToggle } from "@/components/layout/ScrollToggle";
import { themeScript } from "@/lib/theme";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { ViewTransitions } from "@/components/motion/ViewTransitions";
import { Interactions } from "@/components/motion/Interactions";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";
import "./motion.css";
import "./glass.css";

/* One typeface across the site: Geist, the brand typeface the logo is set in.
   Weight and size carry emphasis; there is no second (serif) family. */
const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Growth Architecture for People & Organizations`,
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
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        {/*
          Marks JS as available so reveal animations may hide content until in view.
          Also opens every page on its hero, strictly: no scroll restoration on reload, and
          a #section in the address is dropped before the browser can jump to it.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);window.scrollTo(0,0)}catch(e){}",
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
