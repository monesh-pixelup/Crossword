import { Icon, type IconName } from "./Icon";

// ILL/Primitive/IconButton (node 1954:306). "Use for one icon action such
// as favorite, send, expand, or close. Do not use for labeled CTAs."
// Two variants are instantiated in this composition — both pulled with
// their exact literal geometry from the modules that use them:
// outline  — ILL/Module/Chat/Header action buttons (node 1960:185 etc.)
// accent   — ILL/Module/Chat/Composer send action (node 1960:201)
// outline-md / accent-sm — the remaining authored Outlined/Md and
// Filled/Sm variants (nodes 1960:85, 1960:88).
type IconButtonVariant = "outline" | "outline-md" | "accent" | "accent-sm";

interface IconButtonProps {
  icon: IconName;
  label: string;
  variant: IconButtonVariant;
  onClick?: () => void;
  // Extra class on the button itself — e.g. a scenario-driven one-shot
  // press state (Support V3 Motion / 08's scripted send-tap). Unused by
  // default, so every existing call site renders unchanged.
  className?: string;
}

export function IconButton({ icon, label, variant, onClick, className }: IconButtonProps) {
  return (
    <button
      type="button"
      className={["ill-icon-button", `ill-icon-button--${variant}`, className].filter(Boolean).join(" ")}
      aria-label={label}
      onClick={onClick}
    >
      <span className={icon === "send" || icon === "sendGold" ? "ill-icon-button__glyph--rotated" : undefined}>
        <Icon name={icon} size={variant === "accent" ? 20 : undefined} />
      </span>
    </button>
  );
}
