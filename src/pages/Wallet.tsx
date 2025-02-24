import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CurrencyTabs } from "@/components/wallet/CurrencyTabs";
import { BalanceDisplay } from "@/components/wallet/BalanceDisplay";
import { WalletActions } from "@/components/wallet/WalletActions";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { SupportedCurrency } from "@/features/wallet/constants";
import { useWalletData } from "@/features/wallet/hooks/useWalletData";
import { AutomationSwitches } from "@/features/wallet/components/AutomationSwitches";
import { currencySymbols } from "@/features/wallet/constants";
import { PageHeader } from "@/components/layout/PageHeader";

function WalletContent() {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('KES');
  const [userId, setUserId] = useState<string | null>(null);
  const [autoLend, setAutoLend] = useState(false);
  const [autoBorrow, setAutoBorrow] = useState(false);
  const [autoInterest, setAutoInterest] = useState(false);

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
    <>
      <PageHeader 
        title="My Wallet"
        titleClassName="bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF]"
      />
      <div className="container px-4 mx-auto space-y-6 py-6">
        <Card className="p-3 bg-gradient-to-br from-background to-muted shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="space-y-3">
            <div className="flex flex-col space-y-3">
              <div className="w-full overflow-x-auto -mx-2 px-2">
                <CurrencyTabs
                  selectedCurrency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                />
              </div>
            </div>

            <div className="w-full">
              <BalanceDisplay
                isLoading={isLoading}
                currentBalance={currentBalance}
                selectedCurrency={selectedCurrency}
                currencySymbols={currencySymbols}
                availableBalance={availableBalance}
                lendingStats={lendingStats}
                transactionHistory={transactionHistory}
              />
            </div>
          </div>
        </Card>

        <AutomationSwitches
          autoLend={autoLend}
          setAutoLend={setAutoLend}
          autoBorrow={autoBorrow}
          setAutoBorrow={setAutoBorrow}
          autoInterest={autoInterest}
          setAutoInterest={setAutoInterest}
        />

        <div className="space-y-3">
          <WalletActions selectedCurrency={selectedCurrency} />
          <TransactionHistory
            transactions={transactionHistory}
            selectedCurrency={selectedCurrency}
            currencySymbols={currencySymbols}
          />
        </div>
      </div>
    </>
  );
}

export default function Wallet() {
  return (
    <AppLayout>
      <WalletContent />
    </AppLayout>
  );
}
