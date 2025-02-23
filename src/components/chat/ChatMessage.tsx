
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full", 
      message.role === "user" ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start gap-2 max-w-[85%]",
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      )}>
        {message.role === "assistant" ? (
          <img 
            src="/lovable-uploads/4e7c9f9a-2fe1-4401-b9bb-211ead12e8bf.png" 
            alt="Assistant" 
            className="h-6 w-6 mt-1"
          />
        ) : (
          <img 
            src="/lovable-uploads/ecc713cc-73f6-4c89-9f3c-86ed3ab57613.png" 
            alt="User" 
            className="h-6 w-6 rounded-full mt-1"
          />
        )}
        <div
          className={cn(
            "text-sm break-words px-4 py-2",
            message.role === "assistant" 
              ? "bg-transparent" 
              : "bg-transparent"
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
