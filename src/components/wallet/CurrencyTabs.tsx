
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupportedCurrency } from "@/pages/Wallet";

interface CurrencyTabsProps {
  selectedCurrency: SupportedCurrency;
  onCurrencyChange: (currency: SupportedCurrency) => void;
}

const CurrencyIndicator = ({ currency }: { currency: SupportedCurrency }) => (
  <span className="inline-flex items-center gap-1.5 font-medium">
    <span className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs border transition-all duration-300 group-data-[state=active]:text-[#A9FF22] group-data-[state=active]:scale-110 group-hover:scale-105">
      {currency.substring(0, 1)}
    </span>
    {currency}
  </span>
);

export function CurrencyTabs({ selectedCurrency, onCurrencyChange }: CurrencyTabsProps) {
  return (
    <Tabs value={selectedCurrency} onValueChange={(value) => onCurrencyChange(value as SupportedCurrency)} className="w-full max-w-md">
      <TabsList className="grid grid-cols-4 w-full">
        {(['KES', 'USD', 'GBP', 'EUR'] as const).map((currency) => (
          <TabsTrigger
            key={currency}
            value={currency}
            className="group data-[state=active]:bg-tribbe-lime data-[state=active]:text-black transition-all duration-300 hover:scale-105"
          >
            <CurrencyIndicator currency={currency} />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
