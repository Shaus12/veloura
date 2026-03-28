"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

import imgClassic from "@/assets/product_classic_1773579003841.png";
import imgChampagne from "@/assets/product_champagne_1773579021607.png";
import imgBallet from "@/assets/product_ballet_1773579037443.png";
import imgRoseQuartz from "@/assets/product_rose_quartz_1773579053445.png";
import imgRing from "@/assets/product_pilates_ring_1773579072379.png";
import imgBand from "@/assets/product_resistance_band_1773579091254.png";

const products = [
  {
    id: "veloura-grip-classic",
    name: "גרבי אחיזה Cloud - שחור",
    price: 55,
    oldPrice: 65,
    image: imgClassic.src,
    color: "שחור",
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-champagne",
    name: "גרבי אחיזה Cloud - שמפניה",
    price: 55,
    oldPrice: 65,
    image: imgChampagne.src,
    color: "שמפניה",
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-ballet",
    name: "גרבי אחיזה Cloud - ורוד בלט",
    price: 55,
    oldPrice: 65,
    image: imgBallet.src,
    color: "ורוד",
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-rose-quartz",
    name: "גרבי אחיזה Cloud - רוז קוורץ",
    price: 55,
    oldPrice: 65,
    image: imgRoseQuartz.src,
    color: "רוז",
    category: "Grip Socks"
  },
  {
    id: "veloura-magic-circle",
    name: "טבעת פילאטיס Magic Circle",
    price: 120,
    oldPrice: 150,
    image: imgRing.src,
    color: "בז'",
    category: "Equipment"
  },
  {
    id: "veloura-resistance-band",
    name: "סט גומיות התנגדות מבד",
    price: 89,
    oldPrice: 110,
    image: imgBand.src,
    color: "גווני אדמה",
    category: "Equipment"
  },
  {
    id: "aliexpress-1",
    name: "גרבי יוגה עם אחיזת סיליקון",
    price: 59,
    oldPrice: 79,
    image: "/products/aliexpress_1.jpg",
    color: "ססגוני",
    category: "Grip Socks"
  },
  {
    id: "aliexpress-2",
    name: "גרבי יוגה דוגמת לחם וקפה",
    price: 59,
    oldPrice: 79,
    image: "/products/aliexpress_2.jpg",
    color: "ססגוני",
    category: "Grip Socks"
  },
  {
    id: "aliexpress-3",
    name: "גרבי יוגה כותנה לבנה",
    price: 59,
    oldPrice: 79,
    image: "/products/aliexpress_3.jpg",
    color: "לבן",
    category: "Grip Socks"
  },
  {
    id: "aliexpress-4",
    name: "גרבי יוגה דובדבן",
    price: 59,
    oldPrice: 79,
    image: "/products/aliexpress_4.jpg",
    color: "לבן/אדום",
    category: "Grip Socks"
  },
  {
    id: "aliexpress-5",
    name: "סט 13 חתיכות פילאטיס ויוגה",
    price: 189,
    oldPrice: 250,
    image: "/products/aliexpress_5.jpg",
    color: "סגול/שחור",
    category: "Equipment"
  },
  {
    id: "aliexpress-6",
    name: "טבעת פילאטיס קסם",
    price: 129,
    oldPrice: 160,
    image: "/products/aliexpress_6.jpg",
    color: "ורוד/סגול",
    category: "Equipment"
  },
  {
    id: "aliexpress-7",
    name: "לוח פילאטיס רב תכליתי",
    price: 249,
    oldPrice: 320,
    image: "/products/aliexpress_7.jpg",
    color: "שחור",
    category: "Equipment"
  },
  {
    id: "aliexpress-8",
    name: "מזרן יוגה מתקפל EVA",
    price: 149,
    oldPrice: 190,
    image: "/products/aliexpress_8.jpg",
    color: "ורוד/תכלת",
    category: "Accessories"
  }
];

const ProductCard = ({ product, index, isVisible }: { product: typeof products[0]; index: number; isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative overflow-hidden rounded-3xl bg-card shadow-card mb-5 aspect-square cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-foreground/5 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        <span className="absolute top-4 right-4 bg-muted text-muted-foreground text-[10px] font-sans font-bold uppercase px-3 py-1 rounded-full">
          Sold Out
        </span>
      </div>

      <div className="px-1 text-center">
        <h3
          className="text-lg font-serif font-medium text-foreground mb-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          אזל מהמלאי - הצטרפי להמתנה
        </Button>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="collection" ref={ref} className="py-28 md:py-36 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            הקולקציה
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            סדרת גרבי האחיזה
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
