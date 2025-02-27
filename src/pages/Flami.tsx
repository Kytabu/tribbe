
import { SidebarProvider } from "@/components/ui/sidebar";
import { FlamiHeader } from "@/components/flami/FlamiHeader";
import { FlamiTabs } from "@/components/flami/FlamiTabs";
import { useEffect } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useChat } from "@/hooks/useChat";
import { getCurrentLevel } from "@/features/creditScore/utils";
import { getWelcomeMessages } from "@/features/flami/welcomeMessages";

export default function Flami() {
  // Credit score is hard-coded for now, in a real app would come from an API
  const creditScore = 720;
  const currentLevel = getCurrentLevel(creditScore);
  
  // Initialize two separate chats - one for the main chat and one for activity
  const {
    messages,
    setMessages,
    input: chatInput, 
    isLoading,
    handleInputChange: handleChatInputChange,
    handleSubmit: handleChatSubmit,
    handleSuggestionClick
  } = useChat();
  
  const {
    messages: activityMessages,
    setMessages: setActivityMessages,
    input: activityInput,
    handleInputChange: handleActivityInputChange,
    handleSubmit: handleActivitySubmit
  } = useChat();

  // Set welcome messages on initial load
  useEffect(() => {
    const { chat: chatWelcomeMessage, activity: activityWelcomeMessage } = getWelcomeMessages();
    setMessages([chatWelcomeMessage]);
    setActivityMessages([activityWelcomeMessage]);
  }, [setMessages, setActivityMessages]);

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col h-screen bg-background">
          <FlamiHeader currentLevelColor={currentLevel.color} />
          <div className="flex-1 relative">
            <FlamiTabs
              messages={messages}
              activityMessages={activityMessages}
              chatInput={chatInput}
              activityInput={activityInput}
              isLoading={isLoading}
              onChatInputChange={handleChatInputChange}
              onActivityInputChange={handleActivityInputChange}
              onChatSubmit={handleChatSubmit}
              onActivitySubmit={handleActivitySubmit}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
