
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

export function ChatInput({ 
  input, 
  isLoading, 
  onInputChange, 
  onSubmit, 
  placeholder = "Shall we grow your wealth today?" 
}: ChatInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        onSubmit(e);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative w-full">
      <div className="relative flex w-full flex-col rounded-lg bg-background/95 backdrop-blur">
        <Textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[14px] pr-14 focus-visible:ring-0 focus-visible:ring-offset-0 border-2 border-muted rounded-lg"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoading || !input.trim()}
          className="absolute bottom-2 right-2 h-10 w-10 bg-tribbe-lime hover:bg-black hover:text-tribbe-lime transition-all duration-300 rounded-lg"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
