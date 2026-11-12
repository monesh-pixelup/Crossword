import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostBody } from "@/modules/blog/components/post-body";
import { PostHero } from "@/modules/blog/components/post-hero";
import { blogPosts, getPost } from "@/modules/blog/config/posts";
import { PilotCta } from "@/modules/managed-launch/components/pilot/pilot-cta";

/**
 * Every post is prerendered. (`dynamicParams` isn't allowed with Cache Components; any other slug is a 404 through
 * `notFound()` below.)
 */
export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

/**
 * A journal post (after the Limelight "Blog Slug" page, Figma 1655:2466, in the site's design): the post's header,
 * the article beside its Index, then the maroon CTA banner (Managed launch's "You're getting a team"). Like the journal, it
 * has no hero curtain: the article scrolls in below the header instead of sliding over it.
 */
export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <main data-no-curtain>
      <PostHero post={post} />
      <PostBody post={post} />
      <PilotCta />
    </main>
  );
}
