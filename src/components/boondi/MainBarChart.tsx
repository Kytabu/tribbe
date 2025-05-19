
import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, Legend } from "recharts";
import { CategoryData } from "@/types/boondi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MainBarChartProps {
  data: CategoryData[];
  title?: string;
  className?: string;
}

export const MainBarChart: React.FC<MainBarChartProps> = ({
  data,
  title = "Spending Summary",
  className,
}) => {
  // Format data for the bar chart
  const chartData = data.map(category => ({
    name: getAbbreviation(category.name),
    fullName: category.name,
    value: category.amount,
    color: category.color
  }));

  const formatCurrency = (value: number) => {
    return `KES ${value.toLocaleString()}`;
  };

  // Calculate total spending
  const totalSpending = data.reduce((total, category) => total + category.amount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl">
          <p className="font-medium">{data.fullName}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
          <p className="text-xs text-muted-foreground">
            {((data.value / totalSpending) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Function to create abbreviations for category names
  function getAbbreviation(categoryName: string): string {
    switch (categoryName) {
      case 'Utilities':
        return 'U';
      case 'Housing & Rent':
        return 'H&R';
      case 'Food & Groceries':
        return 'F&G';
      case 'Transport & Mobility':
        return 'T&M';
      case 'Entertainment & Subscriptions':
        return 'E&S';
      case 'Debts & Payments':
        return 'D&P';
      default:
        return '';
    }
  }

  return (
    <Card className={cn("overflow-hidden bg-zinc-900/80 border-zinc-800 shadow-lg", className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-center">{title}</CardTitle>
        <div className="text-center text-sm text-muted-foreground">
          Total: {formatCurrency(totalSpending)}
        </div>
      </CardHeader>
      <CardContent className="pt-3 pb-5 px-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
              layout="vertical"
            >
              <XAxis 
                type="number" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#a0aec0', fontSize: 10 }}
                tickFormatter={(value) => `${value/1000}k`}
                domain={[0, 'dataMax']}
              />
              <YAxis 
                type="category"
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: '#a0aec0', fontSize: 12 }}
                width={30}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} 
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]} 
                maxBarSize={30} 
                animationDuration={750}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.35))' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
