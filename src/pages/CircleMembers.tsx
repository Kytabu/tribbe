
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, Users, Search, Plus, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CircleMembers = () => {
  const navigate = useNavigate();
  const { id: circleId } = useParams();

  // Mock data for members
  const mockMembers = [
    {
      id: 1,
      firstName: "Marvin",
      lastName: "McKinney",
      amount: 3500,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      firstName: "Isabella",
      lastName: "Chen",
      amount: 11000,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      firstName: "Mohamed",
      lastName: "Ahmed",
      amount: 7808,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      firstName: "Sophia",
      lastName: "Rossi",
      amount: 12345,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      firstName: "Sophia",
      lastName: "Rossi",
      amount: 300,
      image: "/placeholder.svg"
    }
  ];

  const totalTarget = 200000;
  const totalRaised = 35000;
  const progressPercentage = (totalRaised / totalTarget) * 100;

  return (
    <AppLayout>
      <div className="space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="space-y-4">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-white">Jemo's Graduation</h1>
          
          {/* Target Amount */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-tribbe-grey/50 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl text-white">200,000 Ksh</span>
            </div>
            
            {/* Progress */}
            <div className="space-y-2">
              <p className="text-white">Raised: Kes {totalRaised.toLocaleString()}</p>
              <div className="h-2 rounded-full bg-tribbe-grey overflow-hidden">
                <div 
                  className="h-full bg-tribbe-lime rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Circle members section */}
        <div className="space-y-4">
          <h2 className="text-2xl text-white font-semibold">Circle members</h2>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search" 
              className="pl-10 bg-tribbe-grey/30 border-none text-white placeholder:text-gray-400"
            />
          </div>

          {/* Members list */}
          <div className="space-y-3">
            {mockMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-tribbe-grey/30 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={member.image}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="text-white">
                    {member.firstName} {member.lastName}
                  </span>
                </div>
                <span className="text-tribbe-lime">
                  Kes {member.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 pt-4">
          <Button className="w-full bg-black text-white hover:bg-black/90">
            <Plus className="w-4 h-4 mr-2" />
            Add members
          </Button>
          <Button 
            variant="outline" 
            className="w-full bg-[#25D366] text-white hover:bg-[#25D366]/90 border-none"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Invite other friends
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default CircleMembers;
