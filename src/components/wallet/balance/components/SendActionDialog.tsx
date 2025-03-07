
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SendActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTapToSend: () => void;
  onContacts: () => void;
}

export function SendActionDialog({
  open,
  onOpenChange,
  onTapToSend,
  onContacts
}: SendActionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How would you like to send?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button 
            className="w-full" 
            variant="default"
            onClick={onTapToSend}
          >
            Tap to send
          </Button>
          
          <Button 
            className="w-full" 
            variant="outline"
            onClick={onContacts}
          >
            Contacts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
