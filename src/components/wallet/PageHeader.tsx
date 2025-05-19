
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { ProfileButton } from "@/components/layout/sidebar/ProfileButton";
import { PageHeader as BasePageHeader } from "@/components/layout/PageHeader";

export function PageHeader() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const ProfileButtonElement = (
    <ProfileButton currentLevel={{ name: "Beginner", color: "#A9FF22", minScore: 0 }} />
  );

  return (
    <BasePageHeader
      title="My Wallet"
      rightIcon={ProfileButtonElement}
      onRightIconClick={handleProfileClick}
    />
  );
}
