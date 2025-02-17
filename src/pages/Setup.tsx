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
  ChevronRight
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Switch } from "@/components/ui/switch";

const Setup = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-2">All about Me</h1>
        <p className="text-muted-foreground mb-8">Tailor your experience</p>
        
        <div className="space-y-4">
          {/* Me Section */}
          <div className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Me</h2>
                <p className="text-sm text-muted-foreground">Profile, Phone number, ID, etc</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
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
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
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
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
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
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
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
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
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
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
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
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
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
            <Switch />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Setup;
