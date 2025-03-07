
import { useState } from "react";
import { ArrowLeft, Phone, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Contact {
  id: string;
  name: string;
  phone: string;
  image: string;
}

export interface ContactListViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredContacts: Contact[];
  selectedContacts: string[];
  toggleContactSelection: (contactId: string) => void;
  onAddPhoneClick: () => void;
  onContinueClick: () => void;
  onClose: () => void;
}

export function ContactListView({
  searchQuery,
  setSearchQuery,
  filteredContacts,
  selectedContacts,
  toggleContactSelection,
  onAddPhoneClick,
  onContinueClick,
  onClose
}: ContactListViewProps) {
  const [hasSelection, setHasSelection] = useState(false);

  // Effect to update hasSelection when selectedContacts changes
  useState(() => {
    setHasSelection(selectedContacts.length > 0);
  });

  return (
    <div className="bg-background fixed inset-0 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Select Contact</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Search contacts"
            className="pl-10 border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {/* Add phone number button */}
          <button
            className="flex items-center p-3 hover:bg-accent rounded-lg w-full"
            onClick={onAddPhoneClick}
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Phone className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="ml-3 font-medium">Enter phone number</span>
          </button>

          {/* Contacts */}
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-3 hover:bg-accent rounded-lg mb-1 ${
                selectedContacts.includes(contact.id) ? "bg-accent" : ""
              }`}
              onClick={() => toggleContactSelection(contact.id)}
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {contact.image ? (
                  <img src={contact.image} alt={contact.name} className="w-10 h-10 object-cover" />
                ) : (
                  <User className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
              </div>
              {selectedContacts.includes(contact.id) && (
                <div className="w-6 h-6 rounded-full bg-tribbe-lime flex items-center justify-center">
                  <span className="text-black text-xs">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="p-4">
        <Button
          className="w-full"
          disabled={!selectedContacts.length}
          onClick={onContinueClick}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
