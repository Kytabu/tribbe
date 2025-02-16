
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebarState } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { isOpen, setIsOpen } = useSidebarState();

  return (
    <SidebarProvider defaultIsOpen={false}>
      <div className="min-h-screen flex w-full bg-tribbe-sand">
        <AppSidebar />
        <main className="flex-1 p-6 animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
