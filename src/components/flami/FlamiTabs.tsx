
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatTab } from "./ChatTab";
import { ActivityTab } from "./ActivityTab";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { MessageSquare, Activity } from "lucide-react";

interface FlamiTabsProps {
  messages: Message[];
  activityMessages: Message[];
  chatInput: string;
  activityInput: string;
  isLoading: boolean;
  onChatInputChange: (value: string) => void;
  onActivityInputChange: (value: string) => void;
  onChatSubmit: (e: React.FormEvent) => void;
  onActivitySubmit: (e: React.FormEvent) => void;
  onSuggestionClick: (text: string, points: number) => void;
}

export function FlamiTabs({
  messages,
  activityMessages,
  chatInput,
  activityInput,
  isLoading,
  onChatInputChange,
  onActivityInputChange,
  onChatSubmit,
  onActivitySubmit,
  onSuggestionClick
}: FlamiTabsProps) {
  return (
    <Tabs defaultValue="chat" className="flex flex-col min-h-0 h-[100dvh]">
      {/* Fixed header */}
      <div className="bg-background sticky top-0 z-20 border-b">
        <div className="max-w-2xl mx-auto w-full">
          <TabsList className="w-full flex justify-start gap-4 p-2">
            <TabsTrigger value="chat" className="px-1 py-1 text-sm data-[state=active]:text-tribbe-lime data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 rounded-none flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="px-1 py-1 text-sm data-[state=active]:text-tribbe-lime data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 rounded-none flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Recent Activity</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      {/* Chat tab content */}
      <TabsContent 
        value="chat" 
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col-reverse h-full">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto border-t bg-background/95 backdrop-blur p-2">
          <div className="max-w-2xl mx-auto">
            <ChatTab 
              messages={messages}
              input={chatInput}
              isLoading={isLoading}
              onInputChange={onChatInputChange}
              onSubmit={onChatSubmit}
              onSuggestionClick={onSuggestionClick}
            />
          </div>
        </div>
      </TabsContent>

      {/* Activity tab content */}
      <TabsContent 
        value="activity" 
        className="flex-1 flex flex-col min-h-0"
      >
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col-reverse h-full">
              {activityMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto border-t bg-background/95 backdrop-blur p-2">
          <div className="max-w-2xl mx-auto">
            <ChatTab 
              messages={activityMessages}
              input={activityInput}
              isLoading={isLoading}
              onInputChange={onActivityInputChange}
              onSubmit={onActivitySubmit}
              onSuggestionClick={onSuggestionClick}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
