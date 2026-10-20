import "./Button.css";

// ILL/Primitive/Button (node 1954:297). "Use for labeled actions such as
// Add to Cart, Buy Now, or submit. Do not use for icon-only controls."
// Appearance=Ghost (node 1964:218) was missing from the first build.
// Authored at a fixed ~322px "Wide" width; made fluid here (same
// padding/radius/type, just not the literal width) since every usage in
// this kit needs it to share a row or fill a narrower container —
// same adaptation already applied to Card-Commerce's CTA button.
export type ButtonAppearance = "primary" | "secondary" | "accent" | "ghost";

interface ButtonProps {
  appearance: ButtonAppearance;
  label: string;
  onClick?: () => void;
  // The authored 12px leading/trailing icon slots (nodes 1954:278 /
  // 1954:281) — optional, unused by default.
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  // Extra class on the button itself — e.g. a scenario that needs its own
  // trailing group action full-width rather than content-width. Unused by
  // default, so every existing call site renders unchanged.
  className?: string;
}

export function Button({ appearance, label, onClick, iconLeading, iconTrailing, className }: ButtonProps) {
  return (
    <button type="button" className={["ill-button", `ill-button--${appearance}`, className].filter(Boolean).join(" ")} onClick={onClick}>
      {iconLeading}
      {label}
      {iconTrailing}
    </button>
  );
}
