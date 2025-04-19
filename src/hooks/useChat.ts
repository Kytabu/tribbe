import { useState } from "react";
import { Message } from "@/types/chat";
import { callDeepSeekAPI } from "@/integrations/deepseek/service";

export function useChat(initialMessages: Message[] = []) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (value: string) => {
    setInput(value);
    setError(null); // Clear any previous errors when user types
  };

  const sendMessageToAPI = async (allMessages: Message[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Preparing to send message to DeepSeek API...');
      const response = await callDeepSeekAPI(allMessages);
      console.log('Received response from DeepSeek API');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in useChat:', error);
      setError('Sorry, I encountered an error. Please try again.');
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
    
    await sendMessageToAPI(updatedMessages);
  };

  return {
    messages,
    setMessages,
    input,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    handleSuggestionClick
  };
}
