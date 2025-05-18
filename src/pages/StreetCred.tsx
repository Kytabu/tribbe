
import { AppLayout } from "@/components/layout/AppLayout";
import { useState } from "react";
import { StreetCredHeader } from "@/components/street-cred/StreetCredHeader";
import { CreditScoreSection } from "@/components/street-cred/CreditScoreSection";
import { TrustScoreSection } from "@/components/street-cred/TrustScoreSection";
import { CollapsibleSection } from "@/components/street-cred/CollapsibleSection";
import { CreditLevels } from "@/components/street-cred/CreditLevels";
import { CreditFactors } from "@/components/street-cred/CreditFactors";
import { Card } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

export default function StreetCred() {
  // Define navigate inside the component function to ensure it's in the Router context
  const navigate = useNavigate();
  const [creditScore] = useState(720);
  const maxScore = 850;
  const minScore = 300;
  
  const streetCredLevels: StreetCredLevel[] = [
    { name: "Newbie", color: "#FFCA99", minScore: 300 },
    { name: "Builder", color: "#F9FE03", minScore: 580 },
    { name: "Trailblazer", color: "#88D3FE", minScore: 670 },
    { name: "Innovator", color: "#A9FF22", minScore: 740 },
    { name: "Legend", color: "#C699FF", minScore: 800 }
  ];

  const getCurrentLevel = (score: number): StreetCredLevel => {
    return streetCredLevels
      .slice()
      .reverse()
      .find(level => score >= level.minScore) || streetCredLevels[0];
  };

  const currentLevel = getCurrentLevel(creditScore);
  const progressPercentage = ((creditScore - minScore) / (maxScore - minScore)) * 100;

  const stats = {
    networkSize: 12,
    activeCircles: 3,
    totalLent: 15000,
    creditScore: 720,
    trustScore: 85
  };

  const creditFactors = [
    {
      title: "Payment History",
      score: 95,
      description: "You've made all your payments on time",
      icon: "BadgeCheck",
      color: "text-green-400"
    },
    {
      title: "Credit Utilization",
      score: 85,
      description: "You're using 15% of your available credit",
      icon: "CreditCard",
      color: "text-blue-400"
    },
    {
      title: "Length of Credit",
      score: 75,
      description: "Your credit history is 2 years old",
      icon: "ChartLine",
      color: "text-yellow-400"
    },
    {
      title: "Credit Mix",
      score: 80,
      description: "You have a good mix of credit types",
      icon: "Shield",
      color: "text-purple-400"
    }
  ];

  const creditTips = [
    {
      title: "Add Boondi",
      score: 90,
      description: "Regular M-Pesa payments boost your reliability score",
      icon: "CreditCard",
      color: "text-green-400"
    },
    {
      title: "Join More Circles",
      score: 85,
      description: "Being in multiple trusted circles increases your score",
      icon: "User",
      color: "text-blue-400"
    },
    {
      title: "Active Lending",
      score: 88,
      description: "Lending to trusted members improves your score",
      icon: "BadgeCheck",
      color: "text-yellow-400"
    },
    {
      title: "Responsible Borrowing",
      score: 82,
      description: "Timely repayments strengthen your credit history",
      icon: "Shield",
      color: "text-purple-400"
    },
    {
      title: "Group Participation",
      score: 87,
      description: "Regular activity in your circles builds credibility",
      icon: "Users",
      color: "text-pink-400"
    },
    {
      title: "Network Growth",
      score: 84,
      description: "Expanding your trusted network improves your standing",
      icon: "Network",
      color: "text-indigo-400"
    }
  ];

  // Safe navigation function that can be used in any context
  const handleNavigate = (path: string) => {
    try {
      navigate(path);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to standard redirection
      window.location.href = path;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        <StreetCredHeader />
        <div className="container max-w-4xl mx-auto p-4 space-y-5">
          {/* Credit Score Section */}
          <CreditScoreSection 
            creditScore={creditScore}
            currentLevel={currentLevel}
            rating={4.25}
            progressPercentage={progressPercentage}
            streetCredLevels={streetCredLevels}
            maxScore={maxScore}
            profileImage="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png"
          />
          
          {/* Trust Score Section */}
          <TrustScoreSection trustScore={stats.trustScore} />
          
          {/* Collapsible Street Cred Levels */}
          <CollapsibleSection title="Street Cred Levels">
            <CreditLevels 
              streetCredLevels={streetCredLevels} 
              currentLevel={currentLevel}
              onLearnMore={(level) => console.log(`Learn more about ${level.name}`)}
            />
          </CollapsibleSection>
          
          {/* Collapsible Credit Factors */}
          <CollapsibleSection title="Credit Factors">
            <CreditFactors 
              factors={creditFactors}
              onLearnMore={(factor) => console.log(`Learn more about ${factor.title}`)}
            />
          </CollapsibleSection>
          
          {/* Collapsible Ways to Improve Score */}
          <CollapsibleSection title="Ways to Improve Your Score">
            <CreditFactors 
              factors={creditTips}
              onLearnMore={(tip) => console.log(`Learn more about ${tip.title}`)}
            />
          </CollapsibleSection>
          
          {/* How to Improve Your Score */}
          <Card className="p-4 bg-tribbe-grey/50 relative">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-medium text-white">How to Improve Your Score</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 rounded-full hover:bg-white/10"
                onClick={() => handleNavigate("/learn-more/improve-score")}
              >
                <InfoIcon className="h-4 w-4 text-tribbe-lime" />
              </Button>
            </div>
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
