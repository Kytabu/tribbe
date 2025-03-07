
import { Volume, VolumeX } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";

export const VoiceModeSection = () => {
  return (
    <SettingSection 
      title="Voice Mode" 
      description="Background conversations keep the conversation going in other apps or while your screen is off."
    >
      <SettingItem 
        icon={<Volume className="w-5 h-5" />} 
        label="Voice" 
        value="Flami" 
        onClick={() => {}} 
      />
      
      <SettingItem 
        icon={<VolumeX className="w-5 h-5" />} 
        label="Background Conversations" 
        checked={true}
        onCheckedChange={() => {}}
        isLast
      />
    </SettingSection>
  );
};
