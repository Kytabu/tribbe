
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  User,
  CreditCard,
  Crown,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const Profile = () => {
  const navigate = useNavigate();

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
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;

