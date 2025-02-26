import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { UserPlus, ThumbsUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ContactList } from "@/components/my-tribbe/ContactList";
import { NetworkGrid } from "@/components/my-tribbe/NetworkGrid";
import { StatsCard } from "@/components/my-tribbe/StatsCard";
import { StatisticsGrid } from "@/components/my-tribbe/StatisticsGrid";
import { PageHeader } from "@/components/layout/PageHeader";
import { toast } from "@/hooks/use-toast";

const networkMembers = [
  { id: 1, name: "Sarah", image: "/lovable-uploads/237ca64a-021e-4578-9f08-b9fb2245f01e.png" },
  { id: 2, name: "Marcus", image: "/lovable-uploads/02bff5e9-ea21-4298-ad23-9d9ce111b691.png" },
  { id: 3, name: "James", image: "/lovable-uploads/e25c10fb-ede6-40a6-be94-ae27ae122714.png" },
  { id: 4, name: "Diana", image: "/lovable-uploads/bc82d70e-eb04-4dc9-82d5-a9f4e4c0c0e8.png" },
  { id: 5, name: "Michael", image: "/lovable-uploads/c3603a81-6764-4f8a-bf9a-f8fa6f277493.png" },
  { id: 6, name: "Lisa", image: "/lovable-uploads/eaebdf3c-f654-426e-9882-d23cfc6c3be2.png" },
  { id: 7, name: "John", image: "/lovable-uploads/5cd0a2a3-10ab-405a-957a-918146dc1cc6.png" },
  { id: 8, name: "Angela", image: "/lovable-uploads/42287469-a1c7-4d88-b55c-db500133e882.png" },
  { id: 9, name: "David", image: "/lovable-uploads/cff39b6d-626c-4165-9ffe-16558234dc9b.png" },
  { id: 10, name: "Rachel", image: "/lovable-uploads/caae7b31-135b-4f5d-a905-5e292142cbb9.png" },
  { id: 11, name: "Chris", image: "/lovable-uploads/bf1a4aaa-ea56-44a2-a14f-183edcf2b8b3.png" },
  { id: 12, name: "Tanya", image: "/lovable-uploads/289c745d-027d-40b4-8355-97b6a87d064e.png" }
];

const stats = {
  networkSize: 12,
  activeCircles: 3,
  totalLent: 15000,
  creditScore: 720,
  trustScore: 85
};

function TribbeContent() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showContactList, setShowContactList] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  useEffect(() => {
    toast({
      title: "Done. Give it a sec...",
      description: "",
      action: <ThumbsUp className="w-4 h-4" />,
    });
  }, []);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  return (
    <div className="w-full">
      <PageHeader 
        title="My Tribbe"
        rightIcon={<UserPlus className="h-5 w-5 text-tribbe-lime" />}
        onRightIconClick={() => setShowContactList(true)}
      />

      <div className="px-4 space-y-[15px]">
        <div className="pt-[15px]">
          <StatsCard stats={stats} />
        </div>

        <div>
          <NetworkGrid
            networkMembers={networkMembers}
            onViewAllClick={() => {}}
            scrollContainerRef={scrollContainerRef}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            onScroll={handleScroll}
          />
        </div>

        <div>
          <StatisticsGrid stats={stats} />
        </div>

        <ContactList
          showContactList={showContactList}
          setShowContactList={setShowContactList}
          selectedContacts={selectedContacts}
          setSelectedContacts={setSelectedContacts}
        />
      </div>
    </div>
  );
}

export default function MyTribbe() {
  return (
    <AppLayout>
      <TribbeContent />
    </AppLayout>
  );
}
