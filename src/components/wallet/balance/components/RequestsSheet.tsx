
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { MoneyRequest } from "../types";
import { RequestListItem } from "./RequestListItem";
import { EmptyRequestsState } from "./EmptyRequestsState";
import { Skeleton } from "@/components/ui/skeleton";

interface RequestsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requests: MoneyRequest[];
  onAction: (id: number, direction: 'left' | 'right') => void;
  slidingRequests: {[key: number]: 'left' | 'right'};
  currencySymbol: string;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  isEmpty?: boolean;
}

export function RequestsSheet({ 
  open, 
  onOpenChange, 
  requests, 
  onAction, 
  slidingRequests,
  currencySymbol,
  isLoading = false,
  error = null,
  onRetry,
  isEmpty = false
}: RequestsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Money Requests</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {isLoading ? (
            // Loading skeleton UI
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="bg-background border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            // Error state
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="text-destructive mb-4 text-sm">
                {error}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetry}
                className="gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Retry
              </Button>
            </div>
          ) : isEmpty || requests.length === 0 ? (
            // Empty state
            <EmptyRequestsState />
          ) : (
            // Requests list
            requests.map((request) => (
              <RequestListItem
                key={request.id}
                request={request}
                onAction={onAction}
                slidingDirection={slidingRequests[request.id]}
                currencySymbol={currencySymbol}
              />
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
