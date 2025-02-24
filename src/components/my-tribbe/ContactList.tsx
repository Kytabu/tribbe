
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Check } from "lucide-react";
import { useState } from "react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  image: string;
}

interface ContactListProps {
  showContactList: boolean;
  setShowContactList: (show: boolean) => void;
  selectedContacts: string[];
  setSelectedContacts: (contacts: string[]) => void;
}

export function ContactList({ 
  showContactList, 
  setShowContactList, 
  selectedContacts, 
  setSelectedContacts 
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");

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
    // Create new array instead of using a state updater function
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  return (
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
  );
}
