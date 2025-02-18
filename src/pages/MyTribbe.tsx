
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
  MoreHorizontal
} from "lucide-react";

export default function MyTribbe() {
  const navigate = useNavigate();

  // Mock data - In a real app, this would come from your backend
  const stats = {
    networkSize: 24,
    activeCircles: 3,
    totalLent: 15000,
    creditScore: 720,
    trustScore: 85
  };

  // Updated network members with new profile pictures
  const networkMembers = [
    { id: 1, name: "Marcus", image: "/lovable-uploads/f29046e7-6c9f-4575-b220-e2d0a678b967.png" },
    { id: 2, name: "Aisha", image: "/lovable-uploads/99f41a26-6b2a-406b-a31a-c22eb89c42b8.png" },
    { id: 3, name: "Michael", image: "/lovable-uploads/5e55cc02-ae1b-40fc-b807-633a5540308a.png" },
    { id: 4, name: "Tim", image: "/lovable-uploads/c8a61242-9472-4c27-a50d-adbc2e7a24b0.png" },
    { id: 5, name: "Crystal", image: "/lovable-uploads/29034cbf-7a42-409d-bad4-0f84c8fd02e7.png" },
    { id: 6, name: "Marcus B", image: "/lovable-uploads/aa757ca5-a282-4eac-9369-b740b480634b.png" },
    { id: 7, name: "Julie", image: "/lovable-uploads/fe9a1b29-6cb9-4261-b765-b18704cc84df.png" },
    { id: 8, name: "Tracy", image: "/lovable-uploads/e9d2cccf-1741-44e2-9dc4-477305cc0dae.png" },
    { id: 9, name: "Casey", image: "/lovable-uploads/c9f9a69f-1921-4c6f-8a7c-9813e9daf14b.png" },
    { id: 10, name: "Jordan", image: "/lovable-uploads/4824985b-0953-47d2-a395-2c5071a76006.png" },
    { id: 11, name: "Sam", image: "/lovable-uploads/c1c23c5c-90f5-4baa-a4b9-25ac8900c468.png" },
    { id: 12, name: "Riley", image: "/lovable-uploads/3dd625e4-28a3-4005-92a7-0b2aad3fa575.png" },
    { id: 13, name: "Chris", image: "/lovable-uploads/a66bb083-0a55-45b2-9fbb-b899fee07494.png" },
    { id: 14, name: "Alex", image: "/lovable-uploads/a5a73b4a-8203-4833-8bd4-842288944144.png" },
    { id: 15, name: "Sidney", image: "/lovable-uploads/89161f75-e901-43d2-835f-e937209cbbac.png" }
  ];

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
            <div className="flex flex-wrap gap-4">
              {networkMembers.slice(0, 7).map((member) => (
                <Avatar key={member.id} className="w-12 h-12 border-2 border-tribbe-grey">
                  {member.image ? (
                    <AvatarImage src={member.image} alt={member.name} />
                  ) : (
                    <AvatarFallback className="bg-tribbe-grey text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
              ))}
              {stats.networkSize > 7 && (
                <Button 
                  variant="outline" 
                  className="w-12 h-12 rounded-full bg-tribbe-grey/50 hover:bg-tribbe-grey border-2 border-tribbe-grey"
                  onClick={() => navigate("/circles")}
                >
                  +{stats.networkSize - 7}
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
