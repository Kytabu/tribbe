
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FlamiHeaderProps {
  currentLevelColor: string;
}

export function FlamiHeader({ currentLevelColor }: FlamiHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex-1" />
      <h2 className="flex-1 text-xl font-righteous text-tribbe-lime text-center">Flami</h2>
      <div className="flex-1 flex justify-end">
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
  );
}
