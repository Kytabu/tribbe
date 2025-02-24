
import { ArrowLeft, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const Premium = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-2xl font-bold text-[#A9FF22]">Premium</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <Crown className="h-16 w-16 text-muted mb-4" />
        <h2 className="text-2xl font-semibold text-center">Get premium love on Tribbe</h2>
      </div>

      <div className="space-y-4 max-w-md mx-auto mb-8">
        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Send Reminders</h3>
            <Switch />
          </div>
          <p className="text-sm text-muted-foreground">
            Send reminders to you about circles and tribbe activities and financial opportunities.
          </p>
        </div>

        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">More Circles</h3>
            <Switch />
          </div>
          <p className="text-sm text-muted-foreground">
            Receive alerts for any financial transactions, such as successful payments, fund transfers, or new credit lines.
          </p>
        </div>

        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">More Tribbes</h3>
            <Switch />
          </div>
          <p className="text-sm text-muted-foreground">
            Informs you about changes in your credit score, helping you monitor their creditworthiness and track improvements.
          </p>
        </div>

        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Premium Access</h3>
            <Switch />
          </div>
          <p className="text-sm text-muted-foreground">
            VIP access to Tribbe Webinars, events and meet-ups.
          </p>
        </div>

        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Rewards and Offers</h3>
            <Switch />
          </div>
          <p className="text-sm text-muted-foreground">
            Enjoy special promotions, discounts, and rewards tailored to you.
          </p>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">Ready to go Premium? Click here to activate!</p>
        <Button className="w-full max-w-md bg-[#A9FF22] text-background hover:bg-[#98eb1f]">
          Activate Premium for Ksh 10/day
        </Button>
      </div>
    </div>
  );
};

export default Premium;
