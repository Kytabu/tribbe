
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TribbeButtonProps {
  imagePath: string;
  label: string;
  info?: string;
  endIcon?: ReactNode;
  endContent?: ReactNode;
  onClick?: () => void;
  showProfileCircle?: boolean;  // Added this prop to control the circle
}

export function TribbeButton({ 
  imagePath, 
  label, 
  info, 
  endIcon, 
  endContent, 
  onClick, 
  showProfileCircle = false 
}: TribbeButtonProps) {
  return (
    <Button
      variant="ghost"
      className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
      onClick={onClick}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {showProfileCircle ? (
            <div className="p-[2px] rounded-full" style={{ backgroundColor: "#0EA5E9" }}>
              <img 
                src={imagePath}
                alt={`${label} Icon`}
                className="w-5 h-5 object-contain rounded-full"
              />
            </div>
          ) : (
            <img 
              src={imagePath}
              alt={`${label} Icon`}
              className="w-5 h-5 object-contain"
            />
          )}
          <span className="text-tribbe-sage group-hover:text-tribbe-lime">{label}</span>
        </div>
        {endContent || (
          <span className="font-medium group-hover:text-tribbe-lime">
            {endIcon || info}
          </span>
        )}
      </div>
    </Button>
  );
}
