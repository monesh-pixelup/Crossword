import { Icon, type IconName } from "./Icon";

// ILL/Module/Assistant/Insight (node 1954:437). "AI rationale with
// replaceable source icon, optional source row, optional heading, and
// body copy." Used here to carry the two context signals (saved size,
// linen preference) as supporting reasoning rather than chat turns.
//
// `sourceSuffix`, `attribution` and `footer` are the component's own
// richer "Whisper to Crossword" variant (node 2742:33561, same file) —
// a second header text run after a separator dot, a named-sender line
// above the body message, and a divider + status row below it. Any of
// the three switches the card to its stacked layout (`attribution` or
// `footer` present); every existing call site leaves them unset and
// keeps the original compact, wrapped single-line layout unchanged.
interface AssistantInsightProps {
  source?: string;
  sourceSuffix?: string;
  lines: string[];
  attribution?: string;
  footer?: { label: string; icon?: IconName };
}

export function AssistantInsight({ source = "Thinking", sourceSuffix, lines, attribution, footer }: AssistantInsightProps) {
  const stacked = Boolean(attribution || footer);
  return (
    <div className={["ill-insight", stacked && "ill-insight--stacked"].filter(Boolean).join(" ")}>
      <div className="ill-insight__source">
        <Icon name="insight" />
        <p className="ill-insight__source-label">{source}</p>
        {sourceSuffix && (
          <>
            <Icon name="sourceDot" />
            <p className="ill-insight__source-label">{sourceSuffix}</p>
          </>
        )}
      </div>
      <p className="ill-insight__body">
        {attribution ? `${attribution}\n${lines.join(" ")}` : lines.join(" ")}
      </p>
      {footer && (
        <div className="ill-insight__footer">
          <div className="ill-insight__footer-status">
            <Icon name={footer.icon ?? "checks"} />
            <p className="ill-insight__body">{footer.label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
