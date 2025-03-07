
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const DataControls = () => {
  const navigate = useNavigate();
  const [improveModel, setImproveModel] = useState(true);
  const [includeAudio, setIncludeAudio] = useState(false);
  const [includeVideo, setIncludeVideo] = useState(false);

  return (
    <AppLayout>
      <div className="container max-w-md mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h1 className="text-xl font-semibold text-tribbe-lime">Data Controls</h1>
        </div>
        
        {/* Improve model section */}
        <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20 mb-6 p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-tribbe-white">Improve the model for everyone</h2>
            <Switch 
              checked={improveModel}
              onCheckedChange={setImproveModel}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
          </div>
          <p className="text-tribbe-white/70 text-sm">
            Allow your content to be used to train our models, which makes ChatGPT better for you and everyone who uses it. We take steps to protect your privacy. 
            <span className="text-tribbe-lime ml-1 cursor-pointer">Learn more</span>
          </p>
        </div>
        
        {/* Voice Mode section */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-tribbe-white/50 uppercase tracking-wide mb-3">
            VOICE MODE
          </h2>
          <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg text-tribbe-white">Include your audio recordings</h2>
              <Switch 
                checked={includeAudio}
                onCheckedChange={setIncludeAudio}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg text-tribbe-white">Include your video recordings</h2>
              <Switch 
                checked={includeVideo}
                onCheckedChange={setIncludeVideo}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <p className="text-tribbe-white/70 text-sm mt-2">
              Include your audio or video recordings from Voice Mode to train our models. Transcripts and other files are covered by "Improve the model for everyone."
              <span className="text-tribbe-lime ml-1 cursor-pointer">Learn more</span>
            </p>
          </div>
        </div>
        
        {/* Chat Controls */}
        <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20 mb-6">
          <button className="w-full px-4 py-3.5 text-left text-red-500 text-lg">
            Delete All Chats
          </button>
        </div>
        
        {/* Account Controls */}
        <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20">
          <button className="w-full px-4 py-3.5 text-left text-tribbe-white text-lg">
            Export Data
          </button>
          <Separator className="bg-tribbe-lime/10" />
          <button className="w-full px-4 py-3.5 text-left text-red-500 text-lg">
            Delete Account
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default DataControls;
