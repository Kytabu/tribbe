
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { UserPlus, ChevronRight, MessageSquare, Bell, BarChart3, Wallet } from "lucide-react";
import { useState, useRef } from "react";
import { ContactList } from "@/components/my-tribbe/ContactList";
import { NetworkGrid } from "@/components/my-tribbe/NetworkGrid";
import { StatisticsGrid } from "@/components/my-tribbe/StatisticsGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { NetworkMembers } from "@/components/my-tribbe/NetworkMembers";

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

const stats = {
  networkSize: 12,
  activeCircles: 3,
  totalLent: 15000,
  creditScore: 720,
  trustScore: 85
};

function TribbeContent() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showContactList, setShowContactList] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showAllMembers, setShowAllMembers] = useState(false);

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
    <div className="w-full">
      <PageHeader 
        title="Tribbe"
        rightIcon={<UserPlus className="h-5 w-5 text-tribbe-lime" />}
        onRightIconClick={() => setShowContactList(true)}
      />

      <div className="px-4 space-y-6">
        {/* Tribbe Snapshot Section */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-white mb-3">Tribbe Snapshot</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-tribbe-grey/50">
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-400">Network Size</span>
                  <span className="text-xl font-bold text-white">{stats.networkSize}</span>
                  <span className="text-xs text-gray-400">Active members</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-tribbe-grey/50">
              <CardContent className="p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-gray-400">Active Circles</span>
                  <span className="text-xl font-bold text-white">{stats.activeCircles}</span>
                  <span className="text-xs text-gray-400">Current circles</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Your Network Section with spacing added above */}
        <div className="pt-2">
          <Card className="bg-tribbe-grey/50">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-white mb-3">My Tribbe</h2>
              <div className="grid grid-cols-4 gap-4">
                {networkMembers.slice(0, 8).map((member) => (
                  <div key={member.id} className="flex flex-col items-center gap-2">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-center text-gray-300">{member.name}</span>
                  </div>
                ))}
              </div>
              {networkMembers.length > 8 && (
                <div className="mt-3 text-center">
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-transparent border-gray-600 text-gray-400 cursor-pointer hover:bg-tribbe-grey"
                    onClick={() => setShowAllMembers(true)}
                  >
                    +{networkMembers.length - 8} more
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Manage Members Section */}
        <div>
          <Card 
            className="bg-tribbe-grey/50 hover:bg-tribbe-grey/70 transition-colors cursor-pointer"
            onClick={() => navigate("/tribbe-requests")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-black/20 text-tribbe-lime">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">Manage Members</h3>
                    <p className="text-xs text-gray-400">Add or remove Tribbe members</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Hub */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Communication Hub</h2>
          <Card className="bg-tribbe-grey/50">
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-black/20 text-blue-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-400">Group Chat</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-black/20 text-yellow-400">
                    <Bell className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-400">Announcements</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded-full bg-black/20 text-green-400">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-400">Stats</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Planning */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Financial Planning</h2>
          <Card className="bg-tribbe-grey/50">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-black/20 text-purple-400">
                      <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white">Retreat</h3>
                      <p className="text-xs text-gray-400">Savings goal</p>
                    </div>
                  </div>
                  <span className="text-lg font-medium text-tribbe-lime">80%</span>
                </div>
                <Progress value={80} className="h-1.5" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>KES 40,000 saved</span>
                  <span>KES 50,000 goal</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keep the statistics grid but with better spacing */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Financial Overview</h2>
          <StatisticsGrid stats={stats} />
        </div>

        <ContactList
          showContactList={showContactList}
          setShowContactList={setShowContactList}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />

        <NetworkMembers 
          showAllMembers={showAllMembers} 
          setShowAllMembers={setShowAllMembers} 
          networkMembers={networkMembers}
        />
      </div>
    </div>
  );
}

export default function MyTribbe() {
  return (
    <AppLayout>
      <TribbeContent />
    </AppLayout>
  );
}
