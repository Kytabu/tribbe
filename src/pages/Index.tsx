
const Index = () => {
  return (
    <div className="min-h-screen bg-tribbe-sand flex flex-col items-center justify-center">
      <div className="space-y-6 text-center animate-fade-in mx-auto px-4 max-w-2xl w-full">
        <div className="space-y-2">
          <span className="px-3 py-1 text-sm text-tribbe-terracotta bg-tribbe-terracotta/10 rounded-full inline-block">
            Hi!
          </span>
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="Person using a laptop, representing AI money management"
            className="w-full h-auto rounded-lg shadow-lg mt-4 object-cover"
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
