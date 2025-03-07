
import { FileX } from "lucide-react";

export function EmptyRequestsState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <FileX className="w-12 h-12 text-muted-foreground mb-3" />
      <h3 className="font-medium text-sm">No Requests</h3>
      <p className="text-sm text-muted-foreground mt-1">
        You don't have any money requests at the moment.
      </p>
    </div>
  );
}
