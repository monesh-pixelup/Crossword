
// Shared outer frame for Retain · Campaigns (06-10): 821x611, the red
// damask backdrop (campaigns_outbound_bg_3x.webp, 3x of that size) with
// one 450x500 widget centered — same "shell floats on a decorative
// backdrop" pattern as ConversionAssistanceFrame.
export function CampaignFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="ill-campaign-frame">
      <div className="ill-campaign-frame__content">{children}</div>
    </div>
  );
}
