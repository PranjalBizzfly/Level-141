import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BracketFrame } from "@/components/ui/primitives";
import { insightCategories } from "@/lib/content";
import { getInsight, getPublishedInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedInsights().map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getInsight((await params).slug);
  if (!article) return {};
  return pageMetadata({ title: article.title, description: article.summary, path: `${routes.insights}/${article.slug}` });
}

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function InsightArticle({ params }: Props) {
  const article = getInsight((await params).slug);
  if (!article) notFound();
  const category = insightCategories.find((c) => c.slug === article.category);

  return (
    <article>
      <header className="on-dark bg-ink pb-16 pt-36 text-paper sm:pt-44">
        <div className="container-x max-w-4xl">
          <Link href={routes.insights} className="inline-flex items-center gap-2 text-sm text-paper/60 hover:text-gold">
            <ArrowLeft aria-hidden className="size-4" /> All insights
          </Link>
          {category ? <p className="eyebrow mt-10 text-gold">{category.name}</p> : null}
          <h1 className="display mt-6 text-[2.5rem] sm:text-6xl">{article.title}</h1>
          <p className="mt-6 text-xl leading-relaxed text-paper/70">{article.summary}</p>
          <p className="mt-8 text-sm text-paper/50">
            {article.author ? `${article.author} · ` : null}
            <time dateTime={article.publishedAt}>{dateFmt.format(new Date(article.publishedAt))}</time>
          </p>
        </div>
      </header>
      <div className="bg-paper py-16 sm:py-24">
        <div className="container-x max-w-3xl space-y-6 text-lg leading-[1.75] text-ink/85">
          {article.body.map((block, i) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2 key={i} className="!mt-14 text-3xl leading-tight tracking-[-0.02em] text-ink">
                    {block.text}
                  </h2>
                );
              case "quote":
                return (
                  <BracketFrame key={i} tone="ink" size="sm" className="!my-12">
                    <blockquote className="serif-accent text-2xl leading-snug text-ink">{block.text}</blockquote>
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
        </div>
      </div>
    </article>
  );
}
