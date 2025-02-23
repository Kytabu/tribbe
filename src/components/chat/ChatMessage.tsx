
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="flex w-full">
      <div className="flex-shrink-0 mr-4">
        {message.role === "assistant" ? (
          <img 
            src="/lovable-uploads/4e7c9f9a-2fe1-4401-b9bb-211ead12e8bf.png" 
            alt="Assistant" 
            className="h-6 w-6"
          />
        ) : (
          <img 
            src="/lovable-uploads/ecc713cc-73f6-4c89-9f3c-86ed3ab57613.png" 
            alt="User" 
            className="h-6 w-6 rounded-full"
          />
        )}
      </div>
      <div className={cn(
        "prose dark:prose-invert flex-1 whitespace-pre-wrap",
        message.role === "assistant" ? "" : "text-right"
      )}>
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
