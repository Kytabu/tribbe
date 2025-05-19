
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export function StreetCredSummary() {
  const navigate = useNavigate();
  
  // Mock data
  const streetCredScore = 720;
  const maxScore = 850;
  const percentageScore = Math.round((streetCredScore / maxScore) * 100);
  
  return (
    <Card className="bg-tribbe-grey/80 border-zinc-800">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-medium text-white">Street Cred Score</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-tribbe-lime hover:text-tribbe-lime hover:bg-zinc-800"
            onClick={() => navigate('/street-cred')}
          >
            Improve My Cred
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-3">
          <div className="w-16 h-16 rounded-full border-4 border-tribbe-lime flex items-center justify-center">
            <span className="text-xl font-bold">{percentageScore}</span>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Score: {streetCredScore}</span>
              <span>{maxScore}</span>
            </div>
            <Progress
              value={percentageScore}
              className="h-2 bg-tribbe-lime/30"
              indicatorClassName="bg-tribbe-lilac"
            />
            <p className="text-xs text-zinc-400 mt-1">Innovator Level</p>
          </div>
        </div>
        
        <div className="text-xs text-zinc-400">
          Your Street Cred score gives you access to higher borrowing limits and better lending rates.
        </div>
      </CardContent>
    </Card>
  );
}
