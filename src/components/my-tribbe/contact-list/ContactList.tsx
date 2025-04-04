
import { useState } from "react";
import { ContactListView } from "./ContactListView";
import { PhoneEntryView } from "./PhoneEntryView";
import { PinEntryView } from "./PinEntryView";
import { SuccessDialog } from "./SuccessDialog";
import { SendConfirmationDialog } from "../../wallet/balance/components/SendConfirmationDialog";
import { useContactList } from "./hooks/useContactList";

interface ContactListProps {
  showContactList: boolean;
  setShowContactList: (show: boolean) => void;
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  onConfirm?: () => void;
  amount?: string;
  currencySymbol?: string;
}

export function ContactList({
  showContactList,
  setShowContactList,
  selectedContacts,
  setSelectedContacts,
  onConfirm,
  amount,
  currencySymbol
}: ContactListProps) {
  const {
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
    showSendConfirmation,
    setShowSendConfirmation,
    selectedContactDetails,
    isCleaningUp,
    
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
  } = useContactList({
    selectedContacts,
    setSelectedContacts,
    onConfirm,
    setShowContactList,
    amount,
    currencySymbol
  });

  // If we're in the cleanup phase or not showing the contact list, don't render anything
  if (isCleaningUp || !showContactList) return null;

  if (showPhoneEntry) {
    return (
      <PhoneEntryView
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        manualContactName={manualContactName}
        setManualContactName={setManualContactName}
        onBackClick={() => setShowPhoneEntry(false)}
        onContinueClick={handlePhoneNumberSubmit}
        onDigitClick={handlePhoneNumberInput}
        onDeleteClick={handleDeleteDigit}
      />
    );
  }

  if (showPinEntry) {
    return (
      <PinEntryView
        pinCode={pinCode}
        onDigitClick={handlePinDigitInput}
        onDeleteClick={handlePinDeleteDigit}
        onSubmit={handlePinSubmit}
      />
    );
  }

  return (
    <>
      <ContactListView
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredContacts={filteredContacts}
        selectedContacts={selectedContacts}
        toggleContactSelection={toggleContactSelection}
        onAddPhoneClick={() => setShowPhoneEntry(true)}
        onContinueClick={handleContinueToConfirmation}
        onClose={() => setShowContactList(false)}
      />
      
      {/* Send Confirmation Dialog */}
      <SendConfirmationDialog
        open={showSendConfirmation}
        onOpenChange={setShowSendConfirmation}
        recipientName={selectedContactDetails?.name || ""}
        amount={amount || "0"}
        setAmount={(value) => {
          // This is a pass-through since the ContactList doesn't control the amount directly
          // The parent component is responsible for updating the amount
        }}
        currencySymbol={currencySymbol || "KSh"}
        onCancel={handleCancelTransfer}
        onConfirm={handleConfirmTransfer}
      />
      
      {/* Success Dialog */}
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onDone={handleTransactionComplete}
      />
    </>
  );
}
