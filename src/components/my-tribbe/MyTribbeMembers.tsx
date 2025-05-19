
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Member {
  id: number;
  name: string;
  image: string;
}

interface MyTribbeMembersProps {
  networkMembers: Member[];
  onShowAllMembers: () => void;
}

export const MyTribbeMembers: React.FC<MyTribbeMembersProps> = ({ 
  networkMembers, 
  onShowAllMembers 
}) => {
  return (
    <div className="pt-2">
      <Card className="bg-tribbe-grey/50">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold text-white mb-3">My Tribbe</h2>
          <div className="grid grid-cols-4 gap-4">
            {networkMembers.slice(0, 8).map((member) => (
              <div key={member.id} className="flex flex-col items-center gap-2">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-center text-gray-300">{member.name}</span>
              </div>
            ))}
          </div>
          {networkMembers.length > 8 && (
            <div className="mt-3 text-center">
              <Badge 
                variant="outline" 
                className="text-xs bg-transparent border-gray-600 text-gray-400 cursor-pointer hover:bg-tribbe-grey"
                onClick={onShowAllMembers}
              >
                +{networkMembers.length - 8} more
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
