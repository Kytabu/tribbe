
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";

export function StreetCredHeader() {
  const navigate = useNavigate();
  const { setOpenMobile, isMobile, open, setOpen } = useSidebar();
  
  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(true);
    } else {
      setOpen(!open); // Direct boolean value instead of a function
    }
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
          <div className="p-0.5 rounded-full bg-tribbe-aqua">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/flami")}
              className="hover:bg-tribbe-lime/20 p-0"
            >
              <img 
                src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
