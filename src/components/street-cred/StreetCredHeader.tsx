
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
  // Safely handle navigation
  const handleNavigation = () => {
    try {
      // Try to use React Router navigation
      const navigate = useNavigate();
      navigate("/flami");
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to standard redirection if needed
      window.location.href = "/flami";
    }
  };
  
  const score = 720;
  const borderColor = getColorForScore(score);
  
  const ProfileButton = (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={handleNavigation}
      className="hover:bg-background/80"
    >
      <div 
        className="p-[0.25px] rounded-full transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: borderColor }}
      >
        <img 
          src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png"
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </Button>
  );

  return (
    <PageHeader 
      title="Street Cred"
      rightIcon={ProfileButton}
      titleClassName="text-lg font-medium"
    />
  );
}
