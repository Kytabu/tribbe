
import { Button } from "@/components/ui/button";
import { Trophy, Star, Sparkle } from "lucide-react";
import { Suggestion } from "@/types/chat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string, points: number) => void;
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const suggestions: Suggestion[] = [
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

  return (
    <div className="fixed bottom-20 left-0 right-0 px-4 z-10">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              className="flex-none w-72 text-left h-auto py-3 px-4 hover:bg-tribbe-lime hover:text-black flex items-center gap-2 group transition-all duration-300 animate-fade-in bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              onClick={() => onSuggestionClick(suggestion.text, suggestion.points)}
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
