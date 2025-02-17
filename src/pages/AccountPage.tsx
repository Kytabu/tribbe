
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";

type IdType = 'national_id' | 'passport' | 'drivers_license';

interface Profile {
  full_name: string | null;
  username: string | null;
  phone_number: string | null;
  id_number: string | null;
  id_type: IdType | null;
  avatar_url: string | null;
}

const AccountPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    username: '',
    phone_number: '',
    id_number: '',
    id_type: null,
    avatar_url: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (profile) {
        setProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Could not load profile information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (field: keyof Profile, value: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const updates = {
        id: user.id,
        [field]: value,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, [field]: value }));
      toast({
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Could not update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold">My Account</h1>
      </div>

      {loading ? (
        <div className="flex justify-center">Loading...</div>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <Input
                    value={profile.full_name || ''}
                    onChange={(e) => handleUpdate('full_name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Username</label>
                  <Input
                    value={profile.username || ''}
                    onChange={(e) => handleUpdate('username', e.target.value)}
                    placeholder="Choose a username"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <Input
                    value={profile.phone_number || ''}
                    onChange={(e) => handleUpdate('phone_number', e.target.value)}
                    placeholder="Enter your phone number"
                    type="tel"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">ID Number</label>
                  <Input
                    value={profile.id_number || ''}
                    onChange={(e) => handleUpdate('id_number', e.target.value)}
                    placeholder="Enter your ID number"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
