
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CirclePlus, Search, ChevronRight, MenuIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

interface CircleType {
  id: string;
  name: string;
  type: "Fundraiser" | "Investment" | "Activity" | "Event";
  daysLeft: number;
  amount: number | "Free" | "Chip in";
  progress: number;
  image: string;
}

const circles: CircleType[] = [
  {
    id: "1",
    name: "Jemo's Graduation",
    type: "Fundraiser",
    daysLeft: 19,
    amount: "Chip in",
    progress: 65,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  },
  {
    id: "2",
    name: "Sam & Co. Ltd",
    type: "Investment",
    daysLeft: 70,
    amount: 500000,
    progress: 80,
    image: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  },
  {
    id: "3",
    name: "Peter's Place",
    type: "Activity",
    daysLeft: 8,
    amount: "Free",
    progress: 40,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
  },
  {
    id: "4",
    name: "Boyz II Men",
    type: "Event",
    daysLeft: 13,
    amount: 3000,
    progress: 25,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  },
  {
    id: "5",
    name: "Cucu's Funeral",
    type: "Fundraiser",
    daysLeft: 9,
    amount: "Chip in",
    progress: 15,
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2",
  },
];

const CircleItem = ({ circle }: { circle: CircleType }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
      <button 
        className="w-full p-4 flex items-center gap-4"
        onClick={() => navigate(`/circles/${circle.id}`)}
      >
        <img 
          src={circle.image} 
          alt="" 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="text-lg font-medium text-white">{circle.name}</h3>
              <p className="text-sm text-gray-400">
                {circle.type} | {circle.daysLeft} days
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-tribbe-lime">
                {typeof circle.amount === 'number' ? `Kes ${circle.amount.toLocaleString()}` : circle.amount}
              </p>
            </div>
          </div>
          <Progress value={circle.progress} className="h-1.5" />
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </button>
    </Card>
  );
};

// Separate component for the circles content that uses the sidebar
function CirclesContent() {
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { openMobile, setOpenMobile, isMobile, open, setOpen } = useSidebar();

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full border-b">
        <div className="max-w-3xl mx-auto w-full px-4">
          <div className="flex h-14 items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/80"
              onClick={handleMenuClick}
            >
              <MenuIcon className="h-5 w-5 text-tribbe-lime" />
            </Button>
            <h2 className="text-2xl font-righteous text-tribbe-lime">My Circles</h2>
            <div className="flex items-center gap-2">
              <div 
                className={`relative transition-all duration-300 ease-in-out ${
                  isSearchExpanded ? 'w-64' : 'w-10'
                }`}
              >
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`absolute left-0 top-1/2 -translate-y-1/2 hover:bg-background/80 ${
                    isSearchExpanded ? 'bg-transparent' : ''
                  }`}
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                >
                  <Search className="h-5 w-5 text-tribbe-lime" />
                </Button>
                <Input 
                  type="text" 
                  placeholder="Search circles" 
                  className={`pl-10 bg-tribbe-grey/50 border-none text-white placeholder:text-gray-400 transition-all duration-300 ${
                    isSearchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => console.log("Create new circle")}
                className="hover:bg-tribbe-lime/20"
              >
                <CirclePlus className="h-5 w-5 text-tribbe-lime" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {circles.map((circle) => (
          <CircleItem key={circle.id} circle={circle} />
        ))}
      </div>
    </div>
  );
}

// Main Circles component that provides the layout
const Circles = () => {
  return (
    <AppLayout>
      <CirclesContent />
    </AppLayout>
  );
};

export default Circles;
