
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { ChatTab } from "./ChatTab";
import { ActivityTab } from "./ActivityTab";
import { Message } from "@/types/chat";

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
      <div className="border-b">
        <div className="max-w-2xl mx-auto w-full">
          <TabsList className="w-full flex justify-center gap-2 py-2">
            <TabsTrigger value="chat" className="px-6 py-1.5 text-sm rounded-full min-w-[100px]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="activity" className="px-6 py-1.5 text-sm rounded-full min-w-[100px]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <TabsContent value="chat" className="flex-1 flex flex-col overflow-hidden">
        <ChatTab 
          messages={messages}
          input={chatInput}
          isLoading={isLoading}
          onInputChange={onChatInputChange}
          onSubmit={onChatSubmit}
          onSuggestionClick={onSuggestionClick}
        />
      </TabsContent>

      <TabsContent value="activity" className="flex-1 flex flex-col overflow-hidden">
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
