
import { Card } from "@/components/ui/card";
import { Star, UserRound } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface StreetCredLevel {
  name: string;
  color: string;
  minScore: number;
}

interface CreditScoreSectionProps {
  creditScore: number;
  currentLevel: StreetCredLevel;
  rating: number;
  progressPercentage: number;
  streetCredLevels: StreetCredLevel[];
  maxScore: number;
  profileImage: string;
}

export function CreditScoreSection({
  creditScore,
  currentLevel,
  rating,
  progressPercentage,
  streetCredLevels,
  maxScore,
  profileImage
}: CreditScoreSectionProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const remainingStars = 5 - Math.ceil(rating);

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted overflow-hidden relative">
      <div className="space-y-5">
        <div className="flex items-center">
          <div className="mr-3">
            <span 
              className="text-base font-semibold"
              style={{ color: currentLevel.color }}
            >
              {currentLevel.name}
            </span>
          </div>
          
          <Avatar className="h-8 w-8 border-2" style={{ borderColor: currentLevel.color }}>
            <AvatarImage src={profileImage} alt="Profile" />
            <AvatarFallback>
              <UserRound className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="grid grid-cols-2 items-center gap-2">
          <div className="flex flex-col justify-center">
            <div 
              className="text-5xl font-bold transition-all" 
              style={{ color: currentLevel.color }}
            >
              {creditScore}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Out of {maxScore} points • Updated today
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-gray-400">My Rating</span>
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
          <div className="flex w-full h-2.5 rounded-full overflow-hidden">
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
              className="w-3.5 h-3.5 rounded-full border-2 border-background shadow-md"
              style={{ backgroundColor: currentLevel.color }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
