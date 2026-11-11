import { CaretLeftIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RailAccent } from "@/modules/landing/components/shared/rail-accent";
import { Rails } from "@/modules/marketing/components/rails";
import type { BlogPost } from "../config/posts";

/**
 * A post's header, after the Limelight "Blog Slug" layout (Figma 1655:2486) in the site's own design: under the cream
 * header, the back link (an engraved eyebrow with a caret) 32px over the title (Crimson Light 40 at 1.1, up to 760px
 * wide), then 16px under it the date in Geist and the post's category in an engraved tag. A gold tick sits on the left
 * rail, as on the journal's own hero.
 */
export function PostHero({ post }: { post: BlogPost }) {
  return (
    <section aria-labelledby="post-hero-title" className="relative bg-cream pt-[96.5px] pb-10 max-md:pt-16 max-md:pb-8">
      {/* The page's rails, drawn by the hero itself (the page has no hero curtain; see the post page). */}
      <Rails />
      <RailAccent className="absolute top-[96.4px] left-[calc(var(--frame-inset)-0.5px)] z-2 h-[208.9px] w-px max-lg:hidden" />

      <div className="flex content-width flex-col items-start gap-8">
        <Link
          href="/blog"
          className="transition-opacity duration-200 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
        >
          <Eyebrow>
            <span className="inline-flex items-center gap-1.5">
              <CaretLeftIcon aria-hidden size={12} weight="bold" />
              Back to the journal
            </span>
          </Eyebrow>
        </Link>

        <div className="flex flex-col items-start gap-4">
          <h1
            id="post-hero-title"
            className="max-w-[760px] font-serif text-[40px] leading-[1.1] font-light tracking-[-2px] text-ink max-md:text-[28px] max-md:leading-[1.1071] max-md:tracking-[-1.4px]"
          >
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
              {post.date}
            </p>
            <p className="border-[0.5px] border-engraved bg-sand px-3 font-open-sans text-[12px] leading-6 font-semibold tracking-[1.44px] text-label-olive uppercase max-md:text-[10px] max-md:tracking-[1.2px]">
              {post.category}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
