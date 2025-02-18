
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, QrCode, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddMoney() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/wallet")}
            className="hover:bg-tribbe-lime"
          >
            <ArrowLeft className="h-6 w-6 text-tribbe-lime hover:text-tribbe-black" />
          </Button>
          <h1 className="text-2xl font-semibold">Add Money</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How much would you like to add?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="text-3xl font-bold h-16 pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl font-bold">£</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 20, 50, 100, 200].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
                  >
                    £{amount}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Credit or Debit Card
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Open Banking
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Bank Transfer
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
