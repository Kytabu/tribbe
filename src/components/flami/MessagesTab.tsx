
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatSuggestions } from "@/components/chat/ChatSuggestions";
import { Message } from "@/types/chat";

interface MessagesTabProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSuggestionClick?: (text: string, points: number) => void;
  showSuggestions?: boolean;
  placeholder?: string;
  variant?: 'chat' | 'activity';
}

export function MessagesTab({
  messages,
  input,
  isLoading,
  onInputChange,
  onSubmit,
  onSuggestionClick,
  showSuggestions = false,
  placeholder,
  variant = 'chat'
}: MessagesTabProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 flex flex-col min-h-full">
          <div className="mt-auto py-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message} 
                variant={variant}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t bg-background/95 backdrop-blur p-2">
        <div className="max-w-2xl mx-auto">
          <div className="relative flex flex-col h-full">
            {showSuggestions && (
              <div className="w-full overflow-x-auto no-scrollbar">
                <div className="flex gap-2 px-1 pb-2 min-w-max">
                  <ChatSuggestions onSuggestionClick={onSuggestionClick!} />
                </div>
              </div>
            )}
            <ChatInput 
              input={input}
              isLoading={isLoading}
              onInputChange={onInputChange}
              onSubmit={onSubmit}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    </>
  );
}
