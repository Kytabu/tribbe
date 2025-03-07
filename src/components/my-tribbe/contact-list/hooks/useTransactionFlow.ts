
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { unformatPhoneNumber } from "../utils/phoneFormatter";

interface Contact {
  id: string;
  name: string;
  phone: string;
  image: string;
}

interface TransactionFlowProps {
  contacts: Contact[];
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  phoneNumber: string;
  manualContactName: string;
  setPinCode: (code: string) => void;
  setShowPhoneEntry: (show: boolean) => void;
  showPhoneEntry: boolean;
  setShowPinEntry: (show: boolean) => void;
  onConfirm?: () => void;
  setShowContactList: (show: boolean) => void;
}

export function useTransactionFlow({
  contacts,
  selectedContacts,
  setSelectedContacts,
  phoneNumber,
  manualContactName,
  setPinCode,
  setShowPhoneEntry,
  showPhoneEntry,
  setShowPinEntry,
  onConfirm,
  setShowContactList
}: TransactionFlowProps) {
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedContactDetails, setSelectedContactDetails] = useState<{name: string, phone: string} | null>(null);
  const [isTransactionCompleting, setIsTransactionCompleting] = useState(false);

  useEffect(() => {
    if (showSuccessDialog) {
      setShowSendConfirmation(false);
    }
  }, [showSuccessDialog]);

  const handleContinueToConfirmation = () => {
    if (selectedContacts.length > 0) {
      const selectedContact = contacts.find(contact => contact.id === selectedContacts[0]);
      if (selectedContact) {
        setSelectedContactDetails({
          name: selectedContact.name,
          phone: selectedContact.phone
        });
      } else if (phoneNumber) {
        setSelectedContactDetails({
          name: manualContactName || "Phone Contact",
          phone: phoneNumber
        });
      }
      
      setShowSendConfirmation(true);
    }
  };

  const handleConfirmTransfer = () => {
    setShowSendConfirmation(false);
    setTimeout(() => {
      setShowPinEntry(true);
    }, 300);
  };

  const handleCancelTransfer = () => {
    setShowSendConfirmation(false);
  };

  const handlePhoneNumberSubmit = () => {
    const rawPhoneNumber = unformatPhoneNumber(phoneNumber);
    if (rawPhoneNumber.length >= 9) {
      setSelectedContactDetails({
        name: manualContactName || "Phone Contact",
        phone: phoneNumber
      });
      setShowSendConfirmation(true);
    } else {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
    }
  };

  const handlePinSubmit = () => {
    setIsTransactionCompleting(true);
    
    if (showPhoneEntry && unformatPhoneNumber(phoneNumber).length > 0) {
      const manualContactId = `manual-${Date.now()}`;
      setSelectedContacts([manualContactId]);
    }
    
    setShowPinEntry(false);
    setShowPhoneEntry(false);
    setPinCode("");
    setShowSendConfirmation(false);
    
    // Small delay to ensure transitions are smooth
    setTimeout(() => {
      setShowSuccessDialog(true);
      setIsTransactionCompleting(false);
    }, 200);
  };

  const handleTransactionComplete = () => {
    // Use a small delay before closing everything to prevent flashing
    setTimeout(() => {
      setShowSuccessDialog(false);
      
      // Reset all states
      setTimeout(() => {
        setShowSendConfirmation(false);
        setShowPinEntry(false);
        setShowPhoneEntry(false);
        setPinCode("");
        setSelectedContactDetails(null);
        setSelectedContacts([]);
        
        toast({
          title: "Transaction complete",
          description: "Your money has been sent successfully",
        });
        
        if (onConfirm) {
          onConfirm();
        } else {
          setShowContactList(false);
        }
      }, 100);
    }, 100);
  };

  return {
    showSendConfirmation,
    setShowSendConfirmation,
    showSuccessDialog,
    setShowSuccessDialog,
    selectedContactDetails,
    isTransactionCompleting,
    handleContinueToConfirmation,
    handleConfirmTransfer,
    handleCancelTransfer,
    handlePhoneNumberSubmit,
    handlePinSubmit,
    handleTransactionComplete
  };
}
