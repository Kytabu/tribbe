
import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../ui/button";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
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
      "flex w-full", 
      message.role === "user" ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex items-start gap-2 max-w-[80%]",
        message.role === "user" ? "flex-row-reverse" : "flex-row"
      )}>
        {message.role === "assistant" ? (
          <img 
            src="/lovable-uploads/4e7c9f9a-2fe1-4401-b9bb-211ead12e8bf.png" 
            alt="Assistant" 
            className="h-6 w-6 mt-1 flex-shrink-0"
          />
        ) : (
          <img 
            src="/lovable-uploads/ecc713cc-73f6-4c89-9f3c-86ed3ab57613.png" 
            alt="User" 
            className="h-6 w-6 rounded-full mt-1 flex-shrink-0"
          />
        )}
        <div
          className={cn(
            "text-sm break-words px-4 py-2 rounded-lg",
            message.role === "assistant" 
              ? "bg-muted/50" 
              : "bg-tribbe-lime text-black"
          )}
        >
          {formatContent(message.content)}
        </div>
      </div>
    </div>
  );
}
