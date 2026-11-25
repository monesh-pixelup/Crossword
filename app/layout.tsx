import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Crossword — Your best hire, yet.",
    template: "%s · Crossword",
  },
  description:
    "Crossword is an AI shopper assistant that remembers, recommends, resolves, and reports - all within your guardrails.",
  openGraph: {
    title: "Crossword — Your best hire, yet.",
    description:
      "An AI shopper assistant that remembers, recommends, resolves, and reports - all within your guardrails.",
    type: "website",
    siteName: "Crossword",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff9ea",
};

/*
 * Marks browsers that won't draw zoomed text below a floor well above Chrome's (Safari 18 and earlier: 9px), so the
 * scaled mock-ups can use a transform there instead (globals.css, ScenePanel). Measured, not sniffed: 20px text zoomed
 * to 25% against plain 5px text; where the first comes out much wider, the floor is in force. Inline so it runs while
 * the page is parsed, before the first paint.
 */
const ZOOM_CLAMP_CHECK = `(function(){try{var h=document.documentElement,d=document.createElement("div");d.style.cssText="position:absolute;visibility:hidden;left:-9999px;top:0;font:16px/1 sans-serif;white-space:nowrap";d.innerHTML='<span style="display:inline-block"><span style="display:inline-block;zoom:.25;font-size:20px">mmmmmmmmmm</span></span><span style="display:inline-block;font-size:5px">mmmmmmmmmm</span>';(document.body||h).appendChild(d);var a=d.firstChild.getBoundingClientRect().width,b=d.lastChild.getBoundingClientRect().width;d.remove();if(b>0&&a>b*1.4)h.setAttribute("data-zoom-clamps","")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below may add data-zoom-clamps to <html> before React hydrates.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: ZOOM_CLAMP_CHECK }} />
        {/*
          In a boundary: it reads the URL (usePathname), which on a route with params unknown at build time (the Sanity
          Studio's /studio/…) is only known at request time. It draws nothing, so there is no fallback to show.
        */}
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
