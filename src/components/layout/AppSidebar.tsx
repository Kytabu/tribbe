
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
  LucideIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface NavigationItem {
  icon: LucideIcon;
  label: string;
  href: string;
  activeRoutes?: string[];
}

interface FooterItem {
  icon: LucideIcon | (() => JSX.Element);
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
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
    activeRoutes: ['/my-tribbe', '/tribbe-requests'],
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

export function AppSidebar() {
  const location = useLocation();
  const { isMobile, open, openMobile } = useSidebar();

  // Use the same credit score logic
  const creditScore = 720;
  const streetCredLevels = [
    { name: "The Newbie", color: "#FFCA99", minScore: 300 },
    { name: "The Builder", color: "#F9FE03", minScore: 580 },
    { name: "The Trailblazer", color: "#88D3FE", minScore: 670 },
    { name: "The Innovator", color: "#A9FF22", minScore: 740 },
    { name: "The Legend", color: "#C699FF", minScore: 800 }
  ];

  const getCurrentLevel = (score: number) => {
    return streetCredLevels
      .slice()
      .reverse()
      .find(level => score >= level.minScore) || streetCredLevels[0];
  };

  const currentLevel = getCurrentLevel(creditScore);

  const footerItems: FooterItem[] = [
    {
      icon: () => (
        <div 
          className="p-[0.25px] rounded-full"
          style={{ backgroundColor: currentLevel.color }}
        >
          <img 
            src="/lovable-uploads/b7e2919d-1215-4769-aecc-09f8d0d1e7ca.png" 
            alt="Profile" 
            className="w-5 h-5 rounded-full object-cover"
          />
        </div>
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

  const isOpen = isMobile ? openMobile : open;

  const isRouteActive = (item: NavigationItem) => {
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
