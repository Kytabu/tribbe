
import { MenuIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";

export function PageHeader() {
  const { openMobile, setOpenMobile, isMobile, open, setOpen } = useSidebar();

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-zinc-800 mb-4">
      <div className="max-w-lg mx-auto px-4">
        <div className="h-14 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleMenuClick}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
          
          <h1 className="text-lg font-medium text-tribbe-lime">My Wallet</h1>
          
          <Avatar className="h-8 w-8 border border-zinc-700">
            <AvatarFallback className="bg-zinc-800 text-zinc-400">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
