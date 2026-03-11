"use client";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const images = [
  { src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80", alt: "Pilates Reformer Class" },
  { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80", alt: "Yoga and Pilates Space" },
  { src: "https://images.unsplash.com/photo-1599901860904-17e089299dc4?auto=format&fit=crop&q=80", alt: "Matcha Latte" },
  { src: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80", alt: "Stretching Session" },
];

const LifestyleGallery = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="stories" ref={ref} className="py-28 md:py-36 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            #LunaGirls
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            הקהילה שלנו בפעולה
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl aspect-square group ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
