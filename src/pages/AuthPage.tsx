
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Apple, Facebook } from "lucide-react";

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
      // For development, we'll just show the verification code
      const code = "123456";
      
      toast({
        description: `Verification code: ${code}`,
      });
      
      setIsVerifying(true);
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
      // For development, just check if the code matches
      if (verificationCode === "123456") {
        toast({
          description: "Verification successful",
        });

        // Redirect to Flami page instead of PIN setup
        navigate("/flami");
      } else {
        throw new Error("Invalid verification code");
      }
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
    navigate("/flami");
  };

  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col items-center px-6 pt-20">
      {!isVerifying ? (
        <div className="w-full max-w-xl space-y-16">
          <div className="space-y-12">
            <div className="text-center space-y-9">
              <img 
                src="/lovable-uploads/24576fa2-343c-42db-b26e-e56b0aa76cc8.png" 
                alt="Tribbe" 
                className="w-72 mx-auto"
              />
              <img 
                src="/lovable-uploads/5a9bef54-1771-4c06-8d31-2140f23f1388.png" 
                alt="Network Illustration" 
                className="w-96 mx-auto"
              />
            </div>

            <div className="space-y-6 mt-48">
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  className="w-96 bg-tribbe-aqua hover:bg-[#1A1F2C] text-tribbe-black hover:text-tribbe-aqua h-18 rounded-full text-base font-normal transition-colors"
                  onClick={() => setIsVerifying(true)}
                >
                  <Phone className="mr-3 h-5 w-5" />
                  Continue with number
                </Button>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="w-96 bg-tribbe-lime hover:bg-[#1A1F2C] text-tribbe-black hover:text-tribbe-lime border-0 h-18 rounded-full text-base font-normal transition-colors"
                  onClick={() => setIsVerifying(true)}
                >
                  <Mail className="mr-3 h-5 w-5" />
                  Continue with email
                </Button>
              </div>
              
              <div className="flex justify-center gap-6 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-16 h-16 bg-tribbe-lime hover:bg-tribbe-lime/90 border-0 transition-colors"
                  onClick={() => setIsVerifying(true)}
                >
                  <svg className="h-5 w-5" viewBox="0 0 48 48">
                    <path fill="currentColor" className="text-black" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="currentColor" className="text-black" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="currentColor" className="text-black" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="currentColor" className="text-black" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-16 h-16 bg-tribbe-lime hover:bg-tribbe-lime/90 border-0 transition-colors"
                  onClick={() => setIsVerifying(true)}
                >
                  <Apple className="h-5 w-5 text-black" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-16 h-16 bg-tribbe-lime hover:bg-tribbe-lime/90 border-0 transition-colors"
                  onClick={() => setIsVerifying(true)}
                >
                  <Facebook className="h-5 w-5 text-black" />
                </Button>
              </div>
              
              <p className="text-center text-sm text-white/60 mt-4">
                by signing up, you accept our Terms and Conditions.
              </p>
              
              <div className="text-center mt-8">
                <p className="text-white/80 text-sm">
                  Already member? <Button variant="link" className="text-white p-0 hover:text-tribbe-aqua">Login</Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Card className="w-96">
          <CardContent className="p-9">
            <form onSubmit={handleVerificationSubmit} className="space-y-6">
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="text-xl text-center tracking-[0.5em] h-14"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 text-lg"
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
