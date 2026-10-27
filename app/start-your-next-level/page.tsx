import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { Photo, Reveal } from "@/components/ui/primitives";
import { levelProcess } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Start Your Next Level",
  description:
    "Let's architect what's next. Start a conversation with Level141 about Personal Brand Architecture™, partnerships or your next level of growth.",
  path: routes.contact,
});

type Props = { searchParams: Promise<{ interest?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { interest } = await searchParams;
  const initialInterest = typeof interest === "string" ? interest : undefined;

  return (
    <section className="relative overflow-x-hidden bg-paper" aria-labelledby="contact-title">
      {/*
        Mobile order: intro → form → supporting information, so the form starts within the first screen.
        Desktop: intro and supporting information share the dark left column; the form sits on the right.
      */}
      <div className="grid lg:min-h-screen lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
        {/* Intro */}
        <div className="on-dark relative isolate overflow-hidden bg-ink px-5 pb-10 pt-32 text-paper sm:px-8 sm:pb-12 sm:pt-40 lg:col-span-5 lg:row-start-1 lg:px-14 lg:pb-0 lg:pt-44">
          <div aria-hidden className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative">
            <p className="eyebrow animate-fade text-gold">Start your next level</p>
            <h1 id="contact-title" className="display mt-5 animate-rise text-[2.5rem] sm:mt-7 sm:text-6xl lg:text-[4.5rem]">
              Let&apos;s architect <span className="serif-accent text-gold">what&apos;s next.</span>
            </h1>
            <p className="mt-5 max-w-md animate-rise text-base leading-relaxed text-paper/75 [animation-delay:150ms] sm:mt-8 sm:text-lg">
              Whether you&apos;re building your personal authority or preparing an organization for its next stage of
              growth, the first step isn&apos;t another campaign. It&apos;s understanding your current level.
            </p>
            <Photo
              src="/images/client-executive-city-lounge.webp"
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-10 aspect-[16/9] animate-fade [animation-delay:250ms] sm:mt-12"
            />
          </div>
        </div>

        {/* Form */}
        <div className="px-5 py-12 sm:px-8 sm:py-16 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:px-16 lg:pb-24 lg:pt-44 xl:px-24">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="sr-only">Contact form</h2>
            <div>
              <ContactForm initialInterest={initialInterest} />
            </div>
          </Reveal>
        </div>

        {/* Supporting information */}
        <div className="on-dark bg-ink px-5 py-12 text-paper sm:px-8 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:px-14 lg:pb-20 lg:pt-14">
          <div className="animate-fade [animation-delay:300ms]">
            <p className="eyebrow text-paper-muted">How Level141 works</p>
            <ol className="mt-5 space-y-4">
              {levelProcess.slice(0, 3).map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="eyebrow mt-1 tabular-nums text-gold">{s.n}</span>
                  <span>
                    <span className="font-medium">{s.name}.</span>{" "}
                    <span className="text-paper-muted">{s.line}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-12 max-w-md px-6 py-5 text-sm leading-relaxed text-paper-muted">
            <BracketClose className="absolute right-0 top-0 size-4 text-gold" />
            <BracketOpen className="absolute bottom-0 left-0 size-4 text-gold" />
            Interested in Growth Architecture™ for your organization? It isn&apos;t open for engagements yet —{" "}
            <Link
              href={routes.waitlist}
              className="-my-3 inline-flex min-h-11 items-center text-paper underline underline-offset-4 hover:text-gold"
            >
              join the waitlist
            </Link>
            .
          </div>
          <p className="mt-10 text-sm text-paper-muted">Level141 is part of the 1XL ecosystem, headquartered in Dubai.</p>
        </div>
      </div>
    </section>
  );
}
