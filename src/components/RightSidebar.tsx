import React, { useState, useEffect, useRef, type FC } from "react";
import { motion } from "framer-motion";
import type { Task } from "../../types";
import { DIMENS, ICONS } from "../../constants";
import type { RightSidebarView } from "../hooks/useRightSidebar";

// --- Dummy chat data ---
const initialConversations = [
  { id: 1, type: "channel", name: "payment-team", lastMessage: "OAuth implementati...", unread: 3 },
  { id: 2, type: "channel", name: "payment-backend", lastMessage: "API rate limiting ...", unread: 0 },
  { id: 3, type: "dm", name: "John Doe", lastMessage: "I'll handle the re...", unread: 0 },
  { id: 4, type: "dm", name: "Sarah Johnson", lastMessage: "Review completed", unread: 0 },
];

type MessageType = {
  id: number;
  author: string;
  initials: string;
  text: string;
  timestamp: string;
  type: "sent" | "received";
};

type MessagesByConversation = {
  [key: number]: MessageType[];
};

const initialMessages: MessagesByConversation = {
  1: [
    { id: 1, author: "Sarah Johnson", initials: "SJ", text: "The OAuth flow looks good. Just make sure we handle token expiration gracefully.", timestamp: "2:34 PM", type: "received" },
    { id: 2, author: "Mike Wilson", initials: "MW", text: "Should we implement PKCE for additional security?", timestamp: "2:36 PM", type: "received" },
    { id: 3, author: "John Doe", initials: "JD", text: "Good catch! I'll add PKCE support.", timestamp: "2:38 PM", type: "sent" },
    { id: 4, author: "Sarah Johnson", initials: "SJ", text: "Also, make sure to document the token refresh process clearly.", timestamp: "2:40 PM", type: "received" },
    { id: 5, author: "John Doe", initials: "JD", text: "Will do. I should have the implementation ready by EOD.", timestamp: "2:42 PM", type: "sent" },
  ],
  2: [{ id: 1, author: "Jane Smith", initials: "JS", text: "We need to discuss the new API rate limiting strategy.", timestamp: "10:00 AM", type: "received" }],
  3: [{ id: 1, author: "John Doe", initials: "JD", text: "I'll handle the request for the new feature.", timestamp: "Yesterday", type: "sent" }],
  4: [{ id: 1, author: "Sarah Johnson", initials: "SJ", text: "The review is completed. Everything looks good!", timestamp: "Yesterday", type: "received" }],
};

