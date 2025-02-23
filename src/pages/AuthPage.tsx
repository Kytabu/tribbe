
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EmailAuth } from "@/components/auth/EmailAuth";
import { PhoneVerification } from "@/components/auth/PhoneVerification";
import { AuthOptions } from "@/components/auth/AuthOptions";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEmailFlow, setIsEmailFlow] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isVerifying) {
        if (/^[0-9]$/.test(event.key) && verificationCode.length < 4) {
          setVerificationCode(prev => prev + event.key);
        }
        if (event.key === 'Backspace') {
          setVerificationCode(prev => prev.slice(0, -1));
        }
        if (event.key === 'Enter' && verificationCode.length === 4) {
          handleVerificationSubmit();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVerifying, verificationCode]);

  const handleEmailAuth = async (email: string, password: string, isLogin: boolean) => {
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          description: "Successfully logged in!",
          className: "bg-tribbe-lime text-black",
        });
        navigate("/flami");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          description: "Account created successfully! Check your email for confirmation.",
          className: "bg-tribbe-lime text-black",
        });
        navigate("/flami");
      }
    } catch (error: any) {
      console.error('Error during email auth:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSubmit = async () => {
    setLoading(true);

    try {
      const code = "1234";
      
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

  const handleVerificationSubmit = async () => {
    setLoading(true);

    try {
      if (verificationCode === "1234") {
        toast({
          description: "Verification successful",
        });
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

  const handleNumberClick = (number: string) => {
    if (verificationCode.length < 4) {
      setVerificationCode(prev => prev + number);
    }
  };

  const handleDelete = () => {
    setVerificationCode(prev => prev.slice(0, -1));
  };

  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col px-4 sm:px-6">
      {isEmailFlow ? (
        <EmailAuth
          onBack={() => setIsEmailFlow(false)}
          onSubmit={handleEmailAuth}
          loading={loading}
        />
      ) : !isVerifying ? (
        <AuthOptions
          onEmailClick={() => setIsEmailFlow(true)}
          onPhoneClick={handlePhoneSubmit}
          onLoginClick={() => {
            setIsEmailFlow(true);
            setIsLogin(true);
          }}
        />
      ) : (
        <PhoneVerification
          verificationCode={verificationCode}
          onNumberClick={handleNumberClick}
          onDelete={handleDelete}
          onSubmit={handleVerificationSubmit}
        />
      )}
    </div>
  );
};

export default AuthPage;
