// ILL/Module/Chat/Breaker (node 2742:31311, fileKey TiAeD9ICNjjC8N3zoUJExk)
// — a muted system line marking a state change inside the same
// transcript (a human agent joining, a status change) rather than a
// separate interface. "Use this kind of breaker when a human joins the
// chat." Promoted from ServiceResolution's own local `.ill-service-handoff`
// ("no ILL/* precedent exists for this beat" at the time) now that a
// second scenario needs the identical pattern — same literal values
// (hairline rgba(159,159,159,0.3), DM Sans 500 12.313px metadata text,
// 35px lead-in), not approximated.
export function ChatBreaker({ text }: { text: string }) {
  return (
    <p className="ill-chat-breaker">
      <span>{text}</span>
    </p>
  );
}
