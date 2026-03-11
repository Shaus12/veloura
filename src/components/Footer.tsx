"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";

const Footer = () => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [email, setEmail] = useState("");

  return (
    <footer ref={ref} className="bg-luna-deep text-background">
      {/* Newsletter */}
      <div className="py-24 px-6 border-b border-background/10">
        <div className="container mx-auto max-w-xl text-center">
          <p
            className={`text-xs font-sans font-semibold uppercase tracking-[0.3em] text-background/50 mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
          >
            ניוזלטר
          </p>
          <h2
            className={`text-3xl md:text-4xl font-serif font-normal text-background mb-4 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            הצטרפי למעגל הפנימי
          </h2>
          <p
            className={`text-sm font-sans font-light text-background/60 mb-8 ${
              isVisible ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            גישה מוקדמת לקולקציות חדשות, טיפים לסטודיו והצעות בלעדיות.
          </p>

          <div
            className={`flex gap-3 max-w-md mx-auto ${isVisible ? "animate-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <input
              type="email"
              placeholder="האימייל שלך"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 text-sm font-sans focus:outline-none focus:border-background/40 transition-colors"
            />
            <Button
              variant="hero"
              className="bg-background text-luna-deep hover:bg-background/90 px-8"
            >
              הצטרפי
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-10 px-6">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-serif text-2xl font-bold tracking-widest text-background/80">VELŌURA</span>

          <div className="flex items-center gap-8">
            <a href="#" className="text-xs font-sans uppercase tracking-[0.15em] text-background/50 hover:text-background/80 transition-colors">
              פרטיות
            </a>
            <a href="#" className="text-xs font-sans uppercase tracking-[0.15em] text-background/50 hover:text-background/80 transition-colors">
              תנאי שימוש
            </a>
            <a href="#" className="text-xs font-sans uppercase tracking-[0.15em] text-background/50 hover:text-background/80 transition-colors">
              צור קשר
            </a>
          </div>

          <p className="text-xs font-sans text-background/30">
            © 2026 Veloura. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
