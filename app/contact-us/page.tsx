import { MessageForm } from "@/components/forms/MessageForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero, Reveal, Section } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { assessmentCta, routes, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Contact Level 141 in Dubai about Personal Brand Architecture™, the Growth Architecture™ waitlist, partnerships or any other question.",
  path: routes.contactUs,
});

/*
 * Contact Us, built like the other pages: photo hero, a revealed section with the
 * details beside the form, then the closing call to action. Email, phone and address
 * appear as soon as they are set in `site.contact` (lib/site.ts).
 */
export default function ContactUsPage() {
  const { email, phone, address } = site.contact;
  const details: { label: string; value: React.ReactNode }[] = [
    { label: "Location", value: site.location },
    ...(email ? [{ label: "Email", value: <a href={`mailto:${email}`}>{email}</a> }] : []),
    ...(phone ? [{ label: "Phone", value: <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a> }] : []),
    ...(address ? [{ label: "Address", value: address }] : []),
  ];

  return (
    <>
      <PageHero
        image="/images/client-executive-in-motion.webp"
        portrait
        eyebrow="Contact us"
        title={
          <>
            Get in <span className="serif-accent text-gold">touch</span>
          </>
        }
        intro={
          <p>
            For enquiries about Personal Brand Architecture™, Growth Architecture™, or partnership opportunities, please
            get in touch using the form below.
          </p>
        }
      />

      <Section tone="paper" labelledBy="message-title">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-gold-ink">Write to us</p>
              <h2 id="message-title" className="display mt-6 text-[clamp(2rem,1.4rem+2vw,3rem)]">
                Send us a <span className="serif-accent">message</span>
              </h2>
            </Reveal>
            <dl className="mt-12 border-b border-line sm:mt-16">
              {details.map((d, i) => (
                <Reveal
                  key={d.label}
                  delay={i * 80}
                  className="grid gap-2 border-t border-line py-6 sm:grid-cols-[9rem_1fr] sm:gap-6 [&_a]:underline [&_a]:underline-offset-4"
                >
                  <dt className="eyebrow pt-1 text-muted">{d.label}</dt>
                  <dd className="leading-relaxed">{d.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <MessageForm />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Find your level"
        title={
          <>
            You&apos;ve reached this level. <span className="serif-accent text-gold">What&apos;s your next?</span>
          </>
        }
        primary={assessmentCta}
        secondary={{ label: "How we architect growth", href: routes.how }}
      />
    </>
  );
}
