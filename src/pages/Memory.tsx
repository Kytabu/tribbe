
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Memory = () => {
  const navigate = useNavigate();

  const memories = [
    {
      id: 1,
      content: "Tonee has lent KES 5,000 to his friend Sarah from his Circle. The loan is expected to be repaid by the end of next month with a 5% interest rate agreed upon by both parties.",
    },
    {
      id: 2,
      content: "Tonee is saving for a down payment on an apartment in Nairobi. His goal is to save KES 500,000 over the next 18 months. He has currently saved KES 150,000 in his Tribbe savings account.",
    },
    {
      id: 3,
      content: "Tonee participates in a weekly savings Circle with 5 friends where each contributes KES 2,000 weekly. He's scheduled to receive the collective pool of KES 60,000 in 3 weeks, which he plans to use for a web design course.",
    },
    {
      id: 4,
      content: "Tonee borrowed KES 15,000 from his Circle last quarter to invest in cryptocurrency. He has repaid 60% of the loan ahead of schedule, which has positively impacted his Trust Score.",
    },
    {
      id: 5,
      content: "Tonee has set up auto-lending for small amounts between KES 1,000 - 3,000 within his close Circle. He prefers a 3% interest rate for friends and 5% for extended network members.",
    },
    {
      id: 6,
      content: "Tonee is considering starting a side business making handcrafted jewelry and has inquired about microfinancing options through the app. He estimates needing KES 25,000 initial capital.",
    }
  ];

  return (
    <AppLayout>
      <div className="container max-w-md mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5 text-tribbe-lime" />
          </Button>
          <h1 className="text-xl font-semibold text-tribbe-lime">Memory</h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-tribbe-white/50" />
          <Input 
            placeholder="Search memories" 
            className="pl-10 bg-tribbe-grey/50 border-tribbe-lime/20 text-tribbe-white"
          />
        </div>

        {/* Memories List */}
        <div className="space-y-4">
          {memories.map((memory, index) => (
            <div key={memory.id}>
              <div className="bg-tribbe-grey/50 rounded-lg p-4 border border-tribbe-lime/20">
                <p className="text-tribbe-white">{memory.content}</p>
              </div>
              {index < memories.length - 1 && (
                <Separator className="my-4 bg-tribbe-lime/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Memory;
