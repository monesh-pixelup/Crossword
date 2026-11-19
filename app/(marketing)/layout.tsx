import { getLatestPostHref } from "@/modules/blog/lib/posts";
import { SiteShell } from "@/modules/marketing";

export default async function MarketingLayout({ children }: LayoutProps<"/">) {
  return <SiteShell latestPostHref={await getLatestPostHref()}>{children}</SiteShell>;
}
