
import { useState } from "react";

export function usePinEntry() {
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const handlePinDigitInput = (digit: string) => {
    if (pinCode.length < 4) {
      setPinCode(prev => prev + digit);
    }
  };

  const handlePinDeleteDigit = () => {
    setPinCode(prev => prev.slice(0, -1));
  };

  return {
    showPinEntry,
    setShowPinEntry,
    pinCode,
    setPinCode,
    handlePinDigitInput,
    handlePinDeleteDigit
  };
}
