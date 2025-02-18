import { PiggyBank, Gem, Trophy, CreditCard, Clock, Wallet, Plus, Send, MessageSquare, ArrowLeft, QrCode } from "lucide-react";
import { SupportedCurrency } from "@/pages/Wallet";
import { Transaction } from "@/types/wallet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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

type ViewType = 'balance' | 'add' | 'request' | 'send';

export function BalanceDisplay({
  isLoading,
  currentBalance,
  selectedCurrency,
  currencySymbols,
  availableBalance,
  lendingStats
}: BalanceDisplayProps) {
  const [activeView, setActiveView] = useState<ViewType>('balance');
  const [amount, setAmount] = useState<string>('');

  const BalanceView = () => (
    <div className="space-y-4 animate-fade-in">
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
      </div>
    </div>
  );

  const AddMoneyView = () => (
    <div className="space-y-4 animate-fade-in">
      <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
            {selectedCurrency.substring(0, 1)}
          </span>
          <div className="relative rounded-lg border-2 border-tribbe-lime p-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setAmount(value);
              }}
              placeholder="0.00"
              className="text-4xl font-bold pl-16 h-12 bg-transparent border-none focus-visible:ring-0 bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] pointer-events-none whitespace-nowrap">
              {currencySymbols[selectedCurrency]}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <Button
            variant="ghost"
            className="w-full justify-start p-0 hover:bg-transparent group"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#FF6B6B] group-hover:text-tribbe-lime" />
                <span className="text-tribbe-sage group-hover:text-tribbe-lime">M-Pesa</span>
              </div>
              <span className="font-medium group-hover:text-tribbe-lime">Free</span>
            </div>
          </Button>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <Button
            variant="ghost"
            className="w-full justify-start p-0 hover:bg-transparent group"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#A9FF22] group-hover:text-tribbe-lime" />
                <span className="text-tribbe-sage group-hover:text-tribbe-lime">Credit or Debit Card</span>
              </div>
              <span className="font-medium group-hover:text-tribbe-lime">Instant</span>
            </div>
          </Button>
        </div>

        <div className="p-3 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
          <Button
            variant="ghost"
            className="w-full justify-start p-0 hover:bg-transparent group"
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-[#4ECDC4] group-hover:text-tribbe-lime" />
                <span className="text-tribbe-sage group-hover:text-tribbe-lime">Bank Transfer</span>
              </div>
              <span className="font-medium group-hover:text-tribbe-lime">1-2 days</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  const RequestMoneyView = () => (
    <div className="p-4 text-center animate-fade-in">
      <div className="text-xl font-semibold text-tribbe-sage mb-4">
        Request Money from Friends
      </div>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Enter friend's email or username"
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Amount"
          className="w-full"
        />
        <Button className="w-full bg-tribbe-lime text-black hover:bg-tribbe-lime/90">
          Send Request
        </Button>
      </div>
    </div>
  );

  const SendMoneyView = () => (
    <div className="p-4 text-center animate-fade-in">
      <div className="text-xl font-semibold text-tribbe-sage mb-4">
        Send Money to Friends
      </div>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Enter recipient's email or username"
          className="w-full"
        />
        <Input
          type="number"
          placeholder="Amount"
          className="w-full"
        />
        <Button className="w-full bg-tribbe-lime text-black hover:bg-tribbe-lime/90">
          Send Money
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant={activeView === 'balance' ? "default" : "outline"}
          size="sm"
          className={activeView === 'balance' ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"}
          onClick={() => setActiveView('balance')}
        >
          <Wallet className="h-4 w-4 mr-1" />
          Total Balance
        </Button>
        <Button
          variant={activeView === 'add' ? "default" : "outline"}
          size="sm"
          className={activeView === 'add' ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"}
          onClick={() => setActiveView('add')}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Money
        </Button>
        <Button
          variant={activeView === 'request' ? "default" : "outline"}
          size="sm"
          className={activeView === 'request' ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"}
          onClick={() => setActiveView('request')}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Request
        </Button>
        <Button
          variant={activeView === 'send' ? "default" : "outline"}
          size="sm"
          className={activeView === 'send' ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"}
          onClick={() => setActiveView('send')}
        >
          <Send className="h-4 w-4 mr-1" />
          Send
        </Button>
      </div>

      {activeView === 'balance' && <BalanceView />}
      {activeView === 'add' && <AddMoneyView />}
      {activeView === 'request' && <RequestMoneyView />}
      {activeView === 'send' && <SendMoneyView />}
    </div>
  );
}
