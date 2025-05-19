
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format } from "date-fns";
import { SupportedCurrency } from "@/features/wallet/constants";
import { Transaction } from "@/types/wallet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TransactionHistoryProps {
  transactions: Transaction[];
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  filter: string;
  onFilterChange: (value: string) => void;
}

export function TransactionHistory({ 
  transactions, 
  selectedCurrency, 
  currencySymbols,
  filter,
  onFilterChange
}: TransactionHistoryProps) {
  // Updated filter types
  const filters = [
    { id: "all", label: "All" },
    { id: "deposits", label: "Deposits" },
    { id: "withdrawals", label: "Withdrawals" },
    { id: "requests", label: "Requests" }
  ];

  // Mock transaction data for the new categories
  const mockTransactions = [
    {
      amount: 2000,
      running_balance: 7000,
      created_at: new Date().toISOString(),
      description: "Deposited to Friends Circle"
    },
    {
      amount: -1000,
      running_balance: 5000,
      created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      description: "Withdrew from Family Circle"
    },
    {
      amount: 500,
      running_balance: 6000,
      created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      description: "Requested from Work Circle"
    }
  ];

  // Filter transactions based on category
  const getFilteredTransactions = () => {
    if (filter === "all") return mockTransactions;
    
    const desc = filter.toLowerCase();
    
    switch (filter) {
      case "deposits":
        return mockTransactions.filter(tx => 
          tx.amount > 0 && tx.description?.toLowerCase().includes('deposit'));
      case "withdrawals":
        return mockTransactions.filter(tx => 
          tx.amount < 0 && tx.description?.toLowerCase().includes('withdrew'));
      case "requests":
        return mockTransactions.filter(tx => 
          tx.description?.toLowerCase().includes('request'));
      default:
        return mockTransactions;
    }
  };

  const filteredTransactions = getFilteredTransactions();
  
  return (
    <Card className="bg-tribbe-grey/80 border-zinc-800">
      <CardContent className="p-4">
        <h2 className="text-base font-medium text-white mb-3">Recent Transactions</h2>
        
        <div className="mb-4 overflow-x-auto">
          <ToggleGroup 
            type="single" 
            value={filter}
            onValueChange={(value) => value && onFilterChange(value)}
            className="w-full flex border border-zinc-800 rounded-lg bg-zinc-900/80"
          >
            {filters.map(f => (
              <ToggleGroupItem 
                key={f.id} 
                value={f.id}
                className={`flex-1 whitespace-nowrap text-xs ${filter === f.id ? 'bg-tribbe-lime text-black' : ''}`}
              >
                {f.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        
        {filteredTransactions.length === 0 ? (
          <div className="text-center text-zinc-400 py-8">
            No transactions to display
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((tx, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg bg-zinc-900/80 transition-all duration-300 hover:bg-zinc-900 border border-zinc-800"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {tx.amount >= 0 ? (
                      <ArrowUpRight className="h-5 w-5 text-tribbe-lime" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-[#FF6B6B]" />
                    )}
                    <div>
                      <div className="font-medium text-sm">{format(new Date(tx.created_at), 'MMM d, HH:mm')}</div>
                      {tx.description && (
                        <div className="text-xs text-zinc-400">{tx.description}</div>
                      )}
                    </div>
                  </div>
                  <span className={`font-medium ${tx.amount >= 0 ? 'text-tribbe-lime' : 'text-[#FF6B6B]'}`}>
                    {tx.amount >= 0 ? '+' : ''}{Math.abs(Number(tx.amount)).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
