
import { Card, CardContent } from "@/components/ui/card";
import { SupportedCurrency } from "@/features/wallet/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ArrowDownCircle, Hand, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface WalletOverviewProps {
  availableBalance: number;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  isLoading: boolean;
  lendingStats: {
    total_lent: number;
    total_expected_interest: number;
  };
}

export function WalletOverview({
  availableBalance,
  selectedCurrency,
  currencySymbols,
  isLoading,
  lendingStats
}: WalletOverviewProps) {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isAddFundsOpen, setIsAddFundsOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isSendOpen, setIsSendOpen] = useState(false);

  // Updated data for demo
  const totalCircleDeposits = 5000;
  const totalCircleValue = 130000;
  const circleDepositDue = 1200;
  const circleDepositOverdue = 800;
  
  return (
    <Card className="bg-tribbe-grey/80 border-zinc-800">
      <CardContent className="p-4 space-y-4">
        <div>
          <h2 className="text-sm font-medium text-zinc-400 mb-1">My Wallet</h2>
          {isLoading ? (
            <Skeleton className="h-7 w-1/2 bg-zinc-800" />
          ) : (
            <p className="text-2xl font-bold text-white">
              {availableBalance.toLocaleString()}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-1">Total Circle Deposits</h3>
            <p className="text-lg font-medium text-white">
              {totalCircleDeposits.toLocaleString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-1">Total Circle Value</h3>
            <p className="text-lg font-medium text-tribbe-lime">
              {totalCircleValue.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-1">Deposits Due</h3>
            <p className="text-lg font-medium text-tribbe-yellow">
              {circleDepositDue.toLocaleString()}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-zinc-400 mb-1">Deposit Overdue</h3>
            <p className="text-lg font-medium text-[#ea384c]">
              {circleDepositOverdue.toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="flex flex-col items-center justify-center h-auto py-2"
              onClick={() => setIsAddFundsOpen(true)}
            >
              <ArrowUpCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Deposit</span>
            </Button>
            
            <Button 
              variant="outline"
              className="flex flex-col items-center justify-center h-auto py-2"
              onClick={() => setIsWithdrawOpen(true)}
            >
              <ArrowDownCircle className="h-5 w-5 mb-1" />
              <span className="text-xs">Withdraw</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline"
              className="flex flex-col items-center justify-center h-auto py-2"
              onClick={() => setIsRequestOpen(true)}
            >
              <Hand className="h-5 w-5 mb-1" />
              <span className="text-xs">Request</span>
            </Button>
            
            <Button
              variant="default"
              className="flex flex-col items-center justify-center h-auto py-2 bg-tribbe-lime text-black hover:bg-tribbe-lime/90"
              onClick={() => setIsSendOpen(true)}
            >
              <SendHorizonal className="h-5 w-5 mb-1" />
              <span className="text-xs">Send</span>
            </Button>
          </div>
        </div>
      </CardContent>
      
      {/* Sheets for actions - simplified placeholders */}
      <Sheet open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Withdraw Funds</SheetTitle>
          </SheetHeader>
          <div className="py-6">Withdraw functionality would go here</div>
        </SheetContent>
      </Sheet>
      
      <Sheet open={isAddFundsOpen} onOpenChange={setIsAddFundsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Funds</SheetTitle>
          </SheetHeader>
          <div className="py-6">Add funds functionality would go here</div>
        </SheetContent>
      </Sheet>
      
      <Sheet open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Request Money</SheetTitle>
          </SheetHeader>
          <div className="py-6">Request money functionality would go here</div>
        </SheetContent>
      </Sheet>
      
      <Sheet open={isSendOpen} onOpenChange={setIsSendOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Send Money</SheetTitle>
          </SheetHeader>
          <div className="py-6">Send money functionality would go here</div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
