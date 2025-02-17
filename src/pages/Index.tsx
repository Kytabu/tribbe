
const Index = () => {
  return (
    <div className="min-h-screen bg-tribbe-sand flex flex-col items-center justify-center">
      <div className="space-y-6 text-center animate-fade-in mx-auto px-4 max-w-2xl w-full">
        <div className="space-y-2">
          <span className="px-3 py-1 text-sm text-tribbe-terracotta bg-tribbe-terracotta/10 rounded-full inline-block">
            Hi!
          </span>
          <img 
            src="/lovable-uploads/784abd5e-2229-418f-8511-8a081c09fa02.png"
            alt="Illustration of people interacting with a network visualization"
            className="w-3/4 h-auto rounded-lg shadow-lg mt-4 object-contain mx-auto"
          />
        </div>
        <p className="text-tribbe-sage text-lg max-w-xl mx-auto">
          Welcome to your AI money manager.
        </p>
      </div>
    </div>
  );
};

export default Index;
