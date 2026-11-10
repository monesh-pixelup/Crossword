"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import cover from "../assets/post-cover.webp";
import paper from "../assets/paper-tile.webp";
import { type BlogCategory, type BlogPost, blogCategories, blogPosts } from "../config/posts";

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
 * A post card (Figma "A", 1660:976 and on): a black/15 line around the paper, 16px in: the maroon cover (371.7 ×
 * 184.6, exported from Figma at 3x), then 16px under it a 98px block with the title (Crimson 20 at 1.1) at its top and
 * the details (Geist Mono Medium 10, caps, 60%) at its foot.
 */
function PostCard({ post }: { post: BlogPost }) {
  const body = (
    <>
      <Paper />
      <Image
        src={cover}
        alt=""
        sizes="(min-width: 1440px) 372px, (min-width: 768px) 33vw, 100vw"
        className="relative aspect-[371.668/184.587] h-auto w-full"
      />
      <div className="relative flex min-h-[98px] w-full flex-col items-start justify-between gap-4 leading-[1.1] text-black [word-break:break-word]">
        <h3 className="font-serif text-[20px] font-normal tracking-[-0.2px]">{post.title}</h3>
        <p className="font-mono text-[10px] font-medium tracking-[0.8px] uppercase opacity-60">
          {[post.category, ...post.details].join(" / ")}
        </p>
      </div>
    </>
  );
  const card = "relative flex flex-col items-start gap-4 overflow-clip border border-black/15 p-4";
  return post.href ? (
    <Link href={post.href} className={cn(card, "transition-opacity duration-150 hover:opacity-80")}>
      {body}
    </Link>
  ) : (
    <article className={card}>{body}</article>
  );
}

/**
 * Figma "Journal index" (1660:935): 124px under the hero (Figma's 44px index header and its 80px gap), the filters,
 * one equal-width row of nine (Crimson 16, 12 × 24px padding, #ccc lines), the chosen one in black with light text;
 * 20px under them the posts, three columns 20px apart (two below 992px, one below 640px); 80px under the last row.
 * Choosing an industry shows only its posts.
 */
export function JournalIndex() {
  const [filter, setFilter] = useState<BlogCategory | null>(null);
  const posts = filter ? blogPosts.filter((p) => p.category === filter) : blogPosts;
  const tabs: { label: string; value: BlogCategory | null }[] = [
    { label: `All (${blogPosts.length})`, value: null },
    ...blogCategories.map((c) => ({ label: c, value: c })),
  ];

  return (
    <section aria-label="Journal" className="relative bg-cream pt-[124px] pb-20 max-md:pt-16">
      <div className="flex content-width max-w-[1254px] flex-col gap-5">
        <div role="group" aria-label="Filter by industry" className="-mx-1 flex overflow-x-auto px-1 [scrollbar-width:none]">
          {tabs.map((tab, i) => {
            const on = tab.value === filter;
            return (
              <button
                key={tab.label}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(tab.value)}
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

        {posts.length ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={i} post={post} />
            ))}
          </div>
        ) : (
          <p className="border border-black/15 px-6 py-16 text-center font-sans text-base leading-6 font-light tracking-[-0.32px] text-black/60">
            No posts in {filter} yet.
          </p>
        )}
      </div>
    </section>
  );
}
