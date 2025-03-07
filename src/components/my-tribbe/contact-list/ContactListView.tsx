
import { Search, X, Check, Phone, ArrowRight } from "lucide-react";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Contact {
  id: string;
  name: string;
  phone: string;
  image: string;
}

interface ContactListViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredContacts: Contact[];
  selectedContacts: string[];
  toggleContactSelection: (contactId: string) => void;
  onCloseClick: () => void;
  onEnterPhoneClick: () => void;
  onContinueClick: () => void;
}

export function ContactListView({
  searchQuery,
  setSearchQuery,
  filteredContacts,
  selectedContacts,
  toggleContactSelection,
  onCloseClick,
  onEnterPhoneClick,
  onContinueClick
}: ContactListViewProps) {
  return (
    <>
      <SheetHeader className="p-6 border-b border-tribbe-grey">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-xl font-bold text-white">Contacts</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseClick}
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
      
      <div className="px-4 py-3 border-b border-tribbe-grey">
        <button
          className="w-full flex items-center gap-4 py-2"
          onClick={onEnterPhoneClick}
        >
          <div className="p-2 rounded-full bg-[#0EA5E9] flex items-center justify-center">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <span className="text-white font-medium">Enter phone number</span>
        </button>
      </div>
      
      <div className="overflow-y-auto h-[calc(100vh-12rem)]">
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
                <Check className="w-4 h-4 text-black" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      {selectedContacts.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-tribbe-grey sm:max-w-md sm:mx-auto">
          <Button 
            onClick={onContinueClick}
            className="w-full bg-tribbe-lime hover:bg-tribbe-lime/90 text-black py-6 rounded-full relative group"
          >
            <span className="mr-6">CONTINUE</span>
            <span className="absolute right-6 opacity-70 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Button>
        </div>
      )}
    </>
  );
}
