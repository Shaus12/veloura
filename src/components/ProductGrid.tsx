import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import sockPinkStripe from "@/assets/sock-pink-stripe.png";
import sockPinkDots from "@/assets/sock-pink-dots.png";
import heroPilatesNew from "@/assets/hero-pilates-new.jpg";
import { useState } from "react";

const products = [
  {
    name: "גרב אחיזה Rose Quartz",
    price: "₪60",
    oldPrice: "₪90",
    image: sockPinkStripe,
    color: "ורוד פסים",
  },
  {
    name: "גרב אחיזה Champagne",
    price: "₪60",
    oldPrice: "₪90",
    image: sockPinkDots,
    color: "ורוד נקודות",
  },
];

const ProductCard = ({ product, index, isVisible }: { product: typeof products[0]; index: number; isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
      style={{ animationDelay: `${0.2 + index * 0.15}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-card shadow-card mb-5 aspect-square">
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
        <h3 className="text-lg font-serif font-medium text-foreground mb-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm font-sans font-semibold text-foreground">
            {product.price}
          </p>
          <p className="text-sm font-sans font-light text-muted-foreground line-through">
            {product.oldPrice}
          </p>
        </div>
        <Button variant="subtle" size="sm" className="px-6">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-10">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
