
import { Card } from "@/components/ui/card";
import { History, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { format } from "date-fns";
import { SupportedCurrency } from "@/pages/Wallet";
import { Transaction } from "@/types/wallet";

interface TransactionHistoryProps {
  transactions: Transaction[];
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
}

export function TransactionHistory({ transactions, selectedCurrency, currencySymbols }: TransactionHistoryProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5" />
        <h3 className="text-lg font-medium">Recent Transactions</h3>
      </div>
      {transactions.length === 0 ? (
        <div className="text-center text-tribbe-sage py-8">
          No transactions yet
        </div>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div 
              key={tx.created_at.toString()} 
              className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {tx.amount >= 0 ? (
                    <ArrowUpRight className="h-5 w-5 text-[#A9FF22]" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-[#FF6B6B]" />
                  )}
                  <div>
                    <div className="font-medium">{format(new Date(tx.created_at), 'MMM d, yyyy HH:mm')}</div>
                    {tx.description && (
                      <div className="text-sm text-tribbe-sage">{tx.description}</div>
                    )}
                  </div>
                </div>
                <span className={`font-medium ${tx.amount >= 0 ? 'text-[#A9FF22]' : 'text-[#FF6B6B]'}`}>
                  {tx.amount >= 0 ? '+' : ''}{currencySymbols[selectedCurrency]}{Math.abs(Number(tx.amount)).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
