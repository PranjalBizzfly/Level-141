import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { routes, site } from "@/lib/site";

/*
 * General terms for using this website only. It covers no engagement or commercial terms
 * (those are agreed separately) and names no governing law, which Level141 must supply.
 * Draft: have it reviewed before launch, then allow indexing.
 */
export const metadata = {
  ...pageMetadata({
    title: "Terms & Conditions",
    description:
      "The terms for using the Level141 website, including its content, the LQ™ Assessment and the contact and waitlist forms.",
    path: routes.terms,
  }),
  robots: { index: false, follow: true },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Using this website",
    body: (
      <p>
        By using the {site.name} website you agree to these terms. If you do not agree, please do not use the website.
        We may update these terms from time to time; the version on this page applies.
      </p>
    ),
  },
  {
    title: "Information, not advice",
    body: (
      <p>
        The content on this website is general information about {site.name} and its services. It is not professional,
        financial or legal advice for your situation. Any engagement with {site.name} is agreed separately, in writing.
      </p>
    ),
  },
  {
    title: "The LQ™ Assessment",
    body: (
      <p>
        The LQ™ Assessment is a self-assessment based only on your own answers. Your LQ Score and report are an
        indication, not an audit or a guarantee of any outcome.
      </p>
    ),
  },
  {
    title: "Growth Architecture™ waitlist",
    body: (
      <p>
        Joining the waitlist registers your interest only. It does not book, reserve or start an engagement, and creates
        no obligation for you or for {site.name}.
      </p>
    ),
  },
  {
    title: "Intellectual property",
    body: (
      <p>
        The website&apos;s content, including its text, design, logo and the names and structure of the LQ™, VIBE™,
        IGF™, BRANDS™ and PEAK™ frameworks, belongs to {site.name}. You may view and share it for personal,
        non-commercial use, but not copy, adapt or reuse it commercially without our written permission.
      </p>
    ),
  },
  {
    title: "Acceptable use",
    body: (
      <p>
        Please do not misuse the website, for example by submitting false information, sending automated or bulk
        submissions, or attempting to disrupt or gain unauthorized access to it.
      </p>
    ),
  },
  {
    title: "Your details",
    body: (
      <p>
        How we handle the details you share is explained in our{" "}
        <Link href={routes.privacy}>
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    title: "Questions",
    body: (
      <p>
        If you have a question about these terms, please{" "}
        <Link href={routes.contact}>
          contact us
        </Link>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      image="/images/client-executive-contemplation.webp"
      eyebrow="Terms & Conditions"
      labelledBy="terms-title"
      title={
        <>
            Terms of <span className="serif-accent text-gold">use</span>
          </>
      }
      intro={<p>These terms cover your use of the {site.name} website.</p>}
      sections={sections}
    />
  );
}
