
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

  return {
    handleToMyselfClick
  };
}
