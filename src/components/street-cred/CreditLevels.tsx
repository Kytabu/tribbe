
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

interface CreditLevelsProps {
  streetCredLevels: StreetCredLevel[];
  currentLevel: StreetCredLevel;
}

export function CreditLevels({ streetCredLevels, currentLevel }: CreditLevelsProps) {
  return (
    <Card className="p-4 bg-tribbe-grey/50">
      <h3 className="text-base font-medium text-white mb-4">Street Cred Levels</h3>
      <div className="space-y-3">
        {streetCredLevels.slice().reverse().map((level) => (
          <div key={level.name} className="flex items-center gap-3">
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: level.color }}
            >
              <User className="w-3 h-3 text-black" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{level.name}</span>
                  {level.name === currentLevel.name && (
                    <span className="text-xs text-tribbe-lime">Current Level</span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{level.minScore}+</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
