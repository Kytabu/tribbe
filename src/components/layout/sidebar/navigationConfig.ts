
import { LucideIcon, MessageCircle, Wallet, Users, Circle, Star, Settings, Hand } from "lucide-react";

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
    icon: Users,
    label: "Tribbe",
    href: "/my-tribbe",
    activeRoutes: ['/my-tribbe', '/tribbe-requests'],
  },
  {
    icon: Circle,
    label: "Circles",
    href: "/circles",
  },
  {
    icon: Star,
    label: "Street Cred",
    href: "/street-cred",
  },
  {
    icon: Hand,
    label: "Boondi",
    href: "/boondi",
  },
  {
    icon: Wallet,
    label: "Wallet",
    href: "/wallet",
  },
];
