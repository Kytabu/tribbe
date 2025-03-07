
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import Onboarding from "@/pages/Onboarding";
import PinSetup from "@/pages/PinSetup";
import PinEntry from "@/pages/PinEntry";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Personalization from "@/pages/Personalization";
import Memory from "@/pages/Memory";
import Flami from "@/pages/Flami";
import Wallet from "@/pages/Wallet";
import Circles from "@/pages/Circles";
import MyTribbe from "@/pages/MyTribbe";
import SnapToPay from "@/pages/SnapToPay";
import StreetCred from "@/pages/StreetCred";
import Notifications from "@/pages/Notifications";
import DataControls from "@/pages/DataControls";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/pin-setup" element={<PinSetup />} />
        <Route path="/pin-entry" element={<PinEntry />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personalization" element={<Personalization />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/flami" element={<Flami />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/circles" element={<Circles />} />
        <Route path="/my-tribbe" element={<MyTribbe />} />
        <Route path="/snap-to-pay" element={<SnapToPay />} />
        <Route path="/street-cred" element={<StreetCred />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/data-controls" element={<DataControls />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
