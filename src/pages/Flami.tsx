
import { SidebarProvider } from "@/components/ui/sidebar";
import { FlamiHeader } from "@/components/flami/FlamiHeader";
import { FlamiTabs } from "@/components/flami/FlamiTabs";
import { useEffect } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { useChat } from "@/hooks/useChat";
import { getCurrentLevel } from "@/features/creditScore/utils";
import { getWelcomeMessages } from "@/features/flami/welcomeMessages";
import { AppLayout } from "@/components/layout/AppLayout";
import { Message } from "@/types/chat";

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

  // Load messages from localStorage on initial load
  useEffect(() => {
    const savedChatMessages = localStorage.getItem('flami-chat-messages');
    const savedActivityMessages = localStorage.getItem('flami-activity-messages');
    
    const { chat: chatWelcomeMessage, activity: activityWelcomeMessage } = getWelcomeMessages();
    
    if (savedChatMessages) {
      try {
        const parsedMessages = JSON.parse(savedChatMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error parsing saved chat messages:", error);
        setMessages([chatWelcomeMessage]);
      }
    } else {
      setMessages([chatWelcomeMessage]);
    }

    if (savedActivityMessages) {
      try {
        const parsedMessages = JSON.parse(savedActivityMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setActivityMessages(parsedMessages);
      } catch (error) {
        console.error("Error parsing saved activity messages:", error);
        setActivityMessages([activityWelcomeMessage]);
      }
    } else {
      setActivityMessages([activityWelcomeMessage]);
    }
  }, [setMessages, setActivityMessages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('flami-chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (activityMessages.length > 0) {
      localStorage.setItem('flami-activity-messages', JSON.stringify(activityMessages));
    }
  }, [activityMessages]);

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
            isLoading={isLoading}
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
