
import { SendViewProps } from "./types";
import { AmountInput } from "./components/AmountInput";
import { useMoneyRequests } from "./hooks/useMoneyRequests";
import { useSendViewUI } from "./hooks/useSendViewUI";
import { useToMyselfFlow } from "./hooks/useToMyselfFlow";
import { useToOthersFlow } from "./hooks/useToOthersFlow";
import { SendActions } from "./components/SendActions";
import { ToMyselfSheet } from "./components/ToMyselfSheet";
import { ToOthersSheet } from "./components/ToOthersSheet";
import { ToMyselfPaymentMethodSheet } from "./components/ToMyselfPaymentMethodSheet";
import { TransferConfirmationDialog } from "./components/TransferConfirmationDialog";
import { SendActionDialog } from "./components/SendActionDialog";
import { QRCodeScanner } from "./components/QRCodeScanner";

export function SendView({
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

  // Handler for QR Scanner close event
  const handleQRCodeScannerOpenChange = (open: boolean) => {
    ui.setShowQRScanner(open);
    if (!open) {
      // When the QR scanner is closed, show the send action dialog again
      setTimeout(() => {
        ui.setShowSendActionDialog(true);
      }, 300);
    }
  };

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
        currencySymbol={currencySymbols[selectedCurrency]}
        filteredRequests={filteredRequests}
        slidingRequests={slidingRequests}
        handleAction={handleAction}
        isLoading={isLoading}
        error={error}
        retryFetchRequests={retryFetchRequests}
        isEmpty={isEmpty}
      />

      {/* To Myself Sheet - Step 1: Amount Input */}
      <ToMyselfSheet 
        open={ui.showToMyselfSheet}
        onOpenChange={ui.setShowToMyselfSheet}
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbols[selectedCurrency]}
        onSend={toMyselfFlow.handleSend}
      />

      {/* To Others Sheet - Step 1: Amount Input */}
      <ToOthersSheet 
        open={ui.showToOthersSheet}
        onOpenChange={ui.setShowToOthersSheet}
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbols[selectedCurrency]}
        onSend={toOthersFlow.handleToOthersSheetConfirm}
      />

      {/* Send Action Dialog - Step 2: Choose send method */}
      <SendActionDialog
        open={ui.showSendActionDialog}
        onOpenChange={ui.setShowSendActionDialog}
        onTapToSend={toOthersFlow.handleTapToSend}
        onContacts={toOthersFlow.handleOpenContacts}
      />

      {/* QR Code Scanner - For scanning payment QR codes */}
      <QRCodeScanner
        open={ui.showQRScanner}
        onOpenChange={handleQRCodeScannerOpenChange}
        onScanComplete={toOthersFlow.handleQRScanComplete}
      />

      {/* To Myself Sheet - Step 2: Payment Method Selection */}
      <ToMyselfPaymentMethodSheet 
        open={ui.showToMyselfPaymentMethods}
        onOpenChange={ui.setShowToMyselfPaymentMethods}
        onMethodSelect={toMyselfFlow.handlePaymentMethodSelect}
      />

      {/* To Myself - Step 3: Confirmation Dialog */}
      <TransferConfirmationDialog
        open={ui.showToMyselfConfirmation}
        onOpenChange={ui.setShowToMyselfConfirmation}
        amount={amount}
        currencySymbol={currencySymbols[selectedCurrency]}
        selectedPaymentMethod={ui.selectedPaymentMethod}
        onDone={toMyselfFlow.handleConfirmationDone}
      />
    </div>
  );
}
