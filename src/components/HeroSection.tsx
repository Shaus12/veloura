import heroImage from "@/assets/veloura-hero.png";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <img
        src={heroImage}
        alt="VELŌURA Pilates grip socks"
        className="w-full h-auto object-cover"
      />
      {/* Overlay with brand message */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent flex items-end">
        <div className="container mx-auto max-w-6xl px-6 pb-12 md:pb-20">
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-background/70 mb-3">
            תנועה שחוזרת לגוף
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-normal text-background mb-4 max-w-2xl">
            הגוף שלך לא פרויקט.
            <br />
            הוא הבית שלך.
          </h1>
          <p className="text-sm md:text-base font-sans font-light text-background/80 mb-8 max-w-lg">
            גרבי אחיזה שנולדו מהסטודיו הישראלי — כי תנועה טובה מתחילה מהרגליים.
          </p>
          <Button
            variant="hero"
            size="lg"
            className="px-10 py-4"
            onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
          >
            לקולקציה
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
