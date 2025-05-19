
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <DialogContent className="bg-tribbe-grey/95 border-tribbe-grey max-w-md sm:max-w-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white">All Tribbe Members</DialogTitle>
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 p-4 max-h-[60vh] overflow-y-auto">
          {networkMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center space-y-2">
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-300 text-center">{member.name}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
