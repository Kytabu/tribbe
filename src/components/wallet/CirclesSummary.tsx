
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, CircleDollarSign } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

interface Circle {
  id: number;
  name: string;
  members: number;
  activity: string; // "high", "medium", "low"
  type: string; // "savings", "lending", etc.
}

export function CirclesSummary() {
  const navigate = useNavigate();
  
  // Mock data
  const circles: Circle[] = [
    { id: 1, name: "Family Circle", members: 8, activity: "high", type: "savings" },
    { id: 2, name: "Friends Circle", members: 12, activity: "medium", type: "lending" },
    { id: 3, name: "Work Circle", members: 6, activity: "low", type: "fundraising" },
  ];
  
  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "high": return "bg-tribbe-lime";
      case "medium": return "bg-tribbe-yellow";
      case "low": return "bg-tribbe-aqua";
      default: return "bg-gray-400";
    }
  };
  
  return (
    <Card className="bg-tribbe-grey/80 border-zinc-800">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-medium text-white">Your Circles</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-tribbe-lime hover:text-tribbe-lime hover:bg-zinc-800"
            onClick={() => navigate('/circles')}
          >
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <ScrollArea className="h-52 w-full pr-4">
          <div className="space-y-3">
            {circles.map((circle) => (
              <div 
                key={circle.id} 
                className="p-3 rounded-lg bg-zinc-900/80 hover:bg-zinc-900 cursor-pointer border border-zinc-800"
                onClick={() => navigate(`/circles/${circle.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-black/30 text-tribbe-lime">
                      <CircleDollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{circle.name}</h3>
                      <p className="text-xs text-zinc-400">{circle.members} members • {circle.type}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full mt-2 ${getActivityColor(circle.activity)}`} />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
