
import { SupportedCurrency } from "@/features/wallet/constants";
import { useToOthersActions } from "./useToOthersActions";
import { useToOthersQR } from "./useToOthersQR";
import { useToOthersTransfer } from "./useToOthersTransfer";

type ToOthersFlowProps = {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  setShowContacts: (show: boolean) => void;
  setShowSendConfirmation: (show: boolean) => void;
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
  recipientName: string;
  setRecipientName: (name: string) => void;
  setShowToOthersSheet: (show: boolean) => void;
  setShowSendActionDialog: (show: boolean) => void;
  setShowQRScanner: (show: boolean) => void;
  scannedQRData: string | null;
  setScannedQRData: (data: string | null) => void;
};

export function useToOthersFlow(props: ToOthersFlowProps) {
  // Separate actions into focused hooks
  const actions = useToOthersActions({
    amount: props.amount,
    setShowToOthersSheet: props.setShowToOthersSheet,
    setShowSendActionDialog: props.setShowSendActionDialog,
    setShowContacts: props.setShowContacts
  });
  
  const qrHandling = useToOthersQR({
    setShowSendActionDialog: props.setShowSendActionDialog,
    setShowQRScanner: props.setShowQRScanner,
    setScannedQRData: props.setScannedQRData,
    setRecipientName: props.setRecipientName,
    setShowSendConfirmation: props.setShowSendConfirmation
  });
  
  const transfer = useToOthersTransfer({
    amount: props.amount,
    setAmount: props.setAmount,
    selectedCurrency: props.selectedCurrency,
    currencySymbols: props.currencySymbols,
    recipientName: props.recipientName,
    setShowSendConfirmation: props.setShowSendConfirmation,
    selectedContacts: props.selectedContacts,
    setSelectedContacts: props.setSelectedContacts,
    setRecipientName: props.setRecipientName,
    setShowContacts: props.setShowContacts,
    setScannedQRData: props.setScannedQRData
  });
  
  // Return all handlers from the composed hooks
  return {
    // From useToOthersActions
    handleToOthersClick: actions.handleToOthersClick,
    handleToOthersSheetConfirm: actions.handleToOthersSheetConfirm,
    handleOpenContacts: actions.handleOpenContacts,
    
    // From useToOthersQR
    handleTapToSend: qrHandling.handleTapToSend,
    handleQRScanComplete: qrHandling.handleQRScanComplete,
    
    // From useToOthersTransfer
    handleContactSelection: transfer.handleContactSelection,
    handleConfirmSend: transfer.handleConfirmSend,
    handleCancelSend: transfer.handleCancelSend
  };
}
