
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatTab } from "./ChatTab";
import { ActivityTab } from "./ActivityTab";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/chat/ChatMessage";

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
    <Tabs defaultValue="chat" className="flex-1 flex flex-col h-full">
      <div className="bg-background">
        <div className="max-w-2xl mx-auto w-full">
          <TabsList className="w-full flex justify-start gap-4 p-2">
            <TabsTrigger value="chat" className="px-1 py-1 text-sm data-[state=active]:text-tribbe-lime data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 rounded-none">
              Chat
            </TabsTrigger>
            <TabsTrigger value="activity" className="px-1 py-1 text-sm data-[state=active]:text-tribbe-lime data-[state=active]:bg-transparent data-[state=active]:underline data-[state=active]:underline-offset-8 rounded-none">
              Recent Activity
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
        <div className="flex flex-col h-full justify-end">
          <div className="flex-1 overflow-y-auto mb-4">
            <div className="max-w-2xl mx-auto space-y-4 px-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </div>
          
          <div className="w-full px-2 md:px-4 py-2 bg-background/95 backdrop-blur">
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
        </div>
      </TabsContent>

      <TabsContent value="activity" className="flex-1 flex flex-col mt-0">
        <ActivityTab 
          messages={activityMessages}
          input={activityInput}
          isLoading={isLoading}
          onInputChange={onActivityInputChange}
          onSubmit={onActivitySubmit}
        />
      </TabsContent>
    </Tabs>
  );
}
