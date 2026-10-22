
// Shared outer frame for the Sell: Conversational Interface "conversion
// assistance" scenarios (28-33) — centers one Shell-based scenario over
// the supplied decorative background (same aubergine/gold-corner family
// as Human Mode's own frame, but its own asset and its own near-square
// 1.172 aspect ratio, sized here for a single portrait shell rather than
// three side by side).
export function ConversionAssistanceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="ill-conversion-assistance-frame">
      <div className="ill-conversion-assistance-frame__content">{children}</div>
    </div>
  );
}
