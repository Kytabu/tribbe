
import { Button } from "@/components/ui/button";
import { Smartphone, CreditCard, Loader2, Check } from "lucide-react";
import { SupportedCurrency } from "@/features/wallet/constants";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface WalletActionsProps {
  selectedCurrency: SupportedCurrency;
}

export function WalletActions({ selectedCurrency }: WalletActionsProps) {
  const [isMPesaVerificationOpen, setIsMPesaVerificationOpen] = useState(false);
  const [isCardConnectionOpen, setIsCardConnectionOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePhoneSubmit = async () => {
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
        description: "Phone number connected successfully",
      });
      setIsMPesaVerificationOpen(false);
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
      setIsCardConnectionOpen(false);
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Button
        variant="outline"
        size="sm"
        className="py-1.5 hover:bg-tribbe-lime hover:text-black hover:scale-105 transition-all duration-300 bg-gradient-to-r from-background to-muted border-tribbe-lime"
        onClick={() => setIsMPesaVerificationOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-background flex items-center justify-center text-[10px] border">
              {selectedCurrency.substring(0, 1)}
            </span>
            <Smartphone className="h-3.5 w-3.5 text-tribbe-lime" />
          </div>
          <div className="text-left">
            <div className="font-medium text-xs text-tribbe-lime">Connect M-Pesa</div>
          </div>
        </div>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="py-1.5 hover:bg-tribbe-lime hover:text-black hover:scale-105 transition-all duration-300 bg-gradient-to-r from-background to-muted border-tribbe-aqua"
        onClick={() => setIsCardConnectionOpen(true)}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-background flex items-center justify-center text-[10px] border">
              {selectedCurrency.substring(0, 1)}
            </span>
            <CreditCard className="h-3.5 w-3.5 text-tribbe-lime" />
          </div>
          <div className="text-left">
            <div className="font-medium text-xs text-tribbe-lime">Connect Cards</div>
          </div>
        </div>
      </Button>

      <Sheet open={isMPesaVerificationOpen} onOpenChange={setIsMPesaVerificationOpen}>
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
                onClick={handlePhoneSubmit}
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

      <Sheet open={isCardConnectionOpen} onOpenChange={setIsCardConnectionOpen}>
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
