
import { useState, useEffect } from "react";

export function useSendViewUI(amount: string) {
  // UI state
  const [showRequests, setShowRequests] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [showToMyselfSheet, setShowToMyselfSheet] = useState(false);
  const [showToMyselfPaymentMethods, setShowToMyselfPaymentMethods] = useState(false);
  const [showToMyselfConfirmation, setShowToMyselfConfirmation] = useState(false);
  const [showToOthersSheet, setShowToOthersSheet] = useState(false);
  const [showSendActionDialog, setShowSendActionDialog] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  
  // Data state
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState<string>('');
  const [scannedQRData, setScannedQRData] = useState<string | null>(null);
  
  // Reset state when amount changes or dialogs close
  useEffect(() => {
    if (!amount && (showConfirmation || showSendConfirmation)) {
      setShowConfirmation(false);
      setShowSendConfirmation(false);
      setSelectedPaymentMethod(null);
      setSelectedContacts([]);
    }
  }, [amount, showConfirmation, showSendConfirmation]);

  return {
    // UI visibility states
    showRequests,
    setShowRequests,
    showContacts,
    setShowContacts,
    showPaymentMethods,
    setShowPaymentMethods,
    showConfirmation,
    setShowConfirmation,
    showSendConfirmation,
    setShowSendConfirmation,
    showToMyselfSheet,
    setShowToMyselfSheet,
    showToMyselfPaymentMethods,
    setShowToMyselfPaymentMethods,
    showToMyselfConfirmation,
    setShowToMyselfConfirmation,
    showToOthersSheet,
    setShowToOthersSheet,
    showSendActionDialog,
    setShowSendActionDialog,
    showQRScanner,
    setShowQRScanner,
    
    // Data states
    selectedContacts,
    setSelectedContacts,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    recipientName,
    setRecipientName,
    scannedQRData,
    setScannedQRData
  };
}
