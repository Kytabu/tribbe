
import { Card, CardContent } from "@/components/ui/card";
import { Users, Wallet } from "lucide-react";

interface StatisticsGridProps {
  stats: {
    networkSize: number;
    activeCircles: number;
    totalLent: number;
    creditScore: number;
    trustScore: number;
  };
}

export function StatisticsGrid({ stats }: StatisticsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-black/20 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Total Circles</h3>
              <p className="text-lg font-bold text-white">{5}</p>
              <p className="text-xs text-gray-400">I am active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-black/20 text-green-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Total Lent</h3>
              <p className="text-lg font-bold text-white">
                KES {stats.totalLent.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">To Tribbe</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-black/20 text-red-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Total Borrowed</h3>
              <p className="text-lg font-bold text-white">
                KES {(25000).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">From Tribbe</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-black/20 text-purple-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Network Size</h3>
              <p className="text-lg font-bold text-white">{stats.networkSize}</p>
              <p className="text-xs text-gray-400">Total members</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-black/20 text-yellow-400">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Active Circles</h3>
              <p className="text-lg font-bold text-white">{stats.activeCircles}</p>
              <p className="text-xs text-gray-400">Current circles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-black/20 text-cyan-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">All Tribbes</h3>
              <p className="text-lg font-bold text-white">24</p>
              <p className="text-xs text-gray-400">All time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
