
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";
import { useState } from "react";

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
  setRecipientName
}: ToOthersFlowProps) {
  
  const [showToOthersSheet, setShowToOthersSheet] = useState(false);
  const [showAmountInput, setShowAmountInput] = useState(false);
  
  const handleToOthersClick = () => {
    setShowToOthersSheet(true);
  };
  
  const handleTapToSendClick = () => {
    setShowToOthersSheet(false);
    setTimeout(() => {
      setShowAmountInput(true);
    }, 300);
  };
  
  const handleSendClick = () => {
    setShowToOthersSheet(false);
    setTimeout(() => {
      setShowAmountInput(true);
    }, 300);
  };

  const handleAmountContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding"
      });
      return;
    }
    setShowAmountInput(false);
    setShowContacts(true);
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
  };

  const handleCancelSend = () => {
    setShowSendConfirmation(false);
  };

  return {
    showToOthersSheet,
    setShowToOthersSheet,
    showAmountInput,
    setShowAmountInput,
    handleToOthersClick,
    handleTapToSendClick,
    handleSendClick,
    handleAmountContinue,
    handleContactSelection,
    handleConfirmSend,
    handleCancelSend
  };
}
