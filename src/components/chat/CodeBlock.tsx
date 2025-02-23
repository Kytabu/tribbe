
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <pre className={cn(
      "relative rounded-md bg-muted/80 p-4 overflow-x-auto",
      "border border-muted-foreground/20"
    )}>
      {language && (
        <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-background/90 px-2 py-1 rounded">
          {language}
        </div>
      )}
      <code className="text-sm font-mono">{code}</code>
    </pre>
  );
}