// --- Chat SVGs ---
const ChatIcon: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const ChevronDownIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const SearchIcon: FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SendIcon: FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const InfoRow: React.FC<{ icon: React.ReactElement<{ className?: string }>; label: string; children: React.ReactNode; }> = ({ icon, label, children }) => (<div> <div className="flex items-center space-x-2 text-normal"> <span className="w-4 h-4 flex items-center justify-center"> {React.cloneElement(icon, { className: "w-4 h-4 shrink-0" })} </span> <span className="text-xs font-medium">{label}</span> </div> <div className="pl-6 pt-1 text-sm text-title">{children}</div> </div>);
const Tag: React.FC<{ text: string }> = ({ text }) => {
  const colorInfo: Record<string, { bg: string; text: string; dot: string }> = { bug: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" }, payment: { bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500" }, urgent: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" }, }; const tagColors = colorInfo[text] || { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-400" };
  return (<span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${tagColors.bg} ${tagColors.text}`}> <span className={`w-1.5 h-1.5 mr-1.5 rounded-full ${tagColors.dot}`} /> {text} </span>);
}

// --- Chat Components ---
interface SidebarProps {
  conversations: typeof initialConversations;
  activeConversationId: number;
  onConversationSelect: (id: number) => void;
}

const Sidebar: FC<SidebarProps> = ({ conversations, activeConversationId, onConversationSelect }) => (
  <aside className="w-[120px] flex-shrink-0 app-background border-r border-primary flex flex-col">
    <header className="p-2 border-b border-primary">
      <div className="flex items-center gap-1 text-normal mb-2">
        <ChatIcon />
        <h1 className="text-sm font-semibold">Chat</h1>
      </div>
      <div className="flex justify-between items-center p-1 px-2 app-background border border-primary rounded-md text-xs font-medium cursor-pointer">
        <span>Contextual</span>
        <ChevronDownIcon />
      </div>
    </header>
    <div className="relative p-2 px-3 border-b border-primary">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-normal">
        <SearchIcon />
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


interface MessageProps {
  message: { id: number; author: string; initials: string; text: string; timestamp: string; type: "sent" | "received" };
}

const Message: FC<MessageProps> = ({ message }) => (
  <div className={`flex gap-2 max-w-[190px] ${message.type === "sent" ? "ml-auto flex-row-reverse" : ""}`}>
    <div className="w-8 h-8 rounded-full app-background text-title flex justify-center items-center font-medium flex-shrink-0 self-start text-[0.65rem]">
      {message.initials}
    </div>
    <div className={`flex flex-col ${message.type === "sent" ? "items-end" : ""}`}>
      <div className="flex items-center gap-1 mb-1">
        <span className="font-semibold text-xs text-title">{message.author}</span>
        <span className="text-[0.65rem] text-normal">{message.timestamp}</span>
      </div>
      <div className={`py-1.5 px-2.5 rounded-2xl text-[0.75rem] leading-snug ${message.type === "received" ? "bg-gray-100 rounded-tl-md text-gray-800" : "bg-blue-500 text-white rounded-tr-md"}`}>
        <p>{message.text}</p>
      </div>
    </div>
  </div>
);

interface ChatWindowProps {
  conversation: typeof initialConversations[0] | undefined;
  messages: typeof initialMessages[number];
  currentMessage: string;
  onMessageChange: (val: string) => void;
  onSendMessage: () => void;
}


const ChatWindow: FC<ChatWindowProps> = ({ conversation, messages, currentMessage, onMessageChange, onSendMessage }) => {
  const messageListRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messageListRef.current) messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onMessageChange(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  if (!conversation) {
    return <main className="flex-grow flex flex-col app-background"><div className="flex items-center justify-center h-full text-normal text-xs">Select a conversation</div></main>;
  }

  return (
    <main className="flex-grow flex flex-col app-background">
      <header className="flex items-center gap-1.5 p-2 px-3 border-b border-primary flex-shrink-0">
        <h2 className="text-xs font-bold text-title truncate"># {conversation.name}</h2>
        <div className="app-background text-normal text-[0.65rem] font-semibold py-0.5 px-1 rounded-full border border-gray-200">{conversation.unread}</div>
      </header>
      <div className="flex-grow overflow-y-auto p-3 space-y-3" ref={messageListRef}>
        {messages.map((msg) => <Message key={msg.id} message={msg} />)}
      </div>
      <footer className="p-2 px-3 border-t border-primary app-background flex-shrink-0">
        <div className="flex items-center app-background border border-primary rounded-lg">
          <textarea
            ref={textareaRef}
            placeholder="Type a message..."
            rows={1}
            value={currentMessage}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            className="flex-grow border-none outline-none p-2 resize-none bg-transparent text-[0.75rem] max-h-20"
          />
          <button type="button" onClick={onSendMessage} disabled={!currentMessage.trim()}
            className="border-none background-primary text-contrast w-8 h-8 m-1 rounded-md flex items-center justify-center background-primary-hover disabled:background-primary disabled:cursor-not-allowed">
            <SendIcon />
          </button>
        </div>
      </footer>
    </main>
  );
};

// --- RightSidebar ---
interface RightSidebarProps {
  task: Task;
  view: Exclude<RightSidebarView, null>;
  isOpen: boolean;
}

const RightSidebar: FC<RightSidebarProps> = ({ task, view, isOpen }) => {
  const [activeConversationId, setActiveConversationId] = useState(initialConversations[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [currentMessage, setCurrentMessage] = useState("");

  const activeConversation = initialConversations.find((c) => c.id === activeConversationId);
  const activeMessages = messages[activeConversationId] || [];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    const newMessage = {
      id: Date.now(),
      author: "John Doe",
      initials: "JD",
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "sent" as const,
    };
    setMessages({
      ...messages,
      [activeConversationId]: [...(messages[activeConversationId] || []), newMessage],
    });
    setCurrentMessage("");
  };

  return (
    <motion.aside
      initial={{ width: isOpen ? 450 : 0, opacity: isOpen ? 1 : 0 }}
      animate={{ width: isOpen ? 450 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="app-background border-l border-primary flex flex-col overflow-hidden text-normal"
      style={{ flexShrink: 0 }}
    >
      <div className={`${DIMENS.headerHeight} flex items-center justify-between border-b border-primary px-4`}>
        <div className="flex items-center space-x-2 text-title">
          <span className="w-5 h-5">{React.cloneElement(view === "message" ? ICONS.messageSquare : ICONS.info, { className: "w-5 h-5" })}</span>
          <h2 className="font-semibold">{view === "message" ? "Messages" : "Details"}</h2>
        </div>
      </div>

      {view === "info" ? (
        <div className="space-y-5 px-4 pt-4">
          <h3 className="font-semibold text-base text-title">{task.title}</h3>
          <p className="text-xs text-normal"> Task • ID: {`tab:${task.id}.toLowerCase()`} </p>
          <div className="space-y-4">
            <InfoRow icon={ICONS.user} label="Assignee">
              <span className="font-medium">John Doe</span>
            </InfoRow>
            <InfoRow icon={ICONS.calendar} label="Timeline">
              <span className="font-medium">{task.timeline.start} → {task.timeline.end}</span>
            </InfoRow>
            <InfoRow icon={ICONS.clock} label="Status">
              <span className="font-medium">{task.status}</span>
            </InfoRow>
            <InfoRow icon={ICONS.tag} label="Tags">
              <div className="flex flex-wrap gap-2 pt-1"> {task.tags.map(tag => <Tag key={tag} text={tag} />)}
              </div>
            </InfoRow>
            <InfoRow icon={ICONS.sprint} label="Sprint">
              <span className="font-medium">{task.sprint} • {task.sprintPoints} points</span>
            </InfoRow>
          </div>
        </div>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <Sidebar
              conversations={initialConversations}
              activeConversationId={activeConversationId}
              onConversationSelect={setActiveConversationId}
            />
            <ChatWindow
              conversation={activeConversation}
              messages={activeMessages}
              currentMessage={currentMessage}
              onMessageChange={setCurrentMessage}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default RightSidebar;
