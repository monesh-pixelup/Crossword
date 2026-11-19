"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import paper from "../assets/paper-tile.webp";
import type { BlogPostSummary } from "../lib/posts";
import { PostCover } from "./post-cover";

/** The cards' paper: cream under Figma's paper tile at 432.6px, multiplied in at 11%. */
function Paper() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-cream" />
      <div
        className="absolute inset-0 bg-size-[432.61324167251587px_432.61324167251587px] bg-top-left opacity-11 mix-blend-multiply"
        style={{ backgroundImage: `url(${paper.src})` }}
      />
    </div>
  );
}

/**
 * A post card (Figma "A", 1660:976 and on): a black/15 line around the paper, 16px in: the cover (at the Figma blog
 * templates' 761 × 296 shape with the post's title on it, see PostCover), then 16px under it a 98px block with the title (Crimson 20 at 1.1) at its top and
 * the details (Geist Mono Medium 10, caps, 60%) at its foot.
 */
function PostCard({ post }: { post: BlogPostSummary }) {
  const sizes = "(min-width: 1440px) 372px, (min-width: 768px) 33vw, 100vw";
  const body = (
    <>
      <Paper />
      <PostCover post={post} sizes={sizes} />
      <div className="relative flex min-h-[98px] w-full flex-col items-start justify-between gap-4 leading-[1.1] text-black [word-break:break-word]">
        <h3 className="font-serif text-[20px] font-normal tracking-[-0.2px]">{post.title}</h3>
        <p className="font-mono text-[10px] font-medium tracking-[0.8px] uppercase opacity-60">
          {[post.category, ...post.details].join(" / ")}
        </p>
      </div>
    </>
  );
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="relative flex flex-col items-start gap-4 overflow-clip border border-black/15 p-4 transition-opacity duration-150 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
    >
      {body}
    </Link>
  );
}

/** A small right arrow, in the current colour (the text links' and the pagination's). */
function Arrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 22 12" fill="none" stroke="currentColor" strokeWidth="1.2" className={cn("h-[9px] w-[16px]", className)}>
      <path d="M0 6h21M15.5.5 21 6l-5.5 5.5" />
    </svg>
  );
}

/**
 * The lead story at the top of the journal (as reducto.ai/blog leads with its newest post): one wide card on the same
 * paper and black/15 line as the others, its cover (at its own 761 × 296 shape, as the cards', so nothing is cut off) across the
 * left 58% and, beside it, the details in Geist Mono caps,
 * the title in Crimson Light 40, its summary in Geist 16 and READ ARTICLE over a hairline. Stacked below 992px.
 */
function LeadPost({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative grid overflow-clip border border-black/15 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon lg:grid-cols-[58fr_42fr] lg:gap-10"
    >
      <Paper />
      <PostCover post={post} sizes="(min-width: 1440px) 716px, (min-width: 992px) 55vw, 100vw" className="lg:self-center" />
      <div className="relative flex flex-col items-start justify-between gap-8 pt-6 pb-2 lg:py-4 lg:pr-6">
        <div className="flex flex-col items-start gap-5">
          <p className="font-mono text-[10px] leading-[1.1] font-medium tracking-[0.8px] text-black/60 uppercase">
            {["Latest", post.category, post.date].filter(Boolean).join(" / ")}
          </p>
          <h2 className="font-serif text-[40px] leading-[1.05] font-light tracking-[-1.6px] text-ink [word-break:break-word] max-md:text-[30px] max-md:tracking-[-1.2px]">
            {post.title}
          </h2>
          {post.summary && (
            <p className="max-w-[460px] font-sans text-base leading-6 tracking-[-0.32px] text-ink-muted max-md:text-[15px] max-md:leading-[22px] max-md:tracking-[-0.3px]">
              {post.summary}
            </p>
          )}
        </div>
        <span className="inline-flex items-center gap-2 border-b border-[rgba(40,40,40,0.3)] p-[2px] font-serif text-base leading-[22px] tracking-[-0.48px] whitespace-nowrap text-ink-soft uppercase transition-opacity duration-150 group-hover:opacity-50">
          Read article
          <Arrow className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px]" />
        </span>
      </div>
    </Link>
  );
}

/** The page numbers to show: every page when there are few, else the first, the last and the current one's neighbours. */
function pageList(count: number, current: number): (number | "gap")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const pages = new Set([1, count, current - 1, current, current + 1].filter((n) => n >= 1 && n <= count));
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? ["gap" as const, n] : [n]));
}

/**
 * Previous, the page numbers and Next, in the filters' style: square cells on #ccc lines in Crimson 16, the current page
 * in black with light text.
 */
