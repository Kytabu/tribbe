
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
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-white">Trust Score</h2>
            <p className="text-sm text-gray-400">Based on your Tribbe activity</p>
          </div>
          <div className="text-3xl font-bold text-tribbe-lime">{stats.trustScore}%</div>
        </div>
        <Progress value={stats.trustScore} className="h-2" />
      </CardContent>
    </Card>
  );
}
