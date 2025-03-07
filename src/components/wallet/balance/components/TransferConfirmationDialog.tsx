
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface TransferConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  currencySymbol: string;
  selectedPaymentMethod: string | null;
  onDone: () => void;
}

export function TransferConfirmationDialog({
  open,
  onOpenChange,
  amount,
  currencySymbol,
  selectedPaymentMethod,
  onDone
}: TransferConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer Complete</DialogTitle>
          <DialogDescription className="sr-only">
            Transfer confirmation details
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-center text-muted-foreground mb-4">
            {currencySymbol}{amount} has been transferred to your {selectedPaymentMethod === 'phone' ? 'phone' : 'card'}.
          </p>
          <Button 
            onClick={onDone}
            className="w-full"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
