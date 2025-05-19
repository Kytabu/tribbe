
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { supabase } from "@/integrations/supabase/client";
import { SupportedCurrency } from "@/features/wallet/constants";
import { useWalletData } from "@/features/wallet/hooks/useWalletData";
import { currencySymbols } from "@/features/wallet/constants";
import { WalletNetWorth } from "@/components/wallet/WalletNetWorth";
import { FinancialPositionTabs } from "@/components/wallet/FinancialPositionTabs";
import { WalletOverview } from "@/components/wallet/WalletOverview";
import { CirclesSummary } from "@/components/wallet/CirclesSummary";
import { BoondiSnapshot } from "@/components/wallet/BoondiSnapshot";
import { StreetCredSummary } from "@/components/wallet/StreetCredSummary";
import { AutomationSwitches } from "@/features/wallet/components/AutomationSwitches";
import { WalletConnections } from "@/components/wallet/WalletConnections";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { CurrencyTabs } from "@/components/wallet/CurrencyTabs";

function WalletContent() {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('KES');
  const [userId, setUserId] = useState<string | null>(null);
  const [autoLend, setAutoLend] = useState(false);
  const [autoBorrow, setAutoBorrow] = useState(false);
  const [autoInterest, setAutoInterest] = useState(false);
  const [transactionFilter, setTransactionFilter] = useState<string>("all");

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const {
    isLoading,
    lendingStats,
    transactionHistory,
    currentBalance,
    availableBalance,
  } = useWalletData(userId, selectedCurrency);

  return (
    <div className="min-h-screen">
      {/* Currency Tabs - Sticky at top */}
      <div className="sticky top-0 z-10 bg-background pb-2 pt-2">
        <div className="container max-w-lg mx-auto px-4">
          <CurrencyTabs
            selectedCurrency={selectedCurrency}
            onCurrencyChange={setSelectedCurrency}
          />
        </div>
      </div>

      <div className="container max-w-lg mx-auto px-4 py-4 space-y-5">
        {/* Net Worth Banner */}
        <WalletNetWorth 
          currentBalance={currentBalance} 
          selectedCurrency={selectedCurrency}
          currencySymbols={currencySymbols}
          isLoading={isLoading} 
        />

        {/* Financial Position Tabs */}
        <FinancialPositionTabs 
          lendingStats={lendingStats}
          selectedCurrency={selectedCurrency}
          currencySymbols={currencySymbols}
        />

        {/* Wallet Overview */}
        <WalletOverview
          availableBalance={availableBalance}
          selectedCurrency={selectedCurrency}
          currencySymbols={currencySymbols}
          isLoading={isLoading}
          lendingStats={lendingStats}
        />

        {/* Circles Summary Widget */}
        <CirclesSummary />

        {/* Boondi Snapshot */}
        <BoondiSnapshot />

        {/* Street Cred Summary */}
        <StreetCredSummary />

        {/* Smart Financial Automation */}
        <AutomationSwitches
          autoLend={autoLend}
          setAutoLend={setAutoLend}
          autoBorrow={autoBorrow}
          setAutoBorrow={setAutoBorrow}
          autoInterest={autoInterest}
          setAutoInterest={setAutoInterest}
        />

        {/* M-Pesa & Cards Connections */}
        <WalletConnections selectedCurrency={selectedCurrency} />

        {/* Recent Transactions */}
        <TransactionHistory
          transactions={transactionHistory}
          selectedCurrency={selectedCurrency}
          currencySymbols={currencySymbols}
          filter={transactionFilter}
          onFilterChange={setTransactionFilter}
        />
      </div>
    </div>
  );
}

export default function Wallet() {
  return (
    <AppLayout>
      <WalletContent />
    </AppLayout>
  );
}
