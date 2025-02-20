
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  MessageCircle,
  Wallet,
  Users,
  Circle,
  Star,
  Settings,
  Camera,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationItems = [
  {
    icon: MessageCircle,
    label: "Flami",
    href: "/flami",
  },
  {
    icon: Wallet,
    label: "Wallet",
    href: "/wallet",
  },
  {
    icon: Circle,
    label: "My Circles",
    href: "/circles",
  },
  {
    icon: Users,
    label: "My Tribbe",
    href: "/my-tribbe",
  },
  {
    icon: Camera,
    label: "Snap to Pay",
    href: "/snap-to-pay",
  },
  {
    icon: Star,
    label: "My Street Cred",
    href: "/street-cred",
  },
];

const footerItems = [
  {
    icon: () => (
      <img 
        src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" 
        alt="Profile" 
        className="w-5 h-5 object-cover rounded-full"
      />
    ),
    label: "Profile",
    href: "/profile",
  },
  {
    icon: Settings,
    label: "Setup",
    href: "/setup",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { open } = useSidebar();

  return (
    <Sidebar
      className={cn(
        "transition-transform duration-300 transform fixed h-full",
        open ? "translate-x-0" : "-translate-x-full"
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
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-tribbe-sage hover:bg-tribbe-charcoal/5 transition-colors",
                location.pathname === item.href &&
                  "bg-tribbe-charcoal/10 text-tribbe-charcoal font-medium"
              )}
            >
              <item.icon 
                className={cn(
                  "w-5 h-5",
                  location.pathname === item.href ? "text-tribbe-aqua" : "text-tribbe-lime"
                )} 
              />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </SidebarContent>
      <SidebarFooter className="px-2 pb-4">
        <nav className="space-y-2">
          {footerItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-tribbe-sage hover:bg-tribbe-charcoal/5 transition-colors",
                location.pathname === item.href &&
                  "bg-tribbe-charcoal/10 text-tribbe-charcoal font-medium"
              )}
            >
              {typeof item.icon === 'function' ? (
                item.icon()
              ) : (
                <item.icon 
                  className={cn(
                    "w-5 h-5",
                    location.pathname === item.href ? "text-tribbe-aqua" : "text-tribbe-lime"
                  )} 
                />
              )}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </SidebarFooter>
    </Sidebar>
  );
}
