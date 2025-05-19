
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useNavigate } from "react-router-dom";

export function BoondiSnapshot() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<string>("week");
  
  // Mock data - in a real app, this would be fetched based on the selected timeRange
  const weeklyData = [
    { name: "Food", value: 12500, color: "#FF6B6B" },
    { name: "Transport", value: 5800, color: "#F6D83E" },
    { name: "Entertainment", value: 3200, color: "#79CFFF" },
    { name: "Utilities", value: 8500, color: "#A9FF22" },
  ];
  
  const monthlyData = [
    { name: "Food", value: 45000, color: "#FF6B6B" },
    { name: "Transport", value: 22000, color: "#F6D83E" },
    { name: "Entertainment", value: 14000, color: "#79CFFF" },
    { name: "Utilities", value: 32000, color: "#A9FF22" },
  ];
  
  const data = timeRange === "week" ? weeklyData : monthlyData;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card className="bg-tribbe-grey/80 border-zinc-800">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-medium text-white">Boondi Snapshot</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-tribbe-lime hover:text-tribbe-lime hover:bg-zinc-800"
            onClick={() => navigate('/boondi')}
          >
            Open Summary
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        
        <div className="mb-3">
          <ToggleGroup 
            type="single" 
            value={timeRange} 
            onValueChange={(value) => value && setTimeRange(value)}
            className="justify-center border border-zinc-800 rounded-lg bg-zinc-900/80"
          >
            <ToggleGroupItem 
              value="week" 
              className={timeRange === "week" ? "bg-tribbe-lime text-black" : ""}
            >
              This Week
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="month" 
              className={timeRange === "month" ? "bg-tribbe-lime text-black" : ""}
            >
              This Month
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex items-center">
          <div className="w-1/3 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-2/3 pl-3">
            <p className="text-sm text-zinc-400 mb-1">Total Spending</p>
            <p className="text-xl font-bold text-white mb-3">KES {total.toLocaleString()}</p>
            <div className="grid grid-cols-2 gap-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
