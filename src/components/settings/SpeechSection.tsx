
import { useState } from "react";
import { Languages } from "lucide-react";
import { SettingSection } from "./SettingSection";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SpeechSection = () => {
  const [mainLanguage, setMainLanguage] = useState("Auto-Detect");
  
  return (
    <SettingSection 
      title="Speech" 
      description="For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection."
    >
      <div className="px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-tribbe-lime">
            <Languages className="w-5 h-5" />
          </div>
          <span className="text-tribbe-white">Main Language</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center text-sm text-tribbe-white/70">
              {mainLanguage}
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
            className="bg-tribbe-grey border border-tribbe-lime/20 text-tribbe-white min-w-[180px] max-h-[300px] overflow-y-auto"
          >
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Auto-Detect")}
            >
              Auto-Detect
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("English (US)")}
            >
              English (US)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("English (UK)")}
            >
              English (UK)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Kiswahili")}
            >
              Kiswahili
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("French")}
            >
              French
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Spanish")}
            >
              Spanish
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Portuguese")}
            >
              Portuguese
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("German")}
            >
              German
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Italian")}
            >
              Italian
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Dutch")}
            >
              Dutch
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Russian")}
            >
              Russian
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Mandarin")}
            >
              Mandarin
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Japanese")}
            >
              Japanese
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Korean")}
            >
              Korean
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Arabic")}
            >
              Arabic
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Hindi")}
            >
              Hindi
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Bengali")}
            >
              Bengali
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Turkish")}
            >
              Turkish
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Vietnamese")}
            >
              Vietnamese
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Thai")}
            >
              Thai
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Greek")}
            >
              Greek
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Polish")}
            >
              Polish
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Swedish")}
            >
              Swedish
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Norwegian")}
            >
              Norwegian
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-tribbe-lime/10 cursor-pointer focus:bg-tribbe-lime/20 focus:text-tribbe-lime" 
              onClick={() => setMainLanguage("Finnish")}
            >
              Finnish
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SettingSection>
  );
};
