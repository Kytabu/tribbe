
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
import { useState } from "react";

export default function Flami() {
  const navigate = useNavigate();
  const [messages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Add credit score logic
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle chat submission logic here
    console.log("Submitted:", input);
    setInput("");
  };

  const handleSuggestionClick = (text: string, points: number) => {
    // Handle suggestion click logic here
    console.log("Suggestion clicked:", text, points);
  };

  const recentActivities = [
    {
      type: "lending",
      user: "John Doe",
      amount: "5,000",
      time: "2 hours ago"
    },
    {
      type: "borrowing",
      user: "Jane Smith",
      amount: "10,000",
      time: "5 hours ago"
    },
    {
      type: "circle",
      name: "Family Circle",
      action: "joined",
      time: "1 day ago"
    }
  ];

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto">
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

        <Card className="bg-white p-6">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" className="text-sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with Flami
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-sm">
                Recent Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="space-y-4">
              <div className="h-[50vh] flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 py-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
                <div className="px-4 py-2 border-t">
                  <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
                </div>
              </div>
              <ChatInput 
                input={input}
                isLoading={isLoading}
                onInputChange={(value) => setInput(value)}
                onSubmit={handleSubmit}
              />
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 border animate-fade-in"
                  >
                    {activity.type === "lending" && (
                      <p className="text-sm text-muted-foreground">
                        <span className="text-tribbe-lime">{activity.user}</span> borrowed Kes {activity.amount} from you {activity.time}
                      </p>
                    )}
                    {activity.type === "borrowing" && (
                      <p className="text-sm text-muted-foreground">
                        You borrowed Kes {activity.amount} from <span className="text-tribbe-lime">{activity.user}</span> {activity.time}
                      </p>
                    )}
                    {activity.type === "circle" && (
                      <p className="text-sm text-muted-foreground">
                        You {activity.action} the <span className="text-tribbe-lime">{activity.name}</span> {activity.time}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </AppLayout>
  );
}
