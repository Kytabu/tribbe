
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatsCardProps {
  stats: {
    networkSize: number;
    activeCircles: number;
    totalLent: number;
    creditScore: number;
    trustScore: number;
  };
}

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <Card className="bg-tribbe-grey/50">
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="space-y-0.5">
            <h2 className="text-base font-medium text-white">Trust Score</h2>
            <p className="text-xs text-gray-400">Based on your Tribbe activity</p>
          </div>
          <div className="text-xl font-bold text-tribbe-lime">{stats.trustScore}%</div>
        </div>
        <Progress value={stats.trustScore} className="h-1" />
      </CardContent>
    </Card>
  );
}
