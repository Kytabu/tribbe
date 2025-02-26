
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

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
  const [interestRate, setInterestRate] = useState([0]);

  return (
    <div className="space-y-4">
      {/* Interest Rate Slider */}
      <div className="p-4 rounded-lg border bg-background">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Tip Rate</div>
            <div className="bg-tribbe-aqua/10 px-2 py-1 rounded text-tribbe-aqua text-sm font-medium">
              {interestRate}%
            </div>
          </div>
          <Slider
            defaultValue={[0]}
            max={9}
            step={1}
            value={interestRate}
            onValueChange={setInterestRate}
            className="w-full [&_[role=slider]]:bg-tribbe-aqua [&_[role=slider]]:border-tribbe-aqua [&_[class*=range]]:bg-tribbe-aqua"
          />
        </div>
      </div>

      {/* Automation Switches */}
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
    </div>
  );
}
