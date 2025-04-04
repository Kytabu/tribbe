
import { Button } from "@/components/ui/button";
import { Mail, Phone, Apple, Facebook } from "lucide-react";

interface AuthOptionsProps {
  onEmailClick: () => void;
  onPhoneClick: () => void;
  onLoginClick: () => void;
}

export const AuthOptions = ({ onEmailClick, onPhoneClick, onLoginClick }: AuthOptionsProps) => {
  return (
    <>
      <img 
        src="/lovable-uploads/24576fa2-343c-42db-b26e-e56b0aa76cc8.png" 
        alt="Tribbe" 
        className="w-40 sm:w-64 mx-auto mt-12 sm:mt-16"
      />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto space-y-6 sm:space-y-8">
          <div className="space-y-6">
            <div className="text-center">
              <img 
                src="/lovable-uploads/5a9bef54-1771-4c06-8d31-2140f23f1388.png" 
                alt="Network Illustration" 
                className="w-56 sm:w-80 mx-auto"
              />
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-center px-4 sm:px-6">
                <Button
                  variant="secondary"
                  className="w-full max-w-xs bg-tribbe-aqua hover:bg-[#1A1F2C] text-tribbe-black hover:text-tribbe-aqua h-12 sm:h-14 rounded-full text-sm font-normal transition-colors"
                  onClick={onPhoneClick}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Continue with number
                </Button>
              </div>
              <div className="flex justify-center px-4 sm:px-6">
                <Button
                  variant="outline"
                  className="w-full max-w-xs bg-tribbe-lime hover:bg-[#1A1F2C] text-tribbe-black hover:text-tribbe-lime border-0 h-12 sm:h-14 rounded-full text-sm font-normal transition-colors"
                  onClick={onEmailClick}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Continue with email
                </Button>
              </div>
              
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-[#1A1F2C] hover:bg-tribbe-lime border-0 transition-colors group"
                  onClick={onPhoneClick}
                >
                  <svg className="h-4 w-4" viewBox="0 0 48 48">
                    <path fill="currentColor" className="text-tribbe-lime group-hover:text-black transition-colors" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="currentColor" className="text-tribbe-lime group-hover:text-black transition-colors" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="currentColor" className="text-tribbe-lime group-hover:text-black transition-colors" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="currentColor" className="text-tribbe-lime group-hover:text-black transition-colors" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-[#1A1F2C] hover:bg-tribbe-lime border-0 transition-colors group"
                  onClick={onPhoneClick}
                >
                  <Apple className="h-4 w-4 text-tribbe-lime group-hover:text-black transition-colors" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-[#1A1F2C] hover:bg-tribbe-lime border-0 transition-colors group"
                  onClick={onPhoneClick}
                >
                  <Facebook className="h-4 w-4 text-tribbe-lime group-hover:text-black transition-colors" />
                </Button>
              </div>
              
              <div className="text-center mt-6 space-y-4">
                <p className="text-center text-xs text-white/60">
                  by signing up, you accept our Terms and Conditions.
                </p>
                
                <p className="text-white/80 text-xs">
                  Already member? <Button 
                    variant="link" 
                    className="text-white p-0 hover:text-tribbe-aqua text-xs" 
                    onClick={onLoginClick}
                  >
                    Login
                  </Button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
