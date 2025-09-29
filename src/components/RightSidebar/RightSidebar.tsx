import { motion } from "framer-motion";
import { useState } from "react";
import { DIMENS, ICONS, initialConversations, initialMessages } from "../../../constants";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InfoRow from "./InfoRow";
import Tag from "./Tag";
import type { Task } from "../../../types";
import type { RightSidebarView } from "../../hooks/useRightSidebar";

interface RightSidebarProps {
  task: Task;
  view: Exclude<RightSidebarView, null>;
  isOpen: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ task, view, isOpen }) => {
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
          <span className="w-5 h-5">{view === "message" ? ICONS.messageSquare : ICONS.info}</span>
          <h2 className="font-semibold">{view === "message" ? "Messages" : "Details"}</h2>
        </div>
      </div>

      {view === "info" ? (
        <div className="space-y-5 px-4 pt-4">
          <h3 className="font-semibold text-base text-title">{task.title}</h3>
          <p className="text-xs text-normal">Task • ID: {`tab:${task.id}.toLowerCase()`}</p>
          <div className="space-y-4">
            <InfoRow icon={ICONS.user} label="Assignee"><span>John Doe</span></InfoRow>
            <InfoRow icon={ICONS.calendar} label="Timeline"><span>{task.timeline.start} → {task.timeline.end}</span></InfoRow>
            <InfoRow icon={ICONS.clock} label="Status"><span>{task.status}</span></InfoRow>
            <InfoRow icon={ICONS.tag} label="Tags">
              <div className="flex flex-wrap gap-2 pt-1">
                {task.tags.map(tag => <Tag key={tag} text={tag} />)}
              </div>
            </InfoRow>
            <InfoRow icon={ICONS.sprint} label="Sprint"><span>{task.sprint} • {task.sprintPoints} points</span></InfoRow>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
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
      )}
    </motion.aside>
  );
};

export default RightSidebar;
