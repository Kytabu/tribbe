
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatSuggestions } from "@/components/chat/ChatSuggestions";
import { Message } from "@/types/chat";
import { useState, useEffect } from "react";

export default function Flami() {
  const navigate = useNavigate();
  const [messages] = useState<Message[]>([]);
  const [activityMessages, setActivityMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
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

  useEffect(() => {
    // Add initial welcome message
    const welcomeMessage: Message = {
      id: "welcome",
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
    setActivityMessages([welcomeMessage]);
  }, []);

  const getCurrentLevel = (score: number) => {
    return streetCredLevels
      .slice()
      .reverse()
      .find(level => score >= level.minScore) || streetCredLevels[0];
  };

  const currentLevel = getCurrentLevel(creditScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", input);
    setInput("");
  };

  const handleActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Activity message submitted:", activityInput);
    setActivityInput("");
  };

  const handleSuggestionClick = (text: string, points: number) => {
    console.log("Suggestion clicked:", text, points);
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col pb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/wallet")}
              className="hover:bg-tribbe-lime/20"
            >
              <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
            </Button>
            <h2 className="text-2xl font-righteous text-tribbe-lime">Flami</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/street-cred")}
            className="hover:bg-tribbe-lime/20 relative group"
          >
            <div 
              className="p-0.5 rounded-full transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: currentLevel.color }}
            >
              <img 
                src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border border-background"
              />
            </div>
          </Button>
        </div>

        <Card className="flex-1 bg-background p-6">
          <Tabs defaultValue="chat" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="text-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with Flami
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Recent Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent 
              value="chat" 
              className="flex-1 flex flex-col h-full"
            >
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-4 py-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t">
                <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
                <ChatInput 
                  input={input}
                  isLoading={isLoading}
                  onInputChange={(value) => setInput(value)}
                  onSubmit={handleSubmit}
                />
              </div>
            </TabsContent>

            <TabsContent 
              value="activity" 
              className="flex-1 flex flex-col h-full"
            >
              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-4 py-4">
                  {activityMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </div>
              <div className="mt-auto pt-4 border-t">
                <ChatInput 
                  input={activityInput}
                  isLoading={isLoading}
                  onInputChange={(value) => setActivityInput(value)}
                  onSubmit={handleActivitySubmit}
                  placeholder="What would you like?"
                />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </AppLayout>
  );
}
