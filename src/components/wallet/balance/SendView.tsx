
import { useState } from "react";
import { SendViewProps } from "./types";
import { AmountInput } from "./components/AmountInput";
import { toast } from "@/hooks/use-toast";
import { ContactList } from "@/components/my-tribbe/ContactList";
import { RequestsSheet } from "./components/RequestsSheet";
import { SendActionButtons } from "./components/SendActionButtons";
import { PaymentMethodSheet } from "./components/PaymentMethodSheet";
import { TransferConfirmationDialog } from "./components/TransferConfirmationDialog";
import { SendConfirmationDialog } from "./components/SendConfirmationDialog";
import { useMoneyRequests } from "./hooks/useMoneyRequests";

export function SendView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
  autoTribbe,
  setAutoTribbe,
}: SendViewProps) {
  // UI state
  const [showRequests, setShowRequests] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  
  // Data state
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState<string>('');
  
  // Hook for managing money requests
  const { filteredRequests, slidingRequests, handleAction } = useMoneyRequests();

  // Action handlers
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

  const handleConfirmationDone = () => {
    setShowConfirmation(false);
    toast({
      title: "Transfer complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been transferred to your ${selectedPaymentMethod === 'phone' ? 'phone' : 'card'}.`,
    });
    setAmount('');
    setSelectedPaymentMethod(null);
  };

  const handleConfirmSend = () => {
    toast({
      title: "Transaction complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been sent to ${recipientName}`,
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
        setShowContacts(false);
        setShowSendConfirmation(true);
      } else {
        toast({
          title: "Contact not found",
          description: "Selected contact could not be found",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No contact selected",
        description: "Please select a contact to send money",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <AmountInput
        amount={amount}
        setAmount={setAmount}
        selectedCurrency={selectedCurrency}
        currencySymbol={currencySymbols[selectedCurrency]}
      />

      <SendActionButtons
        autoTribbe={autoTribbe}
        setAutoTribbe={setAutoTribbe}
        onToMyselfClick={handleToMyselfClick}
        onToOthersClick={handleToOthersClick}
        onRequestsClick={() => setShowRequests(true)}
      />

      {/* Payment Methods Sheet */}
      <PaymentMethodSheet
        open={showPaymentMethods}
        onOpenChange={setShowPaymentMethods}
        onMethodSelect={handlePaymentMethodSelect}
      />

      {/* Confirmation Dialog for Self Transfer */}
      <TransferConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        amount={amount}
        currencySymbol={currencySymbols[selectedCurrency]}
        selectedPaymentMethod={selectedPaymentMethod}
        onDone={handleConfirmationDone}
      />

      {/* Confirmation Dialog for Sending to Others */}
      <SendConfirmationDialog
        open={showSendConfirmation}
        onOpenChange={setShowSendConfirmation}
        recipientName={recipientName}
        amount={amount}
        currencySymbol={currencySymbols[selectedCurrency]}
        onCancel={() => setShowSendConfirmation(false)}
        onConfirm={handleConfirmSend}
      />

      {/* Contact List for selecting recipients */}
      <ContactList
        showContactList={showContacts}
        setShowContactList={setShowContacts}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        onConfirm={handleContactSelection}
      />

      {/* Money Requests Sheet */}
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
