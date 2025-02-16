
import { Trophy, Star } from "lucide-react";

interface ProgressBarProps {
  userLevel: number;
  userPoints: number;
}

export function ProgressBar({ userLevel, userPoints }: ProgressBarProps) {
  return (
    <div className="flex justify-between items-center mb-4 p-2 bg-tribbe-lime/10 rounded-lg">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-400" />
        <span className="font-medium">Level {userLevel}</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-tribbe-lime" />
        <span className="font-medium">{userPoints} points</span>
      </div>
    </div>
  );
}
