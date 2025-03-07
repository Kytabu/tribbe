
import { Languages } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";

export const SpeechSection = () => {
  return (
    <SettingSection 
      title="Speech" 
      description="For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection."
    >
      <SettingItem 
        icon={<Languages className="w-5 h-5" />} 
        label="Main Language" 
        onClick={() => {}} 
        isLast
      />
    </SettingSection>
  );
};
