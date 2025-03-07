
import { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";

type SettingItemProps = {
  icon: ReactNode;
  label: string;
  value?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onClick?: () => void;
  isLast?: boolean;
};

export const SettingItem = ({
  icon,
  label,
  value,
  checked,
  onCheckedChange,
  onClick,
  isLast = false,
}: SettingItemProps) => {
  const isToggle = onCheckedChange !== undefined;
  const isClickable = onClick !== undefined;
  
  return (
    <div 
      className={`px-4 py-3.5 flex items-center justify-between ${!isLast ? 'border-b border-tribbe-lime/10' : ''} ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="text-tribbe-lime">{icon}</div>
        <span className="text-tribbe-white">{label}</span>
      </div>
      
      {isToggle && (
        <Switch 
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="data-[state=checked]:bg-tribbe-lime data-[state=checked]:border-tribbe-lime"
        />
      )}
      
      {value && (
        <div className="flex items-center">
          <span className="text-tribbe-white/70 text-sm mr-1">{value}</span>
        </div>
      )}
    </div>
  );
};
