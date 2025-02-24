import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Shield, ChartLine, BadgeCheck, CreditCard, User, Star, MenuIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

export default function StreetCred() {
  const navigate = useNavigate();
  const [creditScore] = useState(720);
  const maxScore = 850;
  const minScore = 300;
  const { openMobile, setOpenMobile, isMobile, open, setOpen } = useSidebar();

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };
  
  const streetCredLevels: StreetCredLevel[] = [
    { name: "The Newbie", color: "#FFCA99", minScore: 300 },
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
  const progressPercentage = ((creditScore - minScore) / (maxScore - minScore)) * 100;

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
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="flex h-14 items-center justify-between">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleMenuClick}
                className="hover:bg-tribbe-lime/20"
              >
                <MenuIcon className="h-5 w-5 text-tribbe-lime" />
              </Button>
              <h2 className="text-lg font-righteous text-tribbe-lime">My Street Cred</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/flami")}
                className="hover:bg-tribbe-lime/20"
              >
                <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container max-w-4xl mx-auto p-4 space-y-4">
          <Card className="p-6 bg-gradient-to-br from-background to-muted">
            <div className="space-y-4">
              <div className="grid grid-cols-3 items-center gap-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="p-0.5 rounded-full"
                    style={{ backgroundColor: currentLevel.color }}
                  >
                    <img 
                      src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png"
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-background"
                    />
                  </div>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: currentLevel.color }}
                  >
                    {currentLevel.name}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <h3 className="text-sm text-gray-400 mb-1">Your Credit Score</h3>
                  <div 
                    className="text-4xl font-bold" 
                    style={{ color: currentLevel.color }}
                  >
                    {creditScore}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-gray-400">My Tribbe Rating</span>
                  <div className="flex items-center">
                    {[...Array(fullStars)].map((_, i) => (
                      <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    {partialStar > 0 && (
                      <div className="relative">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <div 
                          className="absolute top-0 left-0 overflow-hidden"
                          style={{ width: `${partialStar * 100}%` }}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                    )}
                    {[...Array(remainingStars)].map((_, i) => (
                      <Star key={`empty-${i}`} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">4.25/5</span>
                </div>
              </div>

              <div className="relative">
                <div className="flex w-full h-2 rounded-full overflow-hidden">
                  {streetCredLevels.map((level, index) => {
                    const width = index === streetCredLevels.length - 1
                      ? (maxScore - level.minScore) / (maxScore - minScore) * 100
                      : (streetCredLevels[index + 1].minScore - level.minScore) / (maxScore - minScore) * 100;
                    
                    return (
                      <div
                        key={level.name}
                        className="h-full"
                        style={{
                          width: `${width}%`,
                          backgroundColor: level.color,
                        }}
                      />
                    );
                  })}
                </div>
                <div 
                  className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${progressPercentage}%` }}
                >
                  <div 
                    className="w-3 h-3 rounded-full border-2 border-background"
                    style={{ backgroundColor: currentLevel.color }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  Out of {maxScore} points • Updated today
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-tribbe-grey/50">
            <h3 className="text-base font-medium text-white mb-4">Street Cred Levels</h3>
            <div className="space-y-3">
              {streetCredLevels.slice().reverse().map((level) => (
                <div key={level.name} className="flex items-center gap-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: level.color }}
                  >
                    <User className="w-3 h-3 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{level.name}</span>
                        {level.name === currentLevel.name && (
                          <span className="text-xs text-tribbe-lime">Current Level</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{level.minScore}+</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {creditFactors.map((factor) => (
              <Card 
                key={factor.title} 
                className="p-4 bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-black/20 ${factor.color}`}>
                    <factor.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium text-white">{factor.title}</h4>
                      <span className="text-base font-bold" style={{ color: currentLevel.color }}>
                        {factor.score}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{factor.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <h3 className="text-lg font-medium text-white mt-6 mb-3">Ways to Improve Your Score</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {creditTips.map((tip) => (
              <Card 
                key={tip.title} 
                className="p-4 bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-black/20 ${tip.color}`}>
                    <tip.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium text-white mr-2">{tip.title}</h4>
                      <span className="text-base font-bold shrink-0" style={{ color: currentLevel.color }}>
                        {tip.score}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{tip.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-4 bg-tribbe-grey/50">
            <h3 className="text-base font-medium text-white mb-3">How to Improve Your Score</h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>• Make all loan payments on time</li>
              <li>• Keep your credit utilization below 30%</li>
              <li>• Maintain a mix of different credit types</li>
              <li>• Build longer credit history</li>
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
