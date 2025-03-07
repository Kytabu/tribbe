
import { Volume, VolumeX } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";

export const VoiceModeSection = () => {
  return (
    <SettingSection 
      title="Voice Mode" 
      description="Background conversations keep the conversation going in other apps or while your screen is off."
      className="opacity-60"
    >
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center bg-tribbe-grey/50 z-10 backdrop-blur-[1px]">
          <span className="text-tribbe-white/80 font-medium px-3 py-1.5 bg-tribbe-grey/80 rounded-md border border-tribbe-lime/20">
            Coming Soon
          </span>
        </div>
        
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
      </div>
    </SettingSection>
  );
};
