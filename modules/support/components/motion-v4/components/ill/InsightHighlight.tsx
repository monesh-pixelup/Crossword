import { AttributeRow } from "./AttributeRow";
import { Button } from "./Button";

// No ILL/* precedent exists for "the payoff stat is the largest, boldest
// element in the frame" (confirmed gap via search_design_system on the
// ILL library) — built from existing primitives only: Background/Subtle +
// Button/Primary (aubergine fill, inverse text via the shared
// `--ill-color-accent-strong`/`--ill-color-text-inverse` tokens) for the
// statement itself, per review feedback (was a plain bold paragraph).
// The optional footnote reuses Attribute-Row verbatim rather than
// inventing a second label/value treatment; the optional CTA reuses
// Button exactly as Card-Commerce's own CTA does (full width under the
// statement, not a new button style).
export interface InsightHighlightProps {
  statement: string;
  footnote?: { label: string; value: string };
  cta?: string;
}

export function InsightHighlight({ statement, footnote, cta }: InsightHighlightProps) {
  return (
    <div className="ill-insight-highlight">
      <div className="ill-insight-highlight__cta">
        <Button appearance="primary" label={statement} />
      </div>
      {footnote && <AttributeRow label={footnote.label} value={footnote.value} />}
      {cta && (
        <div className="ill-insight-highlight__cta">
          <Button appearance="primary" label={cta} />
        </div>
      )}
    </div>
  );
}
