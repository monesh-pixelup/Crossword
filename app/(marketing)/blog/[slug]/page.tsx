import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PostBody } from "@/modules/blog/components/post-body";
import { PostHero } from "@/modules/blog/components/post-hero";
import { getPost, getPosts } from "@/modules/blog/lib/posts";
import { PilotCta } from "@/modules/managed-launch/components/pilot/pilot-cta";

/**
 * The posts in Sanity at build time are prerendered. A post published later is rendered on its first visit and then
 * kept like the rest. (Cache Components need at least one param here, hence the placeholder while there are no posts:
 * it 404s like any unknown slug.)
 */
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.length ? posts.map(({ slug }) => ({ slug })) : [{ slug: "__placeholder__" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article", ...(post.cover && { images: [post.cover.src] }) },
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
      <PostHero post={post} />
      <PostBody post={post} />
    </>
  );
}
