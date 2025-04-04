
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PhoneVerificationProps {
  verificationCode: string;
  onNumberClick: (number: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  loading?: boolean;
  onGoBack?: () => void;
}

export const PhoneVerification = ({
  verificationCode,
  onNumberClick,
  onDelete,
  onSubmit,
  loading = false,
  onGoBack
}: PhoneVerificationProps) => {
  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col">
      <img 
        src="/lovable-uploads/2e96dadf-c241-4700-b74e-72f155818e87.png" 
        alt="Tribbe Logo" 
        className="w-40 mx-auto mt-8 mb-12"
      />
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h1 className="text-2xl text-tribbe-lime font-medium mb-2">Enter verification code</h1>
            <p className="text-white/60 text-sm">We've sent a 4-digit code to your phone</p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full border-2 ${
                  verificationCode.length > index ? "bg-tribbe-lime border-tribbe-lime" : "border-tribbe-lime"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => onNumberClick(num.toString())}
                className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
                disabled={loading}
              >
                {num}
              </button>
            ))}
            {[4, 5, 6].map((num) => (
              <button
                key={num}
                onClick={() => onNumberClick(num.toString())}
                className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
                disabled={loading}
              >
                {num}
              </button>
            ))}
            <button
              key={7}
              onClick={() => onNumberClick("7")}
              className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
              disabled={loading}
            >
              7
            </button>
            <button
              key={8}
              onClick={() => onNumberClick("8")}
              className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
              disabled={loading}
            >
              8
            </button>
            <button
              key={9}
              onClick={() => onNumberClick("9")}
              className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
              disabled={loading}
            >
              9
            </button>
            <button
              onClick={onGoBack}
              className="text-tribbe-lime text-lg hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
              disabled={loading}
            >
              Back
            </button>
            <button
              onClick={() => onNumberClick("0")}
              className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
              disabled={loading}
            >
              0
            </button>
            <button
              onClick={onDelete}
              className="text-tribbe-lime text-lg hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center mx-auto"
              disabled={loading}
            >
              Delete
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={onSubmit}
              disabled={verificationCode.length !== 4 || loading}
              className={`w-full max-w-xs h-12 rounded-full transition-colors ${
                verificationCode.length === 4 && !loading
                  ? "bg-tribbe-lime hover:bg-tribbe-lime/90 text-black" 
                  : "bg-gray-600 text-gray-400"
              }`}
            >
              {loading ? (
                "Verifying..."
              ) : (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Done
                </>
              )}
            </Button>
            <p className="text-white/60 text-sm mt-2">use the code 0000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
