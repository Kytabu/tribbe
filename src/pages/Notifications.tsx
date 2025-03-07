
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const Notifications = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <AppLayout>
      <div className="container max-w-md mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h1 className="text-xl font-semibold text-tribbe-lime">Notifications</h1>
        </div>

        {/* Notifications Status Card */}
        <div className="bg-tribbe-grey/50 rounded-lg p-5 mb-6 border border-tribbe-lime/20">
          <div className="flex items-start mb-2">
            <BellOff className="h-5 w-5 text-tribbe-lime mr-2 mt-0.5" />
            <h2 className="text-lg font-medium text-tribbe-white">
              This device has notifications turned off
            </h2>
          </div>
          <p className="text-tribbe-white/70 mb-4 ml-7">
            You won't be notified, even if you turn on notifications below.
          </p>
          <Button 
            className="ml-7"
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
          >
            Enable notifications
          </Button>
        </div>

        {/* Notification Channels Section */}
        <h3 className="text-sm font-medium text-tribbe-lime/80 mb-4 uppercase tracking-wide">
          WHERE YOU'LL BE NOTIFIED
        </h3>

        <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20 mb-4">
          {/* Push Notification Toggle */}
          <div className="px-4 py-3.5 flex items-center justify-between border-b border-tribbe-lime/10">
            <span className="text-tribbe-white text-lg">Push</span>
            <Switch 
              checked={pushEnabled}
              onCheckedChange={setPushEnabled}
              className="data-[state=checked]:bg-tribbe-lime data-[state=checked]:border-tribbe-lime"
            />
          </div>
          
          {/* Email Notification Toggle */}
          <div className="px-4 py-3.5 flex items-center justify-between">
            <span className="text-tribbe-white text-lg">Email</span>
            <Switch 
              checked={emailEnabled}
              onCheckedChange={setEmailEnabled}
              className="data-[state=checked]:bg-tribbe-lime data-[state=checked]:border-tribbe-lime"
            />
          </div>
        </div>

        {/* Description text */}
        <p className="text-tribbe-white/70 text-sm px-1">
          Get notified when tasks you've created have updates.
        </p>
      </div>
    </AppLayout>
  );
};

export default Notifications;
