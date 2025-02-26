
import { LucideIcon, MessageCircle, Wallet, Users, Circle, Star, Settings, Camera } from "lucide-react";

export interface NavigationItem {
  icon: LucideIcon;
  label: string;
  href: string;
  activeRoutes?: string[];
}

export interface FooterItem {
  icon: LucideIcon | (() => JSX.Element);
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
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
    icon: Users,
    label: "My Tribbe",
    href: "/my-tribbe",
    activeRoutes: ['/my-tribbe', '/tribbe-requests'],
  },
  {
    icon: Circle,
    label: "Close Friends",
    href: "/circles",
  },
  {
    icon: Camera,
    label: "Snap to Pay",
    href: "/snap-to-pay",
  },
  {
    icon: Star,
    label: "Street Cred",
    href: "/street-cred",
  },
];
