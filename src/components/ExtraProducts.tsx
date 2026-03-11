import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import productPilatesRing from "@/assets/product-pilates-ring.jpg";
import productTowel from "@/assets/product-towel.jpg";
import productResistanceBand from "@/assets/product-resistance-band.jpg";

const extras = [
  {
    id: "rec-1",
    name: "טבעת פילאטיס פרימיום",
    price: 89,
    description: "טבעת התנגדות מקצועית לחיטוב וחיזוק",
    image: productPilatesRing,
  },
  {
    id: "rec-2",
    name: "מגבת סטודיו מיקרופייבר",
    price: 49,
    description: "מגבת רכה וסופגת במיוחד לאימון",
    image: productTowel,
  },
  {
    id: "rec-3",
    name: "גומיית התנגדות VELŌURA",
    price: 39,
    description: "גומיית לטקס איכותית לאימון בבית ובסטודיו",
    image: productResistanceBand,
  },
];

const ExtraProducts = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { addItem } = useCart();

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
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                  >
                    הוסיפי לסל
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExtraProducts;
