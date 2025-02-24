
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Message } from "@/types/chat";
import { MessageSquare, Activity } from "lucide-react";
import { MessagesTab } from "./MessagesTab";

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
    <div className="absolute inset-0 flex flex-col">
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <div className="bg-background border-b">
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

        <TabsContent value="chat" className="flex-1 overflow-hidden flex flex-col">
          <MessagesTab 
            messages={messages}
            input={chatInput}
            isLoading={isLoading}
            onInputChange={onChatInputChange}
            onSubmit={onChatSubmit}
            onSuggestionClick={onSuggestionClick}
            showSuggestions={true}
            placeholder="Shall we grow your wealth today?"
            variant="chat"
          />
        </TabsContent>

        <TabsContent value="activity" className="flex-1 overflow-hidden flex flex-col">
          <MessagesTab 
            messages={activityMessages}
            input={activityInput}
            isLoading={isLoading}
            onInputChange={onActivityInputChange}
            onSubmit={onActivitySubmit}
            placeholder="What would you like?"
            variant="activity"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
