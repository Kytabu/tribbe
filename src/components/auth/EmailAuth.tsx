
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface EmailAuthProps {
  onBack: () => void;
  onSubmit: (email: string, password: string, isLogin: boolean) => Promise<void>;
  loading: boolean;
}

export const EmailAuth = ({ onBack, onSubmit, loading }: EmailAuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password, isLogin);
  };

  return (
    <div className="min-h-screen bg-tribbe-grey flex flex-col items-center px-4 sm:px-6">
      <div className="flex items-center justify-between w-full pt-4">
        <Button
          variant="ghost"
          className="text-white hover:text-tribbe-aqua"
          onClick={onBack}
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          className="text-white hover:text-tribbe-aqua"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign up" : "Login"}
        </Button>
      </div>

      <img 
        src="/lovable-uploads/2e96dadf-c241-4700-b74e-72f155818e87.png" 
        alt="Tribbe Logo" 
        className="w-40 mx-auto mt-8 mb-4"
      />

      <div className="w-full max-w-md mt-4">
        <div className="w-full space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-white mb-2">
              {isLogin ? "Welcome back!" : "Create your account"}
            </h1>
            <p className="text-white/60 text-sm">
              {isLogin ? "Sign in to continue" : "Sign up to get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1A1F2C] border-0 text-white placeholder:text-white/40"
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1A1F2C] border-0 text-white placeholder:text-white/40"
              required
              minLength={6}
            />
            <Button
              type="submit"
              className={`w-full h-12 rounded-full transition-colors ${
                isLogin 
                  ? "bg-tribbe-aqua hover:bg-[#1A1F2C] text-tribbe-black hover:text-tribbe-aqua"
                  : "bg-[#A9FF22] hover:bg-[#98E51F] text-black"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
