
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PinSetup = () => {
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

  const handleNumberClick = (number: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + number);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handlePinSubmit = () => {
    toast({
      title: "PIN set successfully",
      description: "You can now use your PIN to access the app",
    });
    navigate("/flami");
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
            Your Pin Please
          </h1>
        </div>

        <div className="flex justify-center space-x-4 mb-12">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 ${
                pin.length > index
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

        {/* Done Button - Show when PIN is complete */}
        {pin.length === 4 && (
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={handlePinSubmit}
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
