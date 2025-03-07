
import { Sparkles } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";
import { useState } from "react";

export const SuggestionsSection = () => {
  const [autocompleteEnabled, setAutocompleteEnabled] = useState(true);

  return (
    <SettingSection title="Suggestions">
      <SettingItem 
        icon={<Sparkles className="w-5 h-5" />} 
        label="Autocomplete" 
        checked={autocompleteEnabled}
        onCheckedChange={setAutocompleteEnabled}
        isLast
      />
    </SettingSection>
  );
};
