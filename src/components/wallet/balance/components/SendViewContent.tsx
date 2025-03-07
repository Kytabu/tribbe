
import { SendViewProps } from "../types";
import { AmountInput } from "./AmountInput";
import { useSendViewUI } from "../hooks/useSendViewUI";
import { useMoneyRequests } from "../hooks/useMoneyRequests";
import { useToMyselfFlow } from "../hooks/useToMyselfFlow";
import { useToOthersFlow } from "../hooks/useToOthersFlow";
import { SendActions } from "./SendActions";

export function SendViewContent({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  autoTribbe,
  setAutoTribbe,
}: SendViewProps) {
  // Get UI state from custom hook
  const ui = useSendViewUI(amount);
  
  // Hook for managing money requests with loading and error states
  const { 
    filteredRequests, 
    slidingRequests, 
    handleAction, 
    isLoading, 
    error, 
    retryFetchRequests,
    isEmpty
  } = useMoneyRequests();

  // "To myself" flow handlers
  const toMyselfFlow = useToMyselfFlow({
    amount,
    setAmount,
    selectedCurrency,
    currencySymbols,
    setShowToMyselfSheet: ui.setShowToMyselfSheet,
    setShowToMyselfPaymentMethods: ui.setShowToMyselfPaymentMethods,
    setShowToMyselfConfirmation: ui.setShowToMyselfConfirmation,
    setSelectedPaymentMethod: ui.setSelectedPaymentMethod
  });

  // "To others" flow handlers
  const toOthersFlow = useToOthersFlow({
    amount,
    setAmount,
    selectedCurrency,
    currencySymbols,
    setShowContacts: ui.setShowContacts,
    setShowSendConfirmation: ui.setShowSendConfirmation,
    selectedContacts: ui.selectedContacts,
    setSelectedContacts: ui.setSelectedContacts,
    recipientName: ui.recipientName,
    setRecipientName: ui.setRecipientName,
    setShowToOthersSheet: ui.setShowToOthersSheet,
    setShowSendActionDialog: ui.setShowSendActionDialog,
    setShowQRScanner: ui.setShowQRScanner,
    scannedQRData: ui.scannedQRData,
    setScannedQRData: ui.setScannedQRData
  });

  return (
    <div className="space-y-4 animate-fade-in">
      <AmountInput
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbols[selectedCurrency]}
      />

      <SendActions
        // UI state
        showPaymentMethods={ui.showPaymentMethods}
        setShowPaymentMethods={ui.setShowPaymentMethods}
        showConfirmation={ui.showConfirmation}
        setShowConfirmation={ui.setShowConfirmation}
        showContacts={ui.showContacts}
        setShowContacts={ui.setShowContacts}
        showSendConfirmation={ui.showSendConfirmation}
        setShowSendConfirmation={ui.setShowSendConfirmation}
        showRequests={ui.showRequests}
        setShowRequests={ui.setShowRequests}
        
        // Data state
        selectedContacts={ui.selectedContacts}
        setSelectedContacts={ui.setSelectedContacts}
        selectedPaymentMethod={ui.selectedPaymentMethod}
        recipientName={ui.recipientName}
        
        // Action handlers
        handleToMyselfClick={toMyselfFlow.handleToMyselfClick}
        handleToOthersClick={toOthersFlow.handleToOthersClick}
        handlePaymentMethodSelect={() => {}}
        handleConfirmationDone={() => {}}
        handleContactSelection={toOthersFlow.handleContactSelection}
        handleCancelSend={toOthersFlow.handleCancelSend}
        handleConfirmSend={toOthersFlow.handleConfirmSend}
        
        // Money requests props with loading and error states
        autoTribbe={autoTribbe}
        setAutoTribbe={setAutoTribbe}
        amount={amount}
        setAmount={setAmount}
        currencySymbol={currencySymbols[selectedCurrency]}
        filteredRequests={filteredRequests}
        slidingRequests={slidingRequests}
        handleAction={handleAction}
        isLoading={isLoading}
        error={error}
        retryFetchRequests={retryFetchRequests}
        isEmpty={isEmpty}
      />
    </div>
  );
}
