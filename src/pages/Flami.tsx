
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
      content: "Welcome back! Here's what's been happening on Tribbe:\n\n" +
              "• John Doe borrowed Kes 5,000 from you 2 hours ago\n" +
              "• Jane Smith borrowed Kes 10,000 5 hours ago\n" +
              "• You joined the Family Circle yesterday\n\n" +
              "How can I help you today?",
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

        <Card className="flex-1 bg-background p-6 flex flex-col min-h-0">
          <Tabs defaultValue="chat" className="flex flex-col h-full">
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

            <TabsContent value="chat" className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 py-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
                <ChatInput 
                  input={input}
                  isLoading={isLoading}
                  onInputChange={(value) => setInput(value)}
                  onSubmit={handleSubmit}
                />
              </div>
            </TabsContent>

            <TabsContent value="activity" className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 py-4">
                  {activityMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
              </div>
              <ChatInput 
                input={activityInput}
                isLoading={isLoading}
                onInputChange={(value) => setActivityInput(value)}
                onSubmit={handleActivitySubmit}
                placeholder="What would you like?"
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </AppLayout>
  );
}
