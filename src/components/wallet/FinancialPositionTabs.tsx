
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SupportedCurrency } from "@/features/wallet/constants";
import { Skeleton } from "@/components/ui/skeleton";

interface FinancialPositionTabsProps {
  lendingStats: {
    total_lent: number;
    total_expected_interest: number;
  };
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
}

interface CircleBreakdown {
  id: number;
  name: string;
  amount: number;
  percentage: number;
}

export function FinancialPositionTabs({
  lendingStats,
  selectedCurrency,
  currencySymbols
}: FinancialPositionTabsProps) {
  const [activeTab, setActiveTab] = useState("principal");
  
  // Mock data for demo - in a real app, this would come from API
  // Updated to include Work Circle in all tabs
  const mockCircleBreakdowns: Record<string, CircleBreakdown[]> = {
    principal: [
      { id: 1, name: "Family Circle", amount: 25000, percentage: 45 },
      { id: 2, name: "Friends Circle", amount: 15000, percentage: 30 },
      { id: 3, name: "Work Circle", amount: 10000, percentage: 25 },
    ],
    interest: [
      { id: 1, name: "Family Circle", amount: 2500, percentage: 50 },
      { id: 2, name: "Friends Circle", amount: 1200, percentage: 25 },
      { id: 3, name: "Work Circle", amount: 1300, percentage: 25 },
    ],
    shares: [
      { id: 1, name: "Family Circle", amount: 15000, percentage: 40 },
      { id: 2, name: "Friends Circle", amount: 10000, percentage: 30 },
      { id: 3, name: "Work Circle", amount: 12000, percentage: 30 },
    ],
    returns: [
      { id: 1, name: "Family Circle", amount: 3500, percentage: 40 },
      { id: 2, name: "Friends Circle", amount: 2500, percentage: 30 },
      { id: 3, name: "Work Circle", amount: 2000, percentage: 30 },
    ],
  };

  const tabContent = {
    principal: {
      title: "Principal",
      total: lendingStats.total_lent,
      breakdown: mockCircleBreakdowns.principal,
    },
    interest: {
      title: "Interest",
      total: lendingStats.total_expected_interest,
      breakdown: mockCircleBreakdowns.interest,
    },
    shares: {
      title: "Shares",
      total: 37000, // Updated mock data
      breakdown: mockCircleBreakdowns.shares,
    },
    returns: {
      title: "Returns",
      total: 8000, // Updated mock data
      breakdown: mockCircleBreakdowns.returns,
    },
  };
  
  const currentTabContent = tabContent[activeTab as keyof typeof tabContent];
  
  return (
    <Card className="bg-tribbe-grey/80 border-zinc-800">
      <Tabs
        defaultValue="principal"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-4 pt-4">
          <ScrollArea className="w-full">
            <TabsList className="w-full bg-zinc-900/50 border border-zinc-800 p-1">
              <TabsTrigger 
                value="principal" 
                className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
              >
                Principal
              </TabsTrigger>
              <TabsTrigger 
                value="interest" 
                className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
              >
                Interest
              </TabsTrigger>
              <TabsTrigger 
                value="shares" 
                className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
              >
                Shares
              </TabsTrigger>
              <TabsTrigger 
                value="returns" 
                className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
              >
                Returns
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold">
              {currencySymbols[selectedCurrency]} {currentTabContent.total.toLocaleString()}
            </h3>
            <p className="text-xs text-zinc-400">
              Total {currentTabContent.title} Allocation
            </p>
          </div>

          <div className="space-y-3">
            {currentTabContent.breakdown.map((circle) => (
              <div key={circle.id} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{circle.name}</span>
                  <span>{currencySymbols[selectedCurrency]} {circle.amount.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-tribbe-lime" 
                    style={{ width: `${circle.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tabs>
    </Card>
  );
}
