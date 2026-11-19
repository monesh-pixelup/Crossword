import { PortableText, type PortableTextComponents } from "next-sanity";
import { PostCover } from "./post-cover";
import type { BlogPost, BodyBlock, PostTableBlock } from "../lib/posts";
import { PostIndex } from "./post-index";

/** The post's copy: Geist 16/24 in ink muted (15/22 on phones), paragraphs 16px apart. */
const copy = "font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]";
/** Crimson Light: the part headings at 32/35 (Headings/S), subheadings at 24. */
const heading = "font-serif font-light text-ink";

/** How the article's rich text from Sanity is drawn, in the post's styles. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className={copy}>{children}</p>,
    // Section headings split the article into parts (see splitBody); one reaching here is drawn as a subheading.
    h2: ({ children }) => <h3 className={`${heading} pt-2 text-[24px] leading-[1.125] tracking-[-1.2px] max-md:text-[20px] max-md:tracking-[-1px]`}>{children}</h3>,
    h3: ({ children }) => <h3 className={`${heading} pt-2 text-[24px] leading-[1.125] tracking-[-1.2px] max-md:text-[20px] max-md:tracking-[-1px]`}>{children}</h3>,
    blockquote: ({ children }) => <blockquote className={`${copy} border-l-2 border-maroon pl-4 text-ink-soft italic`}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className={`${copy} flex list-disc flex-col gap-2 pl-5`}>{children}</ul>,
    number: ({ children }) => <ol className={`${copy} flex list-decimal flex-col gap-2 pl-5`}>{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="text-ink underline decoration-black/30 underline-offset-2 transition-colors hover:decoration-black"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    table: ({ value }: { value: PostTableBlock }) => <PostTable table={value} />,
  },
};

function RichText({ value }: { value: BodyBlock[] }) {
  return <PortableText value={value} components={components} />;
}

/**
 * A post's body, after the Limelight "Blog Slug" layout (Figma 1655:2499) in the site's design: the article and, 40px
 * beside it, the 367px Index, which stays in view under the header as the article scrolls. The article is the cover
 * (at the covers' 761 × 296 shape: the post's own image, or the journal's cover art in turn, in a black/15 line), the intro, then each part
 * 40px apart: its heading (Crimson Light 32/35, Headings/S) 24px over its paragraphs. Below 1024px the Index sits above
 * the article; on phones (below 768px) it is left out.
 */
export function PostBody({ post }: { post: BlogPost }) {
  const items = [{ id: "introduction", title: "Introduction" }, ...post.sections.map(({ id, title }) => ({ id, title }))];
  const sizes = "(min-width: 1440px) 873px, (min-width: 1024px) 60vw, 100vw";

  return (
    <section aria-label="Article" className="relative bg-cream pt-6 pb-20 max-md:pb-16">
      <div className="grid content-width grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_367px]">
        <div className="lg:sticky lg:top-[calc(72.5px+24px)] lg:order-2 lg:self-start max-md:hidden">
          <PostIndex items={items} />
        </div>

        <article className="flex min-w-0 flex-col gap-10 lg:order-1">
          <PostCover post={post} sizes={sizes} priority className="border border-black/15" />

          <div id="introduction" className="flex scroll-mt-[112px] flex-col gap-4 pb-6">
            <RichText value={post.intro} />
          </div>

          {post.sections.map((section) => (
            <div key={section.id} id={section.id} className="flex scroll-mt-[112px] flex-col gap-6 py-6">
              <h2 className="font-serif text-[32px] leading-[1.09375] font-light tracking-[-1.6px] text-ink max-md:text-[24px] max-md:leading-[27px] max-md:tracking-[-1.2px]">
                {section.title}
              </h2>
              {section.content.length > 0 && (
                <div className="flex flex-col gap-4">
                  <RichText value={section.content} />
                </div>
              )}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

/**
 * A table in a post: Geist 14/20 between engraved hairlines, the header row and the row labels in ink, the rest in ink
 * muted. On phones it scrolls sideways inside its own box rather than squeezing the columns. 24px below the paragraphs
 * above it, as before.
 */
function PostTable({ table }: { table: PostTableBlock }) {
  const [head = [], ...rows] = (table.rows ?? []).map((row) => row.cells ?? []);
  const cell = "border-b-[0.5px] border-engraved px-4 py-3 text-left align-top first:pl-0";
  return (
    <div className="-mx-4 mt-2 overflow-x-auto px-4">
      <table className="w-full min-w-[560px] border-collapse font-sans text-[14px] leading-5 tracking-[-0.28px]">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} scope="col" className={`${cell} font-medium text-ink`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, ...cells], r) => (
            <tr key={r}>
              <th scope="row" className={`${cell} font-medium text-ink`}>
                {label}
              </th>
              {cells.map((c, i) => (
                <td key={i} className={`${cell} text-ink-muted`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
