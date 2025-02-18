
import { Button } from "@/components/ui/button";
import { Smartphone, CreditCard } from "lucide-react";
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
        className="h-auto py-6 hover:bg-tribbe-lime hover:text-black hover:scale-105 transition-all duration-300 bg-gradient-to-r from-background to-muted border-tribbe-lime"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs border">
              {selectedCurrency.substring(0, 1)}
            </span>
            <Smartphone className="h-5 w-5 text-tribbe-lime" />
          </div>
          <div className="text-left">
            <div className="font-bold text-tribbe-lime">Connect M-Pesa</div>
            <div className="text-sm text-white font-normal">Link your M-Pesa for instant transfers</div>
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
            <CreditCard className="h-5 w-5 text-tribbe-lime" />
          </div>
          <div className="text-left">
            <div className="font-bold text-tribbe-lime">Connect Cards</div>
            <div className="text-sm text-white font-normal">Add your debit and credit cards</div>
          </div>
        </div>
      </Button>
    </div>
  );
}
