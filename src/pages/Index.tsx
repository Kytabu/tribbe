
import { AppLayout } from "@/components/layout/AppLayout";

const Index = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-6">
        <div className="space-y-2">
          <span className="px-3 py-1 text-sm text-tribbe-terracotta bg-tribbe-terracotta/10 rounded-full">
            Welcome to Tribbe
          </span>
          <h1 className="text-4xl font-bold text-tribbe-charcoal mt-4">
            Your Digital Money Circle
          </h1>
        </div>
        <p className="text-tribbe-sage text-lg max-w-xl">
          Join a community of young Africans building wealth together through
          digital money circles, social credit, and AI-powered financial management.
        </p>
      </div>
    </AppLayout>
  );
}

export default Index;
