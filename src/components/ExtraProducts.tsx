"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { WaitlistDialog } from "@/components/WaitlistDialog";

import imgWaterBottle from "@/assets/product_water_bottle_1773592499625.png";
import imgYogaSet from "@/assets/product_yoga_set_1773592518011.png";
const extras = [
  {
    id: "alibaba-7",
    name: "בקבוק מים נירוסטה 500 מ״ל",
    price: 85,
    description: "בקבוק מבודד לשמירת קור למשך 24 שעות",
    image: imgWaterBottle.src,
  },
  {
    id: "alibaba-8",
    name: "סט ספורט ויוגה (2 חלקים)",
    price: 180,
    description: "סט ספורט נוח ומחמיא לאימוני פילאטיס ויוגה",
    image: imgYogaSet.src,
  },
  {
    id: "alibaba-9",
    name: "סט בגדי ספורט Seamless",
    price: 195,
    description: "סט איכותי מבד נושם, מושלם לכל אימון",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800",
  },
];

const ExtraProducts = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { addItem } = useCart();
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <section id="extras" ref={ref} className="py-28 md:py-36 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            עוד מהחנות
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            אביזרי פילאטיס
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {extras.map((product, i) => {
            const [isHovered, setIsHovered] = useState(false);
            return (
              <div
                key={product.id}
                className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative overflow-hidden rounded-3xl bg-card shadow-card mb-5 aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isHovered ? "scale-110" : "scale-100"
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="px-1">
                  <h3 className="text-lg font-serif font-medium text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm font-sans font-light text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <p className="text-sm font-sans font-semibold text-foreground mb-4">
                    ₪{product.price}
                  </p>
                  <Button
                    variant="subtle"
                    size="sm"
                    className="px-6"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsWaitlistOpen(true);
                    }}
                  >
                    אזל מהמלאי - הצטרפי להמתנה
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <WaitlistDialog 
        isOpen={isWaitlistOpen}
        onOpenChange={setIsWaitlistOpen}
        productId={selectedProduct?.id || ""}
        productName={selectedProduct?.name || ""}
      />
    </section>
  );
};

export default ExtraProducts;
