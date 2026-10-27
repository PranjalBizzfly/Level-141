import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Reveal, Section, cx } from "@/components/ui/primitives";
import { getPublishedPosts, readingMinutes, type BlogPost } from "@/lib/blog";
import { insightCategories } from "@/lib/content";
import { imageAlts } from "@/lib/image-alts";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Blog",
  description: "Articles from Level141 on growth architecture, personal authority, brand and positioning, growth intelligence and leadership.",
  path: routes.blog,
});

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const categoryName = (slug: string) => insightCategories.find((c) => c.slug === slug)?.name ?? slug;

type Props = { searchParams: Promise<{ category?: string | string[] }> };

export default async function BlogPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const all = getPublishedPosts();
  const active = insightCategories.find((c) => c.slug === category)?.slug;
  const posts = active ? all.filter((p) => p.category === active) : all;
  const [featured, ...rest] = posts;

  // The active chip has no `border` class: glass.css turns bordered rounded-full elements into glass, hiding the fill.
  const chip = "inline-flex min-h-11 items-center rounded-full px-5 text-sm transition-colors duration-300";

  return (
    <>
      <PageHero
        image="/images/client-hero-skyline-opening.webp"
        eyebrow="Blog"
        title={
          <>
            The Level141 <span className="serif-accent text-gold">Blog</span>
          </>
        }
        intro={<p>Articles on growth architecture, personal authority, brand, positioning and leadership.</p>}
      />

      <Section tone="paper" labelledBy="posts-title">
        <div className="container-x">
          <h2 id="posts-title" className="sr-only">
            Blog posts
          </h2>

          {/* Category filter: plain links, so it works without JavaScript and each view has its own URL. */}
          <nav aria-label="Filter by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] sm:flex-wrap">
            {[{ slug: undefined, name: "All" }, ...insightCategories].map((c) => {
              const on = c.slug === active;
              return (
                <Link
                  key={c.name}
                  href={c.slug ? `${routes.blog}?category=${c.slug}` : routes.blog}
                  aria-current={on ? "page" : undefined}
                  scroll={false}
                  className={cx(chip, "shrink-0", on ? "bg-ink text-paper" : "border border-line-strong text-ink hover:border-ink")}
                >
                  {c.name}
                </Link>
              );
            })}
          </nav>

          {featured ? (
            <>
              <Reveal className="mt-12 sm:mt-16">
                <PostCard post={featured} featured />
              </Reveal>
              {rest.length ? (
                <ul className="mt-10 grid gap-x-6 gap-y-14 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                  {rest.map((p, i) => (
                    <Reveal as="li" key={p.slug} delay={(i % 3) * 80}>
                      <PostCard post={p} />
                    </Reveal>
                  ))}
                </ul>
              ) : null}
            </>
          ) : (
            <Reveal className="mt-12 rounded-[2rem] border border-line bg-surface px-8 py-20 text-center sm:mt-16 sm:py-28">
              <p className="eyebrow text-gold-ink">{active ? categoryName(active) : "Blog"}</p>
              <p className="display mx-auto mt-6 max-w-xl text-3xl sm:text-4xl">
                No posts <span className="serif-accent">yet</span>
              </p>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">Articles will appear here once they are published.</p>
              {active ? (
                <Link href={routes.blog} className={cx(chip, "mt-8 border border-line-strong hover:border-ink")}>
                  View all posts
                </Link>
              ) : null}
            </Reveal>
          )}
        </div>
      </Section>
    </>
  );
}

function PostCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`${routes.blog}/${post.slug}`}
      className={cx("group grid gap-6", featured && "lg:grid-cols-12 lg:items-center lg:gap-12")}
    >
      <div
        className={cx(
          "relative overflow-hidden rounded-[1.5rem] border border-line bg-ink-2 lg:rounded-[1.75rem]",
          featured ? "aspect-[16/10] lg:col-span-7" : "aspect-[4/3]",
        )}
      >
        {post.cover ? (
          <Image
            src={post.cover}
            alt={imageAlts[post.cover] ?? ""}
            fill
            sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw"}
            quality={85}
            className="object-cover grayscale transition-transform duration-700 ease-[var(--ease-architect)] group-hover:scale-[1.05]"
          />
        ) : (
          <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
        )}
        <span
          aria-hidden
          className="absolute bottom-4 right-4 grid size-11 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className={featured ? "lg:col-span-5" : undefined}>
        <p className="eyebrow text-gold-ink">{categoryName(post.category)}</p>
        <h3
          className={cx(
            "mt-4 tracking-[-0.025em] transition-colors group-hover:text-gold-ink",
            featured ? "display text-3xl sm:text-4xl lg:text-5xl" : "text-2xl leading-snug",
          )}
        >
          {post.title}
        </h3>
        <p className={cx("mt-4 leading-relaxed text-muted", !featured && "line-clamp-3")}>{post.summary}</p>
        <p className="mt-5 text-sm text-muted">
          <time dateTime={post.publishedAt}>{dateFmt.format(new Date(post.publishedAt))}</time>
          <span aria-hidden> · </span>
          {readingMinutes(post)} min read
        </p>
      </div>
    </Link>
  );
}
