import type { BlogPost } from "../lib/posts";
import { SITE_URL } from "../lib/site";

/**
 * A post's structured data (JSON-LD), for search engines and AI answer engines: the article itself (BlogPosting,
 * Article or HowTo, from Notion's "Schema type"), its place in the site (BreadcrumbList), and, when the article has a
 * "Frequently asked questions" part, those questions (FAQPage). Everything here is also visible on the page.
 */
export function PostSchema({ post }: { post: BlogPost }) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.seo.socialImage ?? post.cover?.src;
  const abs = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src}`);
  const publisher = { "@type": "Organization", name: "Crossword", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.ico` } };

  const graph: Record<string, unknown>[] = [
    {
      "@type": post.schemaType,
      "@id": `${url}#article`,
      headline: post.seo.title,
      name: post.title,
      description: post.seo.description,
      url,
      mainEntityOfPage: url,
      datePublished: post.publishAt,
      dateModified: post.updatedAt ?? post.publishAt,
      articleSection: post.category,
      ...(post.seo.keywords.length > 0 && { keywords: post.seo.keywords.join(", ") }),
      ...(image && { image: abs(image) }),
      author: post.author
        ? { "@type": "Person", name: post.author.name, ...(post.author.role && { jobTitle: post.author.role }) }
        : { "@type": "Organization", name: "Crossword", url: SITE_URL },
      publisher,
      inLanguage: "en",
      timeRequired: `PT${post.readingMinutes}M`,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    });
  }

  // "<" is escaped so no text in a post can close the script tag early.
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
