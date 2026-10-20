import "./Thread.css";

// ILL/Assembly/Chat/Transcript (node 1941:13832) — wraps a sequence of
// turns (UserTurn, AssistantTurn) with the transcript's own 40px gap.
export function Thread({ children }: { children: React.ReactNode }) {
  return <div className="ill-thread">{children}</div>;
}
