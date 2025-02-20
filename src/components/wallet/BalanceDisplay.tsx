import { PiggyBank, Gem, Trophy, CreditCard, Clock, Wallet, Plus, Send, MessageSquare, ArrowLeft, QrCode, Smartphone, Users, User } from "lucide-react";
import { SupportedCurrency } from "@/pages/Wallet";
import { Transaction } from "@/types/wallet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface BalanceDisplayProps {
  isLoading: boolean;
  currentBalance: number;
  selectedCurrency: SupportedCurrency;
  currencySymbols: Record<SupportedCurrency, string>;
  availableBalance: number;
  lendingStats: {
    total_lent: number;
    total_expected_interest: number;
  };
  transactionHistory: Transaction[];
}

type ViewType = 'balance' | 'add' | 'request' | 'send';

export function BalanceDisplay({
  isLoading,
  currentBalance,
  selectedCurrency,
  currencySymbols,
  availableBalance,
  lendingStats,
  transactionHistory
}: BalanceDisplayProps) {
  const [activeView, setActiveView] = useState<ViewType>('balance');
  const [amount, setAmount] = useState<string>('');
  const [autoTribbe, setAutoTribbe] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          variant={activeView === 'balance' ? "default" : "ghost"}
          size="sm"
          className={`${
            activeView === 'balance' 
              ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" 
              : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
          } w-[140px]`}
          onClick={() => setActiveView('balance')}
        >
          <Wallet className="h-4 w-4 mr-1" />
          Balance
        </Button>
        <Button
          variant={activeView === 'add' ? "default" : "ghost"}
          size="sm"
          className={`${
            activeView === 'add' 
              ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" 
              : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
          } w-[140px]`}
          onClick={() => setActiveView('add')}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Money
        </Button>
        <Button
          variant={activeView === 'request' ? "default" : "ghost"}
          size="sm"
          className={`${
            activeView === 'request' 
              ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" 
              : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
          } w-[140px]`}
          onClick={() => setActiveView('request')}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Request
        </Button>
        <Button
          variant={activeView === 'send' ? "default" : "ghost"}
          size="sm"
          className={`${
            activeView === 'send' 
              ? "bg-tribbe-lime text-black hover:bg-tribbe-lime/90" 
              : "border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
          } w-[140px]`}
          onClick={() => setActiveView('send')}
        >
          <Send className="h-4 w-4 mr-1" />
          Send
        </Button>
      </div>

      {activeView === 'balance' && (
        <div className="space-y-4 animate-fade-in">
          <div className="text-4xl font-bold transition-all duration-300 hover:scale-105">
            {isLoading ? (
              <span className="text-tribbe-sage animate-pulse">Loading...</span>
            ) : (
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#A9FF22] to-[#79CFFF] flex items-center justify-center text-sm border text-black font-bold">
                  {selectedCurrency.substring(0, 1)}
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A9FF22] to-[#79CFFF]">
                  {currencySymbols[selectedCurrency]} {currentBalance.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <PiggyBank className="w-5 h-5 text-[#A9FF22] group-hover:text-tribbe-lime" />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Amount In</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">
                  {currencySymbols[selectedCurrency]} {availableBalance.toFixed(2)}
                </span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Gem className="w-5 h-5 text-[#FF6B6B] group-hover:text-tribbe-lime" />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Amount Out</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">
                  {currencySymbols[selectedCurrency]} {lendingStats.total_lent.toFixed(2)}
                </span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-[#4ECDC4] group-hover:text-tribbe-lime" />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Expected Interest</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">
                  +{currencySymbols[selectedCurrency]} {lendingStats.total_expected_interest.toFixed(2)}
                </span>
              </div>
            </Button>
          </div>
        </div>
      )}

      {activeView === 'add' && (
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
            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#A9FF22] group-hover:text-tribbe-lime" />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">M-Pesa</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">Instant</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#79CFFF] group-hover:text-tribbe-lime" />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Credit or Debit Card</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">Instant</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#C699FF] group-hover:text-tribbe-lime" />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Bank Transfer</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">1-2 days</span>
              </div>
            </Button>
          </div>
        </div>
      )}

      {activeView === 'request' && (
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
            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png" 
                    alt="Green Flame Icon" 
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Close Friends</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">kinda quick</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/db93bdb2-b924-4cd9-ba73-27b77b8358d3.png" 
                    alt="Blue Flame Icon" 
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">My Circle</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">should be fast</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/24f8c963-ad65-4096-be33-ccfa37f896eb.png" 
                    alt="Purple Flame Icon" 
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">My Tribbe</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">Instant</span>
              </div>
            </Button>
          </div>
        </div>
      )}

      {activeView === 'send' && (
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
            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/c030b03f-f3e4-41d8-b7ce-74a1deb5feb4.png" 
                    alt="Green Flame Icon" 
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Requests</span>
                </div>
                <span className="font-medium group-hover:text-tribbe-lime">12</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/db93bdb2-b924-4cd9-ba73-27b77b8358d3.png" 
                    alt="Blue Flame Icon" 
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">My Circles</span>
                </div>
                <Plus className="w-5 h-5 text-tribbe-sage group-hover:text-tribbe-lime" />
              </div>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-[60px] px-4 rounded-lg border bg-card text-card-foreground hover:bg-transparent group"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <img 
                    src="/lovable-uploads/24f8c963-ad65-4096-be33-ccfa37f896eb.png" 
                    alt="Purple Flame Icon" 
                    className="w-5 h-5 object-contain"
                  />
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">The Tribbe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-tribbe-sage group-hover:text-tribbe-lime">Automate</span>
                  <Switch
                    checked={autoTribbe}
                    onCheckedChange={setAutoTribbe}
                    className="data-[state=unchecked]:bg-gray-700 data-[state=checked]:bg-tribbe-lime border border-tribbe-lime"
                  />
                </div>
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
