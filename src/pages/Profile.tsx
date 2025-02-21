
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  User,
  CreditCard,
  Crown,
  ChevronRight,
  ArrowLeft,
  Mail,
  Phone,
  LogOut
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface ProfileData {
  full_name: string | null;
  email: string | null;
  phone_number: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile] = useState<ProfileData>({
    full_name: "Demo User",
    email: "demo@tribbe.co",
    phone_number: "+1 (555) 123-4567"
  });

  const handleSignOut = () => {
    navigate("/auth");
    toast({
      description: "Signed out from demo account",
    });
  };

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        
        {/* Profile Summary */}
        <div className="bg-card rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{profile.full_name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Phone className="w-4 h-4" />
                <span>{profile.phone_number}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Personal Information Section */}
          <div 
            className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => navigate("/account")}
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Personal Information</h2>
                <p className="text-sm text-muted-foreground">Profile details, phone number, ID verification</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* My Account Section */}
          <div 
            className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => navigate("/wallet")}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">My Account</h2>
                <p className="text-sm text-muted-foreground">Lending history, borrowing stats, investments</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Premium Features Section */}
          <div 
            className="bg-card rounded-lg p-4 flex items-center justify-between hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => navigate("/premium")}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-[#A9FF22]" />
              <div>
                <h2 className="font-medium">Premium Features</h2>
                <p className="text-sm text-muted-foreground">Upgrade your account, exclusive benefits</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>

          {/* Sign Out Button */}
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
