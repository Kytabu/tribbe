
import { QRCodeScanner } from "./QRCodeScanner";
import { ToMyselfSheet } from "./ToMyselfSheet";
import { ToOthersSheet } from "./ToOthersSheet";
import { ToMyselfPaymentMethodSheet } from "./ToMyselfPaymentMethodSheet";
import { TransferConfirmationDialog } from "./TransferConfirmationDialog";
import { SendActionDialog } from "./SendActionDialog";
import { SendConfirmationDialog } from "./SendConfirmationDialog";
import { SupportedCurrency } from "@/features/wallet/constants";

interface SendDialogsProps {
  // UI states
  showToMyselfSheet: boolean;
  setShowToMyselfSheet: (show: boolean) => void;
  showToOthersSheet: boolean;
  setShowToOthersSheet: (show: boolean) => void;
  showToMyselfPaymentMethods: boolean;
  setShowToMyselfPaymentMethods: (show: boolean) => void;
  showToMyselfConfirmation: boolean;
  setShowToMyselfConfirmation: (show: boolean) => void;
  showSendActionDialog: boolean;
  setShowSendActionDialog: (show: boolean) => void;
  showQRScanner: boolean;
  setShowQRScanner: (show: boolean) => void;
  showSendConfirmation: boolean;
  setShowSendConfirmation: (show: boolean) => void;
  
  // Data
  amount: string;
  setAmount: (amount: string) => void;
  selectedCurrency: SupportedCurrency; // Updated type from string to SupportedCurrency
  currencySymbol: string;
  selectedPaymentMethod: string | null;
  recipientName: string;
  scannedQRData: string | null;
  
  // Handlers
  handleQRCodeScannerOpenChange: (open: boolean) => void;
  handleToMyselfSend: () => void;
  handlePaymentMethodSelect: (method: string) => void;
  handleConfirmationDone: () => void;
  handleToOthersSheetConfirm: () => void;
  handleTapToSend: () => void;
  handleOpenContacts: () => void;
  handleQRScanComplete: (data: string) => void;
  handleCancelSend: () => void;
  handleConfirmSend: () => void;
}

export function SendDialogs({
  // UI states
  showToMyselfSheet,
  setShowToMyselfSheet,
  showToOthersSheet,
  setShowToOthersSheet,
  showToMyselfPaymentMethods,
  setShowToMyselfPaymentMethods,
  showToMyselfConfirmation,
  setShowToMyselfConfirmation,
  showSendActionDialog,
  setShowSendActionDialog,
  showQRScanner,
  setShowQRScanner,
  showSendConfirmation,
  setShowSendConfirmation,
  
  // Data
  amount,
  setAmount,
  selectedCurrency,
  currencySymbol,
  selectedPaymentMethod,
  recipientName,
  
  // Handlers
  handleQRCodeScannerOpenChange,
  handleToMyselfSend,
  handlePaymentMethodSelect,
  handleConfirmationDone,
  handleToOthersSheetConfirm,
  handleTapToSend,
  handleOpenContacts,
  handleQRScanComplete,
  handleCancelSend,
  handleConfirmSend
}: SendDialogsProps) {
  return (
    <>
      {/* To Myself Sheet - Step 1: Amount Input */}
      <ToMyselfSheet 
        open={showToMyselfSheet}
        onOpenChange={setShowToMyselfSheet}
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbol}
        onSend={handleToMyselfSend}
      />

      {/* To Others Sheet - Step 1: Amount Input */}
      <ToOthersSheet 
        open={showToOthersSheet}
        onOpenChange={setShowToOthersSheet}
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbol}
        onSend={handleToOthersSheetConfirm}
      />

      {/* Send Action Dialog - Step 2: Choose send method */}
      <SendActionDialog
        open={showSendActionDialog}
        onOpenChange={setShowSendActionDialog}
        onTapToSend={handleTapToSend}
        onContacts={handleOpenContacts}
      />

      {/* QR Code Scanner - For scanning payment QR codes */}
      <QRCodeScanner
        open={showQRScanner}
        onOpenChange={handleQRCodeScannerOpenChange}
        onScanComplete={handleQRScanComplete}
      />

      {/* To Myself Sheet - Step 2: Payment Method Selection */}
      <ToMyselfPaymentMethodSheet 
        open={showToMyselfPaymentMethods}
        onOpenChange={setShowToMyselfPaymentMethods}
        onMethodSelect={handlePaymentMethodSelect}
      />

      {/* To Myself - Step 3: Confirmation Dialog */}
      <TransferConfirmationDialog
        open={showToMyselfConfirmation}
        onOpenChange={setShowToMyselfConfirmation}
        amount={amount}
        currencySymbol={currencySymbol}
        selectedPaymentMethod={selectedPaymentMethod}
        onDone={handleConfirmationDone}
      />

      {/* Send Confirmation Dialog */}
      <SendConfirmationDialog
        open={showSendConfirmation}
        onOpenChange={setShowSendConfirmation}
        recipientName={recipientName}
        amount={amount}
        setAmount={setAmount}
        currencySymbol={currencySymbol}
        onCancel={handleCancelSend}
        onConfirm={handleConfirmSend}
      />
    </>
  );
}
