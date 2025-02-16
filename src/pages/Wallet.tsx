import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, History, Gem, PiggyBank, Trophy } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, ReferenceDot } from "recharts";
import { format } from "date-fns";

type SupportedCurrency = 'GBP' | 'USD' | 'KES' | 'EUR';

const currencySymbols: Record<SupportedCurrency, string> = {
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
      return data || [];
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

  const formattedTransactionHistory = transactionHistory.map(tx => ({
    ...tx,
    formattedDate: format(new Date(tx.created_at), 'HH:mm'),
    amount: Number(tx.running_balance)
  }));

  const chartData = [
    { name: 'Available', value: availableBalance, icon: <PiggyBank className="w-4 h-4" /> },
    { name: 'Lent Out', value: lendingStats.total_lent, icon: <Gem className="w-4 h-4" /> },
    { name: 'Expected Interest', value: lendingStats.total_expected_interest, icon: <Trophy className="w-4 h-4" /> }
  ].filter(item => item.value > 0);

  const CurrencyIndicator = ({ currency }: { currency: SupportedCurrency }) => (
    <span className="inline-flex items-center gap-1.5 font-medium">
      <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs border transition-all duration-300 group-data-[state=active]:text-[#A9FF22] group-data-[state=active]:scale-110 group-hover:scale-105">
        {currency.substring(0, 1)}
      </span>
      {currency}
    </span>
  );

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-gradient-to-br from-background to-muted shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] animate-fade-in">My Wallet</h2>
              <Tabs value={selectedCurrency} onValueChange={(value) => setSelectedCurrency(value as SupportedCurrency)} className="w-full max-w-md">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="KES" className="group data-[state=active]:bg-tribbe-lime data-[state=active]:text-black transition-all duration-300 hover:scale-105">
                    <CurrencyIndicator currency="KES" />
                  </TabsTrigger>
                  <TabsTrigger value="USD" className="group data-[state=active]:bg-tribbe-lime data-[state=active]:text-black transition-all duration-300 hover:scale-105">
                    <CurrencyIndicator currency="USD" />
                  </TabsTrigger>
                  <TabsTrigger value="GBP" className="group data-[state=active]:bg-tribbe-lime data-[state=active]:text-black transition-all duration-300 hover:scale-105">
                    <CurrencyIndicator currency="GBP" />
                  </TabsTrigger>
                  <TabsTrigger value="EUR" className="group data-[state=active]:bg-tribbe-lime data-[state=active]:text-black transition-all duration-300 hover:scale-105">
                    <CurrencyIndicator currency="EUR" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6 animate-fade-in">
                <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
                  {isLoading ? (
                    <span className="text-tribbe-sage animate-pulse">Loading...</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
                        {selectedCurrency.substring(0, 1)}
                      </span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF]">
                        {currencySymbols[selectedCurrency]}{currentBalance.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-tribbe-sage">Total Balance</p>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <PiggyBank className="w-5 h-5 text-[#A9FF22]" />
                        <span className="text-tribbe-sage">Available Balance:</span>
                      </div>
                      <span className="font-medium">{currencySymbols[selectedCurrency]}{availableBalance.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Gem className="w-5 h-5 text-[#FF6B6B]" />
                        <span className="text-tribbe-sage">Amount Lent:</span>
                      </div>
                      <span className="font-medium">{currencySymbols[selectedCurrency]}{lendingStats.total_lent.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-[#4ECDC4]" />
                        <span className="text-tribbe-sage">Expected Interest:</span>
                      </div>
                      <span className="font-medium text-[#A9FF22]">+{currencySymbols[selectedCurrency]}{lendingStats.total_expected_interest.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[100px] relative animate-fade-in">
                {!isLoadingTransactions && formattedTransactionHistory.length > 0 && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedTransactionHistory}>
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#A9FF22" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <XAxis 
                        dataKey="formattedDate" 
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        hide 
                        domain={['dataMin - 1000', 'dataMax + 1000']}
                      />
                      <ReferenceDot
                        x={formattedTransactionHistory[formattedTransactionHistory.length - 1]?.formattedDate}
                        y={formattedTransactionHistory[formattedTransactionHistory.length - 1]?.amount}
                        r={4}
                        fill="#A9FF22"
                        className="animate-pulse"
                      >
                        <animate
                          attributeName="r"
                          from="4"
                          to="6"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </ReferenceDot>
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 hover:bg-tribbe-lime hover:text-black hover:scale-105 transition-all duration-300 bg-gradient-to-r from-background to-muted"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs border">
                  {selectedCurrency.substring(0, 1)}
                </span>
                <ArrowUpRight className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">Money In</div>
                <div className="text-sm text-tribbe-sage">Add funds to your wallet</div>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 hover:bg-tribbe-lime hover:text-black hover:scale-105 transition-all duration-300 bg-gradient-to-r from-background to-muted"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs border">
                  {selectedCurrency.substring(0, 1)}
                </span>
                <ArrowDownRight className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">Money Out</div>
                <div className="text-sm text-tribbe-sage">Withdraw from your wallet</div>
              </div>
            </div>
          </Button>
        </div>

        <Card className="p-6 bg-gradient-to-br from-background to-muted hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5" />
            <h3 className="text-lg font-medium">Recent Transactions</h3>
          </div>
          {transactionHistory.length === 0 ? (
            <div className="text-center text-tribbe-sage py-8">
              No transactions yet
            </div>
          ) : (
            <div className="space-y-4">
              {transactionHistory.map((tx) => (
                <div 
                  key={tx.created_at.toString()} 
                  className="p-4 rounded-lg bg-gradient-to-r from-background to-muted border transition-all duration-300 hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {tx.amount >= 0 ? (
                        <ArrowUpRight className="h-5 w-5 text-[#A9FF22]" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-[#FF6B6B]" />
                      )}
                      <div>
                        <div className="font-medium">{format(new Date(tx.created_at), 'MMM d, yyyy HH:mm')}</div>
                        <div className="text-sm text-tribbe-sage">{tx.description}</div>
                      </div>
                    </div>
                    <span className={`font-medium ${tx.amount >= 0 ? 'text-[#A9FF22]' : 'text-[#FF6B6B]'}`}>
                      {tx.amount >= 0 ? '+' : ''}{currencySymbols[selectedCurrency]}{Math.abs(Number(tx.amount)).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
