
import { Message } from "@/types/chat";

export const getWelcomeMessages = () => {
  // Get the user's first name - in a real app this would come from auth
  const firstName = "James";

  const chat: Message = {
    id: "welcome-1",
    role: "assistant",
    content: `Hi ${firstName}! I'm Flami, your financial companion powered by ChatGPT. What would you like to do today? 💸`,
    timestamp: new Date()
  };

  const activity: Message = {
    id: "welcome-activity-1",
    role: "assistant",
    content: `Here you'll see your recent financial activity. Ask me about any transaction or let me know if you'd like to analyze your spending patterns. 📊`,
    timestamp: new Date()
  };

  return { chat, activity };
};
