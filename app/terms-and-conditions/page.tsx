import Link from "next/link";
import { LegalPage, pending } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { routes, site } from "@/lib/site";

/*
 * Website Terms & Conditions in a standard structure. Engagements are governed by their own
 * agreements. Entity, governing law and effective date come from site.legal and must be
 * supplied by Level 141; have the text reviewed by a qualified adviser before indexing.
 */
export const metadata = {
  ...pageMetadata({
    title: "Terms & Conditions",
    description:
      "The terms for using the Level 141 website, including its content, the LQ™ Assessment and the contact and waitlist forms.",
    path: routes.terms,
  }),
  robots: { index: false, follow: true },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "About these terms",
    body: (
      <p>
        These terms govern your use of the {site.name} website, operated by {pending(site.legal.entity)} (&ldquo;
        {site.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), part of {site.parent} and based in {site.location}.
      </p>
    ),
  },
  {
    title: "Acceptance",
    body: (
      <p>
        By using this website you accept these terms. If you do not accept them, please do not use the website.
      </p>
    ),
  },
  {
    title: "Information, not advice",
    body: (
      <p>
        The content on this website is general information about {site.name} and its services. It is not professional,
        financial or legal advice for your situation. Any engagement with {site.name} is agreed separately, in writing,
        and is governed by that agreement.
      </p>
    ),
  },
  {
    title: "The LQ™ Assessment",
    body: (
      <p>
        The LQ™ Assessment is a self-assessment based only on your own answers. Your LQ Score and report are an
        indication, not an audit or a guarantee of any outcome. How your answers are used is explained in our{" "}
        <Link href={routes.privacy}>Privacy Policy</Link>.
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
        You agree not to misuse the website, for example by submitting false information, sending automated or bulk
        submissions, or attempting to disrupt it or gain unauthorized access to it.
      </p>
    ),
  },
  {
    title: "Links to other websites",
    body: (
      <p>
        Links to other websites, including social media, are provided for convenience. We are not responsible for their
        content or their privacy practices.
      </p>
    ),
  },
  {
    title: "Availability and accuracy",
    body: (
      <p>
        We aim to keep the website available and its information accurate, but we do not guarantee that it will always
        be available, uninterrupted or free of errors, and we may change or withdraw content at any time.
      </p>
    ),
  },
  {
    title: "Limitation of liability",
    body: (
      <p>
        To the extent permitted by law, {site.name} is not liable for any loss arising from your use of, or reliance on,
        this website or the LQ™ Assessment. Nothing in these terms limits liability that cannot be limited by law.
      </p>
    ),
  },
  {
    title: "Privacy",
    body: (
      <p>
        How we handle your details is explained in our <Link href={routes.privacy}>Privacy Policy</Link>.
      </p>
    ),
  },
  {
    title: "Changes to these terms",
    body: <p>We may update these terms from time to time. The version on this page, with its effective date, applies.</p>,
  },
  {
    title: "Governing law",
    body: <p>These terms are governed by: {pending(site.legal.governingLaw)}.</p>,
  },
  {
    title: "Contact",
    body: (
      <p>
        For any question about these terms, please write to us through our <Link href={routes.contactUs}>Contact Us</Link>{" "}
        page.
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
            Terms &amp; <span className="serif-accent text-gold">Conditions</span>
          </>
      }
      intro={<p>These terms cover your use of the {site.name} website.</p>}
      sections={sections}
    />
  );
}
