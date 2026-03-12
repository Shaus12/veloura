"use client";

import { useState, useEffect } from "react";
import heroImage from "@/assets/veloura-hero.png";
import accessoriesHero from "@/assets/veloura-accessories-hero.png";
import hero3 from "@/assets/veloura-hero-3.png";

const heroImages = [
  { src: typeof heroImage === "string" ? heroImage : (heroImage as any).src, alt: "VELOURA Movement Studio" },
  { src: typeof accessoriesHero === "string" ? accessoriesHero : (accessoriesHero as any).src, alt: "VELOURA Pilates Accessories Collection" },
  { src: typeof hero3 === "string" ? hero3 : (hero3 as any).src, alt: "VELOURA Collection" },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden h-screen flex items-center justify-center">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover object-bottom"
          />
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;