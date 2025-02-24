import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";

// Credit score color mapping
const getCreditScoreColor = (score: number): string => {
  if (score >= 800) return "#C699FF"; // Purple for excellent
  if (score >= 740) return "#A9FF22"; // Lime for very good
  if (score >= 670) return "#79CFFF"; // Blue for good
  if (score >= 580) return "#F6D83E"; // Yellow for fair
  if (score >= 500) return "#F97316"; // Orange for poor
  return "#ea384c"; // Red for very poor
};

// Mock data for tribbe requests
const tribbeRequests = [
  { id: 1, name: "Sarah Williams", creditScore: 720, rating: 4.5, image: "/lovable-uploads/237ca64a-021e-4578-9f08-b9fb2245f01e.png" },
  { id: 2, name: "Marcus Johnson", creditScore: 680, rating: 4.2, image: "/lovable-uploads/02bff5e9-ea21-4298-ad23-9d9ce111b691.png" },
  { id: 3, name: "James Smith", creditScore: 750, rating: 4.8, image: "/lovable-uploads/e25c10fb-ede6-40a6-be94-ae27ae122714.png" },
  { id: 4, name: "Diana Chen", creditScore: 690, rating: 4.0, image: "/lovable-uploads/bc82d70e-eb04-4dc9-82d5-a9f4e4c0c0e8.png" },
  { id: 5, name: "Michael Brown", creditScore: 710, rating: 4.3, image: "/lovable-uploads/c3603a81-6764-4f8a-bf9a-f8fa6f277493.png" },
  { id: 6, name: "Lisa Anderson", creditScore: 735, rating: 4.6, image: "/lovable-uploads/eaebdf3c-f654-426e-9882-d23cfc6c3be2.png" },
  { id: 7, name: "John Davis", creditScore: 695, rating: 4.1, image: "/lovable-uploads/5cd0a2a3-10ab-405a-957a-918146dc1cc6.png" },
  { id: 8, name: "Angela Martinez", creditScore: 725, rating: 4.4, image: "/lovable-uploads/42287469-a1c7-4d88-b55c-db500133e882.png" },
  { id: 9, name: "David Wilson", creditScore: 705, rating: 4.2, image: "/lovable-uploads/cff39b6d-626c-4165-9ffe-16558234dc9b.png" },
  { id: 10, name: "Rachel Taylor", creditScore: 740, rating: 4.7, image: "/lovable-uploads/caae7b31-135b-4f5d-a905-5e292142cbb9.png" },
  { id: 11, name: "Chris Lee", creditScore: 715, rating: 4.3, image: "/lovable-uploads/bf1a4aaa-ea56-44a2-a14f-183edcf2b8b3.png" },
  { id: 12, name: "Tanya Rodriguez", creditScore: 730, rating: 4.5, image: "/lovable-uploads/289c745d-027d-40b4-8355-97b6a87d064e.png" }
];

export default function TribbeRequests() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container max-w-2xl mx-auto py-3">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/my-tribbe")}
            className="hover:bg-tribbe-lime/20"
          >
            <ArrowLeft className="h-3 w-3 text-tribbe-lime" />
          </Button>
          <h2 className="text-lg font-righteous text-tribbe-lime">Tribbe Requests</h2>
        </div>

        <div className="grid grid-cols-2 gap-2 px-2">
          {tribbeRequests.map((request) => (
            <div key={request.id} className="bg-tribbe-grey/50 p-3 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div 
                    className="p-0.5 rounded-full"
                    style={{ backgroundColor: getCreditScoreColor(request.creditScore) }}
                  >
                    <img 
                      src={request.image} 
                      alt={request.name} 
                      className="w-8 h-8 object-cover rounded-full border border-background"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-medium text-white mb-0.5">{request.name}</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-2 h-2 ${
                              index < Math.floor(request.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-gray-400 ml-1">
                        {request.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-[10px] flex-1 border-tribbe-lime text-tribbe-lime hover:bg-tribbe-lime hover:text-black"
                    >
                      Accept
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[10px] flex-1 text-gray-400 hover:text-white"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
