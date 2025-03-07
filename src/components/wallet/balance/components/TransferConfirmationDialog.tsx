
import { ThumbsUp } from "lucide-react";
import { ConfirmationDialog } from "./ConfirmationDialog";

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
  const destination = selectedPaymentMethod === 'phone' ? 'phone' : 'card';
  
  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Transfer Complete"
      icon={<ThumbsUp className="w-6 h-6 text-tribbe-lime" />}
      iconBackground="bg-muted"
      primaryActionLabel="Done"
      onPrimaryAction={onDone}
      content={
        <div className="w-full px-2">
          <p className="text-center text-base font-medium mb-1">
            Sent you cash
          </p>
          <p className="text-center text-sm text-muted-foreground">
            {currencySymbol}{amount} has been transferred to your {destination}.
          </p>
        </div>
      }
    />
  );
}
