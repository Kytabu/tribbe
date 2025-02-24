import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CurrencyTabs } from "@/components/wallet/CurrencyTabs";
import { BalanceDisplay } from "@/components/wallet/BalanceDisplay";
import { WalletActions } from "@/components/wallet/WalletActions";
import { TransactionHistory } from "@/components/wallet/TransactionHistory";
import { Transaction } from "@/types/wallet";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

export type SupportedCurrency = 'GBP' | 'USD' | 'KES' | 'EUR';

export const currencySymbols: Record<SupportedCurrency, string> = {
  GBP: '£',
  USD: '$',
  KES: 'KSh',
  EUR: '€'
};

const COLORS = ['#A9FF22', '#FF6B6B', '#4ECDC4'];

export default function Wallet() {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('KES');
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [autoLend, setAutoLend] = useState(false);
  const [autoBorrow, setAutoBorrow] = useState(false);
  const [autoInterest, setAutoInterest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const { data: wallets = [], isLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .order('currency');
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: lendingStats = { total_lent: 0, total_expected_interest: 0 }, isLoading: isLoadingStats } = useQuery({
    queryKey: ['lending-stats', selectedCurrency, userId],
    queryFn: async () => {
      if (!userId) return { total_lent: 0, total_expected_interest: 0 };

      const { data, error } = await supabase
        .rpc('get_wallet_lending_stats', {
          wallet_owner_id: userId,
          wallet_currency: selectedCurrency
        });
      
      if (error) throw error;
      return data[0] || { total_lent: 0, total_expected_interest: 0 };
    },
    enabled: !!userId
  });

  const { data: transactionHistory = [], isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions', selectedCurrency, userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .rpc('get_wallet_transactions', {
          p_wallet_currency: selectedCurrency,
          p_user_id: userId,
          p_limit: 30
        });
      
      if (error) throw error;
      return (data || []) as Transaction[];
    },
    enabled: !!userId
  });

  const currentWallet = wallets.find(w => w.currency === selectedCurrency);
  const currentBalance = currentWallet?.balance || 0;
  const availableBalance = currentBalance - (lendingStats.total_lent || 0);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('wallet-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'loans',
          filter: `lender_id=eq.${userId}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['lending-stats'] });
          queryClient.invalidateQueries({ queryKey: ['wallets'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('wallet-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transactions',
          filter: `wallet_id=eq.${currentWallet?.id}`
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['transactions'] });
          queryClient.invalidateQueries({ queryKey: ['wallets'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, currentWallet?.id, queryClient]);

  return (
    <AppLayout>
      <div className="container px-3 mx-auto space-y-3 py-3">
        <Card className="p-3 bg-gradient-to-br from-background to-muted shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="space-y-3">
            <div className="flex flex-col space-y-3">
              <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] animate-fade-in">My Wallet</h2>
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-2 rounded-lg border bg-background">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium">Automate Lending</div>
              <Switch
                checked={autoLend}
                onCheckedChange={setAutoLend}
                className="data-[state=checked]:bg-tribbe-lime scale-75"
              />
            </div>
          </div>

          <div className="p-2 rounded-lg border bg-background">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium">Automate Borrowing</div>
              <Switch
                checked={autoBorrow}
                onCheckedChange={setAutoBorrow}
                className="data-[state=checked]:bg-tribbe-lime scale-75"
              />
            </div>
          </div>

          <div className="p-2 rounded-lg border bg-background">
            <div className="flex items-center justify-between">
              <div className="text-xs font-medium">Automate Repayment</div>
              <Switch
                checked={autoInterest}
                onCheckedChange={setAutoInterest}
                className="data-[state=checked]:bg-tribbe-lime scale-75"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <WalletActions selectedCurrency={selectedCurrency} />
          <TransactionHistory
            transactions={transactionHistory}
            selectedCurrency={selectedCurrency}
            currencySymbols={currencySymbols}
          />
        </div>
      </div>
    </AppLayout>
  );
}
