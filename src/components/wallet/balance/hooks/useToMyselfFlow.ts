
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";

type ToMyselfFlowProps = {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  setShowPaymentMethods: (show: boolean) => void;
  setShowConfirmation: (show: boolean) => void;
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (method: string | null) => void;
};

export function useToMyselfFlow({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  setShowPaymentMethods,
  setShowConfirmation,
  selectedPaymentMethod,
  setSelectedPaymentMethod
}: ToMyselfFlowProps) {
  const [transferAmount, setTransferAmount] = useState("");
  
  // Handle initial click on "To myself" button
  const handleToMyselfClick = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding"
      });
      return;
    }
    
    // Save the transfer amount for the flow
    setTransferAmount(amount);
    
    // Show payment method sheet when "To myself" is clicked
    console.log("Opening payment method selection");
    setShowPaymentMethods(true);
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: string) => {
    console.log(`Selected payment method: ${method}`);
    setSelectedPaymentMethod(method);
    setShowPaymentMethods(false);
    
    // Use setTimeout to ensure smooth transition
    setTimeout(() => {
      console.log("Opening confirmation dialog");
      setShowConfirmation(true);
    }, 300);
  };

  // Handle completion of the transfer
  const handleConfirmationDone = () => {
    console.log("Confirmation done");
    setShowConfirmation(false);
    
    // Show toast and reset form
    toast({
      title: "Transfer complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been transferred to your ${selectedPaymentMethod === 'phone' ? 'phone' : 'card'}.`,
    });
    
    setAmount('');
    setSelectedPaymentMethod(null);
  };

  return {
    handleToMyselfClick,
    handlePaymentMethodSelect,
    handleConfirmationDone,
    transferAmount
  };
}
