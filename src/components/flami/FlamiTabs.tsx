
import { Message } from "@/types/chat";
import { MessagesTab } from "./MessagesTab";
import { Activity } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/ChatInput";

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
  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <span key={index} className="block leading-relaxed">
        {line}
      </span>
    ));
  };

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
              className="fixed bottom-[45%] right-4 h-12 w-12 rounded-full bg-tribbe-lime hover:bg-tribbe-lime/90 text-black shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Activity className="h-6 w-6" />
              {activityMessages.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {activityMessages.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-lg p-0 flex flex-col h-full">
            <div className="flex flex-col h-full">
              <div className="border-b p-4 flex-shrink-0">
                <h2 className="text-lg font-semibold">Recent Activity</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {activityMessages.map((message) => (
                      <div key={message.id}>
                        <div className={`flex items-start gap-3 ${
                          message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                        }`}>
                          {message.role === "assistant" && (
                            <div className="w-8 h-8 mt-0.5 flex-shrink-0">
                              <img 
                                src="/lovable-uploads/4e7c9f9a-2fe1-4401-b9bb-211ead12e8bf.png" 
                                alt="Assistant" 
                                className="w-full h-full object-contain"
                              />
                            </div>
                          )}
                          <div className={`text-sm break-words px-5 py-3 rounded-lg max-w-[85%] space-y-2 ${
                            message.role === "assistant" 
                              ? "bg-background border border-border text-foreground font-medium" 
                              : "bg-tribbe-lime text-black font-medium shadow-sm"
                          }`}>
                            {formatMessageContent(message.content)}
                          </div>
                          {message.role === "user" && (
                            <div className="w-8 h-8 mt-0.5 flex-shrink-0">
                              <img 
                                src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" 
                                alt="User" 
                                className="h-full w-full rounded-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t bg-background/95 backdrop-blur p-4 flex-shrink-0">
                    <div className="relative">
                      <ChatInput 
                        input={activityInput}
                        isLoading={isLoading}
                        onInputChange={onActivityInputChange}
                        onSubmit={onActivitySubmit}
                        placeholder="What would you like?"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
