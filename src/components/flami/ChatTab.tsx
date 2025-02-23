
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatSuggestions } from "@/components/chat/ChatSuggestions";
import { Message } from "@/types/chat";

interface ChatTabProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSuggestionClick: (text: string, points: number) => void;
}

export function ChatTab({
  messages,
  input,
  isLoading,
  onInputChange,
  onSubmit,
  onSuggestionClick
}: ChatTabProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto pb-4 px-4 max-w-2xl mx-auto w-full">
        <div className="space-y-4 min-h-full">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>
      <div className="pt-2 border-t bg-background">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <ChatSuggestions onSuggestionClick={onSuggestionClick} />
          <ChatInput 
            input={input}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}
