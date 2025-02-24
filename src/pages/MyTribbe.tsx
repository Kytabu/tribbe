
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { NetworkGrid } from "@/components/my-tribbe/NetworkGrid";
import { StatisticsGrid } from "@/components/my-tribbe/StatisticsGrid";
import { useNavigate } from "react-router-dom";

export default function MyTribbe() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container max-w-2xl mx-auto py-3">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-lg font-righteous text-tribbe-lime">My Tribbe</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-tribbe-lime hover:bg-tribbe-lime/20"
            onClick={() => {
              // Add this style temporarily to prevent white flash
              document.body.style.backgroundColor = '#F5F1EA'; // tribbe-sand color
              navigate('/tribbe-requests');
            }}
          >
            Tribbe Requests
          </Button>
        </div>
        <StatisticsGrid />
        <NetworkGrid />
      </div>
    </AppLayout>
  );
}
