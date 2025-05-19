
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, ChevronRight } from "lucide-react";

interface ManageMembersProps {
  onNavigate: () => void;
}

export const ManageMembers: React.FC<ManageMembersProps> = ({ onNavigate }) => {
  return (
    <div>
      <Card 
        className="bg-tribbe-grey/50 hover:bg-tribbe-grey/70 transition-colors cursor-pointer"
        onClick={onNavigate}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-black/20 text-tribbe-lime">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-medium text-white">Manage Members</h3>
                <p className="text-xs text-gray-400">Add or remove Tribbe members</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
