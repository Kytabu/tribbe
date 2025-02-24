
import { StreetCredLevel } from "./streetCredUtils";

interface ProfileButtonProps {
  currentLevel: StreetCredLevel;
}

export function ProfileButton({ currentLevel }: ProfileButtonProps) {
  return (
    <div 
      className="p-[0.25px] rounded-full"
      style={{ backgroundColor: currentLevel.color }}
    >
      <img 
        src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" 
        alt="Profile" 
        className="w-5 h-5 rounded-full object-cover"
      />
    </div>
  );
}
