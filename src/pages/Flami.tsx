
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatSuggestions } from "@/components/chat/ChatSuggestions";
import { ChatInput } from "@/components/chat/ChatInput";
import { ProgressBar } from "@/components/chat/ProgressBar";

export default function Flami() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "🎮",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const [userLevel, setUserLevel] = useState(1);
  const [userPoints, setUserPoints] = useState(0);

  const handleSuggestionClick = async (text: string, points: number) => {
    setInput(text);
    if (!isLoading) {
      await handleMessage(text, points);
    }
  };

  const handleMessage = async (content: string, points: number = 5) => {
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
      content: content.trim(),
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
        content: content.trim()
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

      if (points > 5) {
        toast({
          title: "🌟 Points Earned!",
          description: `+${points} points for exploring financial wisdom!`,
          variant: "default",
          className: "bg-tribbe-aqua text-black",
        });
      }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await handleMessage(input);
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto h-[calc(100vh-2rem)] flex flex-col">
        <div className="relative mb-4">
          <h1 className="text-4xl font-righteous text-tribbe-lime text-center">flami</h1>
          <div className="absolute right-0 top-0">
            <ProgressBar userLevel={userLevel} userPoints={userPoints} />
          </div>
        </div>
        
        <Card className="flex-1 flex flex-col p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {messages.length === 1 && (
                <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
              )}
            </div>
          </ScrollArea>
          
          <ChatInput
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
