
import { Card } from "@/components/ui/card";
import { Star, User } from "lucide-react";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

interface CreditScoreCardProps {
  creditScore: number;
  currentLevel: StreetCredLevel;
  rating: number;
  progressPercentage: number;
  streetCredLevels: StreetCredLevel[];
  maxScore: number;
}

export function CreditScoreCard({
  creditScore,
  currentLevel,
  rating,
  progressPercentage,
  streetCredLevels,
  maxScore
}: CreditScoreCardProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const remainingStars = 5 - Math.ceil(rating);

  return (
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
                ? (maxScore - level.minScore) / (maxScore - 300) * 100
                : (streetCredLevels[index + 1].minScore - level.minScore) / (maxScore - 300) * 100;
              
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
  );
}
