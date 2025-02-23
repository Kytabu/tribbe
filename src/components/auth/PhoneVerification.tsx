
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PhoneVerificationProps {
  verificationCode: string;
  onNumberClick: (number: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  loading?: boolean;
}

export const PhoneVerification = ({
  verificationCode,
  onNumberClick,
  onDelete,
  onSubmit,
  loading = false
}: PhoneVerificationProps) => {
  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col">
      <img 
        src="/lovable-uploads/2e96dadf-c241-4700-b74e-72f155818e87.png" 
        alt="Tribbe Logo" 
        className="w-40 mx-auto mt-8 mb-4"
      />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-xs space-y-6 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-lg sm:text-xl text-white font-normal">Enter verification code</h1>
            <p className="text-sm text-white/60">We've sent a 4-digit code to your phone</p>
          </div>

          <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 ${
                  verificationCode.length > index ? "bg-primary border-primary" : "border-foreground/50"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            {[...Array(9)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => onNumberClick((i + 1).toString())}
                className="text-primary text-lg sm:text-xl font-medium hover:opacity-80 transition-opacity"
                disabled={loading}
              >
                {i + 1}
              </button>
            ))}
            <div className="w-full" />
            <button
              onClick={() => onNumberClick("0")}
              className="text-primary text-lg sm:text-xl font-medium hover:opacity-80 transition-opacity"
              disabled={loading}
            >
              0
            </button>
            <button
              onClick={onDelete}
              className="text-primary text-base sm:text-lg hover:opacity-80 transition-opacity"
              disabled={loading}
            >
              Delete
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={onSubmit}
              disabled={verificationCode.length !== 4 || loading}
              className={`w-24 h-10 rounded-full transition-colors ${
                verificationCode.length === 4 && !loading
                  ? "bg-tribbe-lime hover:bg-tribbe-lime/90 text-black" 
                  : "bg-gray-600 text-gray-400"
              }`}
            >
              {loading ? (
                "Verifying..."
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Done
                </>
              )}
            </Button>
            <p className="text-white/60 text-sm">use the code 0000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
