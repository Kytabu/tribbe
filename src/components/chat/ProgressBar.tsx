
import { Star } from "lucide-react";

interface ProgressBarProps {
  userLevel: number;
  userPoints: number;
}

export function ProgressBar({ userLevel, userPoints }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex flex-col items-center gap-1 mb-2">
        <Star className="h-6 w-6 text-tribbe-yellow" fill="currentColor" strokeWidth={1} />
        <span className="font-medium text-tribbe-yellow">builder</span>
      </div>
      <div className="w-full flex justify-end items-center p-2 bg-tribbe-lime/10 rounded-lg">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-tribbe-lime" />
          <span className="font-medium">{userPoints} points</span>
        </div>
      </div>
    </div>
  );
}
