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
    <section ref={ref} className="py-20 md:py-28 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-[1400px]">
        {/* Horizontal Drag Area */}
        <div 
          ref={scrollRef}
          className={`flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing ${isVisible ? "animate-fade-up" : "opacity-0"}`}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="min-w-[75vw] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[360px] snap-start flex-shrink-0 group"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Image Container */}
              <div 
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary mb-4 cursor-pointer"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Floating Interactive Button (Like BetterMe) */}
                <button 
                  className="absolute bottom-4 left-4 w-12 h-12 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-soft hover:bg-foreground hover:text-background"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add logic here if needed (e.g. quick add)
                    router.push(`/product/${product.id}`);
                  }}
                  aria-label="View Product"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Color Swatches */}
              <div className="flex items-center gap-2 mb-3">
                {product.colors.map((color, i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-4 rounded-full cursor-pointer hover:scale-110 transition-transform ${i === 0 ? 'ring-1 ring-offset-2 ring-foreground' : 'border border-border/50'}`}
                    style={{ backgroundColor: color }}
                    title={`Color option ${i + 1}`}
                  />
                ))}
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div 
                  className="cursor-pointer group-hover:opacity-70 transition-opacity pr-4"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <h3 className="font-sans font-semibold text-foreground leading-tight text-sm md:text-base">{product.name}</h3>
                  <p className="font-sans text-xs text-muted-foreground mt-1 capitalize">{product.category}</p>
                </div>
                <div className="text-left font-sans font-medium text-foreground text-sm md:text-base shrink-0">
                  ₪{product.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalProductList;
