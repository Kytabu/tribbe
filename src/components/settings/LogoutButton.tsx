
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  return (
    <div className="mb-10">
      <div className="bg-tribbe-grey/50 rounded-lg overflow-hidden border border-tribbe-lime/20">
        <div className="px-4 py-3.5 flex items-center justify-center cursor-pointer">
          <div className="flex items-center gap-2 text-red-500">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};
