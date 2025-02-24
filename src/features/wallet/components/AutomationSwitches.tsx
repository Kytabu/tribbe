
import { Switch } from "@/components/ui/switch";

interface AutomationSwitchesProps {
  autoLend: boolean;
  setAutoLend: (value: boolean) => void;
  autoBorrow: boolean;
  setAutoBorrow: (value: boolean) => void;
  autoInterest: boolean;
  setAutoInterest: (value: boolean) => void;
}

export function AutomationSwitches({
  autoLend,
  setAutoLend,
  autoBorrow,
  setAutoBorrow,
  autoInterest,
  setAutoInterest
}: AutomationSwitchesProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <div className="p-2 rounded-lg border bg-background">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium">Automate Lending</div>
          <Switch
            checked={autoLend}
            onCheckedChange={setAutoLend}
            className="data-[state=checked]:bg-tribbe-lime scale-75"
          />
        </div>
      </div>

      <div className="p-2 rounded-lg border bg-background">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium">Automate Borrowing</div>
          <Switch
            checked={autoBorrow}
            onCheckedChange={setAutoBorrow}
            className="data-[state=checked]:bg-tribbe-lime scale-75"
          />
        </div>
      </div>

      <div className="p-2 rounded-lg border bg-background">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium">Automate Repayment</div>
          <Switch
            checked={autoInterest}
            onCheckedChange={setAutoInterest}
            className="data-[state=checked]:bg-tribbe-lime scale-75"
          />
        </div>
      </div>
    </div>
  );
}
