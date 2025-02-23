
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-start p-4 sm:p-6 relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 left-2 sm:top-4 sm:left-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>

      <div className="w-full max-w-xs sm:max-w-md space-y-8 sm:space-y-12 mt-12 sm:mt-16">
        <div className="text-center space-y-3 sm:space-y-4">
          <h1 className="text-xl sm:text-2xl text-foreground font-normal">
            your pin please
          </h1>
        </div>

        <div className="flex justify-center space-x-3 sm:space-x-4 mb-8 sm:mb-12">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 ${
                pin.length > index
                  ? "bg-primary border-primary"
                  : "border-foreground/50"
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
          <div className="w-full" />
          <button
            onClick={() => handleNumberClick("0")}
            className="text-primary text-2xl sm:text-3xl font-medium hover:opacity-80 transition-opacity h-12 sm:h-16"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="text-primary text-base sm:text-lg hover:opacity-80 transition-opacity h-12 sm:h-16"
          >
            Delete
          </button>
        </div>

        {pin.length === 4 && (
          <div className="mt-6 sm:mt-8 flex justify-center">
            <Button 
              onClick={handlePinSubmit}
              className="w-28 sm:w-32 h-10 sm:h-12 bg-tribbe-lime hover:bg-tribbe-lime/90 text-slate-900 font-medium rounded-full"
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
