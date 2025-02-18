
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, Users, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CircleMembers = () => {
  const navigate = useNavigate();
  const { id: circleId } = useParams();

  // Generate mock member data with names and profile pictures
  const mockMembers = [
    {
      id: 1,
      firstName: "Marvin",
      lastName: "McKinney",
      amount: 12000,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      firstName: "Isabella",
      lastName: "Chen",
      amount: 8000,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      firstName: "James",
      lastName: "Cooper",
      amount: 15000,
      image: "/placeholder.svg"
    },
  ];

  const totalTarget = 200000;
  const totalRaised = 35000;
  const progressPercentage = (totalRaised / totalTarget) * 100;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-righteous text-white">Jemo's Graduation</h1>
        </div>

        {/* Target Amount and Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tribbe-grey/50 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl text-white">Kes {totalTarget.toLocaleString()}</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-white">Raised: Kes {totalRaised.toLocaleString()}</p>
            <div className="h-2 rounded-full bg-tribbe-grey/20 overflow-hidden">
              <div 
                className="h-full bg-tribbe-lime rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Circle Members Section */}
        <div className="space-y-4">
          <h2 className="text-xl text-white font-semibold">Circle Members</h2>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search members" 
              className="pl-10 bg-tribbe-grey/30 border-none text-white placeholder:text-gray-400"
            />
          </div>

          {/* Members List */}
          <div className="flex flex-col gap-3">
            {mockMembers.map((member) => (
              <Button
                key={member.id}
                variant="outline"
                className="flex flex-col items-start gap-2 h-auto p-4 hover:bg-tribbe-grey/30"
              >
                <div className="flex items-center gap-3 w-full">
                  <img
                    src={member.image}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-10 h-10 rounded-full object-cover bg-tribbe-grey"
                  />
                  <div className="flex-1">
                    <p className="text-white text-left">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-sm text-gray-400 text-left">
                      Member since {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-tribbe-lime font-medium w-full text-right">
                  Kes {member.amount.toLocaleString()}
                </p>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default CircleMembers;
