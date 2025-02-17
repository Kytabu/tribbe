
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import bcrypt from "bcryptjs";

const PinSetup = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"create" | "confirm">("create");
  const navigate = useNavigate();

  const handlePinSubmit = async () => {
    if (step === "create") {
      setStep("confirm");
      return;
    }

    if (pin !== confirmPin) {
      toast({
        title: "PINs don't match",
        description: "Please try again",
        variant: "destructive",
      });
      setPin("");
      setConfirmPin("");
      setStep("create");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to set a PIN",
          variant: "destructive",
        });
        return;
      }

      // Hash the PIN before storing
      const salt = await bcrypt.genSalt(10);
      const pinHash = await bcrypt.hash(pin, salt);

      const { error } = await supabase
        .from('user_pins')
        .insert([
          { user_id: user.id, pin_hash: pinHash }
        ]);

      if (error) throw error;

      toast({
        title: "PIN set successfully",
        description: "You can now use your PIN to access the app",
      });

      navigate("/pin-entry");
    } catch (error) {
      console.error('Error setting PIN:', error);
      toast({
        title: "Error",
        description: "Failed to set PIN. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            {step === "create" ? "Create Your PIN" : "Confirm Your PIN"}
          </h1>
          <p className="text-white/70">
            {step === "create" 
              ? "Choose a 4-digit PIN to secure your account" 
              : "Enter the same PIN again to confirm"}
          </p>
        </div>

        <div className="space-y-8">
          <InputOTP
            maxLength={4}
            value={step === "create" ? pin : confirmPin}
            onChange={value => step === "create" ? setPin(value) : setConfirmPin(value)}
            render={({ slots }) => (
              <InputOTPGroup className="gap-4">
                {slots.map((slot, idx) => (
                  <InputOTPSlot 
                    key={idx} 
                    {...slot}
                    index={idx}
                    className="bg-white/10 border-white/20 text-white"
                  />
                ))}
              </InputOTPGroup>
            )}
          />

          <Button
            className="w-full bg-tribbe-aqua text-tribbe-black hover:bg-tribbe-aqua/90"
            onClick={handlePinSubmit}
            disabled={(step === "create" && pin.length !== 4) || 
                     (step === "confirm" && confirmPin.length !== 4)}
          >
            {step === "create" ? "Next" : "Set PIN"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PinSetup;
