
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MoneyRequest } from "../types";
import { RequestListItem } from "./RequestListItem";

interface RequestsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requests: MoneyRequest[];
  onAction: (id: number, direction: 'left' | 'right') => void;
  slidingRequests: {[key: number]: 'left' | 'right'};
  currencySymbol: string;
}

export function RequestsSheet({ 
  open, 
  onOpenChange, 
  requests, 
  onAction, 
  slidingRequests,
  currencySymbol 
}: RequestsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Money Requests</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {requests.map((request) => (
            <RequestListItem
              key={request.id}
              request={request}
              onAction={onAction}
              slidingDirection={slidingRequests[request.id]}
              currencySymbol={currencySymbol}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
