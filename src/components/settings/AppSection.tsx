
import { useState } from "react";
import { Globe, Moon, Vibrate, SpellCheck, Map } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";
import { useTheme } from "next-themes";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AppSection = () => {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState("English");
  
  return (
    <SettingSection title="App">
      <div className="px-4 py-3.5 flex items-center justify-between border-b border-tribbe-lime/10">
        <div className="flex items-center gap-3">
          <div className="text-tribbe-lime">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-tribbe-white">App Language</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center text-sm text-tribbe-white/70">
              {language}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-1"
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="bg-tribbe-grey border border-tribbe-lime/20 text-tribbe-white min-w-[150px]"
          >
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setLanguage("English")}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setLanguage("Kiswahili")}
            >
              Kiswahili
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setLanguage("Sheng")}
            >
              Sheng
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
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
