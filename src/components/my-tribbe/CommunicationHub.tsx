
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Bell, BarChart3 } from "lucide-react";

export const CommunicationHub: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-3">Communication Hub</h2>
      <Card className="bg-tribbe-grey/50">
        <CardContent className="p-4">
          <div className="flex justify-between">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-black/20 text-blue-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-400">Group Chat</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-black/20 text-yellow-400">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-400">Announcements</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 rounded-full bg-black/20 text-green-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-xs text-gray-400">Stats</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
