
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Mail,
  Phone,
  Crown,
  RotateCcw,
  UserCog,
  Bell,
  Database,
  ArchiveIcon,
  Globe,
  Moon,
  Vibrate,
  SpellCheck,
  Map,
  Languages,
  Volume,
  VolumeX,
  Sparkles,
  HelpCircle,
  FileText,
  Lock,
  Info,
  LogOut
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

const Setup = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

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
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
        
        {/* ACCOUNT SECTION */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Account</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>Email</span>
              </div>
              <div className="text-muted-foreground text-sm">user@example.com</div>
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>Phone number</span>
              </div>
              <div className="text-muted-foreground text-sm">+254712345678</div>
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-3">
                <Crown className="w-5 h-5 text-primary" />
                <span>Subscription</span>
              </div>
              <div className="text-muted-foreground text-sm">Tribbe Premium</div>
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <span>Restore purchases</span>
              </div>
              <ChevronRight />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <UserCog className="w-5 h-5 text-primary" />
                <span>Personalization</span>
              </div>
              <ChevronRight />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer"
                 onClick={() => navigate("/notifications")}>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-primary" />
                <span>Notifications</span>
              </div>
              <ChevronRight />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-primary" />
                <span>Data Controls</span>
              </div>
              <ChevronRight />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <ArchiveIcon className="w-5 h-5 text-primary" />
                <span>Archived Chats</span>
              </div>
              <ChevronRight />
            </div>
          </div>
        </div>
        
        {/* APP SECTION */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">App</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-primary" />
                <span>App Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground text-sm mr-1">English</span>
                <ChevronRight />
              </div>
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-primary" />
                <span>Color Scheme</span>
              </div>
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-3">
                <Vibrate className="w-5 h-5 text-primary" />
                <span>Haptic Feedback</span>
              </div>
              <Switch 
                checked={true}
              />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50">
              <div className="flex items-center gap-3">
                <SpellCheck className="w-5 h-5 text-primary" />
                <span>Correct Spelling Automatically</span>
              </div>
              <Switch 
                checked={true}
              />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-primary" />
                <span>Map Provider</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground text-sm mr-1">Google Maps</span>
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
        
        {/* SPEECH SECTION */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Speech</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-primary" />
                <span>Main Language</span>
              </div>
              <ChevronRight />
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-2 px-1">
            For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.
          </p>
        </div>
        
        {/* VOICE MODE SECTION */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Voice Mode</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Volume className="w-5 h-5 text-primary" />
                <span>Voice</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground text-sm mr-1">Flami</span>
                <ChevronRight />
              </div>
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <VolumeX className="w-5 h-5 text-primary" />
                <span>Background Conversations</span>
              </div>
              <Switch 
                checked={true}
              />
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-2 px-1">
            Background conversations keep the conversation going in other apps or while your screen is off.
          </p>
        </div>
        
        {/* SUGGESTIONS SECTION */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">Suggestions</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Autocomplete</span>
              </div>
              <Switch 
                checked={true}
              />
            </div>
          </div>
        </div>
        
        {/* ABOUT SECTION */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wide">About</h2>
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer"
                 onClick={() => navigate("/help")}>
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span>Help Center</span>
              </div>
              <ChevronRight />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <span>Terms of Use</span>
              </div>
              <ChevronRight />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between border-b border-border/50 cursor-pointer">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-primary" />
                <span>Privacy Policy</span>
              </div>
              <ChevronRight />
            </div>
            
            <div className="px-4 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-primary" />
                <span>Tribbe App</span>
              </div>
              <span className="text-muted-foreground text-sm">v1.0.0</span>
            </div>
          </div>
        </div>
        
        {/* LOGOUT BUTTON */}
        <div className="mb-10">
          <div className="bg-card rounded-lg overflow-hidden">
            <div className="px-4 py-3.5 flex items-center justify-center cursor-pointer">
              <div className="flex items-center gap-2 text-red-500">
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

// Helper component for chevron right icon
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Setup;
