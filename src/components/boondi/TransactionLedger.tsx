
import React from "react";
import { Transaction } from "@/types/boondi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { categoryColors } from "./data/sampleData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TransactionLedgerProps {
  transactions: Transaction[];
}

export const TransactionLedger: React.FC<TransactionLedgerProps> = ({
  transactions,
}) => {
  return (
    <Card className="overflow-hidden bg-zinc-900/80 border-zinc-800 shadow-lg">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] rounded-md">
          <div className="space-y-1">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-1 h-12 rounded-full" 
                      style={{ backgroundColor: categoryColors[transaction.category] }}
                    />
                    <div>
                      <p className="font-medium">{transaction.merchant}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(transaction.date), "dd MMM yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium">
                      KES {transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-gray-500">No transactions in this period</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
