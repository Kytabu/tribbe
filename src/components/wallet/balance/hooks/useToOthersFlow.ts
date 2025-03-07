
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";

type ToOthersFlowProps = {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  setShowContacts: (show: boolean) => void;
  setShowSendConfirmation: (show: boolean) => void;
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  setShowToOthersSheet: (show: boolean) => void;
  setShowSendActionDialog: (show: boolean) => void;
  setShowQRScanner: (show: boolean) => void;
  scannedQRData: string | null;
  setScannedQRData: (data: string | null) => void;
};

export function useToOthersFlow({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  setShowContacts,
  setShowSendConfirmation,
  selectedContacts,
  setSelectedContacts,
  recipientName,
  setRecipientName,
  setShowToOthersSheet,
  setShowSendActionDialog,
  setShowQRScanner,
  scannedQRData,
  setScannedQRData
}: ToOthersFlowProps) {
  
  const handleToOthersClick = () => {
    // Instead of validating amount here, just show the sheet
    setShowToOthersSheet(true);
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

  const handleTapToSend = () => {
    setShowSendActionDialog(false);
    
    // Open QR scanner dialog
    setTimeout(() => {
      setShowQRScanner(true);
    }, 300);
  };

  const handleQRScanComplete = (data: string) => {
    console.log("QR code scanned:", data);
    setScannedQRData(data);
    setShowQRScanner(false);
    
    // Parse QR data (example format: "userID:amount:currency")
    try {
      const [userId, qrAmount, qrCurrency] = data.split(":");
      // Set recipient based on scanned data
      setRecipientName("QR Recipient");
      
      // Show send confirmation dialog
      setTimeout(() => {
        setShowSendConfirmation(true);
      }, 300);
    } catch (error) {
      console.error("Error parsing QR data:", error);
      toast({
        title: "Invalid QR Code",
        description: "The scanned QR code is not in the expected format",
        variant: "destructive",
      });
      
      // Show send action dialog again after error
      setTimeout(() => {
        setShowSendActionDialog(true);
      }, 300);
    }
  };

  const handleOpenContacts = () => {
    setShowSendActionDialog(false);
    
    // Open contacts sheet
    setTimeout(() => {
      setShowContacts(true);
    }, 300);
  };

  const handleContactSelection = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No contact selected",
        description: "Please select at least one contact to send money",
        variant: "destructive",
      });
      return;
    }
    
    const contacts = [
      { id: "1", name: "Alice Smith" },
      { id: "2", name: "Bob Johnson" },
      { id: "3", name: "Carol Williams" },
      { id: "4", name: "David Brown" },
      { id: "5", name: "Eva Davis" },
      { id: "6", name: "Frank Miller" },
      { id: "7", name: "Grace Taylor" },
      { id: "8", name: "Henry Wilson" }
    ];
    
    const selectedContact = contacts.find(contact => contact.id === selectedContacts[0]);
    if (selectedContact) {
      setRecipientName(selectedContact.name);
      setShowContacts(false);
      
      // Use setTimeout to ensure smooth transition
      setTimeout(() => {
        setShowSendConfirmation(true);
      }, 300);
    } else {
      toast({
        title: "Contact not found",
        description: "Selected contact could not be found",
        variant: "destructive",
      });
    }
  };

  const handleConfirmSend = () => {
    setShowSendConfirmation(false);
    
    // Show toast notification
    toast({
      title: "Transaction complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been sent to ${recipientName}`,
    });
    
    // Reset form
    setAmount('');
    setSelectedContacts([]);
    setRecipientName('');
    setScannedQRData(null);
  };

  const handleCancelSend = () => {
    setShowSendConfirmation(false);
  };

  return {
    handleToOthersClick,
    handleToOthersSheetConfirm,
    handleTapToSend,
    handleOpenContacts,
    handleContactSelection,
    handleConfirmSend,
    handleCancelSend,
    handleQRScanComplete
  };
}
