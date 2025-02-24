
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

interface FlamiHeaderProps {
  currentLevelColor: string;
}

export function FlamiHeader({ currentLevelColor }: FlamiHeaderProps) {
  const navigate = useNavigate();

  const MenuButton = (
    <SidebarTrigger>
      <Menu className="h-6 w-6 text-foreground" />
    </SidebarTrigger>
  );

  const ProfileButton = (
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
  );

  return (
    <PageHeader 
      title="Flami"
      leftIcon={MenuButton}
      rightIcon={ProfileButton}
      titleClassName="text-xl"
    />
  );
}
