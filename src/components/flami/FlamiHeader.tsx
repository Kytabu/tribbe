
import { Message } from "@/types/chat";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

interface FlamiHeaderProps {
  currentLevelColor: string;
}

export function FlamiHeader({ currentLevelColor }: FlamiHeaderProps) {
  const { open, setOpen } = useSidebar();

  return (
    <header className="relative h-14 border-b border-black/10">
      <div className="flex h-full items-center px-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-4 hover:bg-tribbe-lime"
          onClick={() => setOpen(!open)}
        >
          <MenuIcon className="h-6 w-6 text-tribbe-lime hover:text-tribbe-black" />
        </Button>
        <div className="flex flex-1 items-center justify-center">
          <img 
            src="/lovable-uploads/24576fa2-343c-42db-b26e-e56b0aa76cc8.png" 
            alt="Tribbe" 
            className="h-8"
          />
        </div>
      </div>
    </header>
  );
}
