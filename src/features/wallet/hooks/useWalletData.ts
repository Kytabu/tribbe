
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SupportedCurrency } from "../constants";
import { useEffect } from "react";

export function useWalletData(userId: string | null, selectedCurrency: SupportedCurrency) {
  const queryClient = useQueryClient();

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
      return data || [];
    },
    enabled: !!userId
  });

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

  const currentWallet = wallets.find(w => w.currency === selectedCurrency);
  const currentBalance = currentWallet?.balance || 0;
  const availableBalance = currentBalance - (lendingStats.total_lent || 0);

  return {
    wallets,
    isLoading,
    lendingStats,
    transactionHistory,
    currentBalance,
    availableBalance,
    currentWallet
  };
}
