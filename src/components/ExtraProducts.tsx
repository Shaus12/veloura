import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import modelReformer from "@/assets/model-reformer-1.jpg";
import modelStretch from "@/assets/model-stretch-1.jpg";
import modelLifestyle2 from "@/assets/model-lifestyle-2.jpg";

const extras = [
  {
    name: "טבעת פילאטיס פרימיום",
    price: "₪89",
    description: "טבעת התנגדות מקצועית לחיטוב וחיזוק",
    image: modelReformer,
  },
  {
    name: "מגבת סטודיו מיקרופייבר",
    price: "₪49",
    description: "מגבת רכה וסופגת במיוחד לאימון",
    image: modelStretch,
  },
  {
    name: "גומיית התנגדות LŪNA",
    price: "₪39",
    description: "גומיית לטקס איכותית לאימון בבית ובסטודיו",
    image: modelLifestyle2,
  },
];

const ExtraProducts = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

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
                key={product.name}
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
                    {product.price}
                  </p>
                  <Button variant="subtle" size="sm" className="px-6">
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
