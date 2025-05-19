
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SupportedCurrency } from "@/features/wallet/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface WalletNetWorthProps {
  currentBalance: number;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  isLoading: boolean;
}

export function WalletNetWorth({ 
  currentBalance,
  selectedCurrency,
  currencySymbols,
  isLoading
}: WalletNetWorthProps) {
  const [isValueHidden, setIsValueHidden] = useState(false);

  const formattedBalance = () => {
    if (isValueHidden) {
      return "••••••";
    }
    return `${currencySymbols[selectedCurrency]} ${currentBalance.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })}`;
  };

  return (
    <Card className="bg-gradient-to-br from-tribbe-grey/80 to-background border-zinc-800">
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm text-zinc-400">Tribbe Net Worth</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => setIsValueHidden(!isValueHidden)}
          >
            {isValueHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="mb-1">
          {isLoading ? (
            <Skeleton className="h-10 w-2/3 bg-zinc-800" />
          ) : (
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tribbe-lime to-tribbe-aqua">
              {formattedBalance()}
            </div>
          )}
        </div>
        
        <div className="text-xs text-zinc-400">
          Across 3 Circles
        </div>
      </div>
    </Card>
  );
}
