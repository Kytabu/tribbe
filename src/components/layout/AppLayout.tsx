
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-tribbe-sand">
        <AppSidebar />
        <main className="flex-1 p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
