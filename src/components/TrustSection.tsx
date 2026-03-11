import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "שירה מ.",
    role: "מדריכת פילאטיס, תל אביב",
    quote: "אחרי לידה חזרתי לסטודיו ולא הרגשתי את הגוף. עם הגרביים האלה הרגשתי שוב מחוברת לרצפה — ולעצמי.",
    rating: 5,
  },
  {
    name: "נועה כ.",
    role: "בעלת סטודיו, הרצליה",
    quote: "המתאמנות שלי נכנסות ושואלות 'מאיפה הגרביים?' לפני שהן שואלות מה התוכנית. זה אומר הכל.",
    rating: 5,
  },
  {
    name: "מאיה ת.",
    role: "Reformer girlie 💪",
    quote: "הגב שלי הפסיק לכאוב, האחיזה מטורפת, ואני הולכת איתן גם לקפה אחרי. אין מצב שאני חוזרת.",
    rating: 5,
  },
];

const featuredIn = ["VOGUE", "ELLE", "HARPER'S BAZAAR", "REFINERY29", "WELL+GOOD"];

const TrustSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { ref: ref2, isVisible: isVisible2 } = useScrollAnimation(0.1);

  return (
    <>
      {/* Featured In */}
      <section ref={ref} className="py-20 px-6 border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <p
            className={`text-center text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-12 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            כפי שהופיע ב
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
            {featuredIn.map((name, i) => (
              <span
                key={name}
                className={`text-lg md:text-xl font-serif italic text-muted-foreground/50 ${
                  isVisible ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" ref={ref2} className="py-28 md:py-36 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <p
              className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
                isVisible2 ? "animate-fade-up" : "opacity-0"
              }`}
            >
              מהקהילה
            </p>
            <h2
              className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
                isVisible2 ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: "0.1s" }}
            >
              הן כבר בפנים
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`p-8 rounded-3xl bg-card shadow-card ${
                  isVisible2 ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm font-sans font-light leading-relaxed text-foreground/80 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-sans font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs font-sans text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustSection;
