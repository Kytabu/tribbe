
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreHorizontal, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 100;
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
    <div className="space-y-2">
      <Card className="bg-tribbe-grey/50">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-medium text-white">Your Network</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white h-6 px-2 text-xs"
            >
              {isExpanded ? (
                <>Collapse <ChevronUp className="w-3 h-3 ml-1" /></>
              ) : (
                <>View All <ChevronDown className="w-3 h-3 ml-1" /></>
              )}
            </Button>
          </div>
          
          {!isExpanded && (
            <div className="relative">
              <div 
                className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
                ref={scrollContainerRef}
                onScroll={onScroll}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {networkMembers.map((member) => (
                  <img
                    key={member.id}
                    src={member.image}
                    alt={member.name}
                    className="w-6 h-6 flex-shrink-0"
                  />
                ))}
              </div>
              {canScrollLeft && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 h-4 w-4"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-2 w-2" />
                </Button>
              )}
              {canScrollRight && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 h-4 w-4"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-2 w-2" />
                </Button>
              )}
            </div>
          )}

          {isExpanded && (
            <div className="grid grid-cols-6 gap-2">
              {networkMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center gap-1">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-6 h-6"
                  />
                  <span className="text-[10px] text-gray-400">{member.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate("/tribbe-requests")}
        className="w-full h-8 text-xs border-tribbe-lime text-tribbe-lime hover:bg-tribbe-lime hover:text-black"
      >
        <UserPlus className="w-3 h-3 mr-2" />
        Tribbe Requests
      </Button>
    </div>
  );
}
