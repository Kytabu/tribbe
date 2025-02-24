
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";

const getColorForScore = (score: number): string => {
  if (score >= 800) return "#C699FF"; // Legend
  if (score >= 740) return "#A9FF22"; // Innovator
  if (score >= 670) return "#88D3FE"; // Trailblazer
  if (score >= 580) return "#F9FE03"; // Builder
  return "#FFCA99"; // Newbie
};

export function StreetCredHeader() {
  const navigate = useNavigate();
  const score = 720;
  const borderColor = getColorForScore(score);
  
  const ProfileButton = (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={() => navigate("/flami")}
      className="hover:bg-background/80"
    >
      <div 
        className="p-[0.25px] rounded-full"
        style={{ backgroundColor: borderColor }}
      >
        <img 
          src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </Button>
    </div>
  );

  return (
    <PageHeader 
      title="My Street Cred"
      rightIcon={ProfileButton}
      titleClassName="text-lg"
    />
  );
}
