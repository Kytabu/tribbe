
import { useContactSearch } from "./useContactSearch";
import { useContactSelection } from "./useContactSelection";
import { usePhoneEntry } from "./usePhoneEntry";
import { usePinEntry } from "./usePinEntry";
import { useTransactionFlow } from "./useTransactionFlow";

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
  // Compose all smaller hooks
  const { contacts, filteredContacts, searchQuery, setSearchQuery } = useContactSearch();
  
  const { toggleContactSelection } = useContactSelection(selectedContacts, setSelectedContacts);
  
  const {
    phoneNumber,
    setPhoneNumber,
    manualContactName,
    setManualContactName,
    showPhoneEntry,
    setShowPhoneEntry,
    handlePhoneNumberInput,
    handleDeleteDigit,
    validatePhoneNumber
  } = usePhoneEntry();
  
  const {
    showPinEntry,
    setShowPinEntry,
    pinCode,
    setPinCode,
    handlePinDigitInput,
    handlePinDeleteDigit
  } = usePinEntry();
  
  const {
    showSendConfirmation,
    setShowSendConfirmation,
    showSuccessDialog,
    setShowSuccessDialog,
    selectedContactDetails,
    isTransactionCompleting,
    isCleaningUp,
    handleContinueToConfirmation,
    handleConfirmTransfer,
    handleCancelTransfer,
    handlePhoneNumberSubmit,
    handlePinSubmit,
    handleTransactionComplete
  } = useTransactionFlow({
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
  });

  return {
    // State from all hooks
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
    showSendConfirmation,
    setShowSendConfirmation,
    selectedContactDetails,
    isTransactionCompleting,
    isCleaningUp,
    
    // Actions from all hooks
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
