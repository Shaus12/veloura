import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6 py-5">
        <a href="#" className="text-serif text-2xl font-medium tracking-wider text-foreground">
          LŪNA
        </a>

        <div className="hidden md:flex items-center gap-10">
          <a href="#collection" className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300">
            The Collection
          </a>
          <a href="#technology" className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300">
            Technology
          </a>
          <a href="#stories" className="text-xs font-sans font-medium uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground transition-colors duration-300">
            Stories
          </a>
        </div>

        <button className="relative text-foreground hover:text-primary transition-colors duration-300" aria-label="Shopping bag">
          <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-[10px] font-sans font-semibold flex items-center justify-center text-primary-foreground">
            0
          </span>
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
