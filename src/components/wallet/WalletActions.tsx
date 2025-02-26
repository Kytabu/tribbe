
import { Button } from "@/components/ui/button";
import { Smartphone, CreditCard } from "lucide-react";
import { SupportedCurrency } from "@/features/wallet/constants";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface WalletActionsProps {
  selectedCurrency: SupportedCurrency;
}

export function WalletActions({ selectedCurrency }: WalletActionsProps) {
  const [isMPesaVerificationOpen, setIsMPesaVerificationOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
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
      // Simulate sending verification code
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
    </div>
  );
}
