
import { ArrowLeft, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PinEntryViewProps {
  pinCode: string;
  onDigitClick: (digit: string) => void;
  onDeleteClick: () => void;
  onSubmit: () => void;
}

export function PinEntryView({
  pinCode,
  onDigitClick,
  onDeleteClick,
  onSubmit
}: PinEntryViewProps) {
  // Automatically submit when all 4 digits are entered
  if (pinCode.length === 4) {
    setTimeout(() => {
      onSubmit();
    }, 500);
  }
  
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-2">Enter PIN</h1>
        <p className="text-muted-foreground text-center mb-8">
          Enter your 4-digit PIN to complete the transaction
        </p>
        
        {/* PIN display */}
        <div className="flex space-x-4 mb-10">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-4 h-4 rounded-full ${
                i < pinCode.length ? "bg-primary" : "border-2 border-muted-foreground"
              }`}
            />
          ))}
        </div>
        
        {/* PIN pad */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "delete"].map((digit, index) => {
            if (digit === "") {
              return <div key={index} />;
            }
            
            if (digit === "delete") {
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-16 w-full rounded-full"
                  onClick={onDeleteClick}
                  disabled={pinCode.length === 0}
                >
                  <Delete className="h-6 w-6" />
                </Button>
              );
            }
            
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-16 w-full rounded-full text-2xl"
                onClick={() => onDigitClick(String(digit))}
                disabled={pinCode.length >= 4}
              >
                {digit}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
