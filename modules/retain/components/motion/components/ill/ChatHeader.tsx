import { IconButton } from "./IconButton";

// ILL/Module/Chat/Header (node 1954:352).
// "Use at the top of conversational illustration templates." The
// component's own show.controlsLeft/show.expand/show.close properties
// are exposed here as showHistory/showAdd/showExpand/showClose (all true
// by default, matching every existing call site) — e.g. the proactive
// nudge widget (node 2094:421) configures controlsLeft off and only
// close on, same as in Figma, rather than forking a separate header.
interface ChatHeaderProps {
  brand: string;
  showHistory?: boolean;
  showAdd?: boolean;
  showExpand?: boolean;
  showClose?: boolean;
  onClose?: () => void;
}

export function ChatHeader({
  brand,
  showHistory = true,
  showAdd = true,
  showExpand = true,
  showClose = true,
  onClose,
}: ChatHeaderProps) {
  const showControlsLeft = showHistory || showAdd;
  return (
    <header className="ill-chat-header">
      {showControlsLeft && (
        <div className="ill-chat-header__group">
          {showHistory && <IconButton icon="history" label="History" variant="outline" />}
          {showAdd && <IconButton icon="add" label="New conversation" variant="outline" />}
        </div>
      )}
      <div className="ill-chat-header__brand">{brand}</div>
      <div className="ill-chat-header__group">
        {showExpand && <IconButton icon="expand" label="Expand" variant="outline" />}
        {showClose && <IconButton icon="close" label="Close" variant="outline" onClick={onClose} />}
      </div>
    </header>
  );
}
