import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "../ui/card";
import { Stack } from "../ui/stack";

interface MessageProps {
  message: { id: number; author: string; initials: string; text: string; timestamp: string; type: "sent" | "received" };
}

const Message: FC<MessageProps> = ({ message }) => (
  <Stack row className={cn("max-w-[190px]", message.type === "sent" ? "ml-auto flex-row-reverse" : "")}>
    <Avatar>
      <AvatarImage src="https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg" />
      <AvatarFallback>{message.initials}</AvatarFallback>
    </Avatar>
    <Stack gap="gap-0" className={cn(message.type === "sent" ? "items-end" : "")}>
      <Stack row align="center" gap="gap-1" margin="mb-1">
        <span className="font-semibold text-xs text-title">{message.author}</span>
        <span className="text-[0.65rem] text-normal">{message.timestamp}</span>
      </Stack>
      <Card className={cn(
        "py-1.5 px-2.5 rounded-2xl text-[0.75rem] leading-snug",
        message.type === "received" ? "bg-gray-100 rounded-tl-md text-gray-800" : "bg-blue-500 text-white rounded-tr-md"
      )}>
        <CardContent className="p-0">
          <p>{message.text}</p>
        </CardContent>
      </Card>
    </Stack>
  </Stack>
);

export default Message;