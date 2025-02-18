
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Wallet,
  ChartLine,
  BadgeCheck,
  CreditCard,
  UserPlus
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
