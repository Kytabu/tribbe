
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
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface ProfileData {
  full_name: string;
  email: string;
  phone_number: string;
  username: string;
  national_id: string;
  stats: {
    total_borrowed: number;
    total_lent: number;
    credit_score: number;
    trusted_by: number;
  };
  premium: {
    status: string;
    since: string;
    benefits: string[];
  };
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile] = useState<ProfileData>({
    full_name: "Tonee Ndungu",
    email: "tonee@tribbe.io",
    phone_number: "+254 721 583 605",
    username: "@tonee",
    national_id: "xxx xxx xxx xxx",
    stats: {
      total_borrowed: 250000,
      total_lent: 750000,
      credit_score: 850,
      trusted_by: 128
    },
    premium: {
      status: "Gold Member",
      since: "Jan 2023",
      benefits: [
        "Zero transaction fees",
        "Priority support",
        "Extended loan terms",
        "Higher borrowing limits"
      ]
    }
  });

  const handleSignOut = () => {
    navigate("/auth");
    toast({
      description: "Signed out from demo account",
    });
  };

  const handleAccountClick = () => {
    toast({
      title: "Account Statistics",
      description: `Total Borrowed: KES ${profile.stats.total_borrowed.toLocaleString()}\nTotal Lent: KES ${profile.stats.total_lent.toLocaleString()}\nCredit Score: ${profile.stats.credit_score}\nTrusted by ${profile.stats.trusted_by} members`,
    });
    navigate("/wallet");
  };

  const handlePremiumClick = () => {
    toast({
      title: profile.premium.status,
      description: `Member since ${profile.premium.since}\nBenefits: ${profile.premium.benefits.join(", ")}`,
    });
    navigate("/premium");
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
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              <img 
                src="/lovable-uploads/4a593a53-ec2e-4ab3-a500-c2147809af06.png"
                alt="Tonee Ndungu"
                className="w-full h-full object-cover"
              />
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
            onClick={handleAccountClick}
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
            onClick={handlePremiumClick}
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
