import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { routes, site } from "@/lib/site";

/*
 * Factual description of what this website collects and why, written from the code
 * (forms, LQ™ Assessment, theme setting). It is not legal advice: Level141 should have
 * it reviewed before launch, and add retention periods and a privacy contact address.
 */
export const metadata = {
  ...pageMetadata({
    title: "Privacy Policy",
    description:
      "How the Level141 website collects and uses the details you share through its contact form, the Growth Architecture waitlist and the LQ™ Assessment.",
    path: routes.privacy,
  }),
  robots: { index: false, follow: true },
};

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "What we collect",
    body: (
      <ul className="list-disc space-y-3 pl-5">
        <li>
          <strong className="font-medium text-ink">Start Your Next Level form:</strong> your name, organization, designation, email,
          phone number, area of interest and your message.
        </li>
        <li>
          <strong className="font-medium text-ink">Contact Us:</strong> your name, email and message.
        </li>
        <li>
          <strong className="font-medium text-ink">Growth Architecture™ waitlist:</strong> your name, work email,
          organization, designation and, if you add it, a note about your organization&apos;s next level.
        </li>
        <li>
          <strong className="font-medium text-ink">LQ™ Assessment:</strong> your answers, your name and your email.
          Your LQ Score is calculated from your answers when you submit them.
        </li>
      </ul>
    ),
  },
  {
    title: "How we use it",
    body: (
      <p>
        We use these details only to reply to you, to contact you about Growth Architecture™ availability, and to send
        you your LQ™ report. Level141 receives a copy of each LQ™ report so we can discuss it with you if you ask. We do
        not sell your details.
      </p>
    ),
  },
  {
    title: "How it is sent and stored",
    body: (
      <p>
        Submissions are sent to the Level141 team by email and, where configured, to the system we use to manage inquiries. Emails
        are delivered through an email service provider. The website itself does not keep a database of submissions.
      </p>
    ),
  },
  {
    title: "Cookies and tracking",
    body: (
      <p>
        The website does not use advertising or analytics cookies. It remembers your light or dark theme choice in your
        own browser. Our hosting provider keeps standard technical logs to run and protect the website.
      </p>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        You can ask us what details we hold about you, or ask us to correct or delete them, through our{" "}
        <Link href={routes.contactUs}>
          contact page
        </Link>
        .
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
            Your details, <span className="serif-accent text-gold">handled with care</span>
          </>
      }
      intro={<p>What the {site.name} website collects when you contact us, join the waitlist or take the LQ™ Assessment, and how we use it.</p>}
      sections={sections}
    />
  );
}
