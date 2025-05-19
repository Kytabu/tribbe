
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Label } from "recharts";
import { CategoryData } from "@/types/boondi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MainPieChartProps {
  data: CategoryData[];
  title?: string;
  className?: string;
}

export const MainPieChart: React.FC<MainPieChartProps> = ({
  data,
  title = "Spending Summary",
  className,
}) => {
  // Format data for the pie chart
  const chartData = data.map(category => ({
    name: category.name,
    value: category.amount,
    color: category.color,
    abbreviation: getAbbreviation(category.name)
  }));

  // Calculate total spending
  const totalSpending = data.reduce((total, category) => total + category.amount, 0);

  const formatCurrency = (value: number) => {
    return `KES ${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">{formatCurrency(data.value)}</p>
          <p className="text-xs text-muted-foreground">
            {((data.value / totalSpending) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25; // Increased from 20 to provide more spacing
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
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
      <CardContent className="p-0 pt-4 pb-6">
        <div className="h-72"> {/* Increased height to allow more space for labels */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {chartData.map((entry, index) => (
                  <filter
                    key={`shadow-${index}`}
                    id={`shadow-${index}`}
                    x="-10%"
                    y="-10%"
                    width="120%"
                    height="120%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="2"
                      floodColor="#000"
                      floodOpacity="0.5"
                    />
                  </filter>
                ))}
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={renderCustomizedLabel}
                outerRadius={80}
                innerRadius={30}
                paddingAngle={2}
                dataKey="value"
                animationDuration={750}
                animationBegin={0}
                animationEasing="ease-out"
                stroke="#1E1E1E"
                strokeWidth={1}
                filter="url(#shadow-0)"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    style={{ filter: `drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))` }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 30 }} // Increased padding for better spacing
                formatter={(value, entry: any) => (
                  <span className="text-xs text-white">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
