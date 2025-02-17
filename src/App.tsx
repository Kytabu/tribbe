
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Flami from "./pages/Flami";
import Wallet from "./pages/Wallet";
import Onboarding from "./pages/Onboarding";
import PinSetup from "./pages/PinSetup";
import PinEntry from "./pages/PinEntry";
import Setup from "./pages/Setup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Index />} />
            <Route path="/flami" element={<Flami />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/pin-setup" element={<PinSetup />} />
            <Route path="/pin-entry" element={<PinEntry />} />
            <Route path="/setup" element={<Setup />} />
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
