
import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownRight, History } from "lucide-react";

export default function Wallet() {
  return (
    <AppLayout>
      <div className="container max-w-4xl mx-auto space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-tribbe-charcoal">My Wallet</h2>
            <div className="text-4xl font-bold">£0.00</div>
            <p className="text-tribbe-sage">Available Balance</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 hover:bg-tribbe-lime hover:text-black"
          >
            <div className="flex items-center gap-3">
              <ArrowUpRight className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Money In</div>
                <div className="text-sm text-tribbe-sage">Add funds to your wallet</div>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-auto py-6 hover:bg-tribbe-lime hover:text-black"
          >
            <div className="flex items-center gap-3">
              <ArrowDownRight className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium">Money Out</div>
                <div className="text-sm text-tribbe-sage">Withdraw from your wallet</div>
              </div>
            </div>
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5" />
            <h3 className="text-lg font-medium">Recent Transactions</h3>
          </div>
          <div className="text-center text-tribbe-sage py-8">
            No transactions yet
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
