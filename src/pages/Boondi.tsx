
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MainPieChart } from "@/components/boondi/MainPieChart";
import { SubCategoryPieChart } from "@/components/boondi/SubCategoryPieChart";
import { TransactionLedger } from "@/components/boondi/TransactionLedger";
import { sampleSpendingData, sampleTransactions } from "@/components/boondi/data/sampleData";
import { toast } from "react-hot-toast";

const Boondi = () => {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnectBoondi = () => {
    toast.success("Connecting to Boondi...");
    // In a real app, this would trigger the Boondi connection flow
    setTimeout(() => {
      setIsConnected(true);
      toast.success("Connected to Boondi successfully!");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col bg-black">
        <PageHeader title="Boondi" />
        
        <div className="flex-1 container max-w-xl mx-auto px-4 pb-16">
          {/* Image Section */}
          <div className="flex justify-center mt-6 mb-8">
            <div className="relative w-full max-w-sm animate-fade-in">
              <img 
                src="/lovable-uploads/6f2a0d18-f7a0-4188-8c41-2c149b494473.png" 
                alt="Boondi Payment Device" 
                className="w-full object-contain rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Connect Button */}
          <div className="mb-8">
            <Button 
              onClick={handleConnectBoondi}
              className="w-full py-6 text-lg font-medium bg-tribbe-lime text-black hover:bg-tribbe-lime/90 rounded-full group"
              disabled={isConnected}
            >
              <span className="mr-2">{isConnected ? "Connected with Boondi" : "Connect with Boondi"}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Spending Summary Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-tribbe-lime mb-4">My Spending Summary</h2>
            
            {/* Main Pie Chart */}
            <div className="mb-6 animate-fade-in">
              <MainPieChart data={sampleSpendingData} />
            </div>
            
            {/* Sub Category Pie Charts */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {sampleSpendingData.map((category) => (
                <div key={category.name} className="animate-fade-in">
                  <SubCategoryPieChart category={category} />
                </div>
              ))}
            </div>
            
            {/* Transaction Ledger */}
            <div className="animate-fade-in">
              <TransactionLedger transactions={sampleTransactions} />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Boondi;
