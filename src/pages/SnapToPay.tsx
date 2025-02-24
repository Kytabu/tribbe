import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, CreditCard, Smartphone, Building2, Receipt } from "lucide-react";
import { FlamiHeader } from "@/components/flami/FlamiHeader";

export default function SnapToPay() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <FlamiHeader currentLevelColor="#00ff00" />

        <div className="grid grid-cols-2 gap-2">
          <Card className="group border-0 hover:bg-tribbe-lime/5 transition-colors duration-200">
            <CardHeader className="pb-0.5">
              <CardTitle className="text-sm font-normal">
                Scan QR Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-20 border-tribbe-lime/50 group-hover:border-tribbe-lime group-hover:bg-tribbe-lime/5"
              >
                <QrCode className="h-8 w-8 text-tribbe-lime" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 hover:bg-tribbe-lilac/5 transition-colors duration-200">
            <CardHeader className="pb-0.5">
              <CardTitle className="text-sm font-normal">
                Show My Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-20 border-tribbe-lilac/50 group-hover:border-tribbe-lilac group-hover:bg-tribbe-lilac/5"
              >
                <Smartphone className="h-8 w-8 text-tribbe-lilac" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 hover:bg-tribbe-aqua/5 transition-colors duration-200">
            <CardHeader className="pb-0.5">
              <CardTitle className="text-sm font-normal">
                Snap Till Number
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-20 border-tribbe-aqua/50 group-hover:border-tribbe-aqua group-hover:bg-tribbe-aqua/5"
              >
                <Building2 className="h-8 w-8 text-tribbe-aqua" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group border-0 hover:bg-tribbe-yellow/5 transition-colors duration-200">
            <CardHeader className="pb-0.5">
              <CardTitle className="text-sm font-normal">
                Snap Paybill Number
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full h-20 border-tribbe-yellow/50 group-hover:border-tribbe-yellow group-hover:bg-tribbe-yellow/5"
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
