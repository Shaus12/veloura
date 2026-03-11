"use client";

import heroImage from "@/assets/veloura-hero.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          src={typeof heroImage === 'string' ? heroImage : (heroImage as any).src}
          alt="VELOURA Movement Studio"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;