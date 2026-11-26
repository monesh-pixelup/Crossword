import { getMenuPost } from "@/modules/blog/lib/posts";
import { SiteShell } from "@/modules/marketing";

/** Product pages (Sell, …): the same shell and scroll-aware header as the rest of the site. */
export default async function ProductLayout({ children }: LayoutProps<"/">) {
  return <SiteShell latestPost={await getMenuPost()}>{children}</SiteShell>;
}
