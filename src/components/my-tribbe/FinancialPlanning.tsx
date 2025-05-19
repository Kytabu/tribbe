
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet } from "lucide-react";

export const FinancialPlanning: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-3">Financial Planning</h2>
      <Card className="bg-tribbe-grey/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-black/20 text-tribbe-lilac">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Retreat</h3>
                  <p className="text-xs text-gray-400">Savings goal</p>
                </div>
              </div>
              <span className="text-lg font-medium text-tribbe-lime">80%</span>
            </div>
            <Progress 
              value={80} 
              className="h-1.5 bg-tribbe-lime/30" 
              indicatorClassName="bg-tribbe-lilac"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>KES 40,000 saved</span>
              <span>KES 50,000 goal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
