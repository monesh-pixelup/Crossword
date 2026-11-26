import type { Metadata } from "next";
import { getLatestPost } from "@/modules/blog/lib/posts";
import { SiteShell } from "@/modules/marketing";
import { NotFoundContent } from "@/modules/marketing/components/not-found/not-found-content";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** An address nothing on the site matches. Outside the (marketing) group, so it brings the header and footer itself. */
export default async function NotFound() {
  return (
    <SiteShell latestPost={await getLatestPost()}>
      <NotFoundContent />
    </SiteShell>
  );
}
