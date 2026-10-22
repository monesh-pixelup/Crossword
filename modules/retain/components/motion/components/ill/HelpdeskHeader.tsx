import { IconButton } from "./IconButton";

// ILL/Module/Helpdesk/Header (node 2710:27221), the sibling instance next
// to Chat/Header (node 2710:27220) under the same frame. "Use at the top
// of conversational illustration templates. Do not use as browser
// chrome." Same left/right icon-action groups as Chat/Header, with the
// center swapped for an unboxed brand label plus a bordered "Helpdesk"
// badge — the merchant-facing counterpart to Chat/Header's shopper-facing
// brand pill, for a scenario where the person in the conversation is the
// brand itself, not a shopper.
//
// `tone="gold"` is opt-in for the Support V3 "Merchant insight" scene
// (node 2725:28975 and siblings), where the same four glyphs resolve to
// Accent/Soft (#e0be60) instead of their default Accent/Primary — every
// existing call site leaves `tone` unset and keeps the default glyphs.
export function HelpdeskHeader({ brand, tone = "default" }: { brand: string; tone?: "default" | "gold" }) {
  const gold = tone === "gold";
  return (
    <header className="ill-chat-header">
      <div className="ill-chat-header__group">
        <IconButton icon={gold ? "historyGold" : "history"} label="History" variant="outline" />
        <IconButton icon={gold ? "addGold" : "add"} label="New conversation" variant="outline" />
      </div>
      <div className="ill-helpdesk-header__center">
        <span className="ill-helpdesk-header__brand">{brand}</span>
        <span className="ill-helpdesk-header__badge">
          <span className="ill-helpdesk-header__badge-text">Helpdesk</span>
        </span>
      </div>
      <div className="ill-chat-header__group">
        <IconButton icon={gold ? "expandGold" : "expand"} label="Expand" variant="outline" />
        <IconButton icon={gold ? "closeGold" : "close"} label="Close" variant="outline" />
      </div>
    </header>
  );
}
