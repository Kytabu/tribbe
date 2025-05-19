
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, CreditCard, Loader2 } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { SupportedCurrency } from "@/features/wallet/constants";

interface WalletConnectionsProps {
  selectedCurrency: SupportedCurrency;
}

export function WalletConnections({ selectedCurrency }: WalletConnectionsProps) {
  const [isMPesaOpen, setIsMPesaOpen] = useState(false);
  const [isCardsOpen, setIsCardsOpen] = useState(false);
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
      setIsMPesaOpen(false);
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
      setIsCardsOpen(false);
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
    <Card className="bg-tribbe-grey/80 border-zinc-800">
      <CardContent className="p-4">
        <h2 className="text-base font-medium text-white mb-3">Payment Methods</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-auto py-3 border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
            onClick={() => setIsMPesaOpen(true)}
          >
            <div className="flex flex-col items-center">
              <Smartphone className="h-5 w-5 mb-1" />
              <span className="text-xs">Connect M-Pesa</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto py-3 border-tribbe-aqua hover:bg-tribbe-aqua hover:text-black"
            onClick={() => setIsCardsOpen(true)}
          >
            <div className="flex flex-col items-center">
              <CreditCard className="h-5 w-5 mb-1" />
              <span className="text-xs">Connect Cards</span>
            </div>
          </Button>
        </div>
      </CardContent>
      
      {/* M-Pesa Connection Sheet */}
      <Sheet open={isMPesaOpen} onOpenChange={setIsMPesaOpen}>
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

      {/* Cards Connection Sheet */}
      <Sheet open={isCardsOpen} onOpenChange={setIsCardsOpen}>
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
    </Card>
  );
}
