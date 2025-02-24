
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
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

// Separate component for the wallet content that uses the sidebar
function WalletContent() {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('KES');
  const [userId, setUserId] = useState<string | null>(null);
  const [autoLend, setAutoLend] = useState(false);
  const [autoBorrow, setAutoBorrow] = useState(false);
  const [autoInterest, setAutoInterest] = useState(false);
  const { openMobile, setOpenMobile, isMobile, open, setOpen } = useSidebar();

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

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full border-b">
        <div className="max-w-3xl mx-auto w-full px-4">
          <div className="flex h-14 items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/80"
              onClick={handleMenuClick}
            >
              <MenuIcon className="h-5 w-5 text-tribbe-lime" />
            </Button>
            <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF]">
              My Wallet
            </h2>
            <div className="w-10" /> {/* Spacer to center the title */}
          </div>
        </div>
      </div>
      <div className="container px-3 mx-auto space-y-3 py-3">
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

// Main Wallet component that provides the layout
export default function Wallet() {
  return (
    <AppLayout>
      <WalletContent />
    </AppLayout>
  );
}
