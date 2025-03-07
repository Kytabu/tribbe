
import { ReactNode } from "react";

type SettingSectionProps = {
  title: string;
  children: ReactNode;
  description?: string;
  className?: string;
};

export const SettingSection = ({ 
  title, 
  children, 
  description,
  className = "",
}: SettingSectionProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h2 className="text-sm font-medium text-tribbe-lime/80 mb-4 uppercase tracking-wide">{title}</h2>
      <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20">
        {children}
      </div>
      {description && (
        <p className="text-tribbe-white/70 text-xs mt-2 px-1">
          {description}
        </p>
      )}
    </div>
  );
};
