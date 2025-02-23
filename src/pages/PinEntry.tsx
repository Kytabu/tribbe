
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
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
        await supabase
          .from('user_pins')
          .update({ attempts: 0 })
          .eq('user_id', user.id);

        navigate("/flami");
      } else {
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

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + number);
      if (pin.length === 3) {
        verifyPin();
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-4 sm:p-6">
      <div className="w-full max-w-xs sm:max-w-md space-y-6 sm:space-y-12 mt-12 sm:mt-16">
        <div className="text-center space-y-2 sm:space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Your account is secured.</h1>
          <p className="text-sm sm:text-lg text-foreground/90">Type your PIN to unlock it.</p>
        </div>

        <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-12">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${
                pin.length > index ? "bg-primary border-primary" : "border-foreground/50"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {[...Array(9)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleNumberClick((i + 1).toString())}
              className="text-primary text-2xl sm:text-3xl font-medium hover:opacity-80 transition-opacity h-12 sm:h-16"
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="text-primary text-sm sm:text-lg hover:opacity-80 transition-opacity h-12 sm:h-16"
          >
            Log out
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="text-primary text-2xl sm:text-3xl font-medium hover:opacity-80 transition-opacity h-12 sm:h-16"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="text-primary text-sm sm:text-lg hover:opacity-80 transition-opacity h-12 sm:h-16"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinEntry;
