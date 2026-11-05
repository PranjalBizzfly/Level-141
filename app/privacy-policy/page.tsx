import Link from "next/link";
import { LegalPage, pending } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { routes, site } from "@/lib/site";

/*
 * Website Privacy Policy, in a standard structure. Facts are written from the code (forms,
 * delivery, LQ™ Assessment, theme setting).
 * Entity, effective date, governing law and retention periods must come from Level 141, and
 * the text should be reviewed by a qualified adviser before it is indexed.
 */
export const metadata = {
  ...pageMetadata({
    title: "Privacy Policy",
    description:
      "How the Level 141 website collects, uses and protects the details you share through its forms, the Growth Architecture waitlist and the LQ™ Assessment.",
    path: routes.privacy,
  }),
  robots: { index: false, follow: true },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        This website is operated by {pending(site.legal.entity)} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;), part of {site.parent} and based in {site.location}. This policy explains how we handle personal
        information collected through this website.
      </p>
    ),
  },
  {
    title: "Information we collect",
    body: (
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong>Start Your Next Level form:</strong> your name, organization, designation, email, phone number, area of
          interest and your message.
        </li>
        <li>
          <strong>Contact Us form:</strong> your name, email, phone number and city if you add them, and your message.
        </li>
        <li>
          <strong>Growth Architecture™ waitlist:</strong> your name, work email, organization, designation and, if you add
          it, a note about your organization&apos;s next level.
        </li>
        <li>
          <strong>Stay Ahead signup:</strong> your email address.
        </li>
        <li>
          <strong>LQ™ Assessment:</strong> your answers, your name and your email. Your LQ Score is calculated from your
          answers when you submit them.
        </li>
        <li>
          <strong>Technical information:</strong> our hosting provider records standard technical logs, such as IP
          address, browser type and the pages requested, to run and protect the website.
        </li>
      </ul>
    ),
  },
  {
    title: "How we use your information",
    body: (
      <ul className="list-disc space-y-3 pl-5">
        <li>To reply to your enquiry or message.</li>
        <li>To contact you about Growth Architecture™ availability, if you joined the waitlist.</li>
        <li>To send you insights and updates, if you signed up to Stay Ahead. You can ask us to stop at any time.</li>
        <li>
          To email you your LQ™ report. {site.name} receives a copy of each report so we can discuss it with you if you
          ask.
        </li>
        <li>To keep the website secure and working properly.</li>
      </ul>
    ),
  },
  {
    title: "Sharing your information",
    body: (
      <p>
        We do not sell your personal information. We share it only with the service providers that help us run this
        website, such as our website host, our email delivery provider and, where used, the system in which we manage
        enquiries. They may process it only on our instructions.
      </p>
    ),
  },
  {
    title: "Where it is processed",
    body: (
      <p>
        Our service providers may process information on servers outside the United Arab Emirates. Where they do, we rely
        on their safeguards for the protection of personal information.
      </p>
    ),
  },
  {
    title: "How long we keep it",
    body: <p>Retention periods: {pending("")}.</p>,
  },
  {
    title: "Security",
    body: (
      <p>
        The website is served only over an encrypted connection, and the forms check and limit submissions to reduce
        misuse. No method of transmission over the internet is completely secure, but we take reasonable steps to protect
        your information.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        You can ask us what personal information we hold about you, and ask us to correct it, delete it or stop using it
        for updates, through our <Link href={routes.contactUs}>Contact Us</Link> page.
      </p>
    ),
  },
  {
    title: "Cookies",
    body: (
      <p>
        This website does not use advertising or analytics cookies. It stores your light or dark theme choice in your own
        browser so the site opens the way you left it.
      </p>
    ),
  },
  {
    title: "Changes to this policy",
    body: <p>We may update this policy from time to time. The version on this page, with its effective date, applies.</p>,
  },
  {
    title: "Contact",
    body: (
      <p>
        For any question about this policy or your information, please write to us through our{" "}
        <Link href={routes.contactUs}>Contact Us</Link> page.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      image="/images/client-executive-study-woman.webp"
      portrait
      eyebrow="Privacy Policy"
      labelledBy="privacy-title"
      title={
        <>
          Website <span className="serif-accent text-gold">Privacy Policy</span>
        </>
      }
      intro={<p>How the {site.name} website collects, uses and protects the details you share with us.</p>}
      sections={sections}
    />
  );
}
