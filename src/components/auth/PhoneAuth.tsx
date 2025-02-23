
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface PhoneAuthProps {
  onBack: () => void;
  onSubmit: (phone: string) => Promise<void>;
  loading: boolean;
}

export const PhoneAuth = ({ onBack, onSubmit, loading }: PhoneAuthProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(phoneNumber);
  };

  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col items-center px-4 sm:px-6">
      <div className="flex items-center justify-between w-full pt-4">
        <Button
          variant="ghost"
          className="text-white hover:text-tribbe-aqua"
          onClick={onBack}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <img 
        src="/lovable-uploads/2e96dadf-c241-4700-b74e-72f155818e87.png" 
        alt="Tribbe Logo" 
        className="w-40 mx-auto mt-8 mb-4"
      />

      <div className="w-full max-w-md mt-4">
        <div className="w-full space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Enter your phone number
            </h1>
            <p className="text-white/60 text-sm">
              We'll send you a verification code
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-[#1A1F2C] border-0 text-white placeholder:text-white/40"
            />
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-tribbe-aqua hover:bg-[#1A1F2C] text-tribbe-black hover:text-tribbe-aqua transition-colors"
              disabled={loading}
            >
              {loading ? "Sending code..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
