import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupportedCurrency } from "@/features/wallet/constants";

interface CurrencyTabsProps {
  selectedCurrency: SupportedCurrency;
  onCurrencyChange: (currency: SupportedCurrency) => void;
}

const CurrencyIndicator = ({ currency }: { currency: SupportedCurrency }) => (
  <span className="inline-flex items-center gap-1 sm:gap-1.5 font-medium">
    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-background flex items-center justify-center text-xs border transition-all duration-300 group-data-[state=active]:text-[#A9FF22] group-data-[state=active]:scale-110 group-hover:scale-105">
      {currency.substring(0, 1)}
    </span>
    <span className="text-sm sm:text-base">{currency}</span>
  </span>
);

export function CurrencyTabs({ selectedCurrency, onCurrencyChange }: CurrencyTabsProps) {
  return (
    <Tabs value={selectedCurrency} onValueChange={(value) => onCurrencyChange(value as SupportedCurrency)} className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        {(['KES', 'USD', 'GBP', 'EUR'] as const).map((currency) => (
          <TabsTrigger
            key={currency}
            value={currency}
            className="group data-[state=active]:bg-tribbe-lime data-[state=active]:text-black transition-all duration-300 hover:scale-105 px-2 sm:px-4"
          >
            <CurrencyIndicator currency={currency} />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
