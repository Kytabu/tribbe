
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Circle } from "../types";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface CirclesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circles: Circle[];
  onComplete: (selectedCircles: string[]) => void;
}

export function CirclesSheet({ 
  open, 
  onOpenChange, 
  circles,
  onComplete
}: CirclesSheetProps) {
  const [selectedCircles, setSelectedCircles] = useState<string[]>([]);

  const toggleCircle = (circleId: string) => {
    setSelectedCircles(prev => 
      prev.includes(circleId) 
        ? prev.filter(id => id !== circleId)
        : [...prev, circleId]
    );
  };

  const handleComplete = () => {
    onComplete(selectedCircles);
    onOpenChange(false);
    setSelectedCircles([]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Select Circles</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-3">
            {circles.map((circle) => (
              <Card 
                key={circle.id}
                className={`bg-tribbe-grey/50 hover:bg-tribbe-grey transition-colors duration-300 cursor-pointer ${
                  selectedCircles.includes(circle.id) ? 'border-tribbe-lime' : ''
                }`}
                onClick={() => toggleCircle(circle.id)}
              >
                <div className="p-4 flex items-center gap-4">
                  <img 
                    src={circle.image} 
                    alt="" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-white">{circle.name}</h3>
                        <p className="text-sm text-gray-400">
                          {circle.type} | {circle.daysLeft} days
                        </p>
                      </div>
                      {selectedCircles.includes(circle.id) && (
                        <Check className="h-5 w-5 text-tribbe-lime" />
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <Button 
            onClick={handleComplete}
            className="w-full"
            disabled={selectedCircles.length === 0}
          >
            Done
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
