
import { useNavigate } from "react-router-dom";
import { HelpCircle, FileText, Lock, Info } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";

export const AboutSection = () => {
  const navigate = useNavigate();
  
  return (
    <SettingSection title="About">
      <SettingItem 
        icon={<HelpCircle className="w-5 h-5" />} 
        label="Help Center" 
        onClick={() => navigate("/help")} 
      />
      
      <SettingItem 
        icon={<FileText className="w-5 h-5" />} 
        label="Terms of Use" 
        onClick={() => {}} 
      />
      
      <SettingItem 
        icon={<Lock className="w-5 h-5" />} 
        label="Privacy Policy" 
        onClick={() => {}} 
      />
      
      <SettingItem 
        icon={<Info className="w-5 h-5" />} 
        label="Tribbe App" 
        value="v1.0.0" 
        isLast
      />
    </SettingSection>
  );
};
