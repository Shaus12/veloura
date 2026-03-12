"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    id: "equipment",
    name: "Equipment",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80",
  },
  {
    id: "bodysuits",
    name: "Bodysuits",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80",
  },
  {
    id: "leggings",
    name: "Leggings",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80",
  },
  {
    id: "tops",
    name: "Tops",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80",
  }
];

const CategorySection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-[1400px]">
        <h2 
          className={`text-3xl md:text-4xl font-serif font-medium text-center text-foreground mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          ?What Are You Looking For
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link 
              href={`/category/${category.id}`} 
              key={category.id}
              className={`group flex flex-col items-center gap-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center gap-2 text-foreground font-sans font-medium hover:opacity-70 transition-opacity">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span>{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
