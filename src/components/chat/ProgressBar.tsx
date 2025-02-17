
import { Separator } from "@/components/ui/separator";

interface ProgressBarProps {
  userLevel: number;
  userPoints: number;
}

export function ProgressBar({ userLevel, userPoints }: ProgressBarProps) {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex flex-col items-center gap-1 mb-2">
        <span className="font-medium text-tribbe-yellow">builder</span>
      </div>
      <Separator className="w-full" />
    </div>
  );
}
