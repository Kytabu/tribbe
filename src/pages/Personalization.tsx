
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookUser, Brain } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const Personalization = () => {
  const navigate = useNavigate();
  const [customizeEnabled, setCustomizeEnabled] = useState(true);
  const [memoryEnabled, setMemoryEnabled] = useState(true);

  return (
    <AppLayout>
      <div className="container max-w-md mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/setup")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h1 className="text-xl font-semibold text-tribbe-lime">Personalization</h1>
        </div>
        
        {/* Customize Flami Toggle */}
        <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20 px-4 py-3.5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookUser className="w-6 h-6 text-tribbe-lime" />
            <span className="text-tribbe-white text-lg">Customize Flami</span>
          </div>
          <Switch 
            checked={customizeEnabled}
            onCheckedChange={setCustomizeEnabled}
            className="data-[state=checked]:bg-tribbe-lime data-[state=checked]:border-tribbe-lime"
          />
        </div>
        
        {/* Personalization Section */}
        <h2 className="text-sm font-medium text-tribbe-lime/80 mb-4 uppercase tracking-wide">PERSONALIZATION</h2>
        
        {/* Memory Toggle */}
        <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20 px-4 py-3.5 mb-2 flex items-center justify-between">
          <span className="text-tribbe-white text-lg">Memory</span>
          <Switch 
            checked={memoryEnabled}
            onCheckedChange={setMemoryEnabled}
            className="data-[state=checked]:bg-tribbe-lime data-[state=checked]:border-tribbe-lime"
          />
        </div>
        
        {/* Description text */}
        <p className="text-tribbe-white/70 text-sm mb-4 px-1">
          Flami will become more helpful as you chat, picking up on 
          details and preferences to tailor its responses to you.
          <span className="text-tribbe-lime ml-1 cursor-pointer">Learn more</span>
        </p>
        
        <p className="text-tribbe-white/70 text-sm mb-2 px-1">
          To understand what Flami remembers or teach it something 
          new, just chat with it:
        </p>
        
        <ul className="text-tribbe-white/70 text-sm mb-6 px-6 list-disc">
          <li className="mb-1">"Remember that I like concise responses."</li>
          <li className="mb-1">"I just got a puppy!"</li>
          <li className="mb-1">"What do you remember about me?"</li>
          <li>"Where did we leave off on my last project?"</li>
        </ul>
        
        {/* Manage Memory Button */}
        <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20 mb-8">
          <div 
            className="px-4 py-3.5 flex items-center justify-between cursor-pointer" 
            onClick={() => navigate('/memory')}
          >
            <span className="text-tribbe-white text-lg">Manage Memory</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tribbe-white/70">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Personalization;
