
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Setup from "@/pages/Setup";
import PinSetup from "@/pages/PinSetup";
import PinEntry from "@/pages/PinEntry";
import Flami from "@/pages/Flami";
import AuthPage from "@/pages/AuthPage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/pages/NotFound";
import Wallet from "@/pages/Wallet";
import Circles from "@/pages/Circles";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/pin-setup" element={<PinSetup />} />
        <Route path="/pin-entry" element={<PinEntry />} />
        <Route path="/flami" element={<Flami />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/circles" element={<Circles />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
