
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

// Import our new section components
import { AccountSection } from "@/components/settings/AccountSection";
import { AppSection } from "@/components/settings/AppSection";
import { SpeechSection } from "@/components/settings/SpeechSection";
import { VoiceModeSection } from "@/components/settings/VoiceModeSection";
import { SuggestionsSection } from "@/components/settings/SuggestionsSection";
import { AboutSection } from "@/components/settings/AboutSection";
import { LogoutButton } from "@/components/settings/LogoutButton";

const Setup = () => {
  const navigate = useNavigate();

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
          <h1 className="text-xl font-semibold text-tribbe-lime">Settings</h1>
        </div>
        
        <AccountSection />
        <AppSection />
        <SpeechSection />
        <VoiceModeSection />
        <SuggestionsSection />
        <AboutSection />
        <LogoutButton />
      </div>
    </AppLayout>
  );
};

export default Setup;
