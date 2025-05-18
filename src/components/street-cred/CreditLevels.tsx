
import { ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

interface CreditLevelsProps {
  streetCredLevels: StreetCredLevel[];
  currentLevel: StreetCredLevel;
  onLearnMore?: (level: StreetCredLevel) => void;
}

export function CreditLevels({ streetCredLevels, currentLevel, onLearnMore }: CreditLevelsProps) {
  return (
    <div className="space-y-3">
      {streetCredLevels.slice().reverse().map((level) => (
        <div key={level.name} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: level.color }}
            >
              <User className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{level.name}</span>
                {level.name === currentLevel.name && (
                  <span className="text-xs text-tribbe-lime">Current Level</span>
                )}
              </div>
              <span className="text-xs text-gray-400">{level.minScore}+</span>
            </div>
          </div>
          {onLearnMore && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-8 hover:bg-white/10"
              onClick={() => onLearnMore(level)}
            >
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
