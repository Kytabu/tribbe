
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";

type ToMyselfFlowProps = {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  setShowToMyselfSheet: (show: boolean) => void;
  setShowToMyselfPaymentMethods: (show: boolean) => void;
};

export function useToMyselfFlow({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  setShowToMyselfSheet,
  setShowToMyselfPaymentMethods
}: ToMyselfFlowProps) {
  
  // Handle initial click on "To myself" button
  const handleToMyselfClick = () => {
    // Show the "To myself" sheet
    console.log("Opening 'To myself' sheet");
    setShowToMyselfSheet(true);
  };

  // Handle send button click
  const handleSend = () => {
    console.log("Sending to myself: ", amount, selectedCurrency);
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to send",
        variant: "destructive"
      });
      return;
    }
    
    // Close the amount input sheet
    setShowToMyselfSheet(false);
    
    // Show the payment method selection sheet
    setTimeout(() => {
      setShowToMyselfPaymentMethods(true);
    }, 300);
  };
  
  // Handle payment method selection
  const handlePaymentMethodSelect = (method: string) => {
    console.log("Selected payment method:", method);
    
    // Close the payment method sheet
    setShowToMyselfPaymentMethods(false);
    
    // Show success message
    toast({
      title: "Money sent!",
      description: `${currencySymbols[selectedCurrency]}${amount} has been sent to your ${method === 'phone' ? 'phone' : 'card'}`,
    });
    
    // Reset amount
    setAmount("");
  };

  return {
    handleToMyselfClick,
    handleSend,
    handlePaymentMethodSelect
  };
}
