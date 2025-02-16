
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn("flex", 
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          message.role === "user"
            ? "bg-tribbe-lime text-black ml-4 animate-fade-in"
            : "bg-muted animate-slide-in"
        )}
      >
        <p className="text-sm whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  );
}
