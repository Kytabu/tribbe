
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex w-full bg-tribbe-sand">
      <AppSidebar />
      <main className="flex-1 animate-fade-in">
        <div>{children}</div>
      </main>
    </div>
  );
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
