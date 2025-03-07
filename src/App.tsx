import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Index from "@/pages/Index";
import AuthPage from "@/pages/Auth";
import Onboarding from "@/pages/Onboarding";
import PinSetup from "@/pages/PinSetup";
import PinEntry from "@/pages/PinEntry";
import NotFound from "@/pages/NotFound";
import Setup from "@/pages/Setup";
import Personalization from "@/pages/Personalization";
import NewChat from "@/pages/NewChat";
import Chat from "@/pages/Chat";
import Contacts from "@/pages/Contacts";
import Notifications from "@/pages/Notifications";

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
        <Route path="/new-chat" element={<NewChat />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/personalization" element={<Personalization />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
