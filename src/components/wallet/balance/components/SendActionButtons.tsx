
import { TribbeButton } from "./TribbeButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  return (
    <div className="space-y-2">
      <TribbeButton
        imagePath="/lovable-uploads/c1c23c5c-90f5-4baa-a4b9-25ac8900c468.png"
        label="To myself"
        info="Instant"
        onClick={onToMyselfClick}
      />
      <TribbeButton
        imagePath="/lovable-uploads/c8a61242-9472-4c27-a50d-adbc2e7a24b0.png"
        label="To others"
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
            <span className="text-tribbe-sage group-hover:text-tribbe-lime">Requests to me</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium group-hover:text-tribbe-lime cursor-pointer" onClick={onRequestsClick}>12</span>
            <div className="flex items-center gap-2 ml-4">
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
    </div>
  );
}
