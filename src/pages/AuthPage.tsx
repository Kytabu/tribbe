
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

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
    <div className="min-h-screen bg-tribbe-grey flex flex-col items-center px-6 pt-20">
      {!isVerifying ? (
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <img 
                src="/lovable-uploads/24576fa2-343c-42db-b26e-e56b0aa76cc8.png" 
                alt="Tribbe" 
                className="w-48 mx-auto"
              />
              <img 
                src="/lovable-uploads/5a9bef54-1771-4c06-8d31-2140f23f1388.png" 
                alt="Network Illustration" 
                className="w-64 mx-auto"
              />
            </div>

            <div className="space-y-4 mt-32">
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  className="w-64 bg-tribbe-aqua hover:bg-tribbe-aqua/90 text-tribbe-black h-12 rounded-full"
                  onClick={() => setIsVerifying(true)}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Continue with number
                </Button>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="w-64 bg-tribbe-lime hover:bg-tribbe-lime/90 text-tribbe-black border-0 h-12 rounded-full"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Continue with email
                </Button>
              </div>
              
              <p className="text-center text-sm text-white/60 mt-4">
                by signing up, you accept our Terms and Conditions.
              </p>
              
              <div className="text-center mt-8">
                <p className="text-white/80 text-sm">
                  Already member? <Button variant="link" className="text-white p-0">Login</Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
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
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AuthPage;
