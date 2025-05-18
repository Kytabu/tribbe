
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryData } from "@/types/boondi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubCategoryPieChartProps {
  category: CategoryData;
}

export const SubCategoryPieChart: React.FC<SubCategoryPieChartProps> = ({
  category,
}) => {
  const { name, color, subCategories } = category;

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
        <div className="bg-background border border-border p-2 rounded-lg shadow-md">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-xs">KES {payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden bg-black border-zinc-800">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-medium">
          <span className="w-3 h-3 inline-block rounded-full mr-2" style={{ backgroundColor: color }}></span>
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={15}
                outerRadius={35}
                fill="#8884d8"
                dataKey="value"
                animationDuration={750}
                animationBegin={200}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorShades[index % colorShades.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
