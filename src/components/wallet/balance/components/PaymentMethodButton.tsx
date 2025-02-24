
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface PaymentMethodButtonProps {
  icon: ReactNode;
  label: string;
  info: string;
}

export function PaymentMethodButton({ icon, label, info }: PaymentMethodButtonProps) {
  return (
    <Button
      variant="ghost"
      className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-tribbe-sage group-hover:text-tribbe-lime">{label}</span>
        </div>
        <span className="font-medium group-hover:text-tribbe-lime">{info}</span>
      </div>
    </Button>
  );
}
