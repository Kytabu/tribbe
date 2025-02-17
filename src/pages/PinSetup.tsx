
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import bcrypt from "bcryptjs";

const PinSetup = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"create" | "confirm">("create");
  const navigate = useNavigate();

  const handleNumberClick = (number: string) => {
    if (step === "create" && pin.length < 4) {
      setPin(prev => prev + number);
      if (pin.length === 3) {
        setTimeout(() => setStep("confirm"), 300);
      }
    } else if (step === "confirm" && confirmPin.length < 4) {
      setConfirmPin(prev => prev + number);
      if (confirmPin.length === 3) {
        setTimeout(() => handlePinSubmit(), 300);
      }
    }
  };

  const handleDelete = () => {
    if (step === "create") {
      setPin(prev => prev.slice(0, -1));
    } else {
      setConfirmPin(prev => prev.slice(0, -1));
    }
  };

  const handlePinSubmit = async () => {
    // Add console logs to debug the PIN values
    console.log('Pin:', pin);
    console.log('ConfirmPin:', confirmPin);
    console.log('Step:', step);

    // If we're still in create step and pin is complete, move to confirm
    if (step === "create" && pin.length === 4) {
      setStep("confirm");
      return;
    }

    // Wait for the last digit to be added to confirmPin
    if (confirmPin.length < 4) {
      return;
    }

    // Now compare the PINs
    const newPin = pin;
    const newConfirmPin = confirmPin;

    if (newPin !== newConfirmPin) {
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

      const salt = await bcrypt.genSalt(10);
      const pinHash = await bcrypt.hash(newPin, salt);

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

      // Instead of navigating directly, wait for user to click "Done"
      // The button will be shown once PIN is confirmed
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
      {/* Back Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">
            {step === "create" ? "Create Your PIN" : "Confirm Your PIN"}
          </h1>
          <p className="text-foreground/90 text-lg">
            {step === "create" 
              ? "Choose a 4-digit PIN to secure your account" 
              : "Enter the same PIN again to confirm"}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 ${
                (step === "create" ? pin.length > index : confirmPin.length > index)
                  ? "bg-primary border-primary"
                  : "border-foreground/50"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleNumberClick((i + 1).toString())}
              className="text-primary text-3xl font-medium hover:opacity-80 transition-opacity"
            >
              {i + 1}
            </button>
          ))}
          <div className="w-full" />
          <button
            onClick={() => handleNumberClick("0")}
            className="text-primary text-3xl font-medium hover:opacity-80 transition-opacity"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="text-primary text-lg hover:opacity-80 transition-opacity"
          >
            Delete
          </button>
        </div>

        {/* Done Button - Only shown when PIN is confirmed and matches */}
        {step === "confirm" && pin === confirmPin && pin.length === 4 && (
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={() => navigate("/setup")}
              className="w-32 bg-tribbe-lime hover:bg-tribbe-lime/90 text-slate-900 font-medium"
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinSetup;
