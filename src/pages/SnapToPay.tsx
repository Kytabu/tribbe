
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, CreditCard, ArrowLeft, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SnapToPay() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/flami")}
            className="hover:bg-tribbe-lime"
          >
            <ArrowLeft className="h-6 w-6 text-tribbe-lime hover:text-tribbe-black" />
          </Button>
          <h1 className="text-2xl font-semibold">Snap to Pay</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="hover:scale-105 transition-all duration-300 border-tribbe-lime">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-6 w-6 text-tribbe-lime" />
                Scan QR Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full py-8 border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
              >
                <div className="text-center">
                  <QrCode className="h-12 w-12 mx-auto mb-2" />
                  <p>Scan QR code to pay</p>
                  <p className="text-sm text-muted-foreground">Quick and secure payments</p>
                </div>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:scale-105 transition-all duration-300 border-tribbe-lime">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-tribbe-lime" />
                Show My Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full py-8 border-tribbe-lime hover:bg-tribbe-lime hover:text-black"
              >
                <div className="text-center">
                  <QrCode className="h-12 w-12 mx-auto mb-2" />
                  <p>Show your QR code</p>
                  <p className="text-sm text-muted-foreground">Let others pay you instantly</p>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-tribbe-lime">
          <CardHeader>
            <CardTitle>Recent Snap Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-tribbe-lime hover:bg-tribbe-lime/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-tribbe-lime" />
                  </div>
                  <div>
                    <p className="font-medium">Coffee Shop</p>
                    <p className="text-sm text-muted-foreground">Today, 10:30 AM</p>
                  </div>
                </div>
                <span className="font-medium text-tribbe-lime">-£4.50</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-tribbe-lime hover:bg-tribbe-lime/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tribbe-lime/20 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-tribbe-lime" />
                  </div>
                  <div>
                    <p className="font-medium">Local Market</p>
                    <p className="text-sm text-muted-foreground">Yesterday, 3:15 PM</p>
                  </div>
                </div>
                <span className="font-medium text-tribbe-lime">-£12.75</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
