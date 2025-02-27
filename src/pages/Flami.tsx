import { SidebarProvider } from "@/components/ui/sidebar";
import { FlamiHeader } from "@/components/flami/FlamiHeader";
import { FlamiTabs } from "@/components/flami/FlamiTabs";
import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { AppSidebar } from "@/components/layout/AppSidebar";

export default function Flami() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activityMessages, setActivityMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [activityInput, setActivityInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const creditScore = 720;
  const streetCredLevels = [
    { name: "The Newbie", color: "#FFCA99", minScore: 300 },
    { name: "The Builder", color: "#F9FE03", minScore: 580 },
    { name: "The Trailblazer", color: "#88D3FE", minScore: 670 },
    { name: "The Innovator", color: "#A9FF22", minScore: 740 },
    { name: "The Legend", color: "#C699FF", minScore: 800 }
  ];

  const getCurrentLevel = (score: number) => {
    return streetCredLevels
      .slice()
      .reverse()
      .find(level => score >= level.minScore) || streetCredLevels[0];
  };

  const currentLevel = getCurrentLevel(creditScore);

  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      content: "👋 Welcome to Tribbe! I'm Flami, your financial companion.\n\n" +
              "Here's what I can help you with:\n\n" +
              "💰 Money Management:\n" +
              "• Send and receive money\n" +
              "• Create and join money circles\n" +
              "• Track your spending\n" +
              "• Set up automated payments\n\n" +
              "👥 Community Features:\n" +
              "• Join trusted money circles\n" +
              "• Start fundraisers\n" +
              "• Build your Street Cred score\n" +
              "• Connect with other members\n\n" +
              "🎯 Quick Actions:\n" +
              "• \"Send money to [name]\"\n" +
              "• \"Create a new circle\"\n" +
              "• \"Check my balance\"\n" +
              "• \"Show my Street Cred\"\n\n" +
              "Try asking one of these or tell me what you'd like to do! 😊\n\n" +
              "💡 Pro tip: Click the activity button on the right to see your latest transactions and updates.",
      role: "assistant",
      timestamp: new Date()
    };
    setActivityMessages([welcomeMessage]);
  }, []);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: chatInput,
      role: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Mistral API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. 🙏",
        role: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: activityInput,
      role: "user",
      timestamp: new Date()
    };
    setActivityMessages(prev => [...prev, userMessage]);
    setActivityInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: [...activityMessages, userMessage].map(m => ({ role: m.role, content: m.content })) }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date()
      };
      setActivityMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Mistral API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment. 🙏",
        role: "assistant",
        timestamp: new Date()
      };
      setActivityMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

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
              onChatInputChange={setChatInput}
              onActivityInputChange={setActivityInput}
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
