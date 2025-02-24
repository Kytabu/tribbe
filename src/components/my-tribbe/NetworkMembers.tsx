
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NetworkMembersProps {
  showAllMembers: boolean;
  setShowAllMembers: (show: boolean) => void;
  networkMembers: Array<{
    id: number;
    name: string;
    image: string;
  }>;
}

export function NetworkMembers({ 
  showAllMembers, 
  setShowAllMembers, 
  networkMembers 
}: NetworkMembersProps) {
  return (
    <Dialog open={showAllMembers} onOpenChange={setShowAllMembers}>
      <DialogContent className="bg-tribbe-grey/95 border-tribbe-grey max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white">Network Members</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAllMembers(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-6 gap-4 p-4">
          {networkMembers.slice(0, 6).map((member) => (
            <div key={member.id} className="flex flex-col items-center space-y-2">
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16"
              />
              <p className="text-sm text-gray-300">{member.name}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-4 p-4">
          {networkMembers.slice(6).map((member) => (
            <div key={member.id} className="flex flex-col items-center space-y-2">
              <img
                src={member.image}
                alt={member.name}
                className="w-16 h-16"
              />
              <p className="text-sm text-gray-300">{member.name}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
