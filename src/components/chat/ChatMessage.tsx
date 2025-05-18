
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";

interface ChatMessageProps {
  message: Message;
  variant?: 'chat' | 'activity';
}

export function ChatMessage({ message, variant = 'chat' }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  // Function to handle code copying
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Function to format message content
  const formatContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const code = part.slice(3, -3);
        const language = code.split("\n")[0];
        const actualCode = code.substring(language.length + 1);
        
        return (
          <div key={index} className="relative my-4 group">
            <CodeBlock language={language} code={actualCode} />
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => copyToClipboard(actualCode)}
            >
              {copied ? (
                <Check className="h-4 w-4 text-tribbe-lime" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        );
      }
      
      // Convert markdown-style lists to HTML
      const formattedText = part
        .split("\n")
        .map((line, i) => {
          if (line.startsWith("• ")) {
            return `<li key=${i}>${line.substring(2)}</li>`;
          }
          if (line.match(/^\d+\./)) {
            return `<li key=${i}>${line.substring(line.indexOf(".") + 1)}</li>`;
          }
          return line;
        })
        .join("\n");

      return (
        <div 
          key={index} 
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  return (
    <div className={cn(
      "flex w-full mb-4", 
      message.role === "user" ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] animate-fade-in",
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      )}>
        <div
          className={cn(
            "text-sm break-words px-4 py-3 rounded-[20px]",
            variant === 'activity' 
              ? message.role === "assistant"
                ? "bg-muted/80 border border-tribbe-lime/10" 
                : "bg-muted/40 text-foreground"
              : message.role === "assistant"
              ? "bg-background border border-tribbe-lime/20"
              : "bg-muted/40 text-foreground hover:bg-muted/50 transition-colors"
          )}
        >
          {formatContent(message.content)}
        </div>
      </div>
    </div>
  );
}
