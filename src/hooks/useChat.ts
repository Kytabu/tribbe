
import { useState } from "react";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";

export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const sendMessageToAPI = async (allMessages: Message[]) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: allMessages.map(m => ({ role: m.role, content: m.content })) }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    const updatedMessages = [...messages, userMessage];
    await sendMessageToAPI(updatedMessages);
  };

  const handleSuggestionClick = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      role: "user",
      timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Send the message to the API after updating the UI
    await sendMessageToAPI(updatedMessages);
  };

  return {
    messages,
    setMessages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    handleSuggestionClick
  };
}
