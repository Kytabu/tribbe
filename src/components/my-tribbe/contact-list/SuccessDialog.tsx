
import { ThumbsUp } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDone: () => void;
}

export function SuccessDialog({
  open,
  onOpenChange,
  onDone
}: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <ThumbsUp className="w-6 h-6 text-tribbe-lime" />
          </div>
          
          <h2 className="text-xl font-bold mb-2">Transaction Complete</h2>
          
          <p className="text-center text-base font-medium mb-1">
            Money sent successfully
          </p>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Your transaction has been processed and the funds have been transferred.
          </p>
          
          <Button 
            onClick={onDone}
            className="w-full max-w-xs bg-tribbe-lime hover:bg-tribbe-lime/90 text-black h-12 rounded-full"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
