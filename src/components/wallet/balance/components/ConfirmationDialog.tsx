
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  iconBackground?: string;
  iconColor?: string;
  content?: React.ReactNode;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  children?: React.ReactNode;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  icon,
  iconBackground = "bg-green-100",
  iconColor = "text-green-500",
  content,
  primaryActionLabel = "Done",
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  children
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-4">
          {icon && (
            <div className={`w-16 h-16 rounded-full ${iconBackground} flex items-center justify-center mb-4`}>
              {icon}
            </div>
          )}
          
          {content}
          {children}
          
          <div className="w-full flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 mt-4">
            {secondaryActionLabel && (
              <Button 
                variant="outline" 
                onClick={onSecondaryAction}
                className="w-full sm:w-auto"
              >
                {secondaryActionLabel}
              </Button>
            )}
            <Button 
              onClick={onPrimaryAction}
              className={`w-full ${secondaryActionLabel ? 'sm:w-auto' : 'sm:w-full'}`}
            >
              {primaryActionLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
