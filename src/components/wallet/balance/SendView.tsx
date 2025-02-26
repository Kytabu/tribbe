
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { SupportedCurrency } from "@/features/wallet/constants";
import { TribbeButton } from "./components/TribbeButton";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface SendViewProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  autoTribbe: boolean;
  setAutoTribbe: (value: boolean) => void;
}

// Credit score color mapping
const getCreditScoreColor = (score: number): string => {
  if (score >= 800) return "from-[#C699FF] to-[#9b87f5]";
  if (score >= 740) return "from-[#A9FF22] to-[#79CFFF]";
  if (score >= 670) return "from-[#79CFFF] to-[#33C3F0]";
  if (score >= 580) return "from-[#F6D83E] to-[#F97316]";
  return "from-[#ea384c] to-[#ef4444]";
};

export function SendView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  autoTribbe,
  setAutoTribbe,
}: SendViewProps) {
  const [showRequests, setShowRequests] = useState(false);
  const [removedRequests, setRemovedRequests] = useState<number[]>([]);
  const [slidingRequests, setSlidingRequests] = useState<{[key: number]: 'left' | 'right'}>({});

  // Mock data for money requests
  const moneyRequests = [
    { id: 1, name: "Sarah Williams", amount: 500, creditScore: 720, image: "/lovable-uploads/237ca64a-021e-4578-9f08-b9fb2245f01e.png" },
    { id: 2, name: "Marcus Johnson", amount: 750, creditScore: 680, image: "/lovable-uploads/02bff5e9-ea21-4298-ad23-9d9ce111b691.png" },
    { id: 3, name: "James Smith", amount: 1000, creditScore: 750, image: "/lovable-uploads/e25c10fb-ede6-40a6-be94-ae27ae122714.png" },
    { id: 4, name: "Diana Chen", amount: 300, creditScore: 690, image: "/lovable-uploads/bc82d70e-eb04-4dc9-82d5-a9f4e4c0c0e8.png" },
    { id: 5, name: "Michael Brown", amount: 450, creditScore: 710, image: "/lovable-uploads/c3603a81-6764-4f8a-bf9a-f8fa6f277493.png" },
    { id: 6, name: "Lisa Anderson", amount: 600, creditScore: 735, image: "/lovable-uploads/eaebdf3c-f654-426e-9882-d23cfc6c3be2.png" },
    { id: 7, name: "John Davis", amount: 850, creditScore: 695, image: "/lovable-uploads/5cd0a2a3-10ab-405a-957a-918146dc1cc6.png" },
    { id: 8, name: "Angela Martinez", amount: 200, creditScore: 725, image: "/lovable-uploads/42287469-a1c7-4d88-b55c-db500133e882.png" },
    { id: 9, name: "David Wilson", amount: 900, creditScore: 705, image: "/lovable-uploads/cff39b6d-626c-4165-9ffe-16558234dc9b.png" },
    { id: 10, name: "Rachel Taylor", amount: 1200, creditScore: 740, image: "/lovable-uploads/caae7b31-135b-4f5d-a905-5e292142cbb9.png" },
    { id: 11, name: "Chris Lee", amount: 550, creditScore: 715, image: "/lovable-uploads/bf1a4aaa-ea56-44a2-a14f-183edcf2b8b3.png" },
    { id: 12, name: "Tanya Rodriguez", amount: 650, creditScore: 730, image: "/lovable-uploads/289c745d-027d-40b4-8355-97b6a87d064e.png" }
  ];

  const handleAction = (id: number, direction: 'left' | 'right') => {
    setSlidingRequests(prev => ({...prev, [id]: direction}));
    // Remove the request from the DOM after animation completes
    setTimeout(() => {
      setRemovedRequests(prev => [...prev, id]);
    }, 300);
  };

  const filteredRequests = moneyRequests.filter(request => !removedRequests.includes(request.id));

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
          imagePath="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png"
          label="Requests"
          info="12"
          onClick={() => setShowRequests(true)}
        />
        <TribbeButton
          imagePath="/lovable-uploads/db93bdb2-b924-4cd9-ba73-27b77b8358d3.png"
          label="My Circles"
          endIcon={<Plus className="w-5 h-5 text-tribbe-sage group-hover:text-tribbe-lime" />}
        />
        <TribbeButton
          imagePath="/lovable-uploads/24f8c963-ad65-4096-be33-ccfa37f896eb.png"
          label="The Tribbe"
          endContent={
            <div className="flex items-center gap-2">
              <span className="text-tribbe-sage group-hover:text-tribbe-lime">Automate</span>
              <Switch
                checked={autoTribbe}
                onCheckedChange={setAutoTribbe}
                className="data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-tribbe-lime border border-tribbe-lime"
              />
            </div>
          }
        />
      </div>

      <Sheet open={showRequests} onOpenChange={setShowRequests}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Money Requests</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className={`bg-background border rounded-lg p-4 transform transition-all duration-300 ${
                  slidingRequests[request.id] === 'right' 
                    ? 'translate-x-full opacity-0' 
                    : slidingRequests[request.id] === 'left'
                    ? '-translate-x-full opacity-0'
                    : 'translate-x-0'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCreditScoreColor(request.creditScore)} blur-[1px]`} />
                      <div className="relative w-10 h-10 rounded-full border-2 border-transparent bg-clip-padding">
                        <img
                          src={request.image}
                          alt={request.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currencySymbols[selectedCurrency]}{request.amount}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-red-500/20 hover:text-red-500"
                      onClick={() => handleAction(request.id, 'left')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full hover:bg-green-500/20 hover:text-green-500"
                      onClick={() => handleAction(request.id, 'right')}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
