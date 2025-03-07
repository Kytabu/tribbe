
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Check, Phone, ArrowLeft, ArrowRight, Delete, ThumbsUp, User } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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
  onConfirm?: () => void;
}

export function ContactList({ 
  showContactList, 
  setShowContactList, 
  selectedContacts, 
  setSelectedContacts,
  onConfirm 
}: ContactListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPhoneEntry, setShowPhoneEntry] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [manualContactName, setManualContactName] = useState("");
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showTransferConfirmation, setShowTransferConfirmation] = useState(false);
  const [selectedContactDetails, setSelectedContactDetails] = useState<{name: string, phone: string} | null>(null);

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
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleContinueToConfirmation = () => {
    if (selectedContacts.length > 0) {
      // Find the contact details for the selected contact
      const selectedContact = contacts.find(contact => contact.id === selectedContacts[0]);
      if (selectedContact) {
        setSelectedContactDetails({
          name: selectedContact.name,
          phone: selectedContact.phone
        });
      } else if (phoneNumber) {
        setSelectedContactDetails({
          name: manualContactName || "Phone Contact",
          phone: phoneNumber
        });
      }
      
      // Show transfer confirmation dialog
      setShowTransferConfirmation(true);
    }
  };

  const handleConfirmTransfer = () => {
    // Close transfer confirmation dialog
    setShowTransferConfirmation(false);
    
    // Open PIN entry screen
    setTimeout(() => {
      setShowPinEntry(true);
    }, 300);
  };

  const handleCancelTransfer = () => {
    setShowTransferConfirmation(false);
  };

  const handlePhoneNumberInput = (digit: string) => {
    if (phoneNumber.length < 12) {
      setPhoneNumber(prev => prev + digit);
    }
  };

  const handleDeleteDigit = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handlePhoneNumberSubmit = () => {
    if (phoneNumber.length > 0) {
      setSelectedContactDetails({
        name: manualContactName || "Phone Contact",
        phone: phoneNumber
      });
      setShowTransferConfirmation(true);
    }
  };

  const handlePinDigitInput = (digit: string) => {
    if (pinCode.length < 4) {
      setPinCode(prev => prev + digit);
    }
  };

  const handlePinDeleteDigit = () => {
    setPinCode(prev => prev.slice(0, -1));
  };

  const handlePinSubmit = () => {
    if (pinCode.length === 4) {
      if (showPhoneEntry && phoneNumber.length > 0) {
        const manualContactId = `manual-${Date.now()}`;
        setSelectedContacts([manualContactId]);
      }
      
      setShowPinEntry(false);
      setShowPhoneEntry(false);
      setPinCode("");
      
      setShowSuccessDialog(true);
    }
  };

  const renderContactList = () => {
    return (
      <>
        <SheetHeader className="p-6 border-b border-tribbe-grey">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-bold text-white">Contacts</SheetTitle>
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
        
        <div className="px-4 py-3 border-b border-tribbe-grey">
          <button
            className="w-full flex items-center gap-4 py-2"
            onClick={() => setShowPhoneEntry(true)}
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
              onClick={handleContinueToConfirmation}
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
  };

  const renderPhoneEntry = () => {
    return (
      <>
        <div className="p-6 border-b border-tribbe-grey flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPhoneEntry(false)}
            className="mr-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold text-white">Send Money</h2>
        </div>
        
        <div className="flex flex-col items-center justify-between h-[calc(100vh-8rem)]">
          <div className="w-full px-6 pt-12 pb-6">
            <div className="relative border-b-2 border-tribbe-grey/50 pb-2 mb-6">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-tribbe-lime"></div>
              <Input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="bg-transparent border-0 text-xl text-white pl-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter phone number"
                type="tel"
              />
            </div>
            
            <Input
              value={manualContactName}
              onChange={(e) => setManualContactName(e.target.value)}
              className="bg-tribbe-grey/30 border-tribbe-grey text-white mt-4"
              placeholder="Contact name (optional)"
            />
          </div>
          
          <div className="w-full px-4 mb-4">
            <Button
              onClick={handlePhoneNumberSubmit}
              disabled={phoneNumber.length === 0}
              className="w-full bg-background border border-tribbe-grey/50 text-white hover:bg-tribbe-grey/30 py-6 rounded-full relative group"
            >
              <span className="mr-6">CONTINUE</span>
              <span className="absolute right-6 opacity-70 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-5 w-5" />
              </span>
            </Button>
          </div>
          
          <div className="w-full px-4 pb-6">
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePhoneNumberInput(num.toString())}
                  className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
              >
                {/* Empty space */}
              </button>
              <button
                onClick={() => handlePhoneNumberInput("0")}
                className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
              >
                0
              </button>
              <button
                onClick={handleDeleteDigit}
                className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
              >
                <Delete className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderPinEntry = () => {
    return (
      <>
        <div className="p-6 border-b border-tribbe-grey flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPinEntry(false)}
            className="mr-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-bold text-white">Enter PIN</h2>
        </div>
        
        <div className="flex flex-col items-center px-6 py-12">
          <div className="text-center mb-8">
            <p className="text-white/70 text-sm">Enter your PIN to confirm the transaction</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full border-2 ${
                  pinCode.length > index ? "bg-tribbe-lime border-tribbe-lime" : "border-tribbe-lime"
                }`}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-6 w-full mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handlePinDigitInput(num.toString())}
                className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
              >
                {num}
              </button>
            ))}
            <button className="flex items-center justify-center h-14 text-2xl font-medium text-white">
              {/* Empty space */}
            </button>
            <button
              onClick={() => handlePinDigitInput("0")}
              className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
            >
              0
            </button>
            <button
              onClick={handlePinDeleteDigit}
              className="flex items-center justify-center h-14 text-2xl font-medium text-white hover:bg-tribbe-grey/30 rounded-md transition-colors"
            >
              <Delete className="h-6 w-6" />
            </button>
          </div>
          
          {pinCode.length === 4 && (
            <Button
              onClick={handlePinSubmit}
              className="w-full max-w-xs bg-tribbe-lime hover:bg-tribbe-lime/90 text-black h-12 rounded-full"
            >
              <Check className="mr-2 h-5 w-5" />
              Confirm
            </Button>
          )}
        </div>
      </>
    );
  };

  const renderTransferConfirmationDialog = () => {
    return (
      <Dialog open={showTransferConfirmation} onOpenChange={setShowTransferConfirmation}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-4">
            <h2 className="text-xl font-bold mb-4">Confirm Transfer</h2>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Confirm money transfer details
            </p>
            
            {selectedContactDetails && (
              <>
                <div className="flex items-center space-x-4 w-full mb-4">
                  <div className="w-12 h-12 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-tribbe-lime" />
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedContactDetails.name}</h3>
                    <p className="text-sm text-muted-foreground">Recipient</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-background border w-full mb-6">
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="text-2xl font-bold">KSh 1,000</p>
                </div>
              </>
            )}
            
            <div className="w-full flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <Button 
                variant="outline" 
                onClick={handleCancelTransfer}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmTransfer}
                className="w-full sm:w-auto"
              >
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const renderSuccessDialog = () => {
    return (
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ThumbsUp className="w-6 h-6 text-tribbe-lime" />
            </div>
            
            <h2 className="text-xl font-bold mb-2">Transaction Complete</h2>
            
            <p className="text-center text-base font-medium mb-1">
              Money sent successfully
            </p>
            <p className="text-center text-sm text-muted-foreground mb-6">
              Your transaction has been processed and the funds have been transferred.
            </p>
            
            <Button 
              onClick={handleTransactionComplete}
              className="w-full max-w-xs bg-tribbe-lime hover:bg-tribbe-lime/90 text-black h-12 rounded-full"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const handleTransactionComplete = () => {
    setShowSuccessDialog(false);
    
    toast({
      title: "Transaction complete",
      description: "Your money has been sent successfully",
    });
    
    if (onConfirm) {
      onConfirm();
    } else {
      setShowContactList(false);
    }
  };

  return (
    <Sheet open={showContactList} onOpenChange={setShowContactList}>
      <SheetContent className="w-full sm:max-w-md p-0">
        {showPinEntry ? renderPinEntry() : 
         showPhoneEntry ? renderPhoneEntry() : 
         renderContactList()}
      </SheetContent>
      {renderTransferConfirmationDialog()}
      {renderSuccessDialog()}
    </Sheet>
  );
}

