
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { BadgeCheck, CreditCard, ChartLine, Shield, User, Users, Network } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CreditFactor {
  title: string;
  score: number;
  description: string;
  icon: string;
  color: string;
}

interface CreditFactorsProps {
  factors: CreditFactor[];
  onLearnMore?: (factor: CreditFactor) => void;
}

export function CreditFactors({ factors, onLearnMore }: CreditFactorsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BadgeCheck': return BadgeCheck;
      case 'CreditCard': return CreditCard;
      case 'ChartLine': return ChartLine;
      case 'Shield': return Shield;
      case 'User': return User;
      case 'Users': return Users;
      case 'Network': return Network;
      default: return BadgeCheck;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {factors.map((factor) => {
        const IconComponent = getIcon(factor.icon);
        
        return (
          <Card 
            key={factor.title} 
            className="p-4 bg-tribbe-grey/70 hover:bg-tribbe-grey transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full bg-black/20 ${factor.color}`}>
                  <IconComponent className="w-4 h-4" />
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
              {onLearnMore && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1 h-8 ml-2 hover:bg-white/10"
                  onClick={() => onLearnMore(factor)}
                >
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
