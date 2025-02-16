import { PiggyBank, Gem, Trophy } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ReferenceDot, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { SupportedCurrency } from "@/pages/Wallet";
import { Transaction } from "@/types/wallet";

interface BalanceDisplayProps {
  isLoading: boolean;
  currentBalance: number;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  availableBalance: number;
  lendingStats: {
    total_lent: number;
    total_expected_interest: number;
  };
  transactionHistory: Transaction[];
}

export function BalanceDisplay({
  isLoading,
  currentBalance,
  selectedCurrency,
  currencySymbols,
  availableBalance,
  lendingStats,
  transactionHistory
}: BalanceDisplayProps) {
  const formattedTransactionHistory = transactionHistory.map(tx => ({
    ...tx,
    formattedDate: format(new Date(tx.created_at), 'HH:mm'),
    amount: Number(tx.running_balance)
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
        {isLoading ? (
          <span className="text-tribbe-sage animate-pulse">Loading...</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
              {selectedCurrency.substring(0, 1)}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF]">
              {currencySymbols[selectedCurrency]}{currentBalance.toFixed(2)}
            </span>
          </div>
        )}
      </div>
      <p className="text-tribbe-sage">Total Balance</p>

      <div className="h-[100px] relative">
        {!isLoading && formattedTransactionHistory.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedTransactionHistory}>
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#A9FF22" 
                strokeWidth={2}
                dot={false}
              />
              <XAxis 
                dataKey="formattedDate" 
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                hide 
                domain={['dataMin - 1000', 'dataMax + 1000']}
              />
              <ReferenceDot
                x={formattedTransactionHistory[formattedTransactionHistory.length - 1]?.formattedDate}
                y={formattedTransactionHistory[formattedTransactionHistory.length - 1]?.amount}
                r={4}
                fill="#A9FF22"
                className="animate-pulse"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="6"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </ReferenceDot>
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-[#A9FF22]" />
              <span className="text-tribbe-sage">Available Balance:</span>
            </div>
            <span className="font-medium">{currencySymbols[selectedCurrency]}{availableBalance.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-[#FF6B6B]" />
              <span className="text-tribbe-sage">Amount Lent:</span>
            </div>
            <span className="font-medium">{currencySymbols[selectedCurrency]}{lendingStats.total_lent.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#4ECDC4]" />
              <span className="text-tribbe-sage">Expected Interest:</span>
            </div>
            <span className="font-medium text-[#A9FF22]">+{currencySymbols[selectedCurrency]}{lendingStats.total_expected_interest.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
