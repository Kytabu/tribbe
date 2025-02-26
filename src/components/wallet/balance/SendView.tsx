
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { TribbeButton } from "./components/TribbeButton";
import { useState } from "react";
import { SendViewProps, MoneyRequest, Circle } from "./types";
import { AmountInput } from "./components/AmountInput";
import { RequestsSheet } from "./components/RequestsSheet";
import { CirclesSheet } from "./components/CirclesSheet";
import { toast } from "@/hooks/use-toast";

const moneyRequests: MoneyRequest[] = [
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

const circles: Circle[] = [
  { 
    id: "1",
    name: "Jemo's Graduation",
    type: "Fundraiser",
    daysLeft: 19,
    amount: "Chip in",
    progress: 65,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
  },
  {
    id: "2",
    name: "Sam & Co. Ltd",
    type: "Investment",
    daysLeft: 70,
    amount: 500000,
    progress: 80,
    image: "https://images.unsplash.com/photo-1501286353178-1ec871214838"
  },
  {
    id: "3",
    name: "Peter's Place",
    type: "Activity",
    daysLeft: 8,
    amount: "Free",
    progress: 40,
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
  },
  {
    id: "4",
    name: "Boyz II Men",
    type: "Event",
    daysLeft: 13,
    amount: 3000,
    progress: 25,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
  }
];

export function SendView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  autoTribbe,
  setAutoTribbe,
}: SendViewProps) {
  const [showRequests, setShowRequests] = useState(false);
  const [showCircles, setShowCircles] = useState(false);
  const [removedRequests, setRemovedRequests] = useState<number[]>([]);
  const [slidingRequests, setSlidingRequests] = useState<{[key: number]: 'left' | 'right'}>({});

  const handleAction = (id: number, direction: 'left' | 'right') => {
    setSlidingRequests(prev => ({...prev, [id]: direction}));
    setTimeout(() => {
      setRemovedRequests(prev => [...prev, id]);
    }, 300);
  };

  const handleCirclesComplete = (selectedCircles: string[]) => {
    toast({
      title: "Circles selected",
      description: `Selected ${selectedCircles.length} circle${selectedCircles.length === 1 ? '' : 's'}`,
    });
  };

  const filteredRequests = moneyRequests.filter(request => !removedRequests.includes(request.id));

  return (
    <div className="space-y-4 animate-fade-in">
      <AmountInput
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbols[selectedCurrency]}
      />

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
          onClick={() => setShowCircles(true)}
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

      <RequestsSheet
        open={showRequests}
        onOpenChange={setShowRequests}
        requests={filteredRequests}
        onAction={handleAction}
        slidingRequests={slidingRequests}
        currencySymbol={currencySymbols[selectedCurrency]}
      />

      <CirclesSheet
        open={showCircles}
        onOpenChange={setShowCircles}
        circles={circles}
        onComplete={handleCirclesComplete}
      />
    </div>
  );
}
