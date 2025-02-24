
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SupportedCurrency } from "@/pages/Wallet";

interface SendViewProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  autoTribbe: boolean;
  setAutoTribbe: (value: boolean) => void;
}

export function SendView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  autoTribbe,
  setAutoTribbe,
}: SendViewProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
            {selectedCurrency.substring(0, 1)}
          </span>
          <div className="relative rounded-lg border-2 border-tribbe-lime p-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setAmount(value);
              }}
              placeholder="0.00"
              className="text-4xl font-bold pl-16 h-12 bg-transparent border-none focus-visible:ring-0 bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] pointer-events-none whitespace-nowrap">
              {currencySymbols[selectedCurrency]}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <TribbeButton
          imagePath="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png"
          label="Requests"
          info="12"
        />
        <TribbeButton
          imagePath="/lovable-uploads/db93bdb2-b924-4cd9-ba73-27b77b8358d3.png"
          label="My Circles"
          endIcon={<Plus className="w-5 h-5 text-tribbe-sage group-hover:text-tribbe-lime" />}
        />
        <TribbeButton
          imagePath="/lovable-uploads/24f8c963-ad65-4096-be33-ccfa37f896eb.png"
          label="The Tribbe"
          endContent={
            <div className="flex items-center gap-2">
              <span className="text-tribbe-sage group-hover:text-tribbe-lime">Automate</span>
              <Switch
                checked={autoTribbe}
                onCheckedChange={setAutoTribbe}
                className="data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-tribbe-lime border border-tribbe-lime"
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
