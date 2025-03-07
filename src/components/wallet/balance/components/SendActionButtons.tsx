
import { TribbeButton } from "./TribbeButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MouseEvent } from "react";

interface SendActionButtonsProps {
  autoTribbe: boolean;
  setAutoTribbe: (value: boolean) => void;
  onToMyselfClick: () => void;
  onToOthersClick: () => void;
  onRequestsClick: () => void;
}

export function SendActionButtons({
  autoTribbe,
  setAutoTribbe,
  onToMyselfClick,
  onToOthersClick,
  onRequestsClick
}: SendActionButtonsProps) {
  // Handle automate toggle without triggering the parent click
  const handleAutomateToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="space-y-2">
      <TribbeButton
        imagePath="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png"
        label="To Me"
        info="Instant"
        onClick={onToMyselfClick}
        showProfileCircle={true}
      />
      <TribbeButton
        imagePath="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png"
        label="To Others"
        info="Fast"
        onClick={onToOthersClick}
      />
      <div className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group flex items-center">
        <div className="flex justify-between items-center w-full" onClick={onRequestsClick}>
          <div className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png"
              alt="Requests Icon"
              className="w-5 h-5 object-contain"
            />
            <span className="text-tribbe-sage group-hover:text-tribbe-lime">Requests</span>
            <span className="font-medium group-hover:text-tribbe-lime">12</span>
          </div>
          <div className="flex items-center gap-2" onClick={handleAutomateToggle}>
            <Label htmlFor="auto-tribbe" className="text-tribbe-sage group-hover:text-tribbe-lime cursor-pointer">
              Automate
            </Label>
            <Switch
              id="auto-tribbe"
              checked={autoTribbe}
              onCheckedChange={setAutoTribbe}
              className="data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-tribbe-lime border border-tribbe-lime"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
