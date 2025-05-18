
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface TrustScoreSectionProps {
  trustScore: number;
}

export function TrustScoreSection({ trustScore }: TrustScoreSectionProps) {
  return (
    <Card className="p-5 bg-tribbe-grey/50">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-white">Trust Score</h3>
            <p className="text-xs text-gray-400">Based on your Tribbe activity</p>
          </div>
          <div className="text-2xl font-bold text-tribbe-lime">{trustScore}%</div>
        </div>
        <Progress value={trustScore} className="h-2" />
      </div>
    </Card>
  );
}
