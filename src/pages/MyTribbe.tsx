
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { NetworkGrid } from "@/components/my-tribbe/NetworkGrid";
import { StatisticsGrid } from "@/components/my-tribbe/StatisticsGrid";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export default function MyTribbe() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mock data for statistics
  const stats = {
    networkSize: 42,
    activeCircles: 3,
    totalLent: 25000,
    creditScore: 750,
    trustScore: 4.5
  };

  // Mock data for network members
  const networkMembers = [
    { id: 1, name: "John Doe", image: "/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" },
    { id: 2, name: "Jane Smith", image: "/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" },
    { id: 3, name: "Alice Johnson", image: "/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" },
  ];

  // Handle scroll events to update scroll buttons visibility
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  // Check initial scroll state
  useEffect(() => {
    handleScroll();
  }, []);

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
              document.body.style.backgroundColor = '#F5F1EA';
              navigate('/tribbe-requests');
            }}
          >
            Tribbe Requests
          </Button>
        </div>
        <StatisticsGrid stats={stats} />
        <NetworkGrid 
          networkMembers={networkMembers}
          onViewAllClick={() => {}}
          scrollContainerRef={scrollContainerRef}
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScroll={handleScroll}
        />
      </div>
    </AppLayout>
  );
}
