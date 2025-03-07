
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";

interface ToOthersActionsProps {
  amount: string;
  setShowToOthersSheet: (show: boolean) => void;
  setShowSendActionDialog: (show: boolean) => void;
  setShowContacts: (show: boolean) => void;
}

export function useToOthersActions({
  amount,
  setShowToOthersSheet,
  setShowSendActionDialog,
  setShowContacts
}: ToOthersActionsProps) {
  
  const handleToOthersClick = () => {
    // Changed to directly show the contacts list instead of the sheet
    setShowContacts(true);
  };

  const handleToOthersSheetConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding"
      });
      return;
    }
    setShowToOthersSheet(false);
    
    // Open the action selection dialog instead of contacts directly
    setTimeout(() => {
      setShowSendActionDialog(true);
    }, 300);
  };

  const handleOpenContacts = () => {
    setShowSendActionDialog(false);
    
    // Open contacts sheet
    setTimeout(() => {
      setShowContacts(true);
    }, 300);
  };

  return {
    handleToOthersClick,
    handleToOthersSheetConfirm,
    handleOpenContacts
  };
}
