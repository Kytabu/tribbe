
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface SendConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string;
  amount: string;
  currencySymbol: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SendConfirmationDialog({
  open,
  onOpenChange,
  recipientName,
  amount,
  currencySymbol,
  onCancel,
  onConfirm
}: SendConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Transfer</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
              <User className="w-6 h-6 text-tribbe-lime" />
            </div>
            <div>
              <h3 className="font-medium">{recipientName}</h3>
              <p className="text-sm text-muted-foreground">Recipient</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-background border">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-2xl font-bold">{currencySymbol}{amount}</p>
          </div>
        </div>
        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            className="flex-1 sm:flex-none"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
