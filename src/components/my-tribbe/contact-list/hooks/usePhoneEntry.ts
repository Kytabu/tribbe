
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { formatPhoneNumber, unformatPhoneNumber } from "../utils/phoneFormatter";

export function usePhoneEntry() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [manualContactName, setManualContactName] = useState("");
  const [showPhoneEntry, setShowPhoneEntry] = useState(false);

  const handlePhoneNumberInput = (digit: string) => {
    const newRawValue = unformatPhoneNumber(phoneNumber) + digit;
    if (newRawValue.length <= 10) {
      setPhoneNumber(formatPhoneNumber(newRawValue));
    }
  };

  const handleDeleteDigit = () => {
    const rawValue = unformatPhoneNumber(phoneNumber);
    if (rawValue.length > 0) {
      const newRawValue = rawValue.slice(0, -1);
      setPhoneNumber(formatPhoneNumber(newRawValue));
    }
  };

  const validatePhoneNumber = () => {
    const rawPhoneNumber = unformatPhoneNumber(phoneNumber);
    if (rawPhoneNumber.length < 9) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return {
    phoneNumber,
    setPhoneNumber,
    manualContactName,
    setManualContactName,
    showPhoneEntry,
    setShowPhoneEntry,
    handlePhoneNumberInput,
    handleDeleteDigit,
    validatePhoneNumber
  };
}
