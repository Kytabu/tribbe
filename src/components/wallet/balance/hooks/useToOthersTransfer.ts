
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";

interface ToOthersTransferProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  recipientName: string;
  setRecipientName: (name: string) => void;
  setShowSendConfirmation: (show: boolean) => void;
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  setShowContacts: (show: boolean) => void;
  setScannedQRData: (data: string | null) => void;
}

export function useToOthersTransfer({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  recipientName,
  setRecipientName,
  setShowSendConfirmation,
  selectedContacts,
  setSelectedContacts,
  setShowContacts,
  setScannedQRData
}: ToOthersTransferProps) {
  
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
    
    // Check if this is a manual contact (entered via phone)
    const isManualContact = selectedContacts[0].startsWith('manual-');
    
    if (isManualContact) {
      // For manual contacts, we can extract the phone number from the ID or use a generic name
      setRecipientName(recipientName || "Phone Contact");
    } else {
      // For existing contacts, look up their name
      const selectedContact = contacts.find(contact => contact.id === selectedContacts[0]);
      if (selectedContact) {
        setRecipientName(selectedContact.name);
      } else {
        setRecipientName("Contact");
      }
    }
    
    setShowContacts(false);
    
    // Use setTimeout to ensure smooth transition
    setTimeout(() => {
      setShowSendConfirmation(true);
    }, 300);
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
    handleContactSelection,
    handleConfirmSend,
    handleCancelSend
  };
}
