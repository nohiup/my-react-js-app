import type { FC } from "react";
import { ICONS, initialConversations } from "../../../constants";

interface SidebarProps {
  conversations: typeof initialConversations;
  activeConversationId: number;
  onConversationSelect: (id: number) => void;
}

const Sidebar: FC<SidebarProps> = ({ conversations, activeConversationId, onConversationSelect }) => (
  <aside className="w-[120px] flex-shrink-0 app-background border-r border-primary flex flex-col">
    <header className="p-2 border-b border-primary">
      <div className="flex items-center gap-1 text-normal mb-2">
        {ICONS.chatIcon}
        <h1 className="text-sm font-semibold">Chat</h1>
      </div>
      <div className="flex justify-between items-center p-1 px-2 app-background border border-primary rounded-md text-xs font-medium cursor-pointer">
        <span>Contextual</span>
        {ICONS.chevronDownIcon}
      </div>
    </header>
    <div className="relative p-2 px-3 border-b border-primary">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-normal">
        {ICONS.search}
      </div>
      <input type="search" placeholder="Search..." className="border border-primar outline-none app-background w-full rounded-md py-1.5 pr-2 pl-7 text-xs" />
    </div>
    <nav className="flex-grow overflow-y-auto">
      {conversations.map((convo) => (
        <div
          key={convo.id}
          className={`flex justify-between items-center py-2 cursor-pointer select-none background-primary-hover ${convo.id === activeConversationId ? "selected-primary border-l-[3px] background-primary pl-[9px] pr-3" : "px-3"}`}
          onClick={() => onConversationSelect(convo.id)}
        >
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <span className="font-semibold text-xs text-title truncate">
              {convo.type === "channel" ? "#" : "@"} {convo.name}
            </span>
            <span className="text-[0.7rem] text-normal truncate">{convo.lastMessage}</span>
          </div>
          {convo.unread > 0 && (
            <span className="background-primary text-contrast rounded-full min-w-[16px] h-4 px-1 flex justify-center items-center text-[0.65rem] font-bold">{convo.unread}</span>
          )}
        </div>
      ))}
    </nav>
  </aside>
);

export default Sidebar;