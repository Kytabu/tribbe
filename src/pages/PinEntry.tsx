import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Your account is secured.</h1>
          <p className="text-white/90 text-lg">Type your PIN to unlock it.</p>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 ${
                pin.length > index ? "bg-tribbe-lime border-tribbe-lime" : "border-white/50"
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handleNumberClick((i + 1).toString())}
              className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity"
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="text-tribbe-lime text-lg hover:opacity-80 transition-opacity"
          >
            Log out
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="text-tribbe-lime text-lg hover:opacity-80 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinEntry;
