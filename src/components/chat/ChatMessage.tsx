
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
        {message.role === "assistant" && (
          <div className="flex items-center gap-2 mb-2">
            <img 
              src="/lovable-uploads/4e7c9f9a-2fe1-4401-b9bb-211ead12e8bf.png" 
              alt="Tribbe Logo" 
              className="w-6 h-6"
            />
          </div>
        )}
        <p className="text-sm whitespace-pre-line">{message.content}</p>
      </div>
    </div>
  );
}
