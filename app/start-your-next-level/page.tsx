import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { Reveal } from "@/components/ui/primitives";
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
    <section className="relative bg-paper" aria-labelledby="contact-title">
      <div className="grid lg:min-h-screen lg:grid-cols-12">
        {/* Left: context */}
        <div className="on-dark relative overflow-hidden bg-ink px-5 pb-16 pt-36 text-paper sm:px-8 sm:pt-44 lg:col-span-5 lg:px-14 lg:pb-20">
          <div aria-hidden className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
          <div className="relative lg:sticky lg:top-36">
            <p className="eyebrow animate-fade text-gold">Start your next level</p>
            <h1 id="contact-title" className="display mt-7 animate-rise text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
              Let&apos;s architect <span className="serif-accent text-gold">what&apos;s next.</span>
            </h1>
            <p className="mt-8 max-w-md animate-rise text-lg leading-relaxed text-paper/70 [animation-delay:150ms]">
              The first step isn&apos;t another campaign. It&apos;s understanding your current level — where you are, where
              you&apos;re trying to go, and what&apos;s stopping you.
            </p>

            <div className="mt-14 animate-fade [animation-delay:300ms]">
              <p className="eyebrow text-paper/45">What happens next</p>
              <ol className="mt-5 space-y-4">
                {levelProcess.slice(0, 3).map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="eyebrow mt-1 tabular-nums text-gold">{s.n}</span>
                    <span>
                      <span className="font-medium">{s.name}.</span>{" "}
                      <span className="text-paper/60">{s.line}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative mt-14 max-w-md px-6 py-5 text-sm leading-relaxed text-paper/60">
              <BracketClose className="absolute right-0 top-0 size-4 text-gold" />
              <BracketOpen className="absolute bottom-0 left-0 size-4 text-gold" />
              Interested in Growth Architecture™ for your organization? It isn&apos;t open for engagements yet —{" "}
              <Link href={routes.waitlist} className="text-paper underline underline-offset-4 hover:text-gold">
                join the waitlist
              </Link>
              .
            </div>
            <p className="mt-10 text-sm text-paper/40">Level141 · Part of the 1XL ecosystem · Headquartered in Dubai</p>
          </div>
        </div>

        {/* Right: form */}
        <div className="px-5 py-16 sm:px-8 sm:py-20 lg:col-span-7 lg:px-16 lg:pb-24 lg:pt-44 xl:px-24">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="text-2xl tracking-[-0.02em] sm:text-3xl">Tell us about the level you&apos;re trying to reach.</h2>
            <div className="mt-10">
              <ContactForm initialInterest={initialInterest} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
