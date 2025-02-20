
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="mt-4">
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Shall we grow your wealth today?"
          className="min-h-[50px] max-h-[200px] pr-12 placeholder:text-tribbe-lime"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-tribbe-lime hover:bg-black hover:text-tribbe-lime transition-all duration-300 rounded-full p-0 w-8 h-8 absolute right-2 bottom-2"
        >
          <ArrowUp className="h-4 w-4 text-black hover:text-tribbe-lime" />
        </Button>
      </div>
    </form>
  );
}
