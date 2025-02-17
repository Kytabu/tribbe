
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_SCREENS = 5;

const Onboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentScreen === TOTAL_SCREENS - 1) {
      navigate("/");
    } else {
      setCurrentScreen((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentScreen((prev) => Math.max(0, prev - 1));
  };

  const handleSkip = () => {
    navigate("/");
  };

  const getScreenContent = (screen: number) => {
    switch (screen) {
      case 0:
        return {
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          title: "Your network is your net-worth.",
        };
      case 1:
        return {
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
          title: "Get cash from those that care about you, fast.",
        };
      case 2:
        return {
          image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
          title: "Use A.I. to help you make & save money.",
        };
      case 3:
        return {
          image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
          title: "Lend money to those that pay you back.",
        };
      case 4:
        return {
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          title: "Tribbe is your network. Trust is your net-worth.",
        };
      default:
        return { image: "", title: "" };
    }
  };

  const content = getScreenContent(currentScreen);

  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col items-center justify-between p-6 relative">
      {/* Skip button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white"
        onClick={handleSkip}
      >
        <X className="h-6 w-6" />
      </Button>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md gap-8 animate-fade-in">
        <div className="w-full aspect-square relative">
          <img
            src={content.image}
            alt={`Onboarding step ${currentScreen + 1}`}
            className="w-full h-full object-contain animate-float rounded-lg"
          />
        </div>
        <h1 className="text-2xl md:text-3xl text-white text-center font-semibold">
          {content.title}
        </h1>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-md space-y-6">
        {/* Progress dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: TOTAL_SCREENS }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentScreen
                  ? "bg-white w-4"
                  : "bg-white/30"
              )}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className={cn(
              "text-white",
              currentScreen === 0 && "invisible"
            )}
            onClick={handleBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            className="bg-white text-tribbe-grey hover:bg-white/90"
            onClick={handleNext}
          >
            {currentScreen === TOTAL_SCREENS - 1 ? (
              "Start"
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
