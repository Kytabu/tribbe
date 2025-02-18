
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shield, ChartLineUp, BadgeCheck, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function StreetCred() {
  const navigate = useNavigate();
  const [creditScore] = useState(720); // Example score
  const maxScore = 850;
  
  const creditFactors = [
    {
      title: "Payment History",
      score: 95,
      description: "You've made all your payments on time",
      icon: BadgeCheck,
      color: "text-green-400"
    },
    {
      title: "Credit Utilization",
      score: 85,
      description: "You're using 15% of your available credit",
      icon: CreditCard,
      color: "text-blue-400"
    },
    {
      title: "Length of Credit",
      score: 75,
      description: "Your credit history is 2 years old",
      icon: ChartLineUp,
      color: "text-yellow-400"
    },
    {
      title: "Credit Mix",
      score: 80,
      description: "You have a good mix of credit types",
      icon: Shield,
      color: "text-purple-400"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-green-400";
    if (score >= 650) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/flami")}
            className="hover:bg-tribbe-lime/20"
          >
            <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h2 className="text-2xl font-righteous text-tribbe-lime">My Street Cred</h2>
        </div>

        {/* Main Score Card */}
        <Card className="p-8 bg-gradient-to-br from-background to-muted">
          <div className="text-center space-y-4">
            <h3 className="text-lg text-gray-400">Your Credit Score</h3>
            <div className={`text-6xl font-bold ${getScoreColor(creditScore)}`}>
              {creditScore}
            </div>
            <Progress 
              value={(creditScore / maxScore) * 100} 
              className="h-2 w-64 mx-auto"
            />
            <p className="text-sm text-gray-400">
              Out of {maxScore} points • Updated today
            </p>
          </div>
        </Card>

        {/* Credit Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditFactors.map((factor) => (
            <Card 
              key={factor.title} 
              className="p-6 bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-black/20 ${factor.color}`}>
                  <factor.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">{factor.title}</h4>
                    <span className={`text-lg font-bold ${getScoreColor(factor.score)}`}>
                      {factor.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{factor.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="p-6 bg-tribbe-grey/50">
          <h3 className="text-lg font-medium text-white mb-4">How to Improve Your Score</h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>• Make all loan payments on time</li>
            <li>• Keep your credit utilization below 30%</li>
            <li>• Maintain a mix of different credit types</li>
            <li>• Build longer credit history</li>
          </ul>
        </Card>
      </div>
    </AppLayout>
  );
}
