
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SupportedCurrency } from "@/features/wallet/constants";
import { TribbeButton } from "./components/TribbeButton";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { ThumbsUp, UserPlus } from "lucide-react";

interface RequestViewProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
}

export function RequestView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
}: RequestViewProps) {
  const [isNewCircleOpen, setIsNewCircleOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  const handleTribbeClick = () => {
    toast({
      title: "Done. Give it a sec...",
      action: <ThumbsUp className="h-4 w-4" />,
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
            {selectedCurrency.substring(0, 1)}
          </span>
          <div className="relative rounded-lg border-2 border-tribbe-lime p-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setAmount(value);
              }}
              placeholder="0.00"
              className="text-4xl font-bold pl-16 h-12 bg-transparent border-none focus-visible:ring-0 bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] pointer-events-none whitespace-nowrap">
              {currencySymbols[selectedCurrency]}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <TribbeButton
          imagePath="/lovable-uploads/24f8c963-ad65-4096-be33-ccfa37f896eb.png"
          label="My Tribbe"
          info="Instant"
          onClick={handleTribbeClick}
        />
        <TribbeButton
          imagePath="/lovable-uploads/db93bdb2-b924-4cd9-ba73-27b77b8358d3.png"
          label="My Circle"
          info="should be fast"
          onClick={() => setIsNewCircleOpen(true)}
        />
        <TribbeButton
          imagePath="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png"
          label="Close Friends"
          info="kinda quick"
          onClick={() => setIsContactsOpen(true)}
        />
      </div>

      {/* New Circle Sheet */}
      <Sheet open={isNewCircleOpen} onOpenChange={setIsNewCircleOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create New Circle</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 pt-4">
            <Input
              type="text"
              placeholder="Circle name"
              className="bg-background"
            />
            <Button 
              className="w-full"
              onClick={() => setIsNewCircleOpen(false)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Members
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Friends List Sheet */}
      <Sheet open={isContactsOpen} onOpenChange={setIsContactsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Friends</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 pt-4">
            {[
              "Sarah Johnson",
              "Michael Smith",
              "Emma Davis",
              "James Wilson",
              "Sophia Brown",
            ].map((friend) => (
              <div
                key={friend}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
              >
                <span>{friend}</span>
                <Button variant="ghost" size="sm">
                  Select
                </Button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
