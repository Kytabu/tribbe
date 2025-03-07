
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
  setShowToMyselfConfirmation: (show: boolean) => void;
  setSelectedPaymentMethod: (method: string | null) => void;
};

export function useToMyselfFlow({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  setShowToMyselfSheet,
  setShowToMyselfPaymentMethods,
  setShowToMyselfConfirmation,
  setSelectedPaymentMethod
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
    
    // Save the selected payment method
    setSelectedPaymentMethod(method);
    
    // Show confirmation dialog
    setTimeout(() => {
      setShowToMyselfConfirmation(true);
    }, 300);
  };
  
  // Handle confirmation dialog done button
  const handleConfirmationDone = () => {
    // Close the confirmation dialog
    setShowToMyselfConfirmation(false);
    
    // Show success message
    toast({
      title: "Transfer Complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been sent successfully`,
    });
    
    // Reset amount and selected payment method
    setAmount("");
    setSelectedPaymentMethod(null);
  };

  return {
    handleToMyselfClick,
    handleSend,
    handlePaymentMethodSelect,
    handleConfirmationDone
  };
}
