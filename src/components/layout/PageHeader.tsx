
import React from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  titleClassName?: string;
}

export function PageHeader({ 
  title, 
  rightIcon, 
  onRightIconClick,
  titleClassName 
}: PageHeaderProps) {
  const { openMobile, setOpenMobile, isMobile, open, setOpen } = useSidebar();

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full border-b">
      <div className="max-w-2xl mx-auto w-full px-4">
        <div className="flex h-14 items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-background/80"
            onClick={handleMenuClick}
          >
            <MenuIcon className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h2 className={cn("text-lg font-righteous text-tribbe-lime", titleClassName)}>
            {title}
          </h2>
          {rightIcon ? (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/80"
              onClick={onRightIconClick}
            >
              {rightIcon}
            </Button>
          ) : (
            <div className="w-10" /> 
          )}
        </div>
      </div>
    </div>
  );
}
