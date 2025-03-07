
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";

type ToMyselfFlowProps = {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  setShowToMyselfSheet: (show: boolean) => void;
};

export function useToMyselfFlow({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  setShowToMyselfSheet
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
    
    // For now, just close the sheet and show a success message
    toast({
      title: "Money sent!",
      description: `${currencySymbols[selectedCurrency]}${amount} has been sent to your account`,
    });
    
    // Close the sheet
    setShowToMyselfSheet(false);
    
    // Reset amount
    setAmount("");
  };

  return {
    handleToMyselfClick,
    handleSend
  };
}
