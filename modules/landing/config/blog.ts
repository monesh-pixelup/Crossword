import { blogPosts } from "@/modules/blog/config/posts";

export type BlogPost = {
  title: string;
  excerpt: string;
  href: string;
};

const featured = blogPosts[3];

/**
 * The featured card: the journal's fourth post (the three newest fill the list beside it). Its maroon cover keeps the
 * Figma headline, in the cover's swash style: the capital, the rest of line 1, then line 2.
 */
export const featuredPost: BlogPost & { category: string; coverTitle: [string, string, string] } = {
  title: featured.title,
  excerpt: featured.summary,
  href: `/blog/${featured.slug}`,
  category: featured.category.toUpperCase(),
  coverTitle: ["T", "urning Interest ", "into Action."],
};

/** The list beside the featured post: the journal's three newest posts, each linking to its page. */
export const recentPosts: BlogPost[] = blogPosts.slice(0, 3).map((post) => ({
  title: post.title,
  excerpt: post.summary,
  href: `/blog/${post.slug}`,
}));
