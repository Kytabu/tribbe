
import { toast } from "@/hooks/use-toast";

interface ToOthersQRProps {
  setShowSendActionDialog: (show: boolean) => void;
  setShowQRScanner: (show: boolean) => void;
  setScannedQRData: (data: string | null) => void;
  setRecipientName: (name: string) => void;
  setShowSendConfirmation: (show: boolean) => void;
}

export function useToOthersQR({
  setShowSendActionDialog,
  setShowQRScanner,
  setScannedQRData,
  setRecipientName,
  setShowSendConfirmation
}: ToOthersQRProps) {
  
  const handleTapToSend = () => {
    setShowSendActionDialog(false);
    
    // Open QR scanner dialog
    setTimeout(() => {
      setShowQRScanner(true);
    }, 300);
  };

  const handleQRScanComplete = (data: string) => {
    console.log("QR code scanned:", data);
    setScannedQRData(data);
    setShowQRScanner(false);
    
    // Parse QR data (example format: "userID:amount:currency")
    try {
      const [userId, qrAmount, qrCurrency] = data.split(":");
      // Set recipient based on scanned data
      setRecipientName("QR Recipient");
      
      // Show send confirmation dialog
      setTimeout(() => {
        setShowSendConfirmation(true);
      }, 300);
    } catch (error) {
      console.error("Error parsing QR data:", error);
      toast({
        title: "Invalid QR Code",
        description: "The scanned QR code is not in the expected format",
        variant: "destructive",
      });
      
      // Show send action dialog again after error
      setTimeout(() => {
        setShowSendActionDialog(true);
      }, 300);
    }
  };

  return {
    handleTapToSend,
    handleQRScanComplete
  };
}
