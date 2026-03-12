import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "צור קשר | VELŌURA",
  description: "צרו קשר עם Veloura",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-6" dir="rtl">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
            CONTACT US
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">
            צרו קשר
          </h1>
          <p className="text-muted-foreground font-sans text-sm max-w-md mx-auto">
            נשמח לעזור לכם בכל שאלה, בקשה או הצעה. אל תהססו לפנות אלינו.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          {/* Phone */}
          <a
            href="tel:0542961213"
            className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-foreground/20 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors">
              <Phone className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans mb-1">טלפון</p>
              <p className="text-foreground font-sans font-medium" dir="ltr">054-296-1213</p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:info@veloura.co.il"
            className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-foreground/20 transition-colors group"
          >
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0 group-hover:bg-foreground/10 transition-colors">
              <Mail className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans mb-1">דוא&quot;ל</p>
              <p className="text-foreground font-sans font-medium">info@veloura.co.il</p>
            </div>
          </a>

          {/* Location */}
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans mb-1">מיקום</p>
              <p className="text-foreground font-sans font-medium">ישראל</p>
            </div>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border/50">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-sans mb-1">שעות פעילות</p>
              <p className="text-foreground font-sans font-medium">א'-ה' 9:00-18:00</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
