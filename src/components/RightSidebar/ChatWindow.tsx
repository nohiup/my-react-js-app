import { useEffect, useRef, type FC } from "react";
import { ICONS, type initialConversations, type initialMessages } from "../../../constants";
import Message from "./Message";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Stack } from "../ui/stack";

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
    return (
      <main className="flex-grow flex flex-col app-background">
        <Card className="flex-grow flex items-center justify-center">
          <CardContent className="text-xs text-muted-foreground text-center">
            Select a conversation
          </CardContent>
        </Card>
      </main>)
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
        <Stack row align="center" className="app-background border border-primary rounded-lg">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            rows={1}
            value={currentMessage}
            onChange={handleTextareaInput}
            onKeyDown={handleKeyDown}
            className="flex-grow resize-none bg-transparent text-[0.75rem] max-h-20"
          />
          <Button type="button" onClick={onSendMessage} disabled={!currentMessage.trim()} variant="default" size="icon">
            {ICONS.sendIcon}
          </Button>
        </Stack>
      </footer>
    </main>
  );
};

export default ChatWindow;