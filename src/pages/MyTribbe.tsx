import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Wallet,
  ChartLine,
  BadgeCheck,
  CreditCard,
  UserPlus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState, useRef } from "react";

export default function MyTribbe() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mock data - In a real app, this would come from your backend
  const stats = {
    networkSize: 12,
    activeCircles: 3,
    totalLent: 15000,
    creditScore: 720,
    trustScore: 85
  };

  // Updated network members with new profile pictures
  const networkMembers = [
    { id: 1, name: "Sarah", image: "/lovable-uploads/237ca64a-021e-4578-9f08-b9fb2245f01e.png" },
    { id: 2, name: "Marcus", image: "/lovable-uploads/02bff5e9-ea21-4298-ad23-9d9ce111b691.png" },
    { id: 3, name: "James", image: "/lovable-uploads/e25c10fb-ede6-40a6-be94-ae27ae122714.png" },
    { id: 4, name: "Diana", image: "/lovable-uploads/bc82d70e-eb04-4dc9-82d5-a9f4e4c0c0e8.png" },
    { id: 5, name: "Michael", image: "/lovable-uploads/c3603a81-6764-4f8a-bf9a-f8fa6f277493.png" },
    { id: 6, name: "Lisa", image: "/lovable-uploads/eaebdf3c-f654-426e-9882-d23cfc6c3be2.png" },
    { id: 7, name: "John", image: "/lovable-uploads/5cd0a2a3-10ab-405a-957a-918146dc1cc6.png" },
    { id: 8, name: "Angela", image: "/lovable-uploads/42287469-a1c7-4d88-b55c-db500133e882.png" },
    { id: 9, name: "David", image: "/lovable-uploads/cff39b6d-626c-4165-9ffe-16558234dc9b.png" },
    { id: 10, name: "Rachel", image: "/lovable-uploads/caae7b31-135b-4f5d-a905-5e292142cbb9.png" },
    { id: 11, name: "Chris", image: "/lovable-uploads/bf1a4aaa-ea56-44a2-a14f-183edcf2b8b3.png" },
    { id: 12, name: "Tanya", image: "/lovable-uploads/289c745d-027d-40b4-8355-97b6a87d064e.png" }
  ];

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

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto space-y-6 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">My Tribbe</h1>
          <Button 
            onClick={() => navigate("/circles")}
            className="bg-tribbe-lime hover:bg-tribbe-lime/90 text-black"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Grow Network
          </Button>
        </div>

        {/* Trust Score Card */}
        <Card className="bg-tribbe-grey/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-white">Trust Score</h2>
                <p className="text-sm text-gray-400">Based on your Tribbe activity</p>
              </div>
              <div className="text-3xl font-bold text-tribbe-lime">{stats.trustScore}%</div>
            </div>
            <Progress value={stats.trustScore} className="h-2" />
          </CardContent>
        </Card>

        {/* Network Members Section */}
        <Card className="bg-tribbe-grey/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Your Network</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/circles")}
                className="text-gray-400 hover:text-white"
              >
                View All <MoreHorizontal className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div 
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                ref={scrollContainerRef}
                onScroll={handleScroll}
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
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Network Size */}
          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Network Size</h3>
                  <p className="text-2xl font-bold text-white">{stats.networkSize}</p>
                  <p className="text-xs text-gray-400">Connected members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Circles */}
          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-green-400">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Active Circles</h3>
                  <p className="text-2xl font-bold text-white">{stats.activeCircles}</p>
                  <p className="text-xs text-gray-400">Current memberships</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Lent */}
          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-yellow-400">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Total Lent</h3>
                  <p className="text-2xl font-bold text-white">
                    KES {stats.totalLent.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">Across all circles</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-6 bg-tribbe-grey/50 hover:bg-tribbe-grey"
            onClick={() => navigate("/street-cred")}
          >
            <div className="flex items-start gap-4 w-full">
              <div className="p-3 rounded-full bg-black/20 text-purple-400">
                <ChartLine className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Check Credit Score</h3>
                <p className="text-sm text-gray-400">View your current score: {stats.creditScore}</p>
              </div>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-6 bg-tribbe-grey/50 hover:bg-tribbe-grey"
            onClick={() => navigate("/snap-to-pay")}
          >
            <div className="flex items-start gap-4 w-full">
              <div className="p-3 rounded-full bg-black/20 text-pink-400">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Quick Payment</h3>
                <p className="text-sm text-gray-400">Send money via Snap to Pay</p>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
