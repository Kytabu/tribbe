
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
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
      content: "Hi! I'm Flami, your financial companion. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(0);

  const suggestions = [
    { emoji: "💰", text: "Help me create a budget that works for my lifestyle" },
    { emoji: "💡", text: "What are some practical ways to start saving money?" },
    { emoji: "🎯", text: "I want to learn about setting financial goals" },
  ];

  const handleSuggestionClick = async (text: string) => {
    setInput(text);
    // Instead of creating a fake event, we'll directly process the suggestion
    if (!isLoading) {
      const now = Date.now();
      const timeSinceLastMessage = now - lastMessageTime;
      if (timeSinceLastMessage < 3000) {
        toast({
          title: "Please wait",
          description: "Please wait a moment before sending another message.",
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
              title: "Rate Limit",
              description: "Please wait a moment before sending another message.",
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
      } catch (error) {
        console.error('Chat error:', error);
        toast({
          title: "Error",
          description: "Failed to get response from Flami. Please try again in a moment.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't process if already loading or input is empty
    if (!input.trim() || isLoading) return;
    
    // Rate limiting check on client side
    const now = Date.now();
    const timeSinceLastMessage = now - lastMessageTime;
    if (timeSinceLastMessage < 3000) { // 3 second cooldown
      toast({
        title: "Please wait",
        description: "Please wait a moment before sending another message.",
        variant: "destructive",
      });
      return;
    }

    // Add user message
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
      // Format messages for OpenAI
      const chatMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      chatMessages.push({
        role: "user",
        content: input.trim()
      });

      // Add artificial delay before making the request
      await new Promise(resolve => setTimeout(resolve, 500));

      // Call our edge function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: chatMessages }
      });

      if (error) {
        // Check if it's a rate limit error
        if (error.message.includes('429') || error.message.toLowerCase().includes('too many requests')) {
          toast({
            title: "Rate Limit",
            description: "Please wait a moment before sending another message.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from Flami. Please try again in a moment.",
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
                        ? "bg-tribbe-lime text-black ml-4"
                        : "bg-muted"
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
                      className="text-left h-auto py-3 px-4 hover:bg-muted/50"
                      onClick={() => handleSuggestionClick(suggestion.text)}
                    >
                      <span className="mr-2">{suggestion.emoji}</span>
                      {suggestion.text}
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
              placeholder="Type your message..."
              className="min-h-[50px] max-h-[200px] flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
