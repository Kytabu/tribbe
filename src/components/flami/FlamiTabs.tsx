
import { Message } from "@/types/chat";
import { MessagesTab } from "./MessagesTab";
import { Activity } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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
      <div className="flex-1 flex flex-col relative">
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

        {/* Floating Activity Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="fixed bottom-20 right-4 h-12 w-12 rounded-full bg-tribbe-lime hover:bg-tribbe-lime/90 text-black shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Activity className="h-6 w-6" />
              {activityMessages.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {activityMessages.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="border-b p-4">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              <MessagesTab 
                messages={activityMessages}
                input={activityInput}
                isLoading={isLoading}
                onInputChange={onActivityInputChange}
                onSubmit={onActivitySubmit}
                placeholder="What would you like?"
                variant="activity"
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
