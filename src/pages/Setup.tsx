
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  User,
  CreditCard,
  Crown,
  Bell,
  Lock,
  Shield,
  HelpCircle,
  Moon,
  ChevronRight,
  KeyRound
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const Setup = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-2">All about Me</h1>
        <p className="text-muted-foreground mb-8">Tailor your experience</p>
        
        <div className="space-y-4">
          {/* Me Section */}
          <div 
            className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => navigate("/account")}
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Me</h2>
                <p className="text-sm text-muted-foreground">Profile, Phone number, ID, etc</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* PIN Management Section */}
          <div 
            className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => navigate("/pin-setup")}
          >
            <div className="flex items-center gap-3">
              <KeyRound className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">PIN Management</h2>
                <p className="text-sm text-muted-foreground">Set up or change your security PIN</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* My Account Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">My Account</h2>
                <p className="text-sm text-muted-foreground">Money Lent, borrowed and invested</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Premium Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-[#A9FF22]" />
              <div>
                <h2 className="font-medium">Premium</h2>
                <p className="text-sm text-muted-foreground">Money Lent, borrowed and invested</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Notifications Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Notifications</h2>
                <p className="text-sm text-muted-foreground">Toggle various alerts on & off</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Privacy Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Privacy</h2>
                <p className="text-sm text-muted-foreground">See your privacy settings</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Security Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Security</h2>
                <p className="text-sm text-muted-foreground">Manage your security settings</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Support Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Support</h2>
                <p className="text-sm text-muted-foreground">Chat with us at anytime</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Dark Mode Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Dark Mode</h2>
                <p className="text-sm text-muted-foreground">Toggle dark mode on & off</p>
              </div>
            </div>
            <Switch 
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Setup;
