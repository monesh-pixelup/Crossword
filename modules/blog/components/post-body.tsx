import Image from "next/image";
import cover from "../assets/post-cover.webp";
import type { BlogPost } from "../config/posts";
import { PostIndex } from "./post-index";

/** The post's copy: Geist 16/24 in ink muted (15/22 on phones), paragraphs 16px apart. */
const copy = "font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]";

/**
 * A post's body, after the Limelight "Blog Slug" layout (Figma 1655:2499) in the site's design: the article and, 40px
 * beside it, the 367px Index, which stays in view under the header as the article scrolls. The article is the cover
 * (793 × 354 in Figma, the journal's cover art in a black/15 line), the intro, then each part 40px apart: its heading
 * (Crimson Light 32/35, Headings/S) 24px over its paragraphs. Below 1024px the Index sits above the article.
 */
export function PostBody({ post }: { post: BlogPost }) {
  const items = [{ id: "introduction", title: "Introduction" }, ...post.sections.map(({ id, title }) => ({ id, title }))];

  return (
    <section aria-label="Article" className="relative bg-cream pt-6 pb-20 max-md:pb-16">
      <div className="grid content-width grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_367px]">
        <div className="lg:sticky lg:top-[calc(72.5px+24px)] lg:order-2 lg:self-start">
          <PostIndex items={items} />
        </div>

        <article className="flex min-w-0 flex-col gap-10 lg:order-1">
          <div className="relative aspect-[793/354] w-full overflow-hidden border border-black/15">
            <Image src={cover} alt="" priority sizes="(min-width: 1440px) 873px, (min-width: 1024px) 60vw, 100vw" className="object-cover" fill />
          </div>

          <div id="introduction" className="flex scroll-mt-[112px] flex-col gap-4 pb-6">
            {post.intro.map((p, i) => (
              <p key={i} className={copy}>
                {p}
              </p>
            ))}
          </div>

          {post.sections.map((section) => (
            <div key={section.id} id={section.id} className="flex scroll-mt-[112px] flex-col gap-6 py-6">
              <h2 className="font-serif text-[32px] leading-[1.09375] font-light tracking-[-1.6px] text-ink max-md:text-[24px] max-md:leading-[27px] max-md:tracking-[-1.2px]">
                {section.title}
              </h2>
              <div className="flex flex-col gap-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className={copy}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
