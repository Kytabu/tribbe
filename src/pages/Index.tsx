
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const navigate = useNavigate();

  // Check authentication status first
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // 5 seconds

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      if (elapsed < duration) {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setIsVisible(false);
        setShouldNavigate(true);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      setProgress(0);
    };
  }, []);

  // Navigate to pin-entry after fade animation completes
  useEffect(() => {
    if (!isVisible && shouldNavigate) {
      const navigationTimer = setTimeout(() => {
        setShouldNavigate(false); // Prevent further navigation attempts
        navigate('/pin-entry', { replace: true }); // Use replace to prevent back navigation
      }, 300); // Match this with the CSS transition duration

      return () => clearTimeout(navigationTimer);
    }
  }, [isVisible, shouldNavigate, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 pt-20">
      <div 
        className={`space-y-8 text-center mx-auto max-w-2xl w-full transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="space-y-8">
          <img 
            src="/lovable-uploads/4fd95257-7ac3-44c8-9189-c0b116e26623.png"
            alt="Tribbe Logo"
            className="w-[20rem] mx-auto"
          />
          <div className="pt-5">
            <img 
              src="/lovable-uploads/7d875948-ce43-436a-a356-9bce6f1a1226.png"
              alt="AI and Finance Illustration"
              className="w-[27rem] mx-auto"
            />
          </div>
          <h2 className="text-4xl font-righteous text-primary mx-auto" style={{ width: '27rem' }}>
            the new way to do money
          </h2>
          <Progress value={progress} className="w-[27rem] mx-auto h-2" />
        </div>
      </div>
    </div>
  );
};

export default Index;
