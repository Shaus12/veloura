"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

import imgClassic from "@/assets/product-classic.jpg";
import imgChampagne from "@/assets/product-champagne.jpg";
import imgBallet from "@/assets/product-ballet.jpg";
import imgRoseQuartz from "@/assets/product-rose-quartz.jpg";
import imgRing from "@/assets/product-pilates-ring.jpg";
import imgBand from "@/assets/product-resistance-band.jpg";

const products = [
  {
    id: "veloura-grip-classic",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgClassic.src,
    color: "שחור קלאסי",
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-champagne",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgChampagne.src,
    color: "שמפניה עדינה",
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-ballet",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgBallet.src,
    color: "ורוד בלט",
    category: "Grip Socks"
  },
  {
    id: "veloura-grip-rose-quartz",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgRoseQuartz.src,
    color: "רוז קוורץ",
    category: "Grip Socks"
  },
  {
    id: "veloura-magic-circle",
    name: "טבעת פילאטיס Magic Circle",
    price: 120,
    oldPrice: 150,
    image: imgRing.src,
    color: "בז' / עץ מנגו",
    category: "Equipment"
  },
  {
    id: "veloura-resistance-band",
    name: "סט גומיות התנגדות מבד",
    price: 89,
    oldPrice: 110,
    image: imgBand.src,
    color: "סט גווני אדמה",
    category: "Equipment"
  }
];

const ProductCard = ({ product, index, isVisible }: { product: typeof products[0]; index: number; isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
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
        <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground text-[10px] font-sans font-bold uppercase px-3 py-1 rounded-full">
          מבצע
        </span>
      </div>

      <div className="px-1">
        <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          {product.color}
        </p>
        <h3
          className="text-lg font-serif font-medium text-foreground mb-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm font-sans font-semibold text-foreground">
            ₪{product.price}
          </p>
          <p className="text-sm font-sans font-light text-muted-foreground line-through">
            ₪{product.oldPrice}
          </p>
        </div>
        <Button
          variant="subtle"
          size="sm"
          className="px-6"
          onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
        >
          הוסיפי לסל
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
