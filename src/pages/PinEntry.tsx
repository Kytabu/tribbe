
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
        setTimeout(() => {
          verifyPin();
        }, 300); // Small delay to show the 4th dot filled
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-4">
      {/* Top Section with Logo */}
      <div className="w-full flex justify-center pt-12 pb-8">
        <img 
          src="/lovable-uploads/4fd95257-7ac3-44c8-9189-c0b116e26623.png"
          alt="Tribbe Logo"
          className="h-12"
        />
      </div>
      
      {/* Middle Section with Content */}
      <div className="flex flex-col items-center w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-medium text-tribbe-lime mb-2">Your Tribbe account secured.</h1>
          <p className="text-lg text-tribbe-lime">Type your pin to unlock it.</p>
        </div>

        {/* PIN Dots */}
        <div className="flex justify-center gap-6 mb-12">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full border-2 ${
                pin.length > index ? "bg-tribbe-lime border-tribbe-lime" : "border-tribbe-lime"
              }`}
            />
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-x-10 gap-y-8 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity w-16 h-16 flex items-center justify-center"
            >
              {num}
            </button>
          ))}
          
          {/* Bottom Row */}
          <button
            onClick={handleLogout}
            className="text-tribbe-lime text-lg hover:opacity-80 transition-opacity flex items-center justify-center"
          >
            Log out
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="text-tribbe-lime text-3xl font-medium hover:opacity-80 transition-opacity flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="text-tribbe-lime text-lg hover:opacity-80 transition-opacity flex items-center justify-center"
          >
            Delete
          </button>
        </div>
      </div>
      
      {/* Bottom Spacer */}
      <div className="h-16"></div>
    </div>
  );
};

export default PinEntry;
