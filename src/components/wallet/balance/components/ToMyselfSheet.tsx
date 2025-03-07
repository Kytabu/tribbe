
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AmountInput } from "./AmountInput";
import { SupportedCurrency } from "@/features/wallet/constants";

interface ToMyselfSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  setAmount: (amount: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbol: string;
}

export function ToMyselfSheet({
  open,
  onOpenChange,
  amount,
  setAmount,
  selectedCurrency,
  currencySymbol
}: ToMyselfSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle>Send to myself</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Enter the amount you want to send to yourself
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
          >
            Send
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
