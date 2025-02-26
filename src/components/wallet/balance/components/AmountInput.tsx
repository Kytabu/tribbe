
import { Input } from "@/components/ui/input";
import { SupportedCurrency } from "@/features/wallet/constants";

interface AmountInputProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbol: string;
}

export function AmountInput({ amount, setAmount, selectedCurrency, currencySymbol }: AmountInputProps) {
  return (
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
            {currencySymbol}
          </span>
        </div>
      </div>
    </div>
  );
}
