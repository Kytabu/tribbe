
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { RequestListItemProps } from "../types";
import { getCreditScoreColor } from "../utils/creditScoreUtils";

export function RequestListItem({ request, onAction, slidingDirection, currencySymbol }: RequestListItemProps) {
  return (
    <div
      className={`bg-background border rounded-lg p-4 transform transition-all duration-300 ${
        slidingDirection === 'right' 
          ? 'translate-x-full opacity-0' 
          : slidingDirection === 'left'
          ? '-translate-x-full opacity-0'
          : 'translate-x-0'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCreditScoreColor(request.creditScore)} blur-[1px]`} />
            <div className="relative w-10 h-10 rounded-full border-2 border-transparent bg-clip-padding">
              <img
                src={request.image}
                alt={request.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-sm">{request.name}</h3>
            <p className="text-sm text-muted-foreground">
              {currencySymbol}{request.amount}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-red-500/20 hover:text-red-500"
            onClick={() => onAction(request.id, 'left')}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-green-500/20 hover:text-green-500"
            onClick={() => onAction(request.id, 'right')}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
