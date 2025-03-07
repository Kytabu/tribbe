
import { Sparkles } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";

export const SuggestionsSection = () => {
  return (
    <SettingSection title="Suggestions">
      <SettingItem 
        icon={<Sparkles className="w-5 h-5" />} 
        label="Autocomplete" 
        checked={true}
        onCheckedChange={() => {}}
        isLast
      />
    </SettingSection>
  );
};
