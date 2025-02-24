
import { Card, CardContent } from "@/components/ui/card";
import { Users, Wallet, Star } from "lucide-react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-black/20 text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">My Total Tribbes</h3>
              <p className="text-2xl font-bold text-white">{5}</p>
              <p className="text-xs text-gray-400">Active memberships</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-black/20 text-green-400">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Total Lent</h3>
              <p className="text-2xl font-bold text-white">
                KES {stats.totalLent.toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">To Tribbe</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-black/20 text-red-400">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Total Borrowed</h3>
              <p className="text-2xl font-bold text-white">
                KES {(25000).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400">From Tribbe</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-black/20 text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Network Size</h3>
              <p className="text-2xl font-bold text-white">{stats.networkSize}</p>
              <p className="text-xs text-gray-400">Total members</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-black/20 text-yellow-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Active Circles</h3>
              <p className="text-2xl font-bold text-white">{stats.activeCircles}</p>
              <p className="text-xs text-gray-400">Current circles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-black/20 text-cyan-400">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm text-gray-400">Total Transactions</h3>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-xs text-gray-400">All time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
