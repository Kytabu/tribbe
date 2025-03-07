
import { User } from "lucide-react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface SendConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientName: string;
  amount: string;
  setAmount: (amount: string) => void;
  currencySymbol: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SendConfirmationDialog({
  open,
  onOpenChange,
  recipientName,
  amount,
  setAmount,
  currencySymbol,
  onCancel,
  onConfirm
}: SendConfirmationDialogProps) {
  const [localAmount, setLocalAmount] = useState(amount);

  // Update local amount when the amount prop changes or dialog opens
  useEffect(() => {
    if (open) {
      setLocalAmount(amount);
    }
  }, [amount, open]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setLocalAmount(value);
    setAmount(value);
  };

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
        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="flex items-center justify-center space-x-4 w-full mb-4">
            <div className="w-12 h-12 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
              <User className="w-6 h-6 text-tribbe-lime" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">{recipientName}</h3>
              <p className="text-sm text-muted-foreground">Recipient</p>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-background border w-full">
            <div className="flex flex-col items-center space-y-2">
              <Label htmlFor="transfer-amount" className="text-sm text-muted-foreground">Amount</Label>
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold">
                  {currencySymbol}
                </span>
                <Input
                  id="transfer-amount"
                  type="text"
                  inputMode="numeric"
                  value={localAmount}
                  onChange={handleAmountChange}
                  className="pl-8 text-xl font-bold text-center"
                />
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