function Pagination({ page, count, onPage }: { page: number; count: number; onPage: (page: number) => void }) {
  const cell =
    "flex h-11 min-w-11 items-center justify-center border border-[#ccc] px-3 font-serif text-base leading-none tracking-[-0.64px] transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon";
  const step = "gap-2 px-4 text-[#010101] enabled:cursor-pointer enabled:hover:bg-black/4 disabled:opacity-35";
  return (
    <nav aria-label="Journal pages" className="flex items-center justify-center gap-2 max-sm:gap-1.5">
      <button type="button" disabled={page === 1} onClick={() => onPage(page - 1)} className={cn(cell, step)}>
        <Arrow className="rotate-180" />
        <span className="max-sm:sr-only">Previous</span>
      </button>
      {pageList(count, page).map((n, i) =>
        n === "gap" ? (
          <span key={`gap-${i}`} aria-hidden className="px-1 font-serif text-base text-black/50">
            &hellip;
          </span>
        ) : (
          <button
            key={n}
            type="button"
            aria-current={n === page ? "page" : undefined}
            aria-label={`Page ${n}`}
            onClick={() => onPage(n)}
            className={cn(cell, n === page ? "bg-black text-[#f2f2f2]" : "cursor-pointer text-[#010101] hover:bg-black/4")}
          >
            {n}
          </button>
        ),
      )}
      <button type="button" disabled={page === count} onClick={() => onPage(page + 1)} className={cn(cell, step)}>
        <span className="max-sm:sr-only">Next</span>
        <Arrow />
      </button>
    </nav>
  );
}

/** Posts per page in the grid under the lead story: three rows of three. */
const PER_PAGE = 9;

/**
 * Figma "Journal index" (1660:935), led as reducto.ai/blog is: the page has no hero, so 64px under the header, the filters, one equal-width row
 * (Crimson 16, 12 × 24px padding, #ccc lines), the chosen one in black with light text. 20px under them the newest post
 * as the wide lead story, then the rest in three columns 20px apart (two below 992px, one below 640px), nine to a page,
 * with the pagination 48px under the grid (always, even with one page); 80px under that. Choosing an industry shows only its posts (its newest
 * leading) and goes back to page 1; changing page scrolls back up to the filters. The lead story shows on page 1 only.
 * The posts and the filters (in their set order) come from Sanity.
 */
export function JournalIndex({ posts: allPosts, categories }: { posts: BlogPostSummary[]; categories: string[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const top = useRef<HTMLDivElement>(null);

  const posts = filter ? allPosts.filter((p) => p.category === filter) : allPosts;
  const [lead, ...rest] = posts;
  const pageCount = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const shown = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const tabs: { label: string; value: string | null }[] = [
    { label: `All (${allPosts.length})`, value: null },
    ...categories.map((c) => ({ label: c, value: c })),
  ];

  const choose = (value: string | null) => {
    setFilter(value);
    setPage(1);
  };
  const turnTo = (n: number) => {
    setPage(n);
    // Back up to the filters, clear of the fixed 72.5px header.
    const el = top.current;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
  };

  return (
    <section aria-label="Journal" className="relative bg-cream pt-16 pb-20 max-md:pt-10">
      <div ref={top} className="flex content-width max-w-[1254px] flex-col gap-5">
        <div role="group" aria-label="Filter by industry" className="-mx-1 flex overflow-x-auto px-1 [scrollbar-width:none]">
          {tabs.map((tab, i) => {
            const on = tab.value === filter;
            return (
              <button
                key={tab.label}
                type="button"
                aria-pressed={on}
                onClick={() => choose(tab.value)}
                className={cn(
                  "relative flex min-w-max flex-[1_0_0] items-center justify-center overflow-clip border-y border-r border-[#ccc] px-6 py-3 font-serif text-base leading-none tracking-[-0.64px] whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon",
                  i === 0 && "border-l",
                  on ? "bg-black text-[#f2f2f2]" : "cursor-pointer text-[#010101] hover:bg-black/4",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {lead ? (
          <>
            {page === 1 && <LeadPost post={lead} />}
            {shown.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
            {/* Always shown, so readers see where they are: with one page, its Previous and Next are disabled. */}
            {(
              <div className="pt-7">
                <Pagination page={page} count={pageCount} onPage={turnTo} />
              </div>
            )}
          </>
        ) : (
          <p className="border border-black/15 px-6 py-16 text-center font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            {filter ? `No posts in ${filter} yet.` : "No posts yet."}
          </p>
        )}
      </div>
    </section>
  );
}
