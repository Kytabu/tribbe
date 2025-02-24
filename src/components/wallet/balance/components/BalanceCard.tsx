
import { ReactNode } from "react";

interface BalanceCardProps {
  icon: ReactNode;
  label: string;
  amount: number;
  currencySymbol: string;
  prefix?: string;
}

export function BalanceCard({ icon, label, amount, currencySymbol, prefix = "" }: BalanceCardProps) {
  return (
    <div className="w-full h-[60px] px-4 rounded-lg bg-muted text-card-foreground">
      <div className="flex justify-between items-center w-full h-full">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-tribbe-sage">{label}</span>
        </div>
        <span className="font-medium text-tribbe-lime">
          {prefix}{currencySymbol} {amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
