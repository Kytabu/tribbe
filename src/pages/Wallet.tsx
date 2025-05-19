
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
import { CircleDepositsAutomation } from "@/components/wallet/CircleDepositsAutomation";
import { WalletConnections } from "@/components/wallet/WalletConnections";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { PageHeader } from "@/components/wallet/PageHeader";

function WalletContent() {
  // Set KES as the only currency
  const selectedCurrency: SupportedCurrency = 'KES';
  const [userId, setUserId] = useState<string | null>(null);
  const [autoCircleDeposits, setAutoCircleDeposits] = useState(false);
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
      {/* Page Header */}
      <PageHeader />
      
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

        {/* Circle Deposits Automation */}
        <CircleDepositsAutomation 
          autoCircleDeposits={autoCircleDeposits}
          setAutoCircleDeposits={setAutoCircleDeposits}
        />

        {/* Circles Summary Widget */}
        <CirclesSummary />

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
