import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/primitives";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[80vh] items-center bg-ink pb-20 pt-36 text-paper">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-x relative">
        <div className="relative inline-block px-10 py-8">
          <BracketClose className="absolute right-0 top-0 size-8 text-gold" />
          <BracketOpen className="absolute bottom-0 left-0 size-8 text-gold" />
          <p className="eyebrow text-gold">404 · Page not found</p>
          <h1 className="display mt-6 text-5xl sm:text-7xl">
            This level <span className="serif-accent text-gold">doesn&apos;t exist.</span>
          </h1>
        </div>
        <p className="mt-8 max-w-lg text-lg text-paper/65">The page you&apos;re looking for may have moved. Let&apos;s get you back on track.</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <ButtonLink href={routes.home} variant="gold">
            Back to home
          </ButtonLink>
          <ButtonLink href={routes.contact} variant="ghost-light">
            Find Your Level
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
