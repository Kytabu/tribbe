
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
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-3xl mx-auto w-full px-4">
        <div className="flex h-14 items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-background/80"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h2 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-righteous text-tribbe-lime">
            Flami
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/street-cred")}
            className="hover:bg-background/80"
          >
            <div 
              className="p-0.5 rounded-full transition-transform duration-200 hover:scale-105"
              style={{ backgroundColor: currentLevelColor }}
            >
              <img 
                src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" 
                alt="Profile" 
                className="w-7 h-7 rounded-full object-cover"
              />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
