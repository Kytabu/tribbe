
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Setup from "@/pages/Setup";
import Wallet from "@/pages/Wallet";
import NotFound from "@/pages/NotFound";
import Flami from "@/pages/Flami";
import PinSetup from "@/pages/PinSetup";
import PinEntry from "@/pages/PinEntry";
import AccountPage from "@/pages/AccountPage";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/flami" element={<Flami />} />
        <Route path="/pin-setup" element={<PinSetup />} />
        <Route path="/pin-entry" element={<PinEntry />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
