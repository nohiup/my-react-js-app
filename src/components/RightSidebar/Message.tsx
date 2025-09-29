import type { FC } from "react";

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

export default Message;