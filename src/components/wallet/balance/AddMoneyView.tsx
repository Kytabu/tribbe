
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smartphone, CreditCard } from "lucide-react";
import { SupportedCurrency } from "@/features/wallet/constants";
import { PaymentMethodButton } from "./components/PaymentMethodButton";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface AddMoneyViewProps {
  amount: string;
  setAmount: (value: string) => void;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
}

export function AddMoneyView({
  amount,
  setAmount,
  selectedCurrency,
  currencySymbols,
}: AddMoneyViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMPesaSheetOpen, setIsMPesaSheetOpen] = useState(false);
  const [isAirtelSheetOpen, setIsAirtelSheetOpen] = useState(false);
  const [isCardSheetOpen, setIsCardSheetOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePhoneSubmit = async (provider: 'M-Pesa' | 'Airtel Money') => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: `${provider} phone number connected successfully`,
      });
      if (provider === 'M-Pesa') {
        setIsMPesaSheetOpen(false);
      } else {
        setIsAirtelSheetOpen(false);
      }
      setPhoneNumber("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect phone number",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardSubmit = async () => {
    if (!cardNumber || !expiryDate || !cvv) {
      toast({
        title: "Missing information",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Card connected successfully",
      });
      setIsCardSheetOpen(false);
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect card",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substr(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
            {selectedCurrency.substring(0, 1)}
          </span>
          <div className="relative rounded-lg border-2 border-tribbe-lime p-2">
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setAmount(value);
              }}
              placeholder="0.00"
              className="text-4xl font-bold pl-16 h-12 bg-transparent border-none focus-visible:ring-0 bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF] pointer-events-none whitespace-nowrap">
              {currencySymbols[selectedCurrency]}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <PaymentMethodButton
          icon={<Smartphone className="w-5 h-5 text-[#A9FF22]" />}
          label="M-Pesa"
          info="Instant"
          onClick={() => setIsMPesaSheetOpen(true)}
        />
        <PaymentMethodButton
          icon={<Smartphone className="w-5 h-5 text-red-500" />}
          label="Airtel Money"
          info="Instant"
          onClick={() => setIsAirtelSheetOpen(true)}
        />
        <PaymentMethodButton
          icon={<CreditCard className="w-5 h-5 text-[#79CFFF]" />}
          label="Credit or Debit Card"
          info="Instant"
          onClick={() => setIsCardSheetOpen(true)}
        />
      </div>

      {/* M-Pesa Sheet */}
      <Sheet open={isMPesaSheetOpen} onOpenChange={setIsMPesaSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connect M-Pesa</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-background"
                />
                <p className="text-sm text-muted-foreground">
                  Enter your M-Pesa registered phone number
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => handlePhoneSubmit('M-Pesa')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Airtel Money Sheet */}
      <Sheet open={isAirtelSheetOpen} onOpenChange={setIsAirtelSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connect Airtel Money</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-background"
                />
                <p className="text-sm text-muted-foreground">
                  Enter your Airtel Money registered phone number
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => handlePhoneSubmit('Airtel Money')}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Card Sheet */}
      <Sheet open={isCardSheetOpen} onOpenChange={setIsCardSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connect Card</SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className="bg-background text-lg tracking-wider"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.slice(0, 3))}
                    maxLength={3}
                    className="bg-background"
                  />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleCardSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Connect Card'
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
