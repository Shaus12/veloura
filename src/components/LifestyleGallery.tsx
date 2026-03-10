import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import modelReformer from "@/assets/model-reformer-1.jpg";
import modelLifestyle1 from "@/assets/model-lifestyle-1.jpg";
import modelStretch from "@/assets/model-stretch-1.jpg";
import modelLifestyle2 from "@/assets/model-lifestyle-2.jpg";

const images = [
  { src: modelReformer, alt: "דוגמנית על רפורמר עם גרבי VELŌURA" },
  { src: modelLifestyle1, alt: "דוגמנית בסטודיו פילאטיס עם גרבי אחיזה ורודות" },
  { src: modelStretch, alt: "דוגמנית בתרגיל מתיחה עם גרבי VELŌURA" },
  { src: modelLifestyle2, alt: "דוגמנית בסטודיו יוקרתי עם גרבי פילאטיס" },
];

const LifestyleGallery = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section ref={ref} className="py-28 md:py-36 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            #VelouraLifestyle
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            VELŌURA בפעולה
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
