
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Phone } from "lucide-react";
import { useState } from "react";

import { useContactList, ContactListHookProps } from "./useContactList";
import { ContactListView } from "./ContactListView";
import { PhoneEntryView } from "./PhoneEntryView";
import { PinEntryView } from "./PinEntryView";
import { TransferConfirmationDialog } from "./TransferConfirmationDialog";
import { SuccessDialog } from "./SuccessDialog";

interface ContactListProps extends ContactListHookProps {
  showContactList: boolean;
}

export function ContactList({ 
  showContactList, 
  setShowContactList, 
  selectedContacts, 
  setSelectedContacts,
  onConfirm 
}: ContactListProps) {
  const {
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
    showSuccessDialog,
    setShowSuccessDialog,
    showTransferConfirmation,
    setShowTransferConfirmation,
    selectedContactDetails,
    
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
    setShowContactList
  });

  return (
    <>
      <Sheet open={showContactList} onOpenChange={setShowContactList}>
        <SheetContent className="w-full sm:max-w-md p-0">
          {showPinEntry ? (
            <PinEntryView
              pinCode={pinCode}
              onBackClick={() => setShowPinEntry(false)}
              onDigitClick={handlePinDigitInput}
              onDeleteClick={handlePinDeleteDigit}
              onConfirmClick={handlePinSubmit}
            />
          ) : showPhoneEntry ? (
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
          ) : (
            <ContactListView
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredContacts={filteredContacts}
              selectedContacts={selectedContacts}
              toggleContactSelection={toggleContactSelection}
              onCloseClick={() => setShowContactList(false)}
              onEnterPhoneClick={() => setShowPhoneEntry(true)}
              onContinueClick={handleContinueToConfirmation}
            />
          )}
        </SheetContent>
      </Sheet>
      
      <TransferConfirmationDialog
        open={showTransferConfirmation}
        onOpenChange={setShowTransferConfirmation}
        contactDetails={selectedContactDetails}
        onConfirm={handleConfirmTransfer}
        onCancel={handleCancelTransfer}
      />
      
      <SuccessDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        onDone={handleTransactionComplete}
      />
    </>
  );
}
