import { Icon } from "./Icon";

// ILL/Module/Browser/Chrome (node 1954:532). "Responsive browser chrome.
// Field selects search/address structure; width remains freely
// resizable." Field=Address (1954:531) is the default; Field=Search
// (1954:520) was missing from the first build.
export function BrowserChrome({ url, field = "address" }: { url: string; field?: "address" | "search" }) {
  return (
    <div className={`ill-browser-chrome ill-browser-chrome--${field}`}>
      <div className="ill-browser-chrome__dots">
        <span />
        <span />
        <span />
      </div>
      <div className="ill-browser-chrome__address">
        <Icon name={field === "search" ? "search" : "address"} />
        <span>{url}</span>
      </div>
    </div>
  );
}
