
import { Separator } from "@/components/ui/separator";
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
      <Separator className="w-full" />
    </div>
  );
}
