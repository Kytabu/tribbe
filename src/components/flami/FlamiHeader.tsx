
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

interface FlamiHeaderProps {
  currentLevelColor: string;
}

export function FlamiHeader({ currentLevelColor }: FlamiHeaderProps) {
  const { open, setOpen } = useSidebar();
  const navigate = useNavigate();

  return (
    <header className="relative h-14 border-b border-black/10">
      <div className="max-w-2xl mx-auto w-full px-4">
        <div className="flex h-full items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4 hover:bg-tribbe-lime"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon className="h-6 w-6 text-tribbe-lime hover:text-tribbe-black" />
          </Button>
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-xl font-righteous text-tribbe-lime">Flami</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/street-cred")}
            className="hover:bg-tribbe-lime/20 relative group"
          >
            <div 
              className="p-0.5 rounded-full transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundColor: currentLevelColor }}
            >
              <img 
                src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover border border-background"
              />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
