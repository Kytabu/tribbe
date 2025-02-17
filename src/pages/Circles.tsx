
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CirclePlus, Users, DollarSign, UserPlus } from "lucide-react";

interface CircleCardProps {
  name: string;
  memberCount: number;
  amount: number;
  gradient: string;
}

const CircleCard = ({ name, memberCount, amount, gradient }: CircleCardProps) => (
  <Card className={`${gradient} group hover:scale-105 transition-transform duration-300`}>
    <CardContent className="p-6 text-black">
      <h3 className="text-xl font-righteous mb-4">{name}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm">{memberCount} members</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span className="text-sm">${amount.toLocaleString()}</span>
        </div>
        <Button 
          variant="default" 
          className="w-full mt-4 bg-black/20 hover:bg-black/30"
          onClick={() => console.log("Add person to circle")}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Person
        </Button>
      </div>
    </CardContent>
  </Card>
);

const Circles = () => {
  // Sample data - would come from your backend in a real app
  const circles = [
    {
      name: "Family Savings",
      memberCount: 5,
      amount: 12500,
      gradient: "bg-tribbe-lime",
    },
    {
      name: "Investment Club",
      memberCount: 8,
      amount: 25000,
      gradient: "bg-tribbe-lilac",
    },
    {
      name: "Emergency Fund",
      memberCount: 3,
      amount: 5000,
      gradient: "bg-tribbe-yellow",
    },
    {
      name: "Vacation Fund",
      memberCount: 4,
      amount: 7500,
      gradient: "bg-tribbe-aqua",
    },
    {
      name: "Business Ventures",
      memberCount: 6,
      amount: 15000,
      gradient: "bg-[#FEC6A1]",
    },
    {
      name: "Education Fund",
      memberCount: 2,
      amount: 10000,
      gradient: "bg-[#FFDEE2]",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-righteous text-tribbe-lime">My Circles</h1>
          <p className="text-tribbe-lime mt-2">Let AI set goals for you and help you achieve them</p>
        </div>

        <div className="flex items-center justify-end">
          <Button 
            className="group hover:scale-105 transition-transform duration-300"
            onClick={() => console.log("Create new circle")}
          >
            <CirclePlus className="w-5 h-5 mr-2" />
            Create Circle
          </Button>
        </div>

        <div className="flex flex-col space-y-4">
          {circles.map((circle, index) => (
            <CircleCard key={index} {...circle} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Circles;
