
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { SupportedCurrency } from "@/pages/Wallet";

interface WalletActionsProps {
  selectedCurrency: SupportedCurrency;
}

export function WalletActions({ selectedCurrency }: WalletActionsProps) {
  return (
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
  );
}
