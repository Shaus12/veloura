"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import imgCommunity1 from "@/assets/community_lifestyle_1_1773589068312.png";
import imgCommunity2 from "@/assets/community_lifestyle_2_1773589096098.png";
import imgCommunity3 from "@/assets/community_lifestyle_3_1773589120883.png";
import imgCommunity4 from "@/assets/community_lifestyle_4_1773589146402.png";

const images = [
  { src: imgCommunity1.src, alt: "Pilates Reformer Class" },
  { src: imgCommunity2.src, alt: "Yoga and Pilates Space" },
  { src: imgCommunity3.src, alt: "Matcha Latte" },
  { src: imgCommunity4.src, alt: "Stretching Session" },
];

const LifestyleGallery = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="stories" ref={ref} className="py-28 md:py-36 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            #LunaGirls
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            הקהילה שלנו בפעולה
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl aspect-square group ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
