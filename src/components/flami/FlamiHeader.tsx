
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function FlamiHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
        </Button>
        <h1 className="text-xl font-bold">Flami AI</h1>
      </div>
      <Button 
        variant="outline"
        onClick={() => navigate("/wallet")}
        className="gap-2 border-tribbe-lime text-tribbe-lime hover:bg-tribbe-lime hover:text-black"
      >
        <Wallet className="h-4 w-4" />
        My Wallet
      </Button>
    </div>
  );
}
