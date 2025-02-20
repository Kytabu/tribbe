
import { Button } from "@/components/ui/button";
import { Trophy, Star, Sparkle } from "lucide-react";
import { Suggestion } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string, points: number) => void;
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const suggestions: Suggestion[] = [
    { 
      icon: <Trophy className="h-4 w-4 text-yellow-400" />, 
      text: "Automate my borrowing",
      points: 10
    },
    { 
      icon: <Star className="h-4 w-4 text-tribbe-lime" />, 
      text: "Automate my lending",
      points: 15
    },
    { 
      icon: <Sparkle className="h-4 w-4 text-tribbe-aqua" />, 
      text: "Find me Kes 5000",
      points: 20
    },
    { 
      icon: <Star className="h-4 w-4 text-tribbe-lime" />, 
      text: "Payoff my loans",
      points: 25
    }
  ];

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            className="shrink-0 h-auto py-4 px-5 hover:bg-tribbe-lime hover:text-black flex flex-col items-start gap-2 group transition-all duration-300 animate-fade-in bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 rounded-2xl border-muted"
            onClick={() => onSuggestionClick(suggestion.text, suggestion.points)}
          >
            <div className="flex items-center gap-2 w-full justify-between">
              {suggestion.icon}
              <span className="text-xs bg-tribbe-lime/20 px-2 py-1 rounded-full group-hover:bg-black/20">
                +{suggestion.points}
              </span>
            </div>
            <div className="text-sm font-normal">
              {suggestion.text}
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
}
