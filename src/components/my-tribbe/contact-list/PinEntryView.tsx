
import { ArrowLeft, Delete, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PinEntryViewProps {
  pinCode: string;
  onBackClick: () => void;
  onDigitClick: (digit: string) => void;
  onDeleteClick: () => void;
  onConfirmClick: () => void;
}

export function PinEntryView({
  pinCode,
  onBackClick,
  onDigitClick,
  onDeleteClick,
  onConfirmClick
}: PinEntryViewProps) {
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
        <h2 className="text-xl font-bold text-white">Enter PIN</h2>
      </div>
      
      <div className="flex flex-col items-center px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-white/70 text-sm">Enter your PIN to confirm the transaction</p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-12">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full border-2 ${
                pinCode.length > index ? "bg-tribbe-lime border-tribbe-lime" : "border-tribbe-lime"
              }`}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-6 w-full mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => onDigitClick(num.toString())}
              className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
            >
              {num}
            </button>
          ))}
          <button className="flex items-center justify-center h-14 text-2xl font-medium text-white">
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
        
        {pinCode.length === 4 && (
          <Button
            onClick={onConfirmClick}
            className="w-full max-w-xs bg-tribbe-lime hover:bg-tribbe-lime/90 text-black h-12 rounded-full"
          >
            <Check className="mr-2 h-5 w-5" />
            Confirm
          </Button>
        )}
      </div>
    </>
  );
}
