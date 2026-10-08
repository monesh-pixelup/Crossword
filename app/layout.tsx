import type { Metadata, Viewport } from "next";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
