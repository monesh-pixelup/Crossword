import { Icon } from "./Icon";

export interface AiPillOption {
  id: string;
  text: string;
}

// ILL/Module/Chat/AI Pils (node 2133:6810, fileKey TiAeD9ICNjjC8N3zoUJExk) —
// a pre-set, tappable AI-suggested question. Figma only authors the one
// emphasized pill; the unselected siblings reuse the kit's own muted
// surface/border/metadata tokens rather than inventing a second
// component, so the picked option reads as resolved against the others
// the same way Chip/QuizAnswerRow already distinguish a given answer
// from its unpicked siblings. Icon swapped from the Figma instance's own
// (unrelated, content-specific) glyph to the kit's existing Insight icon
// — already this file's established "AI suggestion" marker — rather
// than importing a new one-off asset.
export function AiPills({ options, selectedId }: { options: AiPillOption[]; selectedId: string }) {
  return (
    <div className="ill-ai-pills">
      {options.map((option) => (
        <div
          key={option.id}
          className={option.id === selectedId ? "ill-ai-pill ill-ai-pill--selected" : "ill-ai-pill"}
        >
          <Icon name="insight" size={16} />
          <span>{option.text}</span>
        </div>
      ))}
    </div>
  );
}
