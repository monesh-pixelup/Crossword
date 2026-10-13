import { SiteShell } from "@/modules/marketing";

/** Product pages (Sell, …): the same shell and scroll-aware header as the rest of the site. */
export default function ProductLayout({ children }: LayoutProps<"/">) {
  return <SiteShell>{children}</SiteShell>;
}
