
import { useState } from "react";
import { ContactListView } from "./ContactListView";
import { PhoneEntryView } from "./PhoneEntryView";
import { PinEntryView } from "./PinEntryView";
import { SuccessDialog } from "./SuccessDialog";
import { TransferConfirmationDialog } from "./TransferConfirmationDialog";
import { useContactList } from "./useContactList";

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
    showTransferConfirmation,
    setShowTransferConfirmation,
    selectedContactDetails,
    
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

  if (!showContactList) return null;

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
        contacts={filteredContacts}
        selectedContacts={selectedContacts}
        toggleContactSelection={toggleContactSelection}
        onAddPhoneClick={() => setShowPhoneEntry(true)}
        onContinueClick={handleContinueToConfirmation}
        onClose={() => setShowContactList(false)}
      />
      
      {/* Transfer Confirmation Dialog */}
      <TransferConfirmationDialog
        open={showTransferConfirmation}
        onOpenChange={setShowTransferConfirmation}
        contactDetails={selectedContactDetails}
        amount={amount}
        currencySymbol={currencySymbol}
        onConfirm={handleConfirmTransfer}
        onCancel={handleCancelTransfer}
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
