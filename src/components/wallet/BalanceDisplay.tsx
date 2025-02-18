
import { PiggyBank, Gem, Trophy, CreditCard, Clock, Wallet, Plus, Send, MessageSquare } from "lucide-react";
import { SupportedCurrency } from "@/pages/Wallet";
import { Transaction } from "@/types/wallet";
import { Button } from "@/components/ui/button";

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
  lendingStats
}: BalanceDisplayProps) {
  return (
    <div className="space-y-2 animate-fade-in">
      <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
        {isLoading ? (
          <span className="text-tribbe-sage animate-pulse">Loading...</span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
              {selectedCurrency.substring(0, 1)}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF]">
              {currencySymbols[selectedCurrency]} {currentBalance.toFixed(2)}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
        >
          <Wallet className="h-4 w-4 mr-1" />
          Total Balance
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Request
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
        >
          <Send className="h-4 w-4 mr-1" />
          Send
        </Button>
      </div>

      <div className="space-y-2">
        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-[#A9FF22]" />
              <span className="text-tribbe-sage">Available Balance:</span>
            </div>
            <span className="font-medium">{currencySymbols[selectedCurrency]} {availableBalance.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-[#FF6B6B]" />
              <span className="text-tribbe-sage">Amount Lent:</span>
            </div>
            <span className="font-medium">{currencySymbols[selectedCurrency]} {lendingStats.total_lent.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#4ECDC4]" />
              <span className="text-tribbe-sage">Expected Interest:</span>
            </div>
            <span className="font-medium text-[#A9FF22]">+{currencySymbols[selectedCurrency]} {lendingStats.total_expected_interest.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#79CFFF]" />
              <span className="text-tribbe-sage">Amount Borrowed:</span>
            </div>
            <span className="font-medium">{currencySymbols[selectedCurrency]} 0.00</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#FF6B6B]" />
              <span className="text-tribbe-sage">Interest Due:</span>
            </div>
            <span className="font-medium text-[#FF6B6B]">+{currencySymbols[selectedCurrency]} 0.00</span>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#A9FF22]" />
              <span className="text-tribbe-sage">New Balance:</span>
            </div>
            <span className="font-medium">{currencySymbols[selectedCurrency]} {currentBalance.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
