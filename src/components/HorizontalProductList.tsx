"use client";

import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Local imports to match the previous assets setup
import imgClassic from "@/assets/product-classic.jpg";
import imgChampagne from "@/assets/product-champagne.jpg";
import imgBallet from "@/assets/product-ballet.jpg";
import imgRoseQuartz from "@/assets/product-rose-quartz.jpg";
import imgRing from "@/assets/product-pilates-ring.jpg";
import imgBand from "@/assets/product-resistance-band.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  colors: string[];
  category: string;
}

const products: Product[] = [
  {
    id: "veloura-grip-classic",
    name: "Ultrasculpt High Waisted Leggings", // Placeholder aesthetic name
    price: 155,
    image: imgClassic.src,
    colors: ["#3b3b3b", "#e0d0c1", "#5a453f", "#2b2b2b", "#8b7e74"],
    category: "Leggings"
  },
  {
    id: "veloura-grip-champagne",
    name: "Soft Everyday Long Sleeve Top",
    price: 155,
    image: imgChampagne.src,
    colors: ["#f5f5f5", "#8c6b5d", "#eecbc0", "#2b2b2b"],
    category: "Tops"
  },
  {
    id: "veloura-magic-circle",
    name: "Track Shorts",
    price: 155,
    image: imgRing.src, // Re-using local image for layout structure
    colors: ["#eaddd5", "#9e9a9a", "#a2ab9a", "#2b2b2b", "#4a4a4a"],
    category: "Shorts"
  },
  {
    id: "veloura-resistance-band",
    name: "Ultralight Athletic Jacket",
    price: 281,
    image: imgBand.src, // Re-using local image
    colors: ["#eaddd5", "#a2ab9a", "#8b7e74", "#2b2b2b", "#3b3b3b"],
    category: "Jackets"
  },
  {
    id: "veloura-grip-ballet",
    name: "Ballet Studio Socks",
    price: 55,
    image: imgBallet.src,
    colors: ["#eecbc0", "#f5f5f5"],
    category: "Socks"
  },
  {
    id: "veloura-grip-rose-quartz",
    name: "Rose Quartz Grip Socks",
    price: 55,
    image: imgRoseQuartz.src,
    colors: ["#eecbc0"],
    category: "Socks"
  }
];

const HorizontalProductList = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const onMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    if (!scrollRef.current) return;
    scrollRef.current.classList.add('cursor-grabbing');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDown = false;
    if (!scrollRef.current) return;
    scrollRef.current.classList.remove('cursor-grabbing');
  };

  const onMouseUp = () => {
    isDown = false;
    if (!scrollRef.current) return;
    scrollRef.current.classList.remove('cursor-grabbing');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section ref={ref} className="py-16 md:py-24 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-[1200px]">
        {/* Product Grid */}
        <div 
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="group"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Image Container */}
              <div 
                className="relative aspect-square overflow-hidden rounded-xl bg-secondary mb-2 cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              {/* Product Info */}
              <div 
                className="cursor-pointer group-hover:opacity-70 transition-opacity"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <h3 className="font-sans font-semibold text-foreground leading-tight text-xs md:text-sm">{product.name}</h3>
                <p className="font-sans text-[10px] md:text-xs text-muted-foreground mt-0.5 capitalize">{product.category}</p>
                <p className="font-sans font-medium text-foreground text-xs md:text-sm mt-1">
                  ₪{product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductList;

