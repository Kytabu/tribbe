
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const Setup = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Setup</h1>
        
        <div className="space-y-4">
          <div className="bg-card rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <h2 className="font-medium">Security PIN</h2>
                <p className="text-sm text-muted-foreground">Set up or change your PIN</p>
              </div>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate("/pin-setup")}
            >
              Manage PIN
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Setup;
