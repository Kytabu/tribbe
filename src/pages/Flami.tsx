import { SidebarProvider } from "@/components/ui/sidebar";
import { FlamiHeader } from "@/components/flami/FlamiHeader";
import { FlamiTabs } from "@/components/flami/FlamiTabs";
import { useEffect } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useChat } from "@/hooks/useChat";
import { getCurrentLevel } from "@/features/creditScore/utils";
import { getWelcomeMessages } from "@/features/flami/welcomeMessages";
import { AppLayout } from "@/components/layout/AppLayout";

export default function Flami() {
  // Credit score is hard-coded for now, in a real app would come from an API
  const creditScore = 720;
  const currentLevel = getCurrentLevel(creditScore);
  
  // Initialize two separate chats - one for the main chat and one for activity
  const {
    messages,
    setMessages,
    input: chatInput, 
    isLoading: chatLoading,
    error: chatError,
    handleInputChange: handleChatInputChange,
    handleSubmit: handleChatSubmit,
    handleSuggestionClick
  } = useChat();
  
  const {
    messages: activityMessages,
    setMessages: setActivityMessages,
    input: activityInput,
    isLoading: activityLoading,
    error: activityError,
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
    <AppLayout>
      <div className="flex-1 flex flex-col h-screen bg-background">
        <FlamiHeader currentLevelColor={currentLevel.color} />
        <div className="flex-1 relative">
          <FlamiTabs
            messages={messages}
            activityMessages={activityMessages}
            chatInput={chatInput}
            activityInput={activityInput}
            isLoading={chatLoading || activityLoading}
            error={chatError || activityError}
            onChatInputChange={handleChatInputChange}
            onActivityInputChange={handleActivityInputChange}
            onChatSubmit={handleChatSubmit}
            onActivitySubmit={handleActivitySubmit}
            onSuggestionClick={handleSuggestionClick}
          />
        </div>
      </div>
    </AppLayout>
  );
}
