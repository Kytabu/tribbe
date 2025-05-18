
import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { CategoryData } from "@/types/boondi";

interface ChartProviderProps {
  data: CategoryData[];
  children: React.ReactElement; // Changed from ReactNode to ReactElement
}

export const ChartProvider: React.FC<ChartProviderProps> = ({
  data,
  children,
}) => {
  // Create the chart config from the provided data
  const chartConfig = data.reduce((config, category) => {
    return {
      ...config,
      [category.name]: {
        label: category.name,
        color: category.color
      }
    };
  }, {});

  return (
    <ChartContainer config={chartConfig}>
      {children}
    </ChartContainer>
  );
};
