
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/integrations/supabase/client";
import bcrypt from "bcryptjs";

const PinEntry = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkPinExists();
  }, []);

  const checkPinExists = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }

      const { data: userPin } = await supabase
        .from('user_pins')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!userPin) {
        navigate("/pin-setup");
      }
    } catch (error) {
      console.error('Error checking PIN:', error);
    }
  };

  const verifyPin = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to verify your PIN",
          variant: "destructive",
        });
        return;
      }

      const { data: userPin, error } = await supabase
        .from('user_pins')
        .select('pin_hash, attempts')
        .eq('user_id', user.id)
        .single();

      if (error || !userPin) {
        throw new Error('Failed to retrieve PIN data');
      }

      const isMatch = await bcrypt.compare(pin, userPin.pin_hash);

      if (isMatch) {
        // Reset attempts on successful login
        await supabase
          .from('user_pins')
          .update({ attempts: 0 })
          .eq('user_id', user.id);

        navigate("/flami");
      } else {
        // Increment attempts
        const newAttempts = (userPin.attempts || 0) + 1;
        await supabase
          .from('user_pins')
          .update({ attempts: newAttempts })
          .eq('user_id', user.id);

        toast({
          title: "Incorrect PIN",
          description: "Please try again",
          variant: "destructive",
        });
        setPin("");
      }
    } catch (error) {
      console.error('Error verifying PIN:', error);
      toast({
        title: "Error",
        description: "Failed to verify PIN. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Enter Your PIN</h1>
          <p className="text-white/70">Enter your 4-digit PIN to access your account</p>
        </div>

        <div className="space-y-8">
          <InputOTP
            maxLength={4}
            value={pin}
            onChange={setPin}
            render={({ slots }) => (
              <InputOTPGroup className="gap-4">
                {slots.map((slot, index) => (
                  <InputOTPSlot 
                    key={index} 
                    {...slot}
                    className="bg-white/10 border-white/20 text-white"
                  />
                ))}
              </InputOTPGroup>
            )}
          />

          <Button
            className="w-full bg-tribbe-aqua text-tribbe-black hover:bg-tribbe-aqua/90"
            onClick={verifyPin}
            disabled={pin.length !== 4}
          >
            Verify PIN
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PinEntry;
