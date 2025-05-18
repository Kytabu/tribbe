
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CategoryData } from "@/types/boondi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { totalSpending } from "./data/sampleData";

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
    color: category.color
  }));

  const formatCurrency = (value: number) => {
    return `KES ${value.toLocaleString()}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border p-2 rounded-lg shadow-md">
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
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[10px] font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className={cn("overflow-hidden bg-black border-zinc-800", className)}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-center">{title}</CardTitle>
        <div className="text-center text-sm text-muted-foreground">
          Total: {formatCurrency(totalSpending)}
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={750}
                animationBegin={0}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => (
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
