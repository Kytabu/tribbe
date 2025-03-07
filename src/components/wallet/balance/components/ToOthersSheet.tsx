
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Send, Smartphone } from "lucide-react";

interface ToOthersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTapToSendClick: () => void;
  onSendClick: () => void;
}

export function ToOthersSheet({
  open,
  onOpenChange,
  onTapToSendClick,
  onSendClick
}: ToOthersSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="mb-4">
          <SheetTitle>Send to Others</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6">
          <p className="text-muted-foreground">
            How would you like to send money?
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <Button 
              variant="outline" 
              className="h-16 justify-start gap-3"
              onClick={onTapToSendClick}
            >
              <Smartphone className="h-5 w-5 text-tribbe-lime" />
              <div className="flex flex-col items-start">
                <span>Tap to Send</span>
                <span className="text-xs text-muted-foreground">Send to nearby devices</span>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-16 justify-start gap-3"
              onClick={onSendClick}
            >
              <Send className="h-5 w-5 text-tribbe-lime" />
              <div className="flex flex-col items-start">
                <span>Send</span>
                <span className="text-xs text-muted-foreground">Send to contacts or phone numbers</span>
              </div>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
