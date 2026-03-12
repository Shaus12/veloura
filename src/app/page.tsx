import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import HorizontalProductList from "@/components/HorizontalProductList";
import DifferenceSection from "@/components/DifferenceSection";
import LifestyleGallery from "@/components/LifestyleGallery";
import ExtraProducts from "@/components/ExtraProducts";
import TrustSection from "@/components/TrustSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <HorizontalProductList />
      <DifferenceSection />
      <LifestyleGallery />
      <ExtraProducts />
      <TrustSection />
    </>
  );
}
