
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

// New component that uses the useSidebar hook
function LayoutContent({ children }: AppLayoutProps) {
  const { open, setOpen } = useSidebar();

  return (
    <div className="min-h-screen flex w-full bg-tribbe-sand">
      <AppSidebar />
      <main className="flex-1 p-6 animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50"
          onClick={() => setOpen(!open)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

// Main layout component that provides the context
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
