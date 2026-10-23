
// node 1941:13836 — the assistant's turn: reply text, optional insight,
// and the result (cards, hero image, etc.) stacked with the transcript's
// literal 20px inner gap, whatever combination a given scenario needs.
// `animateIn` plays a one-shot enter animation when this turn first
// mounts — opt-in for a scenario that mounts each turn only once it's
// ready to show, instead of always being present. Every existing call
// site leaves it unset and renders exactly as before, with no animation.
export function AssistantTurn({
  children,
  animateIn = false,
  className,
}: {
  children: React.ReactNode;
  animateIn?: boolean;
  className?: string;
}) {
  const classes = ["sdm-ill-assistant-turn", animateIn && "sdm-ill-assistant-turn--enter", className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
