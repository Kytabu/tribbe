
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
      <div className={cn(
        "flex flex-col",
        message.role === "assistant" ? "w-[70%]" : "max-w-[80%]"
      )}>
        {message.role === "assistant" ? (
          <div className="mb-1">
            <img 
              src="/lovable-uploads/4e7c9f9a-2fe1-4401-b9bb-211ead12e8bf.png" 
              alt="Tribbe Logo" 
              className="w-6 h-auto"
            />
          </div>
        ) : (
          <div className="mb-1 flex justify-end">
            <img 
              src="/lovable-uploads/ecc713cc-73f6-4c89-9f3c-86ed3ab57613.png" 
              alt="User Profile" 
              className="w-6 h-auto rounded-full"
            />
          </div>
        )}
        <div
          className={cn(
            "rounded-lg p-3",
            message.role === "user"
              ? "bg-tribbe-lime text-black ml-4 animate-fade-in"
              : "bg-muted animate-slide-in w-full"
          )}
        >
          <p className="text-sm whitespace-pre-line">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
