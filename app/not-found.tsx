import { BracketClose, BracketOpen } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/primitives";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="on-dark relative flex min-h-[80vh] items-center bg-ink pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44 text-paper">
      <div aria-hidden className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-x relative">
        <div className="relative inline-block px-6 py-10 sm:px-14 sm:py-14">
          <BracketClose className="absolute right-0 top-0 size-6 text-gold sm:size-8" />
          <BracketOpen className="absolute bottom-0 left-0 size-6 text-paper/40 sm:size-8" />
          <p className="eyebrow text-gold">404</p>
          {/* Functional page: no brand copy beyond the documented CTA below. */}
          <h1 className="display mt-8 text-[2.02rem] sm:text-[2.2rem] lg:text-[2.8rem] xl:text-[2.79rem]">Page not found</h1>
        </div>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
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
