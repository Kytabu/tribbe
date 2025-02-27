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
    const chatWelcomeMessage: Message = {
      id: "welcome-chat",
      content: "👋 Hi there! I'm Flami, your AI financial assistant.\n\n" +
              "I can help you manage money, join circles, send payments, and build your Street Cred score.\n\n" +
              "What would you like to do today? Try asking me to:\n" +
              "• Send money to someone\n" +
              "• Create a new circle\n" +
              "• Check your balance\n" +
              "• Show investment opportunities",
      role: "assistant",
      timestamp: new Date()
    };
    
    const activityWelcomeMessage: Message = {
      id: "welcome-activity",
      content: "Welcome back! 👋 Here's your Tribbe update:\n\n" +
              "🏦 Your Wallet Status:\n" +
              "• KES: 125,000 available (75,000 lent)\n" +
              "• USD: $2,500 available ($1,000 lent)\n" +
              "• GBP: £1,800 available (£200 lent)\n\n" +
              "🌟 Street Cred Score: 720\n" +
              "Current Level: The Innovator (Top 15%)\n" +
              "Next Level: 80 points to Legend status!\n\n" +
              "💫 Active Circles:\n" +
              "• Family Circle (8 members) - KES 50,000 pool\n" +
              "• Business Network (12 members) - USD 5,000 pool\n" +
              "• Tech Innovators (15 members) - KES 85,000 pool\n\n" +
              "🤝 Recent Lending Activity:\n" +
              "• John Doe borrowed KES 5,000 (2 hours ago)\n" +
              "• Jane Smith borrowed KES 10,000 (5 hours ago)\n" +
              "• Tech Fund contributed USD 500 (yesterday)\n\n" +
              "🔄 Automated Transactions:\n" +
              "• Weekly Family Circle contribution: KES 2,000\n" +
              "• Monthly Business Pool: USD 100\n" +
              "• Auto-lending limit: KES 20,000\n\n" +
              "📩 Pending Requests:\n" +
              "• Sarah needs KES 15,000 for business stock\n" +
              "• Mike requests USD 200 for emergency\n" +
              "• Tech Circle invites you to increase your stake\n\n" +
              "How can I assist you today? 😊",
      role: "assistant",
      timestamp: new Date()
    };
    
    setMessages([chatWelcomeMessage]);
    setActivityMessages([activityWelcomeMessage]);
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
