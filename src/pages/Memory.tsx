
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
      content: "Tonee works as a UI/UX designer at a tech startup in San Francisco. She has been with the company for 3 years and is passionate about creating intuitive user experiences.",
    },
    {
      id: 2,
      content: "Tonee enjoys hiking on weekends and has completed several trails in Yosemite National Park last month. She mentioned wanting to try the Half Dome hike next summer.",
    },
    {
      id: 3,
      content: "Tonee is planning to launch a side project, an app called 'TrailMates' that helps hikers find companions for group hikes. She's looking for a developer partner and considering using React Native for the mobile app.",
    },
    {
      id: 4,
      content: "Tonee has a rescue dog named Pixel, a 3-year-old Border Collie mix. She adopted him last year from a local shelter and often takes him along on her hiking trips.",
    },
    {
      id: 5,
      content: "Tonee is learning Spanish in preparation for a trip to Mexico City next spring. She practices daily using language apps and wants to be conversationally fluent before her trip.",
    },
    {
      id: 6,
      content: "Tonee recently started exploring cryptocurrency investments. She's particularly interested in Ethereum and has asked for resources to understand blockchain technology better.",
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
