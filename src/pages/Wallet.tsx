
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, History } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SupportedCurrency = 'GBP' | 'USD' | 'KES';

const currencySymbols: Record<SupportedCurrency, string> = {
  GBP: '£',
  USD: '$',
  KES: 'KSh'
};

export default function Wallet() {
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>('KES');

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

  const currentBalance = wallets.find(w => w.currency === selectedCurrency)?.balance || 0;

  const CurrencyIndicator = ({ currency }: { currency: SupportedCurrency }) => (
    <span className="inline-flex items-center gap-1.5 font-medium">
      <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs border">
        {currency.substring(0, 1)}
      </span>
      {currency}
    </span>
  );

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-tribbe-charcoal">My Wallet</h2>
              <Tabs value={selectedCurrency} onValueChange={(value) => setSelectedCurrency(value as SupportedCurrency)} className="w-full max-w-md">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="KES" className="data-[state=active]:bg-tribbe-lime data-[state=active]:text-black">
                    <CurrencyIndicator currency="KES" />
                  </TabsTrigger>
                  <TabsTrigger value="USD" className="data-[state=active]:bg-tribbe-lime data-[state=active]:text-black">
                    <CurrencyIndicator currency="USD" />
                  </TabsTrigger>
                  <TabsTrigger value="GBP" className="data-[state=active]:bg-tribbe-lime data-[state=active]:text-black">
                    <CurrencyIndicator currency="GBP" />
                  </TabsTrigger>
                  <TabsTrigger value="EUR" className="data-[state=active]:bg-tribbe-lime data-[state=active]:text-black">
                    <CurrencyIndicator currency="EUR" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="text-4xl font-bold">
              {isLoading ? (
                <span className="text-tribbe-sage">Loading...</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-sm border">
                    {selectedCurrency.substring(0, 1)}
                  </span>
                  {currencySymbols[selectedCurrency]}{currentBalance.toFixed(2)}
                </div>
              )}
            </div>
            <p className="text-tribbe-sage">Available Balance</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {wallets.map((wallet) => (
                <Card
                  key={wallet.currency}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedCurrency === wallet.currency
                      ? 'bg-tribbe-lime bg-opacity-10'
                      : ''
                  }`}
                  onClick={() => setSelectedCurrency(wallet.currency as SupportedCurrency)}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs border">
                      {wallet.currency.substring(0, 1)}
                    </span>
                    <span className="font-medium">{wallet.currency}</span>
                  </div>
                  <div className="text-xl font-bold mt-2">
                    {currencySymbols[wallet.currency as SupportedCurrency]}
                    {wallet.balance.toFixed(2)}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 hover:bg-tribbe-lime hover:text-black"
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
            className="h-auto py-6 hover:bg-tribbe-lime hover:text-black"
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

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5" />
            <h3 className="text-lg font-medium">Recent Transactions</h3>
          </div>
          <div className="text-center text-tribbe-sage py-8">
            No transactions yet
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
