import "./ComparisonRow.css";

// ILL/Module/Comparison/Row (node 1954:540). "Use as one repeatable row
// in a two-product commerce comparison." valueA renders in the favored/
// darker color, valueB muted — literal, authored asymmetry, not applied
// by us: column A is whichever product should read as the stronger pick.
export function ComparisonRow({
  label,
  valueA,
  valueB,
}: {
  label: string;
  valueA: string;
  valueB: string;
}) {
  return (
    <div className="ill-comparison-row">
      <div className="ill-comparison-row__cell ill-comparison-row__label">{label}</div>
      <div className="ill-comparison-row__cell ill-comparison-row__value-a">{valueA}</div>
      <div className="ill-comparison-row__cell ill-comparison-row__value-b">{valueB}</div>
    </div>
  );
}
