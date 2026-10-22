
// ILL/Module/Chat/Message (node 1954:359). "Use for one user or assistant
// text message. Insert products and insights as separate sibling modules."
// Role=User -> node 1954:355, Role=Assistant -> node 1954:358.
interface ChatMessageProps {
  role: "user" | "assistant";
  text?: string;
  children?: React.ReactNode;
}

// `children` is the escape hatch for inline emphasis within a reply (e.g.
// scenario 07's resolved size) — existing type-scale weight, not a new
// component, per the plan.
export function ChatMessage({ role, text, children }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="ill-chat-message ill-chat-message--user">
        <p>{children ?? text}</p>
      </div>
    );
  }

  return (
    <div className="ill-chat-message ill-chat-message--assistant">
      <p>{children ?? text}</p>
    </div>
  );
}
