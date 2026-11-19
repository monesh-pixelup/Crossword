import { getLatestPost } from "@/modules/blog/lib/posts";
import { SiteShell } from "@/modules/marketing";

export default async function MarketingLayout({ children }: LayoutProps<"/">) {
  return <SiteShell latestPost={await getLatestPost()}>{children}</SiteShell>;
}
