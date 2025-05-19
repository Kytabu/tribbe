
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TribbeSnapshotProps {
  stats: {
    networkSize: number;
    activeCircles: number;
  };
}

export const TribbeSnapshot: React.FC<TribbeSnapshotProps> = ({ stats }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-white mb-3">Tribbe Snapshot</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-tribbe-grey/50">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Network Size</span>
              <span className="text-xl font-bold text-white">{stats.networkSize}</span>
              <span className="text-xs text-gray-400">Active members</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-tribbe-grey/50">
          <CardContent className="p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-gray-400">Active Circles</span>
              <span className="text-xl font-bold text-white">{stats.activeCircles}</span>
              <span className="text-xs text-gray-400">Current circles</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
