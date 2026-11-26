import { getPosts } from "@/modules/blog/lib/posts";

export type BlogPost = {
  title: string;
  excerpt: string;
  href: string;
};

export type FeaturedPost = BlogPost & { category: string; coverTitle: [string, string, string] };

/**
 * The home page's Blog section, from the journal (content/blog). The featured card is the post marked "Feature on the home
 * page" (else the fourth newest, as before, or the newest there is); its maroon cover keeps the Figma headline, in the
 * cover's swash style: the capital, the rest of line 1, then line 2. The list beside it is the three newest others.
 */
export async function getHomeBlog(): Promise<{ featuredPost: FeaturedPost; recentPosts: BlogPost[] } | null> {
  const posts = await getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[3] ?? posts[0];
  if (!featured) return null;

  const toCard = (post: (typeof posts)[number]): BlogPost => ({
    title: post.title,
    excerpt: post.summary,
    href: `/blog/${post.slug}`,
  });

  return {
    featuredPost: {
      ...toCard(featured),
      category: featured.category.toUpperCase(),
      coverTitle: ["T", "urning Interest ", "into Action."],
    },
    recentPosts: posts.filter((p) => p !== featured).slice(0, 3).map(toCard),
  };
}
