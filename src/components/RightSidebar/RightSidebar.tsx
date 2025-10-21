import { motion } from "framer-motion";
import { useState } from "react";
import { DIMENS, ICONS, initialConversations, initialMessages } from "../../../constants";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InfoRow from "./InfoRow";
import Tag from "./Tag";
import type { Task } from "../../../types";
import type { RightSidebarView } from "../../hooks/useRightSidebar";
import { Stack } from "../ui/stack";
import type { RootState } from "@/store/configureStore";
import { useSelector } from "react-redux";
import { projectTasks, securityTasks, settingsTasks, tasks } from "@/data/tasks";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "../ui/empty";

interface RightSidebarProps {
  task: Task;
  view: Exclude<RightSidebarView, null>;
  isOpen: boolean;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ view, isOpen }) => {
  const [activeConversationId, setActiveConversationId] = useState(initialConversations[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [currentMessage, setCurrentMessage] = useState("");

  const activeConversation = initialConversations.find((c) => c.id === activeConversationId);
  const activeMessages = messages[activeConversationId] || [];
  const taskId = useSelector((state: RootState) => state.leftSidebarTask.selectedTaskId)
  const combinedTasks = [] as Task[];
  combinedTasks.push(...tasks);
  combinedTasks.push(...projectTasks);
  combinedTasks.push(...securityTasks);
  combinedTasks.push(...settingsTasks);

  const filteredTasks = combinedTasks.filter((t) => t.id === taskId);
  var task = null;
  if (filteredTasks != null) {
    task = filteredTasks[0];
  }

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
      <Stack row align="center" justify="justify-between" padding="px-4" className={`${DIMENS.headerHeight} border-b border-primary`}>
        <Stack row gap="gap-2" align="center" className="text-title">
          <span className="w-5 h-5">{view === "message" ? ICONS.messageSquare : ICONS.info}</span>
          <h2 className="font-semibold">{view === "message" ? "Messages" : "Details"}</h2>
        </Stack>
      </Stack>

      {view === "info" ? (
        task ?
          <Stack gap="gap-5" padding="px-4 pt-4">
            <h3 className="font-semibold text-base text-title">{task.title}</h3>
            <p className="text-xs text-normal">Task • ID: {`tab:${task.id.toLocaleLowerCase()}`}</p>
            <div className="space-y-4">
              <InfoRow icon={ICONS.user} label="Assignee"><span>John Doe</span></InfoRow>
              <InfoRow icon={ICONS.calendar} label="Timeline"><span>{task.timeline.start} → {task.timeline.end}</span></InfoRow>
              <InfoRow icon={ICONS.clock} label="Status"><span>{task.status}</span></InfoRow>
              <InfoRow icon={ICONS.tag} label="Tags">
                <Stack row padding="pt-1" className="flex-wrap">
                  {task.tags.map(tag => <Tag key={tag} text={tag} />)}
                </Stack>
              </InfoRow>
              <InfoRow icon={ICONS.sprint} label="Sprint"><span>{task.sprint} • {task.sprintPoints} points</span></InfoRow>
            </div>
          </Stack>
          : <Empty className="border border-dashed app-background">
            <EmptyHeader className="text-constrast">
              <EmptyTitle>No task selected</EmptyTitle>
              <EmptyDescription className="text-constrast">
                Select a task to view details
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>

            </EmptyContent>
          </Empty>
      ) : (
        <Stack row className="flex flex-1 overflow-hidden" gap="gap-0">
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
        </Stack>
      )}
    </motion.aside>
  );
};

export default RightSidebar;
