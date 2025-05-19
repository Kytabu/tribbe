
import { Switch } from "@/components/ui/switch";

interface CircleDepositsAutomationProps {
  autoCircleDeposits: boolean;
  setAutoCircleDeposits: (value: boolean) => void;
}

export function CircleDepositsAutomation({
  autoCircleDeposits,
  setAutoCircleDeposits
}: CircleDepositsAutomationProps) {
  return (
    <div className="p-2 rounded-lg border bg-tribbe-grey/80 border-zinc-800">
      <div className="flex items-center justify-between p-2">
        <div className="text-sm font-medium">Automate Circle Deposits</div>
        <Switch
          checked={autoCircleDeposits}
          onCheckedChange={setAutoCircleDeposits}
          className="data-[state=checked]:bg-tribbe-lime"
        />
      </div>
    </div>
  );
}
