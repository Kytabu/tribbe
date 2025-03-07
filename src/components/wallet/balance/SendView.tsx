
import { useState, useEffect } from "react";
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

  // Reset state when amount changes or dialogs close
  useEffect(() => {
    if (!amount && (showConfirmation || showSendConfirmation)) {
      setShowConfirmation(false);
      setShowSendConfirmation(false);
      setSelectedPaymentMethod(null);
      setSelectedContacts([]);
    }
  }, [amount, showConfirmation, showSendConfirmation]);

  // Action handlers
  const handleToMyselfClick = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding"
      });
      return;
    }
    
    // Show payment method sheet when "To myself" is clicked
    setShowPaymentMethods(true);
  };

  const handleToOthersClick = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Enter an amount",
        description: "Please enter a valid amount before proceeding"
      });
      return;
    }
    setShowContacts(true);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowPaymentMethods(false);
    
    // Use setTimeout to avoid UI conflicts and ensure smooth transition
    setTimeout(() => {
      setShowConfirmation(true);
    }, 300);
  };

  const handleConfirmationDone = () => {
    setShowConfirmation(false);
    
    // Show toast and reset form
    toast({
      title: "Transfer complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been transferred to your ${selectedPaymentMethod === 'phone' ? 'phone' : 'card'}.`,
    });
    
    setAmount('');
    setSelectedPaymentMethod(null);
  };

  const handleContactSelection = () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No contact selected",
        description: "Please select at least one contact to send money",
        variant: "destructive",
      });
      return;
    }
    
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
      
      // Use setTimeout to ensure smooth transition
      setTimeout(() => {
        setShowSendConfirmation(true);
      }, 300);
    } else {
      toast({
        title: "Contact not found",
        description: "Selected contact could not be found",
        variant: "destructive",
      });
    }
  };

  const handleConfirmSend = () => {
    setShowSendConfirmation(false);
    
    // Show toast notification
    toast({
      title: "Transaction complete",
      description: `${currencySymbols[selectedCurrency]}${amount} has been sent to ${recipientName}`,
    });
    
    // Reset form
    setAmount('');
    setSelectedContacts([]);
    setRecipientName('');
  };

  const handleCancelSend = () => {
    setShowSendConfirmation(false);
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

      {/* Contact List for selecting recipients */}
      <ContactList
        showContactList={showContacts}
        setShowContactList={setShowContacts}
        selectedContacts={selectedContacts}
        setSelectedContacts={setSelectedContacts}
        onConfirm={handleContactSelection}
      />

      {/* Confirmation Dialog for Sending to Others */}
      <SendConfirmationDialog
        open={showSendConfirmation}
        onOpenChange={setShowSendConfirmation}
        recipientName={recipientName}
        amount={amount}
        currencySymbol={currencySymbols[selectedCurrency]}
        onCancel={handleCancelSend}
        onConfirm={handleConfirmSend}
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
