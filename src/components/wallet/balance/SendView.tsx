
import { SendViewProps } from "./types";
import { SendViewContent } from "./components/SendViewContent";
import { SendDialogs } from "./components/SendDialogs";
import { useSendViewUI } from "./hooks/useSendViewUI";
import { useToMyselfFlow } from "./hooks/useToMyselfFlow";
import { useToOthersFlow } from "./hooks/useToOthersFlow";

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
    <>
      <SendViewContent
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbols={currencySymbols}
        autoTribbe={autoTribbe}
        setAutoTribbe={setAutoTribbe}
      />
      
      <SendDialogs
        // UI states
        showToMyselfSheet={ui.showToMyselfSheet}
        setShowToMyselfSheet={ui.setShowToMyselfSheet}
        showToOthersSheet={ui.showToOthersSheet}
        setShowToOthersSheet={ui.setShowToOthersSheet}
        showToMyselfPaymentMethods={ui.showToMyselfPaymentMethods}
        setShowToMyselfPaymentMethods={ui.setShowToMyselfPaymentMethods}
        showToMyselfConfirmation={ui.showToMyselfConfirmation}
        setShowToMyselfConfirmation={ui.setShowToMyselfConfirmation}
        showSendActionDialog={ui.showSendActionDialog}
        setShowSendActionDialog={ui.setShowSendActionDialog}
        showQRScanner={ui.showQRScanner}
        setShowQRScanner={ui.setShowQRScanner}
        showSendConfirmation={ui.showSendConfirmation}
        setShowSendConfirmation={ui.setShowSendConfirmation}
        
        // Data
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbols[selectedCurrency]}
        selectedPaymentMethod={ui.selectedPaymentMethod}
        recipientName={ui.recipientName}
        scannedQRData={ui.scannedQRData}
        
        // Handlers
        handleQRCodeScannerOpenChange={handleQRCodeScannerOpenChange}
        handleToMyselfSend={toMyselfFlow.handleSend}
        handlePaymentMethodSelect={toMyselfFlow.handlePaymentMethodSelect}
        handleConfirmationDone={toMyselfFlow.handleConfirmationDone}
        handleToOthersSheetConfirm={toOthersFlow.handleToOthersSheetConfirm}
        handleTapToSend={toOthersFlow.handleTapToSend}
        handleOpenContacts={toOthersFlow.handleOpenContacts}
        handleQRScanComplete={toOthersFlow.handleQRScanComplete}
        handleCancelSend={toOthersFlow.handleCancelSend}
        handleConfirmSend={toOthersFlow.handleConfirmSend}
      />
    </>
  );
}
