
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { formatPhoneNumber, unformatPhoneNumber } from "./utils/phoneFormatter";

interface Contact {
  id: string;
  name: string;
  phone: string;
  image: string;
}

export interface ContactListHookProps {
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  onConfirm?: () => void;
  setShowContactList: (show: boolean) => void;
  amount?: string;
  currencySymbol?: string;
}

export function useContactList({
  selectedContacts,
  setSelectedContacts,
  onConfirm,
  setShowContactList,
  amount = "1,000",
  currencySymbol = "KSh"
}: ContactListHookProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPhoneEntry, setShowPhoneEntry] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [manualContactName, setManualContactName] = useState("");
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showTransferConfirmation, setShowTransferConfirmation] = useState(false);
  const [selectedContactDetails, setSelectedContactDetails] = useState<{name: string, phone: string} | null>(null);

  // Effect to reset transfer confirmation when success dialog is shown
  useEffect(() => {
    if (showSuccessDialog) {
      setShowTransferConfirmation(false);
    }
  }, [showSuccessDialog]);

  const contacts = [
    { id: "1", name: "Alice Smith", phone: "+254 712 345 678", image: "/lovable-uploads/a5a73b4a-8203-4833-8bd4-842288944144.png" },
    { id: "2", name: "Bob Johnson", phone: "+254 723 456 789", image: "/lovable-uploads/a66bb083-0a55-45b2-9fbb-b899fee07494.png" },
    { id: "3", name: "Carol Williams", phone: "+254 734 567 890", image: "/lovable-uploads/aa757ca5-a282-4eac-9369-b740b480634b.png" },
    { id: "4", name: "David Brown", phone: "+254 745 678 901", image: "/lovable-uploads/b145f32d-c53a-4dfd-bc4f-c501335741ab.png" },
    { id: "5", name: "Eva Davis", phone: "+254 756 789 012", image: "/lovable-uploads/bf878166-6407-457b-ac97-59a01d4a528b.png" },
    { id: "6", name: "Frank Miller", phone: "+254 767 890 123", image: "/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png" },
    { id: "7", name: "Grace Taylor", phone: "+254 778 901 234", image: "/lovable-uploads/c1c23c5c-90f5-4baa-a4b9-25ac8900c468.png" },
    { id: "8", name: "Henry Wilson", phone: "+254 789 012 345", image: "/lovable-uploads/c8a61242-9472-4c27-a50d-adbc2e7a24b0.png" }
  ];

  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const toggleContactSelection = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

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
      
      setShowTransferConfirmation(true);
    }
  };

  const handleConfirmTransfer = () => {
    setShowTransferConfirmation(false);
    setTimeout(() => {
      setShowPinEntry(true);
    }, 300);
  };

  const handleCancelTransfer = () => {
    setShowTransferConfirmation(false);
  };

  const handlePhoneNumberInput = (digit: string) => {
    // Format the phone number as digits are added
    const newRawValue = unformatPhoneNumber(phoneNumber) + digit;
    if (newRawValue.length <= 12) { // Limit to 12 digits
      setPhoneNumber(formatPhoneNumber(newRawValue));
    }
  };

  const handleDeleteDigit = () => {
    // Remove the last digit and reformat
    const rawValue = unformatPhoneNumber(phoneNumber);
    if (rawValue.length > 0) {
      const newRawValue = rawValue.slice(0, -1);
      setPhoneNumber(formatPhoneNumber(newRawValue));
    }
  };

  const handlePhoneNumberSubmit = () => {
    const rawPhoneNumber = unformatPhoneNumber(phoneNumber);
    if (rawPhoneNumber.length >= 9) { // Ensure at least 9 digits for a valid phone number
      setSelectedContactDetails({
        name: manualContactName || "Phone Contact",
        phone: phoneNumber // Use the formatted phone number for display
      });
      setShowTransferConfirmation(true);
    } else {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
    }
  };

  const handlePinDigitInput = (digit: string) => {
    if (pinCode.length < 4) {
      setPinCode(prev => prev + digit);
    }
  };

  const handlePinDeleteDigit = () => {
    setPinCode(prev => prev.slice(0, -1));
  };

  const handlePinSubmit = () => {
    if (pinCode.length === 4) {
      if (showPhoneEntry && unformatPhoneNumber(phoneNumber).length > 0) {
        const manualContactId = `manual-${Date.now()}`;
        setSelectedContacts([manualContactId]);
      }
      
      setShowPinEntry(false);
      setShowPhoneEntry(false);
      setPinCode("");
      // Make sure to clear the transfer confirmation state
      setShowTransferConfirmation(false);
      // Show success dialog after completing pin entry
      setShowSuccessDialog(true);
    }
  };

  const handleTransactionComplete = () => {
    // Reset all states to prevent dialogs from reappearing
    setShowSuccessDialog(false);
    setShowTransferConfirmation(false);
    setShowPinEntry(false);
    setShowPhoneEntry(false);
    setPinCode("");
    setPhoneNumber("");
    setManualContactName("");
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
  };

  return {
    // State
    contacts,
    filteredContacts,
    searchQuery,
    setSearchQuery,
    showPhoneEntry,
    setShowPhoneEntry,
    phoneNumber,
    setPhoneNumber,
    manualContactName,
    setManualContactName,
    showPinEntry,
    setShowPinEntry,
    pinCode,
    setPinCode,
    showSuccessDialog,
    setShowSuccessDialog,
    showTransferConfirmation,
    setShowTransferConfirmation,
    selectedContactDetails,
    amount,
    currencySymbol,
    
    // Handlers
    toggleContactSelection,
    handleContinueToConfirmation,
    handleConfirmTransfer,
    handleCancelTransfer,
    handlePhoneNumberInput,
    handleDeleteDigit,
    handlePhoneNumberSubmit,
    handlePinDigitInput,
    handlePinDeleteDigit,
    handlePinSubmit,
    handleTransactionComplete
  };
}
