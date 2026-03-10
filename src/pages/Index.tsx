import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import DifferenceSection from "@/components/DifferenceSection";
import ProductGrid from "@/components/ProductGrid";
import LifestyleGallery from "@/components/LifestyleGallery";
import ExtraProducts from "@/components/ExtraProducts";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navigation />
      <HeroSection />
      <DifferenceSection />
      <ProductGrid />
      <LifestyleGallery />
      <ExtraProducts />
      <TrustSection />
      <Footer />
      <Chatbot />
      <AccessibilityWidget />
      <CartDrawer />
    </div>
  );
};

export default Index;
