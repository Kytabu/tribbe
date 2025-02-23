
import { Button } from "@/components/ui/button";
import { Trophy, Star, Sparkle } from "lucide-react";

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string, points: number) => void;
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const suggestions = [
    { 
      icon: <Trophy className="h-4 w-4 text-yellow-400" />, 
      text: "Automate my borrowing"
    },
    { 
      icon: <Star className="h-4 w-4 text-tribbe-lime" />, 
      text: "Automate my lending"
    },
    { 
      icon: <Sparkle className="h-4 w-4 text-tribbe-aqua" />, 
      text: "Find me Kes 5000"
    },
    { 
      icon: <Star className="h-4 w-4 text-tribbe-lime" />, 
      text: "Payoff my loans"
    }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="ghost"
          className="shrink-0 h-auto py-2 px-3 hover:bg-muted/50 flex items-center gap-2 group transition-all duration-300 animate-fade-in rounded-xl text-muted-foreground hover:text-foreground whitespace-nowrap"
          onClick={() => onSuggestionClick(suggestion.text, 0)}
        >
          {suggestion.icon}
          <span className="text-sm">{suggestion.text}</span>
        </Button>
      ))}
    </div>
  );
}
