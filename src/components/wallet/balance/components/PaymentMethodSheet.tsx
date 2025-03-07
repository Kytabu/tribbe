
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Smartphone, CreditCard } from "lucide-react";
import { PaymentMethodButton } from "./PaymentMethodButton";
import { Button } from "@/components/ui/button";

interface PaymentMethodSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMethodSelect: (method: string) => void;
}

export function PaymentMethodSheet({ 
  open, 
  onOpenChange, 
  onMethodSelect 
}: PaymentMethodSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Select Payment Method</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <PaymentMethodButton 
            icon={<Smartphone className="w-5 h-5 text-tribbe-lime" />} 
            label="My Phone" 
            info="+254 712****45"
            onClick={() => onMethodSelect('phone')}
          />
          <PaymentMethodButton 
            icon={<CreditCard className="w-5 h-5 text-tribbe-lime" />} 
            label="My Card" 
            info="•••• 4832"
            onClick={() => onMethodSelect('card')}
          />
          <div className="pt-4">
            <Button 
              onClick={() => onOpenChange(false)} 
              variant="outline" 
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
