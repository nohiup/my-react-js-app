import type { FC } from "react";
import { ICONS, initialConversations } from "../../../constants";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import React from "react";
import { Input } from "../ui/input";
import { Stack } from "../ui/stack";
import { cn } from "@/lib/utils";

interface SidebarProps {
  conversations: typeof initialConversations;
  activeConversationId: number;
  onConversationSelect: (id: number) => void;
}

const Sidebar: FC<SidebarProps> = ({ conversations, activeConversationId, onConversationSelect }) => (
  <aside className="w-[120px] flex-shrink-0 app-background border-r border-primary flex flex-col">
    <header className="p-2 border-b border-primary">
      <Stack row gap="gap-1" margin="mb-2" align="center" className="text-normal">
        {React.cloneElement(ICONS.chatIcon, { className: "w-4 h-4 shrink-0" })}
        <h1 className="text-sm font-semibold">Chat</h1>
      </Stack>
      <Select>
        <SelectTrigger className="flex justify-between items-center p-1 px-2 app-background border border-primary rounded-md text-xs font-medium cursor-pointer">
          <SelectValue placeholder="Contextual" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </header>
    <div className="relative w-full p-2 px-3 border-b border-primary">
      {/* Icon */}
      {/* <div className="absolute left-4 top-8 -translate-y-1/2 text-normal flex items-center justify-center w-4 h-4">
        {React.cloneElement(ICONS.searchIcon, { className: "w-4 h-4 h-fit" })}
      </div> */}

      {/* Input */}
      <Input
        type="search"
        placeholder="Search..."
        className="p-1.5 py-1.5 text-xs rounded-md"
      />
    </div>
    <nav className="flex-grow overflow-y-auto">
      {conversations.map((convo) => (
        <Stack row align="center" justify="justify-between" padding="py-2"
          key={convo.id}
          className={cn("cursor-pointer select-none background-primary-hover", convo.id === activeConversationId ? "selected-primary border-l-[3px] background-primary pl-[9px] pr-3" : "px-3")}
          onClick={() => onConversationSelect(convo.id)}
        >
          <Stack gap="gap-0.5" className="overflow-hidden">
            <span className="font-semibold text-xs text-title truncate">
              {convo.type === "channel" ? "#" : "@"} {convo.name}
            </span>
            <span className="text-[0.7rem] text-normal truncate">{convo.lastMessage}</span>
          </Stack>
          {convo.unread > 0 && (
            <span className="background-primary text-contrast rounded-full min-w-[16px] h-4 px-1 flex justify-center items-center text-[0.65rem] font-bold">{convo.unread}</span>
          )}
        </Stack>
      ))}
    </nav>
  </aside>
);

export default Sidebar;