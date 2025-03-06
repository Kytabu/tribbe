
import { Message } from "@/types/chat";
import { Menu } from "lucide-react";

export function getWelcomeMessages(): { chat: Message, activity: Message } {
  // Main chat welcome message
  const chatWelcomeMessage: Message = {
    id: "welcome-chat",
    content: "👋 Hi there! I'm Flami, your AI financial assistant from Tribbe Nation.\n\n" +
            "I can help you automate your borrowing (in seconds 🥳), automate your lending (& make a little interest 🤭) manage your money within groups (no more whatsapp 🤨), join circles for shared money for events and activities, send payments globally, and build up your Street Cred score (because everyone will love you!).\n\n" +
            "What would you like to do today? Try asking me to:\n\n" +
            "Send money to someone (pass the spoon 🥄)\n" +
            "Create a new circle (kill those whatsapp ones 😏)\n" +
            "Check your balance (you got moneeeyy! 😛)\n" +
            "Grow your Tribbe (this is really important 🤩)\n\n" +
            "Click on the menu (≡) to see more of Tribbe. Welcome home 🤗",
    role: "assistant",
    timestamp: new Date()
  };
  
  // Activity tab message
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

  return { chat: chatWelcomeMessage, activity: activityWelcomeMessage };
}
