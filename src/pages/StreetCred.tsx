
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { BadgeCheck, CreditCard, Shield, ChartLine, User } from "lucide-react";
import { useState } from "react";
import { StreetCredHeader } from "@/components/street-cred/StreetCredHeader";
import { CreditScoreCard } from "@/components/street-cred/CreditScoreCard";
import { CreditLevels } from "@/components/street-cred/CreditLevels";
import { CreditFactors } from "@/components/street-cred/CreditFactors";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

export default function StreetCred() {
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
        <StreetCredHeader />
        
        <div className="container max-w-4xl mx-auto p-4 space-y-4">
          <CreditScoreCard
            creditScore={creditScore}
            currentLevel={currentLevel}
            rating={4.25}
            progressPercentage={progressPercentage}
            streetCredLevels={streetCredLevels}
            maxScore={maxScore}
          />

          <CreditLevels
            streetCredLevels={streetCredLevels}
            currentLevel={currentLevel}
          />

          <h3 className="text-lg font-medium text-white mt-6 mb-3">Credit Factors</h3>
          <CreditFactors factors={creditFactors} />

          <h3 className="text-lg font-medium text-white mt-6 mb-3">Ways to Improve Your Score</h3>
          <CreditFactors factors={creditTips} />

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
