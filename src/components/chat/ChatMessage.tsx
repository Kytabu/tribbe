
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
      <div className="flex flex-col">
        {message.role === "assistant" && (
          <div className="mb-1">
            <img 
              src="/lovable-uploads/4e7c9f9a-2fe1-4401-b9bb-211ead12e8bf.png" 
              alt="Tribbe Logo" 
              className="w-6 h-auto"
            />
          </div>
        )}
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
    </div>
  );
}
