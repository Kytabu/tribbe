
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
  
  const handleToMyselfClick = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding"
      });
      return;
    }
    
    console.log("Opening payment method selection");
    // Show payment method sheet when "To myself" is clicked
    setShowPaymentMethods(true);
  };

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
    handleConfirmationDone
  };
}
