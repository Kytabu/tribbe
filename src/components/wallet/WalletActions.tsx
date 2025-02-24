import { Button } from "@/components/ui/button";
import { Smartphone, CreditCard } from "lucide-react";
import { SupportedCurrency } from "@/features/wallet/constants";

interface WalletActionsProps {
  selectedCurrency: SupportedCurrency;
}

export function WalletActions({ selectedCurrency }: WalletActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Button
        variant="outline"
        size="sm"
        className="py-1.5 hover:bg-tribbe-lime hover:text-black hover:scale-105 transition-all duration-300 bg-gradient-to-r from-background to-muted border-tribbe-lime"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-background flex items-center justify-center text-[10px] border">
              {selectedCurrency.substring(0, 1)}
            </span>
            <Smartphone className="h-3.5 w-3.5 text-tribbe-lime" />
          </div>
          <div className="text-left">
            <div className="font-medium text-xs text-tribbe-lime">Connect M-Pesa</div>
          </div>
        </div>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="py-1.5 hover:bg-tribbe-lime hover:text-black hover:scale-105 transition-all duration-300 bg-gradient-to-r from-background to-muted border-tribbe-aqua"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-background flex items-center justify-center text-[10px] border">
              {selectedCurrency.substring(0, 1)}
            </span>
            <CreditCard className="h-3.5 w-3.5 text-tribbe-lime" />
          </div>
          <div className="text-left">
            <div className="font-medium text-xs text-tribbe-lime">Connect Cards</div>
          </div>
        </div>
      </Button>
    </div>
  );
}
