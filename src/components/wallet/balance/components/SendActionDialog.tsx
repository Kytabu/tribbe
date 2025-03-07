
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Users } from "lucide-react";

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
          <DialogTitle className="text-center">How would you like to send?</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <Button 
            className="w-full flex items-center justify-center gap-2" 
            variant="outline"
            onClick={onTapToSend}
          >
            <QrCode className="h-5 w-5" />
            <span>QR Code to send</span>
          </Button>
          
          <Button 
            className="w-full flex items-center justify-center gap-2" 
            variant="outline"
            onClick={onContacts}
          >
            <Users className="h-5 w-5" />
            <span>Contacts</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
