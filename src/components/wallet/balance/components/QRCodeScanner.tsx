
import { useState, useEffect, useRef } from "react";
import { Camera } from "@capacitor/camera";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QRCodeScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanComplete: (data: string) => void;
}

export function QRCodeScanner({ open, onOpenChange, onScanComplete }: QRCodeScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Request camera permissions when the component mounts
    const checkPermissions = async () => {
      try {
        const permissionState = await Camera.checkPermissions();
        if (permissionState.camera === 'granted') {
          setHasPermission(true);
        } else {
          const permission = await Camera.requestPermissions({
            permissions: ['camera']
          });
          setHasPermission(permission.camera === 'granted');
        }
      } catch (error) {
        console.error("Camera permission error:", error);
        setErrorMessage("Failed to request camera permissions");
        setHasPermission(false);
      }
    };

    if (open) {
      checkPermissions();
    }

    return () => {
      // Clean up on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [open]);

  useEffect(() => {
    const startCamera = async () => {
      if (hasPermission && videoRef.current) {
        try {
          // Get user media for camera
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' } // Use back camera on mobile
          });
          
          streamRef.current = stream;
          videoRef.current.srcObject = stream;
          
          // Start video playback
          await videoRef.current.play();
          
          // Here you would typically implement QR code detection logic
          // This would require a library like jsQR or a similar QR code detector
          // For now, we'll simulate a successful scan after 5 seconds
          setTimeout(() => {
            // Simulate finding a QR code with payment data
            onScanComplete("user123:amount100:currencyKES");
            onOpenChange(false);
          }, 5000);
          
        } catch (error) {
          console.error("Error accessing camera:", error);
          setErrorMessage("Failed to access camera");
        }
      }
    };

    if (hasPermission && open) {
      startCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    };
  }, [hasPermission, open, onOpenChange, onScanComplete]);

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-4 relative">
          <DialogTitle>Scan QR Code</DialogTitle>
          <Button 
            variant="ghost" 
            className="absolute right-2 top-2 rounded-full p-2 h-8 w-8" 
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="relative aspect-square w-full bg-black">
          {hasPermission === false && (
            <div className="absolute inset-0 flex items-center justify-center bg-background p-4 text-center">
              <div className="space-y-4">
                <p>{errorMessage || "Camera permission denied"}</p>
                <Button onClick={() => onOpenChange(false)}>Close</Button>
              </div>
            </div>
          )}
          
          {hasPermission === true && (
            <video 
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              playsInline
              muted
            />
          )}
          
          {hasPermission === null && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p>Requesting camera permission...</p>
            </div>
          )}
          
          {/* QR code frame overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-2 border-tribbe-lime w-64 h-64 rounded-lg opacity-80"></div>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-center text-sm text-muted-foreground">
            Position the QR code within the frame to scan
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
