
import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PieChart, ChevronLeft, ChevronRight } from "lucide-react";
import { MainPieChart } from "@/components/boondi/MainPieChart";
import { SubCategoryPieChart } from "@/components/boondi/SubCategoryPieChart";
import { TransactionLedger } from "@/components/boondi/TransactionLedger";
import { 
  getMonthlyData, 
  getWeeklyData, 
  getQuarterlyData, 
  getYearlyData,
  sampleTransactions 
} from "@/components/boondi/data/sampleData";
import { toast } from "react-hot-toast";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MainBarChart } from "@/components/boondi/MainBarChart";
import { CategoryData } from "@/types/boondi";

type TimeRange = "week" | "month" | "quarter" | "year";
type ChartType = "pie" | "bar";

const Boondi = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  const [chartType, setChartType] = useState<ChartType>("pie");
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState(sampleTransactions);
  
  const monthsScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Handle scroll indicators for month selector
  const checkScrollPosition = () => {
    if (monthsScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = monthsScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
    }
  };

  // Scroll handlers
  const scrollLeft = () => {
    if (monthsScrollRef.current) {
      monthsScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (monthsScrollRef.current) {
      monthsScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleConnectBoondi = () => {
    toast.success("Connecting to Boondi...");
    // In a real app, this would trigger the Boondi connection flow
    setTimeout(() => {
      setIsConnected(true);
      toast.success("Connected to Boondi successfully!");
    }, 1500);
  };

  // Update data when time range or selected month changes
  useEffect(() => {
    let data: CategoryData[] = [];
    
    switch (timeRange) {
      case "week":
        data = getWeeklyData();
        break;
      case "month":
        data = getMonthlyData(selectedMonth);
        break;
      case "quarter":
        const quarter = Math.floor(selectedMonth / 3);
        data = getQuarterlyData(quarter);
        break;
      case "year":
        data = getYearlyData();
        break;
      default:
        data = getMonthlyData(selectedMonth);
    }
    
    setCategoryData(data);
    
    // Filter transactions based on selected time period
    // In a real app, this would use actual date filtering
    const filtered = sampleTransactions.slice(0, 5 + (selectedMonth % 7)); 
    setFilteredTransactions(filtered);
  }, [timeRange, selectedMonth]);

  // Set up scroll event listener
  useEffect(() => {
    const scrollContainer = monthsScrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  // After component mounts, scroll to the selected month
  useEffect(() => {
    if (monthsScrollRef.current && timeRange === "month") {
      const monthButtons = monthsScrollRef.current.querySelectorAll('[role="button"]');
      if (monthButtons[selectedMonth]) {
        const selectedButton = monthButtons[selectedMonth] as HTMLElement;
        const containerWidth = monthsScrollRef.current.clientWidth;
        const buttonLeft = selectedButton.offsetLeft;
        const buttonWidth = selectedButton.clientWidth;
        
        // Center the selected month
        monthsScrollRef.current.scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      }
    }
  }, [timeRange, selectedMonth]);

  // Get appropriate title for the current view
  const getChartTitle = () => {
    switch (timeRange) {
      case "week":
        return "Weekly Spending Summary";
      case "month":
        return `${new Date(2024, selectedMonth).toLocaleString('default', { month: 'long' })} Spending Summary`;
      case "quarter":
        const quarter = Math.floor(selectedMonth / 3) + 1;
        return `Q${quarter} Spending Summary`;
      case "year":
        return "Annual Spending Summary";
      default:
        return "Spending Summary";
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col bg-black">
        <PageHeader title="Boondi" />
        
        <div className="flex-1 flex flex-col items-center pb-16">
          <div className="w-full max-w-sm px-4"> {/* Container with fixed max-width matching the image */}
            {/* Image Section */}
            <div className="flex justify-center mt-6 mb-8">
              <div className="relative w-full animate-fade-in">
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
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-tribbe-lime">My Spending Summary</h2>
                <div className="flex space-x-2">
                  <Toggle 
                    aria-label="Toggle Pie Chart"
                    pressed={chartType === "pie"} 
                    onPressedChange={() => setChartType("pie")}
                    className={`p-1 ${chartType === "pie" ? "bg-tribbe-lime/20 text-tribbe-lime" : "text-gray-400"}`}
                  >
                    <PieChart className="h-5 w-5" />
                  </Toggle>
                  <Toggle 
                    aria-label="Toggle Bar Chart"
                    pressed={chartType === "bar"} 
                    onPressedChange={() => setChartType("bar")}
                    className={`p-1 ${chartType === "bar" ? "bg-tribbe-lime/20 text-tribbe-lime" : "text-gray-400"}`}
                  >
                    <BarChart3 className="h-5 w-5" />
                  </Toggle>
                </div>
              </div>
              
              {/* Time Range Tabs */}
              <div className="mb-4">
                <Tabs 
                  value={timeRange} 
                  onValueChange={(value) => setTimeRange(value as TimeRange)}
                  className="w-full"
                >
                  <TabsList className="w-full bg-zinc-900 border border-zinc-800 p-1">
                    <TabsTrigger 
                      value="week" 
                      className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
                    >
                      Week
                    </TabsTrigger>
                    <TabsTrigger 
                      value="month" 
                      className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
                    >
                      Month
                    </TabsTrigger>
                    <TabsTrigger 
                      value="quarter" 
                      className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
                    >
                      Quarter
                    </TabsTrigger>
                    <TabsTrigger 
                      value="year" 
                      className="flex-1 data-[state=active]:bg-tribbe-lime data-[state=active]:text-black"
                    >
                      Year
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Month Selector (only shown when Month tab is selected) */}
              {timeRange === "month" && (
                <div className="relative mb-4">
                  {canScrollLeft && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-black/70 backdrop-blur-sm rounded-full" 
                      onClick={scrollLeft}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <ScrollArea 
                    ref={monthsScrollRef} 
                    className="flex-1 border border-zinc-800 rounded-lg bg-zinc-900 p-2"
                  >
                    <div className="flex space-x-3 min-w-max px-2" onScroll={checkScrollPosition}>
                      {months.map((month, index) => (
                        <button
                          key={month}
                          role="button"
                          className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                            index === selectedMonth 
                            ? "bg-tribbe-lime text-black" 
                            : "bg-zinc-800/50 text-gray-300 hover:bg-zinc-800 hover:text-white"
                          }`}
                          onClick={() => setSelectedMonth(index)}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  {canScrollRight && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-black/70 backdrop-blur-sm rounded-full" 
                      onClick={scrollRight}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              
              {/* Main Chart */}
              <div className="mb-6 animate-fade-in">
                {chartType === "pie" ? (
                  <MainPieChart 
                    data={categoryData} 
                    title={getChartTitle()}
                  />
                ) : (
                  <MainBarChart 
                    data={categoryData} 
                    title={getChartTitle()}
                  />
                )}
              </div>
              
              {/* Sub Category Pie Charts */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {categoryData.map((category) => (
                  <div key={category.name} className="animate-fade-in">
                    <SubCategoryPieChart category={category} />
                  </div>
                ))}
              </div>
              
              {/* Transaction Ledger */}
              <div className="animate-fade-in">
                <TransactionLedger transactions={filteredTransactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Boondi;
