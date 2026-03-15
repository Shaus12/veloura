"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import imgCategoryGripSocks from "@/assets/category_grip_socks_1773587606665.png";
import imgCategoryEquipment from "@/assets/category_equipment_1773587633142.png";
import imgCategoryApparel from "@/assets/category_apparel_1773587649434.png";
import imgCategoryAccessories from "@/assets/category_accessories_1773587671537.png";

const categories = [
  {
    id: "grip-socks",
    name: "גרבי אחיזה לפילאטיס",
    image: imgCategoryGripSocks.src,
  },
  {
    id: "equipment",
    name: "ציוד ואביזרים",
    image: imgCategoryEquipment.src,
  },
  {
    id: "apparel",
    name: "ביגוד פילאטיס",
    image: imgCategoryApparel.src,
  },
  {
    id: "accessories",
    name: "אביזרים נלווים",
    image: imgCategoryAccessories.src,
  }
];

const CategorySection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-[1400px]">
        <h2 
          className={`text-3xl md:text-4xl font-serif font-medium text-center text-foreground mb-12 md:mb-16 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ direction: 'rtl' }}
        >
          מה את מחפשת?
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
