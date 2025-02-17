
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
    <form onSubmit={onSubmit} className="mt-4 flex gap-2">
      <Textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="How can I help grow your bag today?"
        className="min-h-[50px] max-h-[200px] flex-1"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading || !input.trim()}
        className="bg-tribbe-lime text-black hover:bg-tribbe-lime/80 transition-all duration-300"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </form>
  );
}
