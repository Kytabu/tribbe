
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
    <div className="w-full max-w-xs space-y-6 sm:space-y-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <h1 className="text-lg sm:text-xl text-white font-normal">Enter verification code</h1>
        <p className="text-sm text-white/60">We've sent a 6-digit code to your phone</p>
      </div>

      <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
        {[...Array(6)].map((_, index) => (
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

      <div className="flex justify-center mt-6">
        <Button
          onClick={onSubmit}
          disabled={verificationCode.length !== 6 || loading}
          className={`w-24 h-10 rounded-full transition-colors ${
            verificationCode.length === 6 && !loading
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
      </div>
    </div>
  );
};
