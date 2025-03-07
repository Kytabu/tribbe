import { SendActionButtons } from "./SendActionButtons";
import { PaymentMethodSheet } from "./PaymentMethodSheet";
import { TransferConfirmationDialog } from "./TransferConfirmationDialog";
import { ContactList } from "@/components/my-tribbe/ContactList";
import { SendConfirmationDialog } from "./SendConfirmationDialog";
import { RequestsSheet } from "./RequestsSheet";
import { SupportedCurrency } from "@/features/wallet/constants";
import { MoneyRequest } from "../types";

interface SendActionsProps {
  // UI state
  showPaymentMethods: boolean;
  setShowPaymentMethods: (show: boolean) => void;
  showConfirmation: boolean;
  setShowConfirmation: (show: boolean) => void;
  showContacts: boolean;
  setShowContacts: (show: boolean) => void;
  showSendConfirmation: boolean;
  setShowSendConfirmation: (show: boolean) => void;
  showRequests: boolean;
  setShowRequests: (show: boolean) => void;
  
  // Data state
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  selectedPaymentMethod: string | null;
  recipientName: string;
  
  // Action handlers
  handleToMyselfClick: () => void;
  handleToOthersClick: () => void;
  handlePaymentMethodSelect: (method: string) => void;
  handleConfirmationDone: () => void;
  handleContactSelection: () => void;
  handleCancelSend: () => void;
  handleConfirmSend: () => void;
  
  // Other props
  autoTribbe: boolean;
  setAutoTribbe: (value: boolean) => void;
  amount: string;
  currencySymbol: string;
  filteredRequests: MoneyRequest[];
  slidingRequests: {[key: number]: 'left' | 'right'};
  handleAction: (id: number, direction: 'left' | 'right') => void;
}

export function SendActions({
  // UI state
  showPaymentMethods,
  setShowPaymentMethods,
  showConfirmation,
  setShowConfirmation,
  showContacts,
  setShowContacts,
  showSendConfirmation,
  setShowSendConfirmation,
  showRequests,
  setShowRequests,
  
  // Data state
  selectedContacts,
  setSelectedContacts,
  selectedPaymentMethod,
  recipientName,
  
  // Action handlers
  handleToMyselfClick,
  handleToOthersClick,
  handlePaymentMethodSelect,
  handleConfirmationDone,
  handleContactSelection,
  handleCancelSend,
  handleConfirmSend,
  
  // Other props
  autoTribbe,
  setAutoTribbe,
  amount,
  currencySymbol,
  filteredRequests,
  slidingRequests,
  handleAction
}: SendActionsProps) {
  return (
    <>
      <SendActionButtons
        autoTribbe={autoTribbe}
        setAutoTribbe={setAutoTribbe}
        onToMyselfClick={handleToMyselfClick}
        onToOthersClick={handleToOthersClick}
        onRequestsClick={() => setShowRequests(true)}
      />

      {/* Payment Methods Sheet */}
      <PaymentMethodSheet
        open={showPaymentMethods}
        onOpenChange={setShowPaymentMethods}
        onMethodSelect={handlePaymentMethodSelect}
      />

      {/* Confirmation Dialog for Self Transfer */}
      <TransferConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        amount={amount}
        currencySymbol={currencySymbol}
        selectedPaymentMethod={selectedPaymentMethod}
        onDone={handleConfirmationDone}
      />

      {/* Contact List for selecting recipients */}
      <ContactList
        showContactList={showContacts}
        setShowContactList={setShowContacts}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        onConfirm={handleContactSelection}
      />

      {/* Confirmation Dialog for Sending to Others */}
      <SendConfirmationDialog
        open={showSendConfirmation}
        onOpenChange={setShowSendConfirmation}
        recipientName={recipientName}
        amount={amount}
        currencySymbol={currencySymbol}
        onCancel={handleCancelSend}
        onConfirm={handleConfirmSend}
      />

      {/* Money Requests Sheet */}
      <RequestsSheet
        open={showRequests}
        onOpenChange={setShowRequests}
        requests={filteredRequests}
        onAction={handleAction}
        slidingRequests={slidingRequests}
        currencySymbol={currencySymbol}
      />
    </>
  );
}
