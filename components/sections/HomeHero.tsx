import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/primitives";
import { site } from "@/lib/site";

const built = ["A career.", "A reputation.", "A business.", "A company."];

/**
 * Home hero. The right-hand visual reads as a building section: the four
 * things a visitor has already built are stacked as floors, with the
 * unbuilt "next level" outlined above them.
 */
export function HomeHero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <div aria-hidden className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_30%,transparent)]" />
      <div className="container-x grid min-h-[100svh] gap-16 pb-20 pt-32 sm:pt-40 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade text-gold">Growth Architecture for People &amp; Organizations</p>
          <h1 id="hero-title" className="display relative mt-8 text-[3.4rem] sm:text-[5.5rem] lg:text-[7.25rem]">
            <span className="block animate-rise [animation-delay:60ms]">What&apos;s Your</span>
            <span className="relative inline-block animate-rise pr-[0.35em] [animation-delay:160ms]">
              <span className="serif-accent text-gold">Level</span>?
              <BracketClose className="absolute -top-1 right-0 size-[0.22em] text-gold/70" />
            </span>
          </h1>
          <div className="mt-10 max-w-xl animate-rise space-y-5 text-lg leading-relaxed text-paper/70 [animation-delay:280ms] sm:text-xl">
            <p>
              You&apos;ve built something. But where you are today doesn&apos;t have to define where you go next.
            </p>
            <p className="text-paper">
              Level141 architects the next level of growth for people and organizations.
            </p>
            <p className="text-base text-paper/60 sm:text-lg">
              Through clarity, positioning, visibility, credibility, authority and structured growth systems, we turn
              ambition into an architecture for growth.
            </p>
          </div>
          <div className="mt-12 flex animate-rise flex-col gap-4 [animation-delay:400ms] sm:flex-row sm:items-center sm:gap-8">
            <ButtonLink href={site.primaryCta.href} variant="gold">
              {site.primaryCta.label}
            </ButtonLink>
            <ButtonLink href="#two-architectures" variant="ghost-light">
              Explore Level141
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5" aria-hidden>
          <div className="relative mx-auto max-w-md animate-fade [animation-delay:350ms] lg:ml-auto">
            <div className="relative rounded-[1.75rem] border border-dashed border-gold/60 px-7 py-8">
              <BracketClose className="absolute -right-px -top-px size-7 text-gold" />
              <p className="eyebrow text-gold">Next level</p>
              <p className="serif-accent mt-3 text-3xl text-paper/90">Where you go next.</p>
            </div>
            <div className="mx-auto h-10 w-px bg-gradient-to-b from-gold/70 to-paper/20" />
            <ol className="overflow-hidden rounded-[1.75rem] border border-paper/15 bg-ink-2">
              {[...built].reverse().map((b, i) => (
                <li
                  key={b}
                  className="flex animate-rise items-center justify-between border-b border-paper/10 px-7 py-5 last:border-b-0"
                  style={{ animationDelay: `${520 + (built.length - i) * 110}ms` }}
                >
                  <span className="text-lg tracking-[-0.01em] text-paper/85">{b}</span>
                  <span className="eyebrow tabular-nums text-paper/35">L{String(built.length - i).padStart(2, "0")}</span>
                </li>
              ))}
            </ol>
            <BracketOpen className="absolute -bottom-3 -left-3 size-7 text-paper/25" />
            <p className="eyebrow mt-6 text-center text-paper/40">You&apos;ve built something.</p>
          </div>
        </div>
      </div>
      <a
        href="#architecture"
        className="eyebrow absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-paper/40 transition-colors hover:text-gold lg:block"
      >
        Scroll
      </a>
    </section>
  );
}
