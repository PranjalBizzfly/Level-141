import { altFor } from "@/lib/image-alts";
import Image from "next/image";
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
    "Let's architect what's next. The first step isn't another campaign. It's understanding your current level.",
  path: routes.contact,
});

/** Background of the left column: a leader looking out over the Dubai skyline — what's next (client photograph). */
const backdrop = "/images/client-executive-dubai-window.webp";

type Props = { searchParams: Promise<{ interest?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { interest } = await searchParams;
  const initialInterest = typeof interest === "string" ? interest : undefined;

  return (
    <section className="relative overflow-x-hidden bg-paper" aria-labelledby="contact-title">
      {/*
        Mobile order: intro → form → supporting information, so the form starts within the first screen.
        Desktop: one strong dark left panel (intro, process, notes); a spacious form on the right.
      */}
      <div className="grid grid-cols-[minmax(0,1fr)] lg:min-h-screen lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
        {/* Desktop: one photograph behind the whole left column (intro + supporting information). */}
        <div aria-hidden className="true-tone photo-tone relative hidden overflow-hidden bg-black lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:block">
          <Image src={backdrop} alt={altFor(backdrop)} fill sizes="42vw" priority className="object-cover object-[38%_50%] grayscale" />
          <span className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85" />
        </div>

        {/* Intro */}
        <div className="true-tone photo-tone relative overflow-hidden bg-black px-5 pb-12 pt-32 text-white sm:px-8 sm:pb-14 sm:pt-40 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:px-14 lg:pb-0 lg:pt-44 xl:px-20">
          {/* Phones: the photograph sits behind the intro alone (the form follows it). */}
          <span aria-hidden className="lg:hidden">
            <Image src={backdrop} alt={altFor(backdrop)} fill sizes="100vw" priority className="object-cover object-[38%_50%] grayscale" />
            <span className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85" />
          </span>
          <div className="relative">
          <p className="animate-fade text-[0.95rem] font-medium text-white/70">Start your next level</p>
          <h1
            id="contact-title"
            className="font-display mt-8 animate-rise text-[clamp(2.21rem,3.22vw,2.94rem)] font-medium leading-[1] tracking-[-0.045em]"
          >
            Let&apos;s architect <span className="serif-accent">what&apos;s next</span>
          </h1>
          <p className="mt-7 max-w-lg animate-rise text-base leading-relaxed text-white/75 [animation-delay:150ms] sm:text-lg">
            Whether you&apos;re building your personal authority or preparing an organization for its next stage of
            growth, the first step isn&apos;t another campaign. It&apos;s understanding your current level.
          </p>
          </div>
        </div>

        {/* Form */}
        <div className="px-5 py-14 sm:px-8 sm:py-24 lg:py-24 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:px-16 lg:pb-28 lg:pt-44 xl:px-24">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="sr-only">Contact form</h2>
            <ContactForm initialInterest={initialInterest} />
          </Reveal>
        </div>

        {/* Supporting information */}
        <div className="true-tone relative bg-black px-5 pb-16 pt-4 text-white sm:px-8 lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:bg-transparent lg:px-14 lg:pb-24 lg:pt-14 xl:px-20">
          <div className="animate-fade border-t border-white/20 pt-10 [animation-delay:300ms]">
            <p className="text-[0.95rem] font-medium text-white/70">How Level141 works</p>
            <ol className="mt-10 space-y-7">
              {levelProcess.slice(0, 3).map((s) => (
                <li key={s.n} className="group grid cursor-default grid-cols-[2.75rem_1fr] gap-4">
                  {/* The step lights up under the pointer: its number fills and its line brightens. */}
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/30 text-sm tabular-nums transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                    {s.n}
                  </span>
                  <span className="pt-2 leading-relaxed transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                    <span className="block font-display text-lg font-medium tracking-[-0.01em]">{s.name}</span>
                    <span className="block text-white/75 transition-colors duration-300 group-hover:text-white">{s.line}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-12 max-w-lg rounded-[1.25rem] border border-white/20 px-6 py-7 text-[0.95rem] leading-relaxed text-white/75">
            <BracketClose className="absolute right-3 top-3 size-4 text-white/70" />
            <BracketOpen className="absolute bottom-3 left-3 size-4 text-white/70" />
            Growth Architecture™{" "}
            <Link
              href={routes.waitlist}
              className="-my-3 inline-flex min-h-12 items-center text-white underline underline-offset-4 hover:text-white/80"
            >
              Join the Waitlist
            </Link>
          </div>
          <p className="mt-12 text-[0.95rem] text-white/70">Level141 is part of the 1XL ecosystem, headquartered in Dubai.</p>
        </div>
      </div>
    </section>
  );
}
