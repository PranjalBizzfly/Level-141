import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BracketFrame } from "@/components/ui/primitives";
import { getPost, getPublishedPosts, readingMinutes } from "@/lib/blog";
import { insightCategories } from "@/lib/content";
import { imageAlts } from "@/lib/image-alts";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return pageMetadata({ title: post.title, description: post.summary, path: `${routes.blog}/${post.slug}` });
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const category = insightCategories.find((c) => c.slug === post.category);

  return (
    <article>
      <header className="on-dark bg-ink pb-16 pt-32 text-paper sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44">
        <div className="container-x max-w-4xl">
          <Link href={routes.blog} className="-my-3 inline-flex min-h-11 items-center gap-2 text-sm text-paper/60 hover:text-gold">
            <ArrowLeft aria-hidden className="size-4" /> All posts
          </Link>
          {category ? (
            <p className="mt-8 sm:mt-10">
              <Link href={`${routes.blog}?category=${category.slug}`} className="eyebrow text-gold hover:underline">
                {category.name}
              </Link>
            </p>
          ) : null}
          <h1 className="display mt-5 text-[2.25rem] sm:mt-6 sm:text-5xl lg:text-6xl">{post.title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/70 sm:mt-6 sm:text-xl">{post.summary}</p>
          <p className="mt-8 text-sm text-paper/50">
            {post.author ? `${post.author} · ` : null}
            <time dateTime={post.publishedAt}>{dateFmt.format(new Date(post.publishedAt))}</time>
            {` · ${readingMinutes(post)} min read`}
          </p>
        </div>
        {post.cover ? (
          <div className="container-x mt-12 max-w-5xl sm:mt-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-line-dark-strong lg:rounded-[1.75rem]">
              <Image src={post.cover} alt={imageAlts[post.cover] ?? ""} fill priority sizes="(min-width: 1024px) 64rem, 100vw" quality={90} className="object-cover grayscale" />
            </div>
          </div>
        ) : null}
      </header>
      <div className="bg-paper py-16 sm:py-20 lg:py-24">
        <div className="container-x max-w-3xl space-y-5 text-base leading-[1.75] text-ink/85 sm:space-y-6 sm:text-lg">
          {post.body.map((block, i) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2 key={i} className="!mt-12 text-2xl sm:!mt-14 sm:text-3xl leading-tight tracking-[-0.02em] text-ink">
                    {block.text}
                  </h2>
                );
              case "quote":
                return (
                  <BracketFrame key={i} tone="ink" size="sm" className="!my-12">
                    <blockquote className="serif-accent text-xl leading-snug sm:text-2xl text-ink">{block.text}</blockquote>
                  </BracketFrame>
                );
              case "list":
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 marker:text-gold-ink">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              default:
                return <p key={i}>{block.text}</p>;
            }
          })}
          <div className="!mt-16 border-t border-line pt-8">
            <Link href={routes.blog} className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" /> Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
