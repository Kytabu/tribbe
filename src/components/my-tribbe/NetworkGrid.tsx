
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface NetworkGridProps {
  networkMembers: Array<{
    id: number;
    name: string;
    image: string;
  }>;
  onViewAllClick: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScroll: () => void;
}

export function NetworkGrid({ 
  networkMembers, 
  onViewAllClick, 
  scrollContainerRef,
  canScrollLeft,
  canScrollRight,
  onScroll
}: NetworkGridProps) {
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Card className="bg-tribbe-grey/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Your Network</h2>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onViewAllClick}
            className="text-gray-400 hover:text-white"
          >
            View All <MoreHorizontal className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="relative">
          <div 
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
            ref={scrollContainerRef}
            onScroll={onScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {networkMembers.map((member) => (
              <img
                key={member.id}
                src={member.image}
                alt={member.name}
                className="w-12 h-12 flex-shrink-0"
              />
            ))}
          </div>
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
