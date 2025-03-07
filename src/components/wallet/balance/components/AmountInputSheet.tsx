
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AmountInput } from "./AmountInput";
import { SupportedCurrency } from "@/features/wallet/constants";

interface AmountInputSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  setAmount: (amount: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbol: string;
  onContinue: () => void;
}

export function AmountInputSheet({
  open,
  onOpenChange,
  amount,
  setAmount,
  selectedCurrency,
  currencySymbol,
  onContinue
}: AmountInputSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle>Enter Amount</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            How much would you like to send?
          </p>
          
          <AmountInput
            amount={amount}
            setAmount={setAmount}
            selectedCurrency={selectedCurrency}
            currencySymbol={currencySymbol}
          />

          <Button 
            className="w-full" 
            variant="default"
            onClick={onContinue}
            disabled={!amount || amount === '0'}
          >
            Continue
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
