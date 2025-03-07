
import { ArrowLeft, ArrowRight, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPhoneNumber, unformatPhoneNumber } from "./utils/phoneFormatter";

interface PhoneEntryViewProps {
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  manualContactName: string;
  setManualContactName: (name: string) => void;
  onBackClick: () => void;
  onContinueClick: () => void;
  onDigitClick: (digit: string) => void;
  onDeleteClick: () => void;
}

export function PhoneEntryView({
  phoneNumber,
  setPhoneNumber,
  manualContactName,
  setManualContactName,
  onBackClick,
  onContinueClick,
  onDigitClick,
  onDeleteClick
}: PhoneEntryViewProps) {
  // Get raw phone number for button validation
  const rawPhoneNumber = unformatPhoneNumber(phoneNumber);
  
  return (
    <>
      <div className="p-6 border-b border-tribbe-grey flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackClick}
          className="mr-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold text-white">Send Money</h2>
      </div>
      
      <div className="flex flex-col items-center justify-between h-[calc(100vh-8rem)]">
        <div className="w-full px-6 pt-12 pb-6">
          <div className="relative border-b-2 border-tribbe-grey/50 pb-2 mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-tribbe-lime"></div>
            <Input
              value={phoneNumber}
              onChange={(e) => {
                // Extract just the digits and apply formatting
                const rawValue = unformatPhoneNumber(e.target.value);
                if (rawValue.length <= 10) { // Limit to 10 digits max for the XXXX XXX XXX format
                  setPhoneNumber(formatPhoneNumber(rawValue));
                }
              }}
              className="bg-transparent border-0 text-xl text-white pl-4 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="0700 000 000"
              type="tel"
              inputMode="numeric"
            />
          </div>
          
          <Input
            value={manualContactName}
            onChange={(e) => setManualContactName(e.target.value)}
            className="bg-tribbe-grey/30 border-tribbe-grey text-white mt-4"
            placeholder="Contact name (optional)"
          />
        </div>
        
        <div className="w-full px-4 mb-4">
          <Button
            onClick={onContinueClick}
            disabled={rawPhoneNumber.length < 9} // Ensure at least 9 digits
            className="w-full bg-background border border-tribbe-grey/50 text-white hover:bg-tribbe-grey/30 py-6 rounded-full relative group"
          >
            <span className="mr-6">CONTINUE</span>
            <span className="absolute right-6 opacity-70 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Button>
        </div>
        
        <div className="w-full px-4 pb-6">
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => onDigitClick(num.toString())}
                className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
              >
                {num}
              </button>
            ))}
            <button
              className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
            >
              {/* Empty space */}
            </button>
            <button
              onClick={() => onDigitClick("0")}
              className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
            >
              0
            </button>
            <button
              onClick={onDeleteClick}
              className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
            >
              <Delete className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
