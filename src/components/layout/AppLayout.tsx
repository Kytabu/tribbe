
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: AppLayoutProps) {
  const { open, setOpen } = useSidebar();

  return (
    <div className="min-h-screen flex w-full bg-tribbe-sand">
      <AppSidebar />
      <main className="flex-1 animate-fade-in">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 hover:bg-tribbe-lime"
          onClick={() => setOpen(!open)}
        >
          <MenuIcon className="h-6 w-6 text-tribbe-lime hover:text-tribbe-black" />
        </Button>
        <div>{children}</div>
      </main>
    </div>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
