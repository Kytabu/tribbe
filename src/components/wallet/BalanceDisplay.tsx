import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Plus, Send, MessageSquare } from "lucide-react";
import { SupportedCurrency } from "@/pages/Wallet";
import { Transaction } from "@/types/wallet";
import { BalanceView } from "./balance/BalanceView";
import { AddMoneyView } from "./balance/AddMoneyView";
import { RequestView } from "./balance/RequestView";
import { SendView } from "./balance/SendView";

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
  lendingStats,
  transactionHistory
}: BalanceDisplayProps) {
  const [activeView, setActiveView] = useState<ViewType>('balance');
  const [amount, setAmount] = useState<string>('');
  const [autoTribbe, setAutoTribbe] = useState(false);

  const viewComponents = {
    balance: (
      <BalanceView
        isLoading={isLoading}
        currentBalance={currentBalance}
        selectedCurrency={selectedCurrency}
        currencySymbols={currencySymbols}
        availableBalance={availableBalance}
        lendingStats={lendingStats}
      />
    ),
    add: (
      <AddMoneyView
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbols={currencySymbols}
      />
    ),
    request: (
      <RequestView
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbols={currencySymbols}
      />
    ),
    send: (
      <SendView
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbols={currencySymbols}
        autoTribbe={autoTribbe}
        setAutoTribbe={setAutoTribbe}
      />
    ),
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5">
        <Button
          className={`border-0 text-xs px-2.5 py-1 h-8 ${activeView === 'balance' ? 'bg-tribbe-lime text-black hover:bg-tribbe-lime/90' : 'hover:bg-background/50'}`}
          variant={activeView === 'balance' ? "default" : "ghost"}
          onClick={() => setActiveView('balance')}
        >
          <Wallet className="h-3.5 w-3.5 mr-1" />
          Balance
        </Button>
        <Button
          className={`border-0 text-xs px-2.5 py-1 h-8 ${activeView === 'add' ? 'bg-tribbe-lime text-black hover:bg-tribbe-lime/90' : 'hover:bg-background/50'}`}
          variant={activeView === 'add' ? "default" : "ghost"}
          onClick={() => setActiveView('add')}
        >
          <Plus className="h-3.5 w-3.5 mr-1" />
          Add Money
        </Button>
        <Button
          className={`border-0 text-xs px-2.5 py-1 h-8 ${activeView === 'request' ? 'bg-tribbe-lime text-black hover:bg-tribbe-lime/90' : 'hover:bg-background/50'}`}
          variant={activeView === 'request' ? "default" : "ghost"}
          onClick={() => setActiveView('request')}
        >
          <MessageSquare className="h-3.5 w-3.5 mr-1" />
          Request
        </Button>
        <Button
          className={`border-0 text-xs px-2.5 py-1 h-8 ${activeView === 'send' ? 'bg-tribbe-lime text-black hover:bg-tribbe-lime/90' : 'hover:bg-background/50'}`}
          variant={activeView === 'send' ? "default" : "ghost"}
          onClick={() => setActiveView('send')}
        >
          <Send className="h-3.5 w-3.5 mr-1" />
          Send
        </Button>
      </div>

      {viewComponents[activeView]}
    </div>
  );
}
