
import { Globe, Moon, Vibrate, SpellCheck, Map } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";
import { useTheme } from "next-themes";

export const AppSection = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <SettingSection title="App">
      <SettingItem 
        icon={<Globe className="w-5 h-5" />} 
        label="App Language" 
        value="English" 
        onClick={() => {}} 
      />
      
      <SettingItem 
        icon={<Moon className="w-5 h-5" />} 
        label="Color Scheme" 
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      
      <SettingItem 
        icon={<Vibrate className="w-5 h-5" />} 
        label="Haptic Feedback" 
        checked={true}
        onCheckedChange={() => {}}
      />
      
      <SettingItem 
        icon={<SpellCheck className="w-5 h-5" />} 
        label="Correct Spelling Automatically" 
        checked={true}
        onCheckedChange={() => {}}
      />
      
      <SettingItem 
        icon={<Map className="w-5 h-5" />} 
        label="Map Provider" 
        value="Google Maps" 
        onClick={() => {}} 
        isLast
      />
    </SettingSection>
  );
};
