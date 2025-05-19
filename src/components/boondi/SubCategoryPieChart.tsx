
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryData } from "@/types/boondi";
import { Card, CardContent } from "@/components/ui/card";

interface SubCategoryPieChartProps {
  category: CategoryData;
}

export const SubCategoryPieChart: React.FC<SubCategoryPieChartProps> = ({
  category,
}) => {
  const { name, color, subCategories } = category;

  // Function to get abbreviated category name
  const getAbbreviation = (categoryName: string): string => {
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
  };

  // Generate shades of the category color for sub-categories
  const getColorShades = (baseColor: string, count: number) => {
    // Simple function to lighten and darken colors
    const shades = [];
    
    // Base color for the main category
    shades.push(baseColor);
    
    // Generate lighter shades
    for (let i = 1; i < count; i++) {
      // This creates a lighter version by mixing with white
      const shade = `${baseColor}${Math.round(90 - i * 20).toString(16)}`;
      shades.push(shade);
    }
    
    return shades;
  };

  // Format data for the pie chart
  const chartData = subCategories.filter(sub => sub.amount > 0).map(sub => ({
    name: sub.name,
    value: sub.amount
  }));

  const colorShades = getColorShades(color, chartData.length);

  // If there's no data to show, return null
  if (chartData.length === 0) return null;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg shadow-xl">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-xs">KES {payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden bg-zinc-900/80 border-zinc-800 shadow-lg">
      <CardContent className="p-2">
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter id={`shadow-${name}`} x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="1"
                    floodColor="#000"
                    floodOpacity="0.5"
                  />
                </filter>
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={15}
                outerRadius={35}
                paddingAngle={2}
                dataKey="value"
                stroke="#1E1E1E"
                strokeWidth={0.5}
                animationDuration={750}
                animationBegin={200}
                animationEasing="ease-out"
                filter={`url(#shadow-${name})`}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colorShades[index % colorShades.length]} 
                    style={{ filter: `drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))` }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center pt-1">
          <span className="w-2 h-2 inline-block rounded-full mr-1" style={{ backgroundColor: color }}></span>
          <span className="text-xs font-medium">{getAbbreviation(name)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
