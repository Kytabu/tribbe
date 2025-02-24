
import { PiggyBank, Gem, Trophy } from "lucide-react";
import { SupportedCurrency } from "@/pages/Wallet";

interface BalanceViewProps {
  isLoading: boolean;
  currentBalance: number;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  availableBalance: number;
  lendingStats: {
    total_lent: number;
    total_expected_interest: number;
  };
}

export function BalanceView({
  isLoading,
  currentBalance,
  selectedCurrency,
  currencySymbols,
  availableBalance,
  lendingStats,
}: BalanceViewProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
        {isLoading ? (
          <span className="text-tribbe-sage animate-pulse">Loading...</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm text-black font-bold">
              {selectedCurrency.substring(0, 1)}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF]">
              {currencySymbols[selectedCurrency]} {currentBalance.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <BalanceCard
          icon={<PiggyBank className="w-5 h-5 text-[#A9FF22]" />}
          label="Amount In"
          amount={availableBalance}
          currencySymbol={currencySymbols[selectedCurrency]}
        />
        <BalanceCard
          icon={<Gem className="w-5 h-5 text-[#FF6B6B]" />}
          label="Amount Out"
          amount={lendingStats.total_lent}
          currencySymbol={currencySymbols[selectedCurrency]}
        />
        <BalanceCard
          icon={<Trophy className="w-5 h-5 text-[#4ECDC4]" />}
          label="Expected Interest"
          amount={lendingStats.total_expected_interest}
          prefix="+"
          currencySymbol={currencySymbols[selectedCurrency]}
        />
      </div>
    </div>
  );
}
