
import { HelpCircle, FileText, Lock, Info } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";

export const AboutSection = () => {
  const handleExternalLink = (path: string) => {
    window.open(`https://tribbe.io/app/${path}`, '_blank');
  };
  
  return (
    <SettingSection title="About">
      <SettingItem 
        icon={<HelpCircle className="w-5 h-5" />} 
        label="Help Center" 
        onClick={() => handleExternalLink('helpcenter')} 
      />
      
      <SettingItem 
        icon={<FileText className="w-5 h-5" />} 
        label="Terms of Use" 
        onClick={() => handleExternalLink('termsofuse')} 
      />
      
      <SettingItem 
        icon={<Lock className="w-5 h-5" />} 
        label="Privacy Policy" 
        onClick={() => handleExternalLink('privacypolicy')} 
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
