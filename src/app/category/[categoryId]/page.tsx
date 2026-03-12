"use client";

import { useParams, useRouter } from "next/navigation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ArrowRight } from "lucide-react";

import imgClassic from "@/assets/product-classic.jpg";
import imgChampagne from "@/assets/product-champagne.jpg";
import imgBallet from "@/assets/product-ballet.jpg";
import imgRoseQuartz from "@/assets/product-rose-quartz.jpg";
import imgRing from "@/assets/product-pilates-ring.jpg";
import imgBand from "@/assets/product-resistance-band.jpg";

const allProducts = [
  {
    id: "veloura-grip-classic",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgClassic.src,
    color: "שחור קלאסי",
    category: "equipment"
  },
  {
    id: "veloura-grip-champagne",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgChampagne.src,
    color: "שמפניה עדינה",
    category: "bodysuits"
  },
  {
    id: "veloura-grip-ballet",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgBallet.src,
    color: "ורוד בלט",
    category: "leggings"
  },
  {
    id: "veloura-grip-rose-quartz",
    name: "גרבי אחיזה Cloud",
    price: 55,
    oldPrice: 65,
    image: imgRoseQuartz.src,
    color: "רוז קוורץ",
    category: "tops"
  },
  {
    id: "veloura-magic-circle",
    name: "טבעת פילאטיס Magic Circle",
    price: 120,
    oldPrice: 150,
    image: imgRing.src,
    color: "בז' / עץ מנגו",
    category: "equipment"
  },
  {
    id: "veloura-resistance-band",
    name: "סט גומיות התנגדות מבד",
    price: 89,
    oldPrice: 110,
    image: imgBand.src,
    color: "סט גווני אדמה",
    category: "equipment"
  }
];

const categoryNames: Record<string, string> = {
  equipment: "Equipment",
  bodysuits: "Bodysuits",
  leggings: "Leggings",
  tops: "Tops",
};

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { addItem } = useCart();

  const categoryId = params.categoryId as string;
  const categoryName = categoryNames[categoryId] || categoryId;

  const filtered = allProducts.filter(
    (p) => p.category.toLowerCase() === categoryId.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-background pt-8 pb-20 px-4 md:px-8" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-sans text-sm"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </button>

        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            קטגוריה
          </p>
          <h1
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            {categoryName}
          </h1>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                <div
                  className="relative overflow-hidden rounded-3xl bg-card shadow-card mb-5 aspect-square cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
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
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                      })
                    }
                  >
                    הוסיפי לסל
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground font-sans">
              מוצרים בקטגוריה זו יגיעו בקרוב ✨
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
