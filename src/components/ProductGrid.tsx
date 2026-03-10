import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import productRoseQuartz from "@/assets/product-rose-quartz.jpg";
import productChampagne from "@/assets/product-champagne.jpg";
import productBallet from "@/assets/product-ballet.jpg";
import { useState } from "react";

const products = [
  {
    name: "The Rose Quartz Mary Jane",
    price: "$42",
    image: productRoseQuartz,
    color: "Rose Quartz",
  },
  {
    name: "The Champagne Mary Jane",
    price: "$42",
    image: productChampagne,
    color: "Champagne",
  },
  {
    name: "The Ballet Mauve Mary Jane",
    price: "$42",
    image: productBallet,
    color: "Ballet Mauve",
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
      </div>

      <div className="px-1">
        <p className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">
          {product.color}
        </p>
        <h3 className="text-lg font-serif font-medium text-foreground mb-1">
          {product.name}
        </h3>
        <p className="text-sm font-sans font-light text-muted-foreground mb-4">
          {product.price}
        </p>
        <Button variant="subtle" size="sm" className="px-6">
          Add to Cart
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
            The Collection
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            The Mary Jane Series
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
