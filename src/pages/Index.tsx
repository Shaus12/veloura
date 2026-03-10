import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DifferenceSection from "@/components/DifferenceSection";
import ProductGrid from "@/components/ProductGrid";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <DifferenceSection />
      <ProductGrid />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
