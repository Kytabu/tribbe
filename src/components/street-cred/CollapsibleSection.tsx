
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false 
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="overflow-hidden bg-tribbe-grey/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-tribbe-grey/80 transition-colors">
            <h3 className="text-base font-medium text-white">{title}</h3>
            <div className="transition-transform duration-200">
              {isOpen ? (
                <ChevronDown className="h-5 w-5 text-tribbe-lime" />
              ) : (
                <ChevronRight className="h-5 w-5 text-tribbe-lime" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className={cn(
          "overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        )}>
          <div className="p-4 pt-0 border-t border-tribbe-grey/30">
            {children}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
