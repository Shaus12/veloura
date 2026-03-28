"use client";

import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// Local imports to match the previous assets setup
import imgClassic from "@/assets/product_classic_1773579003841.png";
import imgChampagne from "@/assets/product_champagne_1773579021607.png";
import imgBallet from "@/assets/product_ballet_1773579037443.png";
import imgRoseQuartz from "@/assets/product_rose_quartz_1773579053445.png";
import imgRing from "@/assets/product_pilates_ring_1773579072379.png";
import imgBand from "@/assets/product_resistance_band_1773579091254.png";

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
    name: "גרבי אחיזה Cloud - שחור", 
    price: 55,
    image: imgClassic.src,
    colors: ["#3b3b3b", "#e0d0c1", "#5a453f", "#2b2b2b", "#8b7e74"],
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-champagne",
    name: "גרבי אחיזה Cloud - שמפניה",
    price: 55,
    image: imgChampagne.src,
    colors: ["#f5f5f5", "#8c6b5d", "#eecbc0", "#2b2b2b"],
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-ballet",
    name: "גרבי אחיזה Cloud - ורוד בלט",
    price: 55,
    image: imgBallet.src,
    colors: ["#eecbc0", "#f5f5f5"],
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-rose-quartz",
    name: "גרבי אחיזה Cloud - רוז קוורץ",
    price: 55,
    image: imgRoseQuartz.src,
    colors: ["#eecbc0"],
    category: "Grip Socks"
  },
  {
    id: "veloura-magic-circle",
    name: "טבעת פילאטיס Magic Circle",
    price: 120,
    image: imgRing.src, 
    colors: ["#eaddd5", "#9e9a9a", "#a2ab9a", "#2b2b2b", "#4a4a4a"],
    category: "Equipment"
  },
  {
    id: "veloura-resistance-band",
    name: "סט גומיות התנגדות מבד",
    price: 89,
    image: imgBand.src, 
    colors: ["#eaddd5", "#a2ab9a", "#8b7e74", "#2b2b2b", "#3b3b3b"],
    category: "Equipment"
  },
  {
    id: "aliexpress-1",
    name: "גרבי יוגה עם אחיזת סיליקון",
    price: 99,
    image: "/products/aliexpress_1.jpg",
    colors: ["#ffffff", "#e0e0e0", "#d3d3d3"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-2",
    name: "גרבי יוגה דוגמת לחם וקפה",
    price: 99,
    image: "/products/aliexpress_2.jpg",
    colors: ["#cd853f", "#8b4513"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-3",
    name: "גרבי יוגה כותנה לבנה",
    price: 99,
    image: "/products/aliexpress_3.jpg",
    colors: ["#ffffff"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-4",
    name: "גרבי יוגה דובדבן",
    price: 99,
    image: "/products/aliexpress_4.jpg",
    colors: ["#ffffff", "#ff0000"],
    category: "Grip Socks"
  },
  {
    id: "aliexpress-5",
    name: "סט 13 חתיכות פילאטיס ויוגה",
    price: 99,
    image: "/products/aliexpress_5.jpg",
    colors: ["#800080", "#000000"],
    category: "Equipment"
  },
  {
    id: "aliexpress-6",
    name: "טבעת פילאטיס קסם",
    price: 99,
    image: "/products/aliexpress_6.jpg",
    colors: ["#ffc0cb", "#dda0dd"],
    category: "Equipment"
  },
  {
    id: "aliexpress-7",
    name: "לוח פילאטיס רב תכליתי",
    price: 99,
    image: "/products/aliexpress_7.jpg",
    colors: ["#000000"],
    category: "Equipment"
  },
  {
    id: "aliexpress-8",
    name: "מזרן יוגה מתקפל EVA",
    price: 99,
    image: "/products/aliexpress_8.jpg",
    colors: ["#ffb6c1", "#87ceeb"],
    category: "Accessories"
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
    <section id="collection" ref={ref} className="py-16 md:py-24 px-4 md:px-8 bg-background">
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

