import "./Chip.css";

// ILL/Primitive/Chip (1954:314). "Use for compact labels, statuses,
// discounts, sources, and suggestions. Do not use as a full CTA."
// Kind=Label (1954:309, default) — compact uppercase label/status/source.
// Kind=Discount (1954:313) — gold pill, 7px type, no uppercase/border;
// literal values read from the Figma instance (used there next to a
// price, e.g. PDP/Info's "0% off").
// Kind=Action (2710:27265 "action" / 2710:27267 "Open") — a resolved,
// one-tap status action (Support V3/07's Assign/Open), filled instead of
// Label kind's bordered surface. `tone` picks the fill: "primary" is the
// Assign instance's own literal (Accent/Primary + inverse text), "gold"
// is the Open instance's own literal (Accent/Soft + body text) — read
// directly off the merchant-helpdesk reference (node 2710:27270) rather
// than invented, since the two actions use two different literal fills.
//
// `size`: Label kind's own 12px type is unchanged by default, so every
// existing call site (DynamicLandingPage's tag, ReturnVisitComparison's
// viewed label, ProactiveIntervention's size chip) renders exactly as
// before. `size="sm"` is a 9px variant for compact status badges —
// design feedback on Support V3's status chips — added as a proper
// component variant rather than a one-off local override, so other
// Chip usage stays untouched.
export function Chip({
  children,
  kind = "label",
  size = "md",
  tone = "primary",
}: {
  children: React.ReactNode;
  kind?: "label" | "discount" | "action";
  size?: "md" | "sm";
  tone?: "primary" | "gold";
}) {
  const classes = [
    "ill-chip",
    kind === "discount" && "ill-chip--discount",
    kind === "action" && `ill-chip--action ill-chip--action-${tone}`,
    size === "sm" && "ill-chip--sm",
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
