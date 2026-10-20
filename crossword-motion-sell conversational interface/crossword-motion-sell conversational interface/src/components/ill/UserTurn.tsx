import "./UserTurn.css";

// node 1941:13833 — the user's turn in the transcript: the message bubble,
// right-aligned, plus an optional attached reference/upload chip above it
// (per the kit's provenance rule — a product the shopper referenced, or an
// image they supplied, reads as part of their turn, not a separate module).
// `animateIn` plays a one-shot enter animation when this turn first
// mounts — opt-in for a scenario that mounts each turn only once it's
// ready to show, instead of always being present. Every existing call
// site leaves it unset and renders exactly as before, with no animation.
export function UserTurn({
  children,
  animateIn = false,
  className,
}: {
  children: React.ReactNode;
  animateIn?: boolean;
  className?: string;
}) {
  const classes = ["ill-user-turn", animateIn && "ill-user-turn--enter", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
