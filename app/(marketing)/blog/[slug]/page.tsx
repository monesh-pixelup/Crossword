import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PostBody } from "@/modules/blog/components/post-body";
import { PostHero } from "@/modules/blog/components/post-hero";
import { PostSchema } from "@/modules/blog/components/post-schema";
import { getPost, getPosts } from "@/modules/blog/lib/posts";
import { SITE_URL } from "@/modules/blog/lib/site";
import { PilotCta } from "@/modules/managed-launch/components/pilot/pilot-cta";

/**
 * Every post is prerendered at build time (posts only change through a build). Cache Components need at least one
 * param here, hence the placeholder while there are no posts: it 404s like any unknown slug.
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length ? posts.map(({ slug }) => ({ slug })) : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  // Without a social or cover image of its own, the post shares the journal's (drawn by scripts/og/og-images.mjs).
  const image = post.seo.socialImage ?? post.cover?.src ?? "/og/journal.png";
  return {
    // The SEO title is the whole <title>, without the site's " · Crossword" suffix (it is written to fit in 60).
    title: { absolute: post.seo.title },
    description: post.seo.description,
    ...(post.seo.keywords.length > 0 && { keywords: post.seo.keywords }),
    alternates: { canonical: post.seo.canonical ?? url },
    ...(post.seo.noindex && { robots: { index: false, follow: true } }),
    authors: [{ name: post.author?.name ?? "Crossword team" }],
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: "article",
      url,
      publishedTime: post.publishAt,
      ...(post.updatedAt && { modifiedTime: post.updatedAt }),
      section: post.category,
      ...(post.seo.keywords.length > 0 && { tags: post.seo.keywords }),
      images: [{ url: image, alt: post.cover?.alt ?? "" }],
    },
    twitter: { card: "summary_large_image", title: post.seo.title, description: post.seo.description, images: [image] },
  };
}

/**
 * A journal post (after the Limelight "Blog Slug" page, Figma 1655:2466, in the site's design): the post's header,
 * the article beside its Index, then the maroon CTA banner (Managed launch's "You're getting a team"). Like the journal, it
 * has no hero curtain: the article scrolls in below the header instead of sliding over it.
 */
export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <main data-no-curtain>
      {/* The slug is read inside the boundary, so a post published after the build still gets the page's shell at once. */}
      <Suspense fallback={<div className="min-h-svh bg-cream" />}>
        <Post params={params} />
      </Suspense>
      <PilotCta />
    </main>
  );
}

async function Post({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  return (
    <>
      <PostSchema post={post} />
      <PostHero post={post} />
      <PostBody post={post} />
    </>
  );
}
