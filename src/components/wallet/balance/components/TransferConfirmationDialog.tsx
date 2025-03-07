
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
      icon={<ThumbsUp className="w-8 h-8 text-green-500" />}
      primaryActionLabel="Done"
      onPrimaryAction={onDone}
      content={
        <>
          <p className="text-center text-lg font-medium mb-2">
            Sent you cash
          </p>
          <p className="text-center text-muted-foreground mb-4">
            {currencySymbol}{amount} has been transferred to your {destination}.
          </p>
        </>
      }
    />
  );
}
