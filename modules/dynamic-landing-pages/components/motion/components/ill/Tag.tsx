import { Icon } from "./Icon";

// ILL/Primitive/Tag (node 2118:1203) — the "Powered by Crossword"
// attribution pill: spark glyph + two-weight uppercase label. Added after
// the library audit; no scenario uses it yet.
export function Tag({ prefix = "Powered by", brand = "Crossword" }: { prefix?: string; brand?: string }) {
  return (
    <span className="ill-tag">
      <Icon name="spark" size={10} />
      <span className="ill-tag__label">
        <span className="ill-tag__prefix">{prefix}</span>
        <span className="ill-tag__brand">{brand}</span>
      </span>
    </span>
  );
}
