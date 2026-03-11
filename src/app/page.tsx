import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import HorizontalProductList from "@/components/HorizontalProductList";
import ImageBreak from "@/components/ImageBreak";

import scrollBanner from "@/assets/veloura-scrolling-banner.png";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <ImageBreak src={scrollBanner.src} alt="Veloura Grip Socks Collection">
        <h2 className="text-4xl md:text-6xl font-serif font-medium text-white text-center px-4 max-w-4xl mx-auto leading-tight shadow-sm">
          תנועה שמרגישה נכון לגוף שלך
        </h2>
      </ImageBreak>
      <HorizontalProductList />
    </>
  );
}
