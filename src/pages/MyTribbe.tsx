import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Wallet,
  UserPlus,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Check,
  MenuIcon,
} from "lucide-react";
import { useState, useRef } from "react";
import { useSidebar } from "@/components/ui/sidebar";

function TribbeContent() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const { openMobile, setOpenMobile, isMobile, open, setOpen } = useSidebar();

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  const contacts = [
    { id: "1", name: "Alice Smith", phone: "+254 712 345 678", image: "/lovable-uploads/a5a73b4a-8203-4833-8bd4-842288944144.png" },
    { id: "2", name: "Bob Johnson", phone: "+254 723 456 789", image: "/lovable-uploads/a66bb083-0a55-45b2-9fbb-b899fee07494.png" },
    { id: "3", name: "Carol Williams", phone: "+254 734 567 890", image: "/lovable-uploads/aa757ca5-a282-4eac-9369-b740b480634b.png" },
    { id: "4", name: "David Brown", phone: "+254 745 678 901", image: "/lovable-uploads/b145f32d-c53a-4dfd-bc4f-c501335741ab.png" },
    { id: "5", name: "Eva Davis", phone: "+254 756 789 012", image: "/lovable-uploads/bf878166-6407-457b-ac97-59a01d4a528b.png" },
    { id: "6", name: "Frank Miller", phone: "+254 767 890 123", image: "/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png" },
    { id: "7", name: "Grace Taylor", phone: "+254 778 901 234", image: "/lovable-uploads/c1c23c5c-90f5-4baa-a4b9-25ac8900c468.png" },
    { id: "8", name: "Henry Wilson", phone: "+254 789 012 345", image: "/lovable-uploads/c8a61242-9472-4c27-a50d-adbc2e7a24b0.png" }
  ];

  const filteredContacts = contacts
    .filter(contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const stats = {
    networkSize: 12,
    activeCircles: 3,
    totalLent: 15000,
    creditScore: 720,
    trustScore: 85
  };

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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

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
    <div className="container max-w-4xl mx-auto space-y-6 py-6">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full border-b -mt-6 mb-6">
        <div className="max-w-3xl mx-auto w-full px-4">
          <div className="flex h-14 items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/80"
              onClick={handleMenuClick}
            >
              <MenuIcon className="h-5 w-5 text-tribbe-lime" />
            </Button>
            <h2 className="text-2xl font-righteous text-tribbe-lime">My Tribbe</h2>
            <div className="w-10" />
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center">
          <Button 
            onClick={() => setShowContactList(true)}
            className="bg-tribbe-lime hover:bg-tribbe-lime/90 text-black"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Grow Network
          </Button>
        </div>

        <Card className="bg-tribbe-grey/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-1">
                <h2 className="text-lg font-medium text-white">Trust Score</h2>
                <p className="text-sm text-gray-400">Based on your Tribbe activity</p>
              </div>
              <div className="text-3xl font-bold text-tribbe-lime">{stats.trustScore}%</div>
            </div>
            <Progress value={stats.trustScore} className="h-2" />
          </CardContent>
        </Card>

        <Card className="bg-tribbe-grey/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-white">Your Network</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowAllMembers(true)}
                className="text-gray-400 hover:text-white"
              >
                View All <MoreHorizontal className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div 
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                ref={scrollContainerRef}
                onScroll={handleScroll}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {networkMembers.map((member) => (
                  <img
                    key={member.id}
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 flex-shrink-0"
                  />
                ))}
              </div>
              {canScrollLeft && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                  onClick={() => scroll('left')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              {canScrollRight && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70"
                  onClick={() => scroll('right')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">My Total Tribbes</h3>
                  <p className="text-2xl font-bold text-white">{5}</p>
                  <p className="text-xs text-gray-400">Active memberships</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-green-400">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Total Lent</h3>
                  <p className="text-2xl font-bold text-white">
                    KES {stats.totalLent.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">To Tribbe</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-red-400">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Total Borrowed</h3>
                  <p className="text-2xl font-bold text-white">
                    KES {(25000).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">From Tribbe</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-purple-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Network Size</h3>
                  <p className="text-2xl font-bold text-white">{networkMembers.length}</p>
                  <p className="text-xs text-gray-400">Total members</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-yellow-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Active Circles</h3>
                  <p className="text-2xl font-bold text-white">{stats.activeCircles}</p>
                  <p className="text-xs text-gray-400">Current circles</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-black/20 text-cyan-400">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-400">Total Transactions</h3>
                  <p className="text-2xl font-bold text-white">24</p>
                  <p className="text-xs text-gray-400">All time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showAllMembers} onOpenChange={setShowAllMembers}>
          <DialogContent className="bg-tribbe-grey/95 border-tribbe-grey max-w-3xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold text-white">Network Members</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAllMembers(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-6 gap-4 p-4">
              {networkMembers.slice(0, 6).map((member) => (
                <div key={member.id} className="flex flex-col items-center space-y-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16"
                  />
                  <p className="text-sm text-gray-300">{member.name}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-6 gap-4 p-4">
              {networkMembers.slice(6).map((member) => (
                <div key={member.id} className="flex flex-col items-center space-y-2">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16"
                  />
                  <p className="text-sm text-gray-300">{member.name}</p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Sheet open={showContactList} onOpenChange={setShowContactList}>
          <SheetContent className="w-full sm:max-w-md p-0">
            <SheetHeader className="p-6 border-b border-tribbe-grey">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-xl font-bold text-white">Add Contacts</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowContactList(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search contacts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-tribbe-grey/50 border-tribbe-grey text-white placeholder:text-gray-400"
                />
              </div>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(100vh-8rem)]">
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => toggleContactSelection(contact.id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-tribbe-grey/50 border-b border-tribbe-grey transition-colors"
                >
                  <img
                    src={contact.image}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-400">{contact.phone}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                    ${selectedContacts.includes(contact.id)
                      ? 'border-tribbe-lime bg-tribbe-lime'
                      : 'border-gray-400'
                    }`}
                  >
                    {selectedContacts.includes(contact.id) && (
                      <Check className="w-4 w-4 text-black" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <div className="border-t border-tribbe-grey p-4 bg-background">
              <Button 
                onClick={() => setShowContactList(false)}
                className="w-full bg-tribbe-lime hover:bg-tribbe-lime/90 text-black"
                disabled={selectedContacts.length === 0}
              >
                Add Selected Contacts ({selectedContacts.length})
              </Button>
            </div>
          </SheetContent>
        </Sheet>
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
