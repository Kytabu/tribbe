
import { User } from "lucide-react";
import { ConfirmationDialog } from "./ConfirmationDialog";

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
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Transfer"
      description="Confirm money transfer details"
      primaryActionLabel="Confirm"
      secondaryActionLabel="Cancel"
      onPrimaryAction={onConfirm}
      onSecondaryAction={onCancel}
      content={
        <>
          <div className="flex items-center space-x-4 w-full mb-4">
            <div className="w-12 h-12 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
              <User className="w-6 h-6 text-tribbe-lime" />
            </div>
            <div>
              <h3 className="font-medium">{recipientName}</h3>
              <p className="text-sm text-muted-foreground">Recipient</p>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-background border w-full">
            <p className="text-sm text-muted-foreground">Amount</p>
            <p className="text-2xl font-bold">{currencySymbol}{amount}</p>
          </div>
        </>
      }
    />
  );
}
