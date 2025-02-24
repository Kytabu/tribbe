
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CreditFactor {
  title: string;
  score: number;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface CreditFactorsProps {
  factors: CreditFactor[];
}

export function CreditFactors({ factors }: CreditFactorsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {factors.map((factor) => (
        <Card 
          key={factor.title} 
          className="p-4 bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full bg-black/20 ${factor.color}`}>
              <factor.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium text-white">{factor.title}</h4>
                <span className="text-base font-bold text-tribbe-lime">
                  {factor.score}%
                </span>
              </div>
              <p className="text-xs text-gray-400">{factor.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
