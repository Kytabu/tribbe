
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, CreditCard, MenuIcon, Smartphone, Building2, Receipt } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export default function SnapToPay() {
  const { openMobile, setOpenMobile, isMobile, open, setOpen } = useSidebar();

  const handleMenuClick = () => {
    if (isMobile) {
      setOpenMobile(!openMobile);
    } else {
      setOpen(!open);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="flex items-center justify-between px-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-background/80 h-6 w-6"
            onClick={handleMenuClick}
          >
            <MenuIcon className="h-3 w-3 text-tribbe-lime" />
          </Button>
          <h1 className="text-2xl font-medium text-tribbe-lime font-righteous">Snap to Pay</h1>
          <div className="w-6" /> {/* Spacer for centering */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="group border-0 hover:bg-tribbe-lime/5 transition-colors duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <QrCode className="h-5 w-5 text-tribbe-lime" />
                Scan QR Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-24 border-tribbe-lime/50 group-hover:border-tribbe-lime group-hover:bg-tribbe-lime/5"
              >
                <QrCode className="h-8 w-8 text-tribbe-lime" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 hover:bg-tribbe-lilac/5 transition-colors duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-tribbe-lilac" />
                Show My Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-24 border-tribbe-lilac/50 group-hover:border-tribbe-lilac group-hover:bg-tribbe-lilac/5"
              >
                <Smartphone className="h-8 w-8 text-tribbe-lilac" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 hover:bg-tribbe-aqua/5 transition-colors duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-tribbe-aqua" />
                Snap Till Number
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-24 border-tribbe-aqua/50 group-hover:border-tribbe-aqua group-hover:bg-tribbe-aqua/5"
              >
                <Building2 className="h-8 w-8 text-tribbe-aqua" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 hover:bg-tribbe-yellow/5 transition-colors duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Receipt className="h-5 w-5 text-tribbe-yellow" />
                Snap Paybill Number
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-24 border-tribbe-yellow/50 group-hover:border-tribbe-yellow group-hover:bg-tribbe-yellow/5"
              >
                <Receipt className="h-8 w-8 text-tribbe-yellow" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Snap Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-tribbe-lime/50 hover:border-tribbe-lime hover:bg-tribbe-lime/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-tribbe-lime/10 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-tribbe-lime" />
                </div>
                <div>
                  <p className="font-medium text-sm">Coffee Shop</p>
                  <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                </div>
              </div>
              <span className="font-medium text-sm text-tribbe-lime">-£4.50</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-tribbe-lime/50 hover:border-tribbe-lime hover:bg-tribbe-lime/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-tribbe-lime/10 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-tribbe-lime" />
                </div>
                <div>
                  <p className="font-medium text-sm">Local Market</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 3:15 PM</p>
                </div>
              </div>
              <span className="font-medium text-sm text-tribbe-lime">-£12.75</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
