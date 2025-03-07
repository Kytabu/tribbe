
import { Plus, CreditCard, Smartphone, CheckCircle, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { TribbeButton } from "./components/TribbeButton";
import { useState } from "react";
import { SendViewProps, MoneyRequest, Circle } from "./types";
import { AmountInput } from "./components/AmountInput";
import { RequestsSheet } from "./components/RequestsSheet";
import { CirclesSheet } from "./components/CirclesSheet";
import { toast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ContactList } from "@/components/my-tribbe/ContactList";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { PaymentMethodButton } from "./components/PaymentMethodButton";

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

export function SendView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  autoTribbe,
  setAutoTribbe,
}: SendViewProps) {
  const [showRequests, setShowRequests] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [removedRequests, setRemovedRequests] = useState<number[]>([]);
  const [slidingRequests, setSlidingRequests] = useState<{[key: number]: 'left' | 'right'}>({});
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState<string>('');

  const handleAction = (id: number, direction: 'left' | 'right') => {
    setSlidingRequests(prev => ({...prev, [id]: direction}));
    setTimeout(() => {
      setRemovedRequests(prev => [...prev, id]);
    }, 300);
  };

  const handleToMyselfClick = () => {
    if (amount && parseFloat(amount) > 0) {
      setShowPaymentMethods(true);
    } else {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding",
      });
    }
  };

  const handleToOthersClick = () => {
    if (amount && parseFloat(amount) > 0) {
      setShowContacts(true);
    } else {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding",
      });
    }
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethods(false);
    setShowConfirmation(true);
  };

  const handleConfirmSend = () => {
    toast({
      title: "Transaction complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been sent successfully`,
    });
    setShowSendConfirmation(false);
    setAmount('');
    setSelectedContacts([]);
  };

  const handleContactSelection = () => {
    if (selectedContacts.length > 0) {
      const contacts = [
        { id: "1", name: "Alice Smith" },
        { id: "2", name: "Bob Johnson" },
        { id: "3", name: "Carol Williams" },
        { id: "4", name: "David Brown" },
        { id: "5", name: "Eva Davis" },
        { id: "6", name: "Frank Miller" },
        { id: "7", name: "Grace Taylor" },
        { id: "8", name: "Henry Wilson" }
      ];
      
      const selectedContact = contacts.find(contact => contact.id === selectedContacts[0]);
      if (selectedContact) {
        setRecipientName(selectedContact.name);
      }
      
      setShowContacts(false);
      setShowSendConfirmation(true);
    }
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
          imagePath="/lovable-uploads/c1c23c5c-90f5-4baa-a4b9-25ac8900c468.png"
          label="To myself"
          info="Instant"
          onClick={handleToMyselfClick}
        />
        <TribbeButton
          imagePath="/lovable-uploads/c8a61242-9472-4c27-a50d-adbc2e7a24b0.png"
          label="To others"
          info="Fast"
          onClick={handleToOthersClick}
        />
        <TribbeButton
          imagePath="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png"
          label="Requests to me"
          info="12"
          onClick={() => setShowRequests(true)}
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

      {/* Payment Methods Sheet */}
      <Sheet open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Select Payment Method</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <PaymentMethodButton 
              icon={<Smartphone className="w-5 h-5 text-tribbe-lime" />} 
              label="My Phone" 
              info="+254 712****45"
              onClick={() => handlePaymentMethodSelect('phone')}
            />
            <PaymentMethodButton 
              icon={<CreditCard className="w-5 h-5 text-tribbe-lime" />} 
              label="My Card" 
              info="•••• 4832"
              onClick={() => handlePaymentMethodSelect('card')}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Confirmation Dialog for Self Transfer */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmation</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Transfer Complete</h3>
            <p className="text-center text-muted-foreground mb-4">
              {currencySymbols[selectedCurrency]}{amount} has been transferred to your {selectedPaymentMethod === 'phone' ? 'phone' : 'card'}.
            </p>
            <Button 
              onClick={() => {
                setShowConfirmation(false);
                setAmount('');
                setSelectedPaymentMethod(null);
              }}
              className="w-full"
            >
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Sending to Others */}
      <Dialog open={showSendConfirmation} onOpenChange={setShowSendConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
                <User className="w-6 h-6 text-tribbe-lime" />
              </div>
              <div>
                <h3 className="font-medium">{recipientName}</h3>
                <p className="text-sm text-muted-foreground">Recipient</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-background border">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p className="text-2xl font-bold">{currencySymbols[selectedCurrency]}{amount}</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowSendConfirmation(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmSend}
              className="w-full sm:w-auto"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ContactList
        showContactList={showContacts}
        setShowContactList={setShowContacts}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        onConfirm={handleContactSelection}
      />

      <RequestsSheet
        open={showRequests}
        onOpenChange={setShowRequests}
        requests={filteredRequests}
        onAction={handleAction}
        slidingRequests={slidingRequests}
        currencySymbol={currencySymbols[selectedCurrency]}
      />
    </div>
  );
}
