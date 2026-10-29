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
      <div className="container-x grid gap-12 pb-16 pt-28 sm:gap-16 sm:pb-20 sm:pt-36 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-7">
          <p className="eyebrow animate-fade text-gold">Growth Architecture for People &amp; Organizations</p>
          <h1
            id="hero-title"
            className="display relative mt-8 inline-block py-[0.12em] pl-[0.16em] pr-[0.3em] text-[clamp(2.75rem,1.9rem+3vw,4.25rem)]"
          >
            {/* Corner brackets from the Level141 symbol frame the headline block. */}
            <BracketClose className="absolute right-0 top-0 size-[0.2em] animate-fade text-gold [animation-delay:300ms]" />
            <BracketOpen className="absolute bottom-0 left-0 size-[0.2em] animate-fade text-gold [animation-delay:300ms]" />
            <span className="block animate-rise [animation-delay:60ms]">What&apos;s Your</span>
            <span className="block animate-rise [animation-delay:160ms]">
              <span className="serif-accent text-gold">Level</span>?
            </span>
          </h1>
          <div className="mt-10 max-w-xl animate-rise space-y-5 text-base leading-[1.85] text-paper/75 [animation-delay:280ms] sm:text-lg">
            <p>
              You&apos;ve built something.<span className="sr-only"> A career. A reputation. A business. A company.</span> But where you are today doesn&apos;t have to define where you go next.
            </p>
            <p className="text-paper">
              Level141 architects the next level of growth for people and organizations.
            </p>
            <p className="text-base text-paper-muted sm:text-lg">
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

        <div className="hero-depth lg:col-span-5" aria-hidden>
          <div className="relative mx-auto max-w-md animate-fade [animation-delay:350ms] lg:ml-auto">
            <div className="relative rounded-[1.5rem] border border-line-dark-strong bg-ink-2 px-6 py-6 sm:px-9 sm:py-9 lg:rounded-[1.75rem]">
              <BracketClose className="absolute -right-px -top-px size-7 text-gold" />
              <BracketOpen className="absolute -bottom-px -left-px size-7 text-gold" />
              <p className="eyebrow text-gold">Next level</p>
              <p className="serif-accent mt-2 text-2xl text-paper sm:mt-3 sm:text-3xl">Where you go next.</p>
            </div>
            <div className="mx-auto h-6 w-px bg-line-dark-strong sm:h-10" />
            <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-line-dark-strong bg-line-dark lg:grid-cols-1 lg:rounded-[1.75rem]">
              {[...built].reverse().map((b, i) => (
                <li
                  key={b}
                  className="flex animate-rise items-center justify-between gap-2 bg-ink-2 px-4 py-3.5 sm:px-6 sm:py-4 lg:px-7 lg:py-5"
                  style={{ animationDelay: `${380 + (built.length - i) * 80}ms` }}
                >
                  <span className="text-base tracking-[-0.01em] text-paper/90 sm:text-lg">{b}</span>
                  <span className="eyebrow tabular-nums text-paper-muted">L{String(built.length - i).padStart(2, "0")}</span>
                </li>
              ))}
            </ol>
            <p className="eyebrow mt-5 text-center text-paper-muted">You&apos;ve built something.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
