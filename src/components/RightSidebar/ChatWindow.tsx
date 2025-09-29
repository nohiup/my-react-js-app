import { useEffect, useRef, type FC } from "react";
import { ICONS, type initialConversations, type initialMessages } from "../../../constants";
import Message from "./Message";

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
            {ICONS.sendIcon}
          </button>
        </div>
      </footer>
    </main>
  );
};

export default ChatWindow;