import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shield, ChartLine, BadgeCheck, CreditCard, User, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

export default function StreetCred() {
  const navigate = useNavigate();
  const [creditScore] = useState(720);
  const maxScore = 850;
  
  const streetCredLevels: StreetCredLevel[] = [
    { name: "The Newbie", color: "#FFCA99", minScore: 0 },
    { name: "The Builder", color: "#F9FE03", minScore: 580 },
    { name: "The Trailblazer", color: "#88D3FE", minScore: 670 },
    { name: "The Innovator", color: "#A9FF22", minScore: 740 },
    { name: "The Legend", color: "#C699FF", minScore: 800 }
  ];

  const getCurrentLevel = (score: number): StreetCredLevel => {
    return streetCredLevels
      .slice()
      .reverse()
      .find(level => score >= level.minScore) || streetCredLevels[0];
  };

  const currentLevel = getCurrentLevel(creditScore);

  const rating = 4.25;
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const remainingStars = 5 - Math.ceil(rating);

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
      icon: ChartLine,
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

  const creditTips = [
    {
      title: "Use Snap to Pay",
      score: 90,
      description: "Regular M-Pesa payments boost your reliability score",
      icon: CreditCard,
      color: "text-green-400"
    },
    {
      title: "Join More Circles",
      score: 85,
      description: "Being in multiple trusted circles increases your score",
      icon: User,
      color: "text-blue-400"
    },
    {
      title: "Active Lending",
      score: 88,
      description: "Lending to trusted members improves your score",
      icon: BadgeCheck,
      color: "text-yellow-400"
    },
    {
      title: "Responsible Borrowing",
      score: 82,
      description: "Timely repayments strengthen your credit history",
      icon: Shield,
      color: "text-purple-400"
    },
    {
      title: "Group Participation",
      score: 87,
      description: "Active participation in group activities boosts trust",
      icon: ChartLine,
      color: "text-pink-400"
    },
    {
      title: "Network Growth",
      score: 86,
      description: "Inviting trusted friends expands your credibility network",
      icon: User,
      color: "text-orange-400"
    }
  ];

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto space-y-6">
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

        <Card className="p-8 bg-gradient-to-br from-background to-muted">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentLevel.color }}
                >
                  <User className="w-8 h-8 text-black" />
                </div>
                <span 
                  className="text-lg font-medium"
                  style={{ color: currentLevel.color }}
                >
                  {currentLevel.name}
                </span>
              </div>

              <div className="text-center">
                <h3 className="text-lg text-gray-400 mb-2">Your Credit Score</h3>
                <div 
                  className="text-6xl font-bold" 
                  style={{ color: currentLevel.color }}
                >
                  {creditScore}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-gray-400">My Tribbe Rating</span>
                <div className="flex items-center">
                  {[...Array(fullStars)].map((_, i) => (
                    <Star key={`full-${i}`} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                  {partialStar > 0 && (
                    <div className="relative">
                      <Star className="w-6 h-6 text-yellow-400" />
                      <div 
                        className="absolute top-0 left-0 overflow-hidden"
                        style={{ width: `${partialStar * 100}%` }}
                      >
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                  )}
                  {[...Array(remainingStars)].map((_, i) => (
                    <Star key={`empty-${i}`} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-400">4.25/5</span>
              </div>
            </div>

            <div className="text-center">
              <Progress 
                value={(creditScore / maxScore) * 100} 
                className="h-2 w-full mb-2"
                style={{ 
                  '--progress-background': currentLevel.color,
                } as React.CSSProperties}
              />
              <p className="text-sm text-gray-400">
                Out of {maxScore} points • Updated today
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-tribbe-grey/50">
          <h3 className="text-lg font-medium text-white mb-4">Street Cred Levels</h3>
          <div className="space-y-4">
            {streetCredLevels.slice().reverse().map((level) => (
              <div key={level.name} className="flex items-center gap-4">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: level.color }}
                >
                  <User className="w-4 h-4 text-black" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{level.name}</span>
                      {level.name === currentLevel.name && (
                        <span className="text-xs text-tribbe-lime">Current Level</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{level.minScore}+</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

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
                    <span className="text-lg font-bold" style={{ color: currentLevel.color }}>
                      {factor.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{factor.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <h3 className="text-xl font-medium text-white mt-8 mb-4">Ways to Improve Your Score</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {creditTips.map((tip) => (
            <Card 
              key={tip.title} 
              className="p-6 bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full bg-black/20 ${tip.color}`}>
                  <tip.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white mr-4">{tip.title}</h4>
                    <span className="text-lg font-bold shrink-0" style={{ color: currentLevel.color }}>
                      {tip.score}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{tip.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

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
