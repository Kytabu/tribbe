
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
    <div className="w-full h-[45px] px-3 rounded-lg bg-muted text-card-foreground">
      <div className="flex justify-between items-center w-full h-full">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-tribbe-sage text-sm">{label}</span>
        </div>
        <span className="font-medium text-tribbe-lime text-sm">
          {prefix}{currencySymbol} {amount.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
