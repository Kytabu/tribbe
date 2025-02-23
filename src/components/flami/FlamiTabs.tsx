
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatTab } from "./ChatTab";
import { ActivityTab } from "./ActivityTab";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/chat/ChatMessage"; // Add this import

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
    <Tabs defaultValue="chat" className="flex-1 flex flex-col">
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

      <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden mt-0">
        <div className="relative flex h-full flex-col-reverse overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full border-t bg-gradient-to-t from-background pt-2">
            <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
              <div className="relative flex h-full flex-1 flex-col">
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
          <div className="h-32 md:h-48 flex-shrink-0" />
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col-reverse items-center">
              {messages.map((message) => (
                <div key={message.id} className="w-full">
                  <div className="relative m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl xl:max-w-3xl">
                    <ChatMessage message={message} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="activity" className="flex-1 flex flex-col overflow-hidden mt-0">
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
