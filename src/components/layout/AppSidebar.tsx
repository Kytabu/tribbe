
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "./sidebar/navigationConfig";
import { getCurrentLevel } from "./sidebar/streetCredUtils";
import { ProfileButton } from "./sidebar/ProfileButton";
import type { FooterItem } from "./sidebar/navigationConfig";

export function AppSidebar() {
  const location = useLocation();
  const { isMobile, open, openMobile } = useSidebar();

  const creditScore = 720;
  const currentLevel = getCurrentLevel(creditScore);

  const footerItems: FooterItem[] = [
    {
      icon: () => <ProfileButton currentLevel={currentLevel} />,
      label: "Tonee Ndungu",
      href: "/profile",
    },
  ];

  const isOpen = isMobile ? openMobile : open;

  const isRouteActive = (item: { href: string; activeRoutes?: string[] }) => {
    if (item.activeRoutes) {
      return item.activeRoutes.includes(location.pathname);
    }
    return location.pathname === item.href;
  };

  return (
    <Sidebar
      className={cn(
        "transition-transform duration-300 transform fixed h-full",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <SidebarHeader className="p-4 pt-16">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img 
            src="/lovable-uploads/24576fa2-343c-42db-b26e-e56b0aa76cc8.png" 
            alt="Tribbe" 
            className="w-32"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isRouteActive(item);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-tribbe-sage hover:bg-tribbe-charcoal/5 transition-colors",
                  isActive &&
                    "bg-tribbe-charcoal/10 text-tribbe-charcoal font-medium"
                )}
              >
                <Icon 
                  className={cn(
                    "w-5 h-5",
                    isActive ? "text-tribbe-aqua" : "text-tribbe-lime"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
      <SidebarFooter className="px-2 pb-4">
        <nav className="space-y-2">
          {footerItems.map((item) => {
            const Icon = typeof item.icon === 'function' ? item.icon : item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-tribbe-sage hover:bg-tribbe-charcoal/5 transition-colors",
                  isActive &&
                    "bg-tribbe-charcoal/10 text-tribbe-charcoal font-medium"
                )}
              >
                {typeof item.icon === 'function' ? (
                  <Icon />
                ) : (
                  <Icon 
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-tribbe-aqua" : "text-tribbe-lime"
                    )}
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </SidebarFooter>
    </Sidebar>
  );
}
