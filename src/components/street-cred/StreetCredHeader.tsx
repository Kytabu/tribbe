
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StreetCredHeader() {
  const navigate = useNavigate();
  
  const handleMenuClick = () => {
    // The menu button functionality will be handled by AppLayout
    // AppLayout already has the sidebar context and will manage the state
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-3xl mx-auto w-full px-4">
        <div className="flex h-14 items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleMenuClick}
            className="hover:bg-tribbe-lime/20"
          >
            <MenuIcon className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h2 className="text-lg font-righteous text-tribbe-lime">My Street Cred</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/flami")}
            className="hover:bg-tribbe-lime/20"
          >
            <img 
              src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
