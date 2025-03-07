
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Crown, RotateCcw, UserCog, Bell, Database, ArchiveIcon } from "lucide-react";
import { SettingItem } from "./SettingItem";
import { SettingSection } from "./SettingSection";

export const AccountSection = () => {
  const navigate = useNavigate();
  
  return (
    <SettingSection title="Account">
      <SettingItem 
        icon={<Mail className="w-5 h-5" />} 
        label="Email" 
        value="user@example.com" 
      />
      
      <SettingItem 
        icon={<Phone className="w-5 h-5" />} 
        label="Phone number" 
        value="+254712345678" 
      />
      
      <SettingItem 
        icon={<Crown className="w-5 h-5" />} 
        label="Subscription" 
        value="Tribbe Premium" 
      />
      
      <SettingItem 
        icon={<RotateCcw className="w-5 h-5" />} 
        label="Restore purchases" 
        onClick={() => {}} 
      />
      
      <SettingItem 
        icon={<UserCog className="w-5 h-5" />} 
        label="Personalization" 
        onClick={() => navigate("/personalization")} 
      />
      
      <SettingItem 
        icon={<Bell className="w-5 h-5" />} 
        label="Notifications" 
        onClick={() => navigate("/notifications")} 
      />
      
      <SettingItem 
        icon={<Database className="w-5 h-5" />} 
        label="Data Controls" 
        onClick={() => {}} 
      />
      
      <SettingItem 
        icon={<ArchiveIcon className="w-5 h-5" />} 
        label="Archived Chats" 
        onClick={() => {}} 
        isLast
      />
    </SettingSection>
  );
};
