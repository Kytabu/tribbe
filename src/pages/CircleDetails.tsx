
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CalendarDays, Target, MapPin, ListTodo } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const CircleDetails = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-400">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-righteous text-white">Jemo's Graduation</h1>
        </div>

        {/* Image Carousel */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
            alt=""
            className="w-full aspect-[4/3] rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[0,1,2,3,4].map((i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-tribbe-lime' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-white text-lg">Raised:</p>
            <p className="text-white text-lg font-medium">Kes 35,000</p>
          </div>
          <Progress value={17.5} className="h-2 bg-gray-700" />
        </div>

        {/* Circle Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-tribbe-grey/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-5 h-5 text-tribbe-aqua" />
              <p className="text-gray-400">Deadline</p>
            </div>
            <p className="text-white">01 May 2023</p>
          </div>
          <div className="bg-tribbe-grey/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-tribbe-aqua" />
              <p className="text-gray-400">Target</p>
            </div>
            <p className="text-white">Kes 200,000</p>
          </div>
          <div className="bg-tribbe-grey/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <ListTodo className="w-5 h-5 text-tribbe-aqua" />
              <p className="text-gray-400">Type</p>
            </div>
            <p className="text-white">Fundraiser</p>
          </div>
          <div className="bg-tribbe-grey/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-tribbe-aqua" />
              <p className="text-gray-400">Location</p>
            </div>
            <p className="text-white">Kenyatta Uni</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h2 className="text-xl font-medium text-white">Description</h2>
          <p className="text-gray-400">
            Hey there! James Kariuki here. I am graduating this month and would appreciate your help in finishing my university fees. So I am asking you to chip in, in the spirit of Ubuntu by coming for my graduation fundraiser or chipping in on Tribbe. Feel free to send something here or come with some friends...
          </p>
        </div>

        {/* Notification Settings */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-white">Send notification</h2>
          <div className="grid grid-cols-2 gap-4">
            {["Immediate", "Daily", "Bi-weekly", "Weekly"].map((option) => (
              <button 
                key={option}
                className="p-3 rounded-lg border border-gray-700 text-gray-400 hover:border-tribbe-lime hover:text-tribbe-lime transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Members */}
        <div className="space-y-4">
          <h2 className="text-xl font-medium text-white">Members</h2>
          <div className="flex -space-x-3 overflow-hidden p-4 bg-tribbe-grey/30 rounded-xl">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-background bg-tribbe-grey flex items-center justify-center"
              >
                <img
                  src={`https://i.pravatar.cc/40?img=${i + 1}`}
                  alt=""
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-background bg-tribbe-grey flex items-center justify-center text-white text-sm">
              20+
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          className="w-full bg-tribbe-aqua text-white hover:bg-tribbe-aqua/90"
          size="lg"
        >
          Chip in
        </Button>
      </div>
    </AppLayout>
  );
};

export default CircleDetails;
