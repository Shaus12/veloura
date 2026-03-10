import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-pilates-new.png";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const HeroSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="LŪNA Pilates grip socks"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-serif font-normal leading-[1.1] tracking-tight text-foreground mb-6 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          הרימי כל
          <br />
          <em className="italic">תנועה</em>
        </h1>

        <p
          className={`text-base md:text-lg font-sans font-light text-foreground/70 max-w-xl mx-auto mb-10 leading-relaxed ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
          style={{ animationDelay: "0.2s" }}
        >
          המפגש בין אלגנטיות בהשראת בלט
          <br className="hidden md:block" /> לאחיזה מקצועית ברמה הגבוהה ביותר.
        </p>

        <div
          className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "0.4s" }}
        >
          <Button variant="hero" size="lg" className="px-12 py-6 h-auto" asChild>
            <a href="#collection">לקולקציה</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-foreground/20" />
      </div>
    </section>
  );
};

export default HeroSection;
