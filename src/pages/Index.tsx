
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Start fade out after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Navigate to setup after fade animation completes
  useEffect(() => {
    if (!isVisible) {
      const navigationTimer = setTimeout(() => {
        navigate('/setup');
      }, 300); // Match this with the CSS transition duration

      return () => clearTimeout(navigationTimer);
    }
  }, [isVisible, navigate]);

  return (
    <div className="min-h-screen bg-tribbe-sand flex flex-col items-center justify-center">
      <div 
        className={`space-y-6 text-center mx-auto px-4 max-w-2xl w-full transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="space-y-4">
          <img 
            src="/lovable-uploads/4fd95257-7ac3-44c8-9189-c0b116e26623.png"
            alt="Tribbe Logo"
            className="h-12 w-auto mx-auto"
          />
          <img 
            src="/lovable-uploads/784abd5e-2229-418f-8511-8a081c09fa02.png"
            alt="Illustration of people interacting with a network visualization"
            className="w-[60%] h-auto rounded-lg shadow-lg object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
