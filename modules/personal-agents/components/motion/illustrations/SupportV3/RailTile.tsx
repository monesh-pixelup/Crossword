// The workspace tile at the foot of every dashboard rail, in place of the profile picture (Figma 4158:24253):
// a white rounded square with the workspace initial.
export function RailTile({ className, initial = "A" }: { className?: string; initial?: string }) {
  return (
    <span className={className ? `rail-tile ${className}` : "rail-tile"} aria-hidden="true">
      {initial}
    </span>
  );
}
