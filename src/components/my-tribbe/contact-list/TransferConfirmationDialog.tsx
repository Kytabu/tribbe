
import { User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ContactDetails {
  name: string;
  phone: string;
}

interface TransferConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactDetails: ContactDetails | null;
  amount?: string;
  currencySymbol?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function TransferConfirmationDialog({
  open,
  onOpenChange,
  contactDetails,
  amount = "1,000",
  currencySymbol = "KSh",
  onConfirm,
  onCancel
}: TransferConfirmationDialogProps) {
  if (!contactDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-4">
          <h2 className="text-xl font-bold mb-4">Confirm Transfer</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Confirm money transfer details
          </p>
          
          <div className="flex items-center space-x-4 w-full mb-4">
            <div className="w-12 h-12 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
              <User className="w-6 h-6 text-tribbe-lime" />
            </div>
            <div>
              <h3 className="font-medium">{contactDetails.name}</h3>
              <p className="text-sm text-muted-foreground">Recipient</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-background border w-full mb-6">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-2xl font-bold">{currencySymbol} {amount}</p>
          </div>
          
          <div className="w-full flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={onConfirm}
              className="w-full sm:w-auto"
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
