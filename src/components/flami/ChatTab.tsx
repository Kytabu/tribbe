
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
    <div className="relative flex flex-col h-full">
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-2 px-1 pb-2 min-w-max">
          <ChatSuggestions onSuggestionClick={onSuggestionClick} />
        </div>
      </div>
      <ChatInput 
        input={input}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
