
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { Message } from "@/types/chat";

interface ActivityTabProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ActivityTab({
  messages,
  input,
  isLoading,
  onInputChange,
  onSubmit
}: ActivityTabProps) {
  return (
    <>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="max-w-2xl mx-auto w-full px-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-2 border-t bg-background">
        <div className="max-w-2xl mx-auto px-4 w-full">
          <ChatInput 
            input={input}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            placeholder="What would you like?"
          />
        </div>
      </div>
    </>
  );
}
