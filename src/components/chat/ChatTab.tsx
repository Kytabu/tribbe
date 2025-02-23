
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
    <div className="relative flex h-full flex-col-reverse overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full border-t bg-gradient-to-t from-background pt-2">
        <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
          <div className="relative flex h-full flex-1 flex-col">
            <ChatSuggestions onSuggestionClick={onSuggestionClick} />
            <ChatInput 
              input={input}
              isLoading={isLoading}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
      <div className="h-32 md:h-48 flex-shrink-0" />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col-reverse items-center">
          {messages.map((message) => (
            <div key={message.id} className="w-full border-b border-black/10 dark:border-gray-900/50">
              <div className="relative m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl xl:max-w-3xl">
                <ChatMessage message={message} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
