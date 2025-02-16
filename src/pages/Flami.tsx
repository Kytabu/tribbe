
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Wallet, ArrowUpDown, Users, Star, Trophy, Sparkle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function Flami() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm Flami, your financial companion. Ready to level up your finances? 🎮",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [userPoints, setUserPoints] = useState(0);

  const suggestions = [
    { 
      icon: <Trophy className="h-4 w-4 text-yellow-400" />, 
      text: "How can I grow my money with my Tribbe?",
      points: 10
    },
    { 
      icon: <Star className="h-4 w-4 text-tribbe-lime" />, 
      text: "Show me how to add friends to my circle and my tribbe",
      points: 15
    },
    { 
      icon: <Sparkle className="h-4 w-4 text-tribbe-aqua" />, 
      text: "What are the smartest ways to use social finance?",
      points: 20
    },
  ];

  const handleSuggestionClick = async (text: string, points: number) => {
    setInput(text);
    if (!isLoading) {
      const now = Date.now();
      const timeSinceLastMessage = now - lastMessageTime;
      if (timeSinceLastMessage < 3000) {
        toast({
          title: "Cooldown Active!",
          description: "Wait a moment before your next move! ⏳",
          variant: "destructive",
        });
        return;
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        content: text.trim(),
        role: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      setLastMessageTime(now);

      try {
        const chatMessages = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        chatMessages.push({
          role: "user",
          content: text.trim()
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        const { data, error } = await supabase.functions.invoke('chat', {
          body: { messages: chatMessages }
        });

        if (error) {
          if (error.message.includes('429') || error.message.toLowerCase().includes('too many requests')) {
            toast({
              title: "Energy Depleted!",
              description: "Take a short break to recharge. ⚡",
              variant: "destructive",
            });
            return;
          }
          throw error;
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Add points and potentially level up
        setUserPoints(prev => {
          const newPoints = prev + points;
          if (newPoints >= userLevel * 100) {
            setUserLevel(l => l + 1);
            toast({
              title: "🎉 Level Up!",
              description: `You've reached level ${userLevel + 1}! Keep growing!`,
              variant: "default",
              className: "bg-tribbe-lime text-black",
            });
          }
          return newPoints;
        });

        toast({
          title: "🌟 Points Earned!",
          description: `+${points} points for exploring financial wisdom!`,
          variant: "default",
          className: "bg-tribbe-aqua text-black",
        });
      } catch (error) {
        console.error('Chat error:', error);
        toast({
          title: "Quest Failed!",
          description: "Connection lost with Flami. Try again soon! 🔄",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;
    if (timeSinceLastMessage < 3000) {
      toast({
        title: "Cooldown Active!",
        description: "Wait a moment before your next move! ⏳",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setLastMessageTime(now);

    try {
      const chatMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      chatMessages.push({
        role: "user",
        content: input.trim()
      });

      await new Promise(resolve => setTimeout(resolve, 500));

      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: chatMessages }
      });

      if (error) {
        if (error.message.includes('429') || error.message.toLowerCase().includes('too many requests')) {
          toast({
            title: "Energy Depleted!",
            description: "Take a short break to recharge. ⚡",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Add base points for any interaction
      setUserPoints(prev => {
        const newPoints = prev + 5;
        if (newPoints >= userLevel * 100) {
          setUserLevel(l => l + 1);
          toast({
            title: "🎉 Level Up!",
            description: `You've reached level ${userLevel + 1}! Keep growing!`,
            variant: "default",
            className: "bg-tribbe-lime text-black",
          });
        }
        return newPoints;
      });
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Quest Failed!",
        description: "Connection lost with Flami. Try again soon! 🔄",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        <Card className="flex-1 flex flex-col p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex justify-between items-center mb-4 p-2 bg-tribbe-lime/10 rounded-lg">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              <span className="font-medium">Level {userLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-tribbe-lime" />
              <span className="font-medium">{userPoints} points</span>
            </div>
          </div>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-tribbe-lime text-black ml-4 animate-fade-in"
                        : "bg-muted animate-slide-in"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
              {messages.length === 1 && (
                <div className="grid grid-cols-1 gap-2 mt-4">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left h-auto py-3 px-4 hover:bg-tribbe-lime hover:text-black flex items-center gap-2 group transition-all duration-300 animate-fade-in"
                      onClick={() => handleSuggestionClick(suggestion.text, suggestion.points)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {suggestion.icon}
                        {suggestion.text}
                      </div>
                      <span className="text-xs bg-tribbe-lime/20 px-2 py-1 rounded-full group-hover:bg-black/20">
                        +{suggestion.points} pts
                      </span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message to earn points..."
              className="min-h-[50px] max-h-[200px] flex-1"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="bg-tribbe-lime text-black hover:bg-tribbe-lime/80 transition-all duration-300"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
