import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChevronLeft } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

interface Profile {
  full_name: string;
  username: string;
  phone_number: string;
  id_number: string;
}

const AccountContent = () => {
  const navigate = useNavigate();
  const [profile] = useState<Profile>({
    full_name: "Tonee Ndungu",
    username: "@tonee",
    phone_number: "+254 721 583 605",
    id_number: "xxx xxx xxx xxx"
  });

  const handleChange = () => {
    toast({
      description: "Demo: Profile information cannot be changed",
    });
  };

  const BackButton = (
    <Button
      variant="ghost"
      size="icon"
    >
      <ChevronLeft className="h-5 w-5" />
    </Button>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <PageHeader 
        title="Account"
        titleClassName="text-xl text-tribbe-lime"
        rightIcon={BackButton}
        onRightIconClick={() => navigate("/profile")}
      />

      <div className="flex justify-center mb-6 mt-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
          <img 
            src="/lovable-uploads/4a593a53-ec2e-4ab3-a500-c2147809af06.png"
            alt="Tonee Ndungu"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-lg font-medium">{profile.username}</h2>
        <p className="text-sm text-muted-foreground mt-1">You are verified with the following details</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">* Full name</label>
          <Input
            value={profile.full_name}
            readOnly
            className="bg-card/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">User Name</label>
          <Input
            value={profile.username}
            readOnly
            className="bg-card/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">* Phone number</label>
          <Input
            value={profile.phone_number}
            readOnly
            className="bg-card/50"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-5 w-5 rounded-full border border-muted-foreground" />
          <span>Add new number</span>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">* National ID Number</label>
          <Input
            value={profile.id_number}
            readOnly
            className="bg-card/50"
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="h-5 w-5 rounded-full border border-muted-foreground" />
          <span>Add other ID</span>
        </div>

        <p className="text-sm text-muted-foreground">* These fields are unchangeable</p>

        <Button 
          className="w-full"
          onClick={handleChange}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

const AccountPage = () => {
  return (
    <AppLayout>
      <AccountContent />
    </AppLayout>
  );
};

export default AccountPage;
