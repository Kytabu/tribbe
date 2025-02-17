
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";

const AuthPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real implementation, this would send an SMS
      // For now, we'll create a verification code entry
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expires = new Date(Date.now() + 10 * 60000); // 10 minutes from now

      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        phone: phoneNumber,
        password: code // Using the code as the password for now
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create verification code entry
        const { error: verificationError } = await supabase
          .from('verification_codes')
          .insert([
            {
              user_id: authData.user.id,
              code,
              expires_at: expires.toISOString(),
            }
          ]);

        if (verificationError) throw verificationError;

        toast({
          description: `Verification code: ${code}`,
        });
        
        setIsVerifying(true);
      }
    } catch (error: any) {
      console.error('Error during phone submission:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("No user found");
      }

      // Verify the code
      const { data: verificationData, error: verificationError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('user_id', user.id)
        .eq('code', verificationCode)
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString())
        .single();

      if (verificationError || !verificationData) {
        throw new Error("Invalid or expired code");
      }

      // Update verification status
      const { error: updateError } = await supabase
        .from('verification_codes')
        .update({ status: 'verified' })
        .eq('id', verificationData.id);

      if (updateError) throw updateError;

      toast({
        description: "Phone number verified successfully",
      });

      // Redirect to PIN setup
      navigate("/pin-setup");
    } catch (error: any) {
      console.error('Error during verification:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to verify code",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    toast({
      description: "Authentication skipped for development",
    });
    navigate("/pin-setup");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Welcome to Flami</h1>
          <p className="text-muted-foreground">
            {isVerifying 
              ? "Enter the verification code sent to your phone"
              : "Enter your phone number to get started"
            }
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            {!isVerifying ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !phoneNumber}
                >
                  {loading ? "Sending..." : "Continue"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerificationSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    className="text-lg text-center tracking-[0.5em]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || verificationCode.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </form>
            )}
            
            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                Skip Authentication (Dev Only)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
