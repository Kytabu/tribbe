
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SupportedCurrency } from "@/features/wallet/constants";
import { TribbeButton } from "./components/TribbeButton";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { Check, ThumbsUp, UserPlus } from "lucide-react";

interface RequestViewProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
}

interface Friend {
  name: string;
  image: string;
  creditScore: number;
}

export function RequestView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
}: RequestViewProps) {
  const [isNewCircleOpen, setIsNewCircleOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const friends: Friend[] = [
    { 
      name: "Sarah Johnson",
      image: "/lovable-uploads/237ca64a-021e-4578-9f08-b9fb2245f01e.png",
      creditScore: 850
    },
    { 
      name: "Michael Smith",
      image: "/lovable-uploads/02bff5e9-ea21-4298-ad23-9d9ce111b691.png",
      creditScore: 780
    },
    { 
      name: "Emma Davis",
      image: "/lovable-uploads/e25c10fb-ede6-40a6-be94-ae27ae122714.png",
      creditScore: 720
    },
    { 
      name: "James Wilson",
      image: "/lovable-uploads/bc82d70e-eb04-4dc9-82d5-a9f4e4c0c0e8.png",
      creditScore: 690
    },
    { 
      name: "Sophia Brown",
      image: "/lovable-uploads/c3603a81-6764-4f8a-bf9a-f8fa6f277493.png",
      creditScore: 800
    }
  ];

  const handleTribbeClick = () => {
    toast({
      title: "Done. Give it a sec...",
      action: <ThumbsUp className="h-4 w-4" />,
    });
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 800) return 'from-purple-400 to-purple-600';
    if (score >= 740) return 'from-green-400 to-green-600';
    if (score >= 670) return 'from-blue-400 to-blue-600';
    if (score >= 580) return 'from-yellow-400 to-yellow-600';
    return 'from-orange-400 to-orange-600';
  };

  const toggleFriendSelection = (friendName: string) => {
    setSelectedFriends(prev => 
      prev.includes(friendName) 
        ? prev.filter(name => name !== friendName)
        : [...prev, friendName]
    );
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

      <Sheet open={isContactsOpen} onOpenChange={setIsContactsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Friends</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 pt-4">
            {friends.map((friend) => (
              <div
                key={friend.name}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCreditScoreColor(friend.creditScore)} blur-[1px]`} />
                    <div className="relative w-10 h-10 rounded-full border-2 border-transparent bg-clip-padding">
                      <img
                        src={friend.image}
                        alt={friend.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <span className="font-medium">{friend.name}</span>
                </div>
                <Button
                  variant={selectedFriends.includes(friend.name) ? "default" : "outline"}
                  size="icon"
                  className="h-6 w-6 rounded-full transition-all duration-300"
                  onClick={() => toggleFriendSelection(friend.name)}
                >
                  <Check className={`h-3 w-3 ${selectedFriends.includes(friend.name) ? 'opacity-100' : 'opacity-0'}`} />
                </Button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
