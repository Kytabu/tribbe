
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CircleMembers = () => {
  const navigate = useNavigate();
  const { id: circleId } = useParams();

  // Generate 10 random contributions between 1000 and 50000
  const mockContributions = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    amount: Math.floor(Math.random() * 49000) + 1000, // Random amount between 1000 and 50000
    created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random date within last 30 days
  }));

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h1 className="text-xl font-righteous text-white">Members</h1>
        </div>

        {/* Members count */}
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span>{mockContributions.length} contributors</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {mockContributions.map((contribution, index) => (
            <Button
              key={contribution.id}
              variant="outline"
              className="flex flex-col items-start gap-2 h-auto p-4 hover:bg-tribbe-grey/30"
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 rounded-full bg-tribbe-grey flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-white">Contributor {index + 1}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(contribution.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-tribbe-lime font-medium w-full text-right">
                Kes {contribution.amount.toLocaleString()}
              </p>
            </Button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default CircleMembers;
