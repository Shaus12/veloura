import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Shield, Sparkles, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "אחיזה מדויקת",
    description: "דפוסי סיליקון מהנדסים מספקים יציבות חסרת תחרות על הרפורמר, כך שתוכלי להתמקד בטכניקה — לא בהחלקה.",
  },
  {
    icon: Sparkles,
    title: "היגיינה מחודשת",
    description: "השכבה האישית שלך. רשת נושמת ואנטי-בקטריאלית שומרת על רעננות מהבר לברנץ׳.",
  },
  {
    icon: Heart,
    title: "עיצוב אסתטי",
    description: "סטייל מהסטודיו לרחוב שנראה טוב כמו שהוא מתפקד. כי הגרביים שלך צריכות להתאים לאנרגיה.",
  },
];

const DifferenceSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.15);

  return (
    <section id="technology" ref={ref} className="py-28 md:py-36 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-20">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            למה VELŌURA
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            ההבדל של LŪNA
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`text-center p-10 rounded-3xl bg-card shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-serif font-medium text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-sm font-sans font-light leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;
