
import { Check } from "lucide-react";
import { ConfirmationDialog } from "./ConfirmationDialog";

interface SuccessConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  details?: string;
  onDone: () => void;
}

export function SuccessConfirmationDialog({
  open,
  onOpenChange,
  title,
  message,
  details,
  onDone
}: SuccessConfirmationDialogProps) {
  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      icon={<Check className="w-8 h-8 text-green-500" />}
      primaryActionLabel="Done"
      onPrimaryAction={onDone}
      content={
        <>
          <p className="text-center text-lg font-medium mb-2">
            {message}
          </p>
          {details && (
            <p className="text-center text-muted-foreground mb-4">
              {details}
            </p>
          )}
        </>
      }
    />
  );
}
