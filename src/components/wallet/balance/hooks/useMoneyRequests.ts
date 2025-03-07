
import { useState, useEffect } from "react";
import { MoneyRequest } from "../types";
import { toast } from "@/hooks/use-toast";

// Sample data for money requests
const sampleMoneyRequests: MoneyRequest[] = [
  { id: 1, name: "Sarah Williams", amount: 500, creditScore: 720, image: "/lovable-uploads/237ca64a-021e-4578-9f08-b9fb2245f01e.png" },
  { id: 2, name: "Marcus Johnson", amount: 750, creditScore: 680, image: "/lovable-uploads/02bff5e9-ea21-4298-ad23-9d9ce111b691.png" },
  { id: 3, name: "James Smith", amount: 1000, creditScore: 750, image: "/lovable-uploads/e25c10fb-ede6-40a6-be94-ae27ae122714.png" },
  { id: 4, name: "Diana Chen", amount: 300, creditScore: 690, image: "/lovable-uploads/bc82d70e-eb04-4dc9-82d5-a9f4e4c0c0e8.png" },
  { id: 5, name: "Michael Brown", amount: 450, creditScore: 710, image: "/lovable-uploads/c3603a81-6764-4f8a-bf9a-f8fa6f277493.png" },
  { id: 6, name: "Lisa Anderson", amount: 600, creditScore: 735, image: "/lovable-uploads/eaebdf3c-f654-426e-9882-d23cfc6c3be2.png" },
  { id: 7, name: "John Davis", amount: 850, creditScore: 695, image: "/lovable-uploads/5cd0a2a3-10ab-405a-957a-918146dc1cc6.png" },
  { id: 8, name: "Angela Martinez", amount: 200, creditScore: 725, image: "/lovable-uploads/42287469-a1c7-4d88-b55c-db500133e882.png" },
  { id: 9, name: "David Wilson", amount: 900, creditScore: 705, image: "/lovable-uploads/cff39b6d-626c-4165-9ffe-16558234dc9b.png" },
  { id: 10, name: "Rachel Taylor", amount: 1200, creditScore: 740, image: "/lovable-uploads/caae7b31-135b-4f5d-a905-5e292142cbb9.png" },
  { id: 11, name: "Chris Lee", amount: 550, creditScore: 715, image: "/lovable-uploads/bf1a4aaa-ea56-44a2-a14f-183edcf2b8b3.png" },
  { id: 12, name: "Tanya Rodriguez", amount: 650, creditScore: 730, image: "/lovable-uploads/289c745d-027d-40b4-8355-97b6a87d064e.png" }
];

export function useMoneyRequests() {
  const [removedRequests, setRemovedRequests] = useState<number[]>([]);
  const [slidingRequests, setSlidingRequests] = useState<{[key: number]: 'left' | 'right'}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requests, setRequests] = useState<MoneyRequest[]>([]);

  // Fetch money requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // In a real implementation, this would be an API call
        // const response = await fetch('/api/money-requests');
        // const data = await response.json();
        // setRequests(data);
        
        setRequests(sampleMoneyRequests);
      } catch (err) {
        console.error("Failed to fetch money requests:", err);
        setError("Failed to load money requests. Please try again later.");
        toast({
          title: "Error",
          description: "Could not load money requests",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAction = (id: number, direction: 'left' | 'right') => {
    try {
      // Update UI to show sliding animation
      setSlidingRequests(prev => ({...prev, [id]: direction}));
      
      // In a real implementation, this would include an API call
      // const response = await fetch(`/api/money-requests/${id}`, {
      //   method: 'POST',
      //   body: JSON.stringify({ action: direction === 'right' ? 'accept' : 'reject' })
      // });
      
      // Remove the request after animation completes
      setTimeout(() => {
        setRemovedRequests(prev => [...prev, id]);
        
        // Show toast notification
        const actionText = direction === 'right' ? 'accepted' : 'declined';
        const request = requests.find(r => r.id === id);
        
        if (request) {
          toast({
            title: `Request ${actionText}`,
            description: `You've ${actionText} ${request.name}'s request for ${request.amount}`,
          });
        }
      }, 300);
    } catch (err) {
      console.error(`Failed to ${direction === 'right' ? 'accept' : 'reject'} request:`, err);
      toast({
        title: "Error",
        description: `Could not ${direction === 'right' ? 'accept' : 'reject'} the request. Please try again.`,
        variant: "destructive",
      });
      
      // Remove from sliding state to reset the UI
      setSlidingRequests(prev => {
        const newState = {...prev};
        delete newState[id];
        return newState;
      });
    }
  };

  const retryFetchRequests = () => {
    setRequests([]);
    setRemovedRequests([]);
    setSlidingRequests({});
    setError(null);
    setIsLoading(true);
    
    // Simulate refetching
    setTimeout(() => {
      setRequests(sampleMoneyRequests);
      setIsLoading(false);
    }, 800);
  };

  const filteredRequests = requests.filter(request => !removedRequests.includes(request.id));

  return {
    filteredRequests,
    slidingRequests,
    handleAction,
    isLoading,
    error,
    retryFetchRequests,
    isEmpty: !isLoading && filteredRequests.length === 0
  };
}
