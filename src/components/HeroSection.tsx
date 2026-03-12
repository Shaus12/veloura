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
    <section className="relative w-full overflow-hidden h-[60vh] md:h-screen flex items-center justify-center">
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
            className="w-full h-full object-cover object-[center_top] md:object-[center_35%]"
          />
        </div>
      ))}

      {/* Top gradient for nav readability */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-[1]" />


    </section>
  );
};

export default HeroSection;