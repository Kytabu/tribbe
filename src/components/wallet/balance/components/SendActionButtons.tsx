
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
      <TribbeButton
        imagePath="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png"
        label="Requests to me"
        info="12"
        onClick={onRequestsClick}
        endContent={
          <div className="flex items-center gap-2">
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
        }
      />
    </div>
  );
}
