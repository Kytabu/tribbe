
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const CircleMembers = () => {
  const navigate = useNavigate();
  const { id: circleId } = useParams();

  const { data: contributions, isLoading } = useQuery({
    queryKey: ['circle-contributions', circleId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circle_contributions')
        .select('amount, created_at')
        .eq('circle_id', circleId)
        .order('amount', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!circleId,
  });

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
          <span>{contributions?.length || 0} contributors</span>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : contributions?.length === 0 ? (
            <div className="text-center text-gray-400">No members yet</div>
          ) : (
            contributions?.map((contribution, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-tribbe-grey/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tribbe-grey flex items-center justify-center text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white">Contributor {index + 1}</p>
                    <p className="text-sm text-gray-400">
                      {new Date(contribution.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-tribbe-lime font-medium">
                  Kes {contribution.amount.toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CircleMembers;
