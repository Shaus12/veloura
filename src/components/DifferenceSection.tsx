import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Shield, Sparkles, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "יציבות שמשחררת",
    description: "את לא צריכה לחשוב על הרגליים. סיליקון מהנדס על הרפורמר — ואת מתמקדת בנשימה, בתנועה, בגוף.",
  },
  {
    icon: Sparkles,
    title: "נקיות בלי פשרות",
    description: "השכבה שלך. רשת נושמת ואנטי-בקטריאלית — מהקלאס הראשון של הבוקר ועד הקפה אחרי.",
  },
  {
    icon: Heart,
    title: "נראות כמו שמרגישות",
    description: "גרביים שלא מתביישים בהן. מהסטודיו לרחוב, כי הסטייל שלך לא נעצר בדלת.",
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
            למה דווקא אנחנו
          </p>
          <h2
            className={`text-4xl md:text-5xl font-serif font-normal text-foreground ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            לא עוד גרב. תנועה.
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
